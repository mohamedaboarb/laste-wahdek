"use client";

import { createClient } from "@/lib/supabase/client";
import {
  ProfileFormValues,
  ChildFormValues,
} from "@/app/dashboard/DashboardSchemas/motherSchema";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProfileServiceError {
  code: "not_found" | "unauthorized" | "db_error" | "unknown";
  message?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function dbRowToProfile(
  row: Record<string, unknown>,
  children: ChildFormValues[],
  email: string,
): ProfileFormValues {
  return {
    fullName: (row.full_name as string) ?? "",
    email,
    nationalId: (row.national_id as string) ?? "",
    phone: (row.phone as string) ?? "",
    birthDate: row.birth_date ? new Date(row.birth_date as string) : new Date(),
    chronicDiseases: (row.chronic_diseases as string[]) ?? [],
    psychologicalStatus:
      (row.psychological_status as ProfileFormValues["psychologicalStatus"]) ??
      "Regular",
    clinicalHistory: (row.clinical_history as string) ?? "",
    children,
  };
}
const supabase = createClient();

function dbChildToForm(row: Record<string, unknown>): ChildFormValues {
  return {
    id: row.id as string, // ← UUID الحقيقي من DB
    fullName: row.full_name as string,
    birthDate: new Date(row.birth_date as string),
    medicalSummary: (row.medical_summary as string | undefined) ?? "",
    image_url: (row.image_url as string | null | undefined) ?? null,
  };
}

// ─── fetchProfile ─────────────────────────────────────────────────────────────
// يجلب بيانات الأم + أطفالها من Supabase ويحوّلها لقيم الفورم مباشرة.

export async function fetchProfile(): Promise<ProfileFormValues> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user)
    throw { code: "unauthorized" } satisfies ProfileServiceError;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(
      "full_name, national_id, phone, birth_date, chronic_diseases, psychological_status, clinical_history",
    )
    .eq("id", user.id)
    .single();

  if (profileError)
    throw {
      code: "db_error",
      message: profileError.message,
    } satisfies ProfileServiceError;

  const { data: childrenRows, error: childrenError } = await supabase
    .from("children")
    .select("id, full_name, birth_date, medical_summary, image_url")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: true });

  if (childrenError)
    throw {
      code: "db_error",
      message: childrenError.message,
    } satisfies ProfileServiceError;

  const children = (childrenRows ?? []).map((r) =>
    dbChildToForm(r as Record<string, unknown>),
  );

  return dbRowToProfile(
    profile as Record<string, unknown>,
    children,
    user.email ?? "",
  );
}

// ─── saveProfile ──────────────────────────────────────────────────────────────
// الـ UUID في كل طفل قادم من المتصفح (crypto.randomUUID في ChildDialog).
// نقارنه بـ IDs الموجودة في DB:
//   • موجود في DB  → UPDATE
//   • غير موجود   → INSERT مع نفس الـ UUID الذي أنشأه المتصفح
// هذا يضمن أن المتصفح والـ DB يتحدثان دائماً عن نفس الـ ID.

export async function saveProfile(values: ProfileFormValues): Promise<void> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user)
    throw { code: "unauthorized" } satisfies ProfileServiceError;

  // 1. Update profiles row
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      full_name: values.fullName.trim(),
      national_id: values.nationalId.trim(),
      phone: values.phone.trim(),
      birth_date: values.birthDate.toISOString().split("T")[0],
      chronic_diseases: values.chronicDiseases,
      psychological_status: values.psychologicalStatus,
      clinical_history: values.clinicalHistory.trim(),
    })
    .eq("id", user.id);

  if (profileError)
    throw {
      code: "db_error",
      message: profileError.message,
    } satisfies ProfileServiceError;
  const { error: authUpdateError } = await supabase.auth.updateUser({
    data: {
      full_name: values.fullName.trim(),
    },
  });
  if (authUpdateError) {
    console.error("Error updating auth metadata:", authUpdateError.message);
    // نكتفي بطباعة الخطأ في الكونسول حتى لا نُعطّل عملية حفظ الأطفال لو نجحت الداتابيز
  }
  // 2. جلب IDs الأطفال الحاليين في DB
  const { data: currentRows, error: fetchChildrenError } = await supabase
    .from("children")
    .select("id")
    .eq("profile_id", user.id);

  if (fetchChildrenError)
    throw {
      code: "db_error",
      message: fetchChildrenError.message,
    } satisfies ProfileServiceError;

  const dbIds = new Set((currentRows ?? []).map((r) => r.id as string));
  const incomingIds = new Set(values.children.map((c) => c.id));

  // 3. حذف الأطفال المحذوفين من الواجهة
  //    (موجود في DB لكن غير موجود في القيم القادمة)
  const toDelete = [...dbIds].filter((id) => !incomingIds.has(id));

  if (toDelete.length > 0) {
    const { error: deleteError } = await supabase
      .from("children")
      .delete()
      .in("id", toDelete)
      .eq("profile_id", user.id); // حماية إضافية: لا نحذف إلا أطفال هذه الأم

    if (deleteError)
      throw {
        code: "db_error",
        message: deleteError.message,
      } satisfies ProfileServiceError;
  }

  // 4. INSERT أو UPDATE لكل طفل قادم من الواجهة
  for (const child of values.children) {
    const childRow = {
      id: child.id, // ← UUID من المتصفح
      profile_id: user.id,
      full_name: child.fullName.trim(),
      birth_date: child.birthDate.toISOString().split("T")[0],
      medical_summary: child.medicalSummary?.trim() ?? null,
      image_url: child.image_url ?? null,
    };

    if (dbIds.has(child.id)) {
      // موجود في DB → UPDATE فقط
      const { error } = await supabase
        .from("children")
        .update({
          full_name: childRow.full_name,
          birth_date: childRow.birth_date,
          medical_summary: childRow.medical_summary,
          image_url: childRow.image_url,
        })
        .eq("id", child.id)
        .eq("profile_id", user.id);

      if (error)
        throw {
          code: "db_error",
          message: error.message,
        } satisfies ProfileServiceError;
    } else {
      // غير موجود في DB → INSERT مع نفس UUID المتصفح
      // بهذا يبقى ID المتصفح والـ DB متطابقَيْن تماماً
      const { error } = await supabase.from("children").insert(childRow);

      if (error)
        throw {
          code: "db_error",
          message: error.message,
        } satisfies ProfileServiceError;
    }
  }
}

export async function updateChildImage(
  childId: string,
  imageUrl: string | null,
): Promise<boolean> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user)
    throw { code: "unauthorized" } satisfies ProfileServiceError;

  const { data, error } = await supabase
    .from("children")
    .update({ image_url: imageUrl })
    .eq("id", childId)
    .eq("profile_id", user.id)
    .select("id")
    .maybeSingle();

  if (error)
    throw {
      code: "db_error",
      message: error.message,
    } satisfies ProfileServiceError;

  return Boolean(data);
}

export async function deleteChild(childId: string): Promise<void> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user)
    throw { code: "unauthorized" } satisfies ProfileServiceError;

  const { error } = await supabase
    .from("children")
    .delete()
    .eq("id", childId)
    .eq("profile_id", user.id);

  if (error)
    throw {
      code: "db_error",
      message: error.message,
    } satisfies ProfileServiceError;
}

// read the email of the user
export async function getCurrentUserEmail(): Promise<string | null> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error("Error fetching user email:", error);
    return null;
  }

  return user.email ?? null;
}
