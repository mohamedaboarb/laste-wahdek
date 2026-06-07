import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { DoctorRegisterPayload } from "./Doctor.schema";
import { DoctorServiceError } from "../types/types";

const BUCKET = "certificates";

// ─── Rollback helper ──────────────────────────────────────────────────────────
// Called when any post-signUp step fails.
// NOTE: The auth.users row itself cannot be deleted from the client SDK —
// it requires the service-role key. The profile row was created by the
// DB trigger and will remain. Certificate files are cleaned up best-effort.

async function rollback(
  supabase: SupabaseClient,
  uploadedPaths: string[],
): Promise<void> {
  if (uploadedPaths.length > 0) {
    await supabase.storage
      .from(BUCKET)
      .remove(uploadedPaths)
      .catch(() => null);
  }
}

// ─── registerDoctor ───────────────────────────────────────────────────────────

export async function registerDoctor(
  payload: DoctorRegisterPayload,
  certificates: FileList,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any,
): Promise<{ success: boolean }> {
  const supabase = createClient();
  const uploadedPaths: string[] = [];
  let userId = "";

  try {
    // ── Step 1: Create auth user ────────────────────────────────────────────
    // The handle_new_user DB trigger fires immediately on INSERT into auth.users
    // and creates the profiles row with role="doctor", status="pending_approval".
    // No session is returned when "Confirm email" is enabled — that is expected.
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: {
          // Read by handle_new_user trigger to set role + status on profiles
          role: "doctor",
        },
      },
    });

    if (signUpError) {
      const isDuplicate =
        signUpError.message?.toLowerCase().includes("already registered") ||
        signUpError.message?.toLowerCase().includes("already exists");

      throw {
        code: isDuplicate ? "email_taken" : "unknown",
      } satisfies DoctorServiceError;
    }

    if (!authData.user) {
      throw {
        code: "unknown",
      } satisfies DoctorServiceError;
    }

    // ── Ghost-user guard ────────────────────────────────────────────────────
    // When "Confirm email" is ON and the email already exists but is unconfirmed,
    // Supabase returns success with an empty identities array instead of an error.
    if (authData.user.identities && authData.user.identities.length === 0) {
      throw {
        code: "email_taken",
      } satisfies DoctorServiceError;
    }

    userId = authData.user.id;

    // ── Step 2: Upload certificates to Supabase Storage ─────────────────────
    // We upload BEFORE calling the DB function so that if the DB insert fails,
    // we can clean up the files in the rollback. Storage uses the anon key with
    // the path-scoped RLS policy: userId must be the first path segment.
    // Path pattern: {userId}/{timestamp}-{safeFilename}
    if (!certificates || certificates.length === 0) {
      throw {
        code: "upload_failed",
      } satisfies DoctorServiceError;
    }

    const filesArray = Array.from(certificates);

    for (const file of filesArray) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${userId}/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false, // timestamp makes each path unique — never overwrite
          contentType: file.type,
        });

      if (uploadError) {
        console.error(
          "[Doctor Signup] certificate upload failed:",
          uploadError,
          "file:",
          safeName,
        );
        throw {
          code: "upload_failed",
        } satisfies DoctorServiceError;
      }

      uploadedPaths.push(path);
    }

    // ── Step 3: Insert doctor_details + certificate metadata via RPC ─────────
    // We use a SECURITY DEFINER function (insert_doctor_registration) because:
    //   • "Confirm email" is ON → signUp() returns NO session
    //   • Without a session, auth.uid() is null → RLS blocks direct inserts
    //   • The function runs as superuser, validates the profile exists and is
    //     a pending doctor, then inserts doctor_details + doctor_certificates.
    const certPaths = uploadedPaths;
    const certNames = filesArray.map((f) => f.name);

    const { error: rpcError } = await supabase.rpc(
      "insert_doctor_registration",
      {
        p_user_id: userId,
        p_full_name: payload.fullName,
        p_gender: payload.gender,
        p_specialization: payload.specialization,
        p_scientific_degree: payload.scientificDegree,
        p_title: payload.title,
        p_medical_license_number: payload.medicalLicenseNumber,
        p_bio: payload.bio ?? null,
        p_cert_paths: certPaths,
        p_cert_names: certNames,
      },
    );

    if (rpcError) {
      throw {
        code: "license_taken",
      } satisfies DoctorServiceError;
    }

    // ── All steps succeeded ──────────────────────────────────────────────────
    // No session was created (email confirmation pending), so no signOut needed.
    return { success: true };
  } catch (err: unknown) {
    // Clean up any uploaded files on failure
    if (uploadedPaths.length > 0) {
      await rollback(supabase, uploadedPaths);
    }

    // Re-throw as-is if it's already a shaped DoctorServiceError
    const typed = err as Partial<DoctorServiceError>;
    if (typed.code) throw err;

    // Fallback for unexpected errors (network, etc.)
    throw {
      code: "unknown",
    } satisfies DoctorServiceError;
  }
}

// ─── Check license uniqueness (onBlur validation) ────────────────────────────
// Returns true = available, false = already taken.
// Fails open (returns true) on query error so the server validates on submit.

export async function checkLicenseAvailability(
  licenseNumber: string,
): Promise<boolean> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("doctor_details")
    .select("id")
    .eq("medical_license_number", licenseNumber.trim())
    .maybeSingle();

  if (error) return true;
  return data === null;
}
