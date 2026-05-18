import { DoctorRegisterPayload } from "./Doctor.schema";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "/api";

// 💡 مفتاح التحكم: غيره إلى false عندما يصبح الـ Backend حقيقياً وجاهزاً
const IS_MOCK_MODE = true;

function getCsrfToken(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

export async function registerDoctor(
  payload: DoctorRegisterPayload,
  certificates: FileList,
): Promise<{ doctorId: string }> {
  if (IS_MOCK_MODE) {
    // ⏳ محاكاة انتظار السيرفر للخطوة الأولى (إنشاء الحساب النصي)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(
      "🎯 [Mock Server] الخطوة أ: تم استقبال بيانات الطبيب النصية:",
      payload,
    );

    // توليد معرف طبيب وهمي
    const mockDoctorId = "doc_" + Math.random().toString(36).substr(2, 9);

    // ⏳ محاكاة انتظار السيرفر للخطوة الثانية (رفع الشهادات والملفات)
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log(
      `🎯 [Mock Server] الخطوة ب: تم رفع عدد (${certificates.length}) ملفات للطبيب ذو المعرف: ${mockDoctorId}`,
    );

    // طباعة أسماء الملفات المرفوعة في الـ Console للتأكد من قراءتها
    Array.from(certificates).forEach((file) =>
      console.log(`📄 ملف مرفوع: ${file.name}`),
    );

    return { doctorId: mockDoctorId };
  }

  // ── Step A: register core data as JSON ────────────────────────────────────
  const jsonRes = await fetch(`${API_BASE}/auth/doctors/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": getCsrfToken(),
    },
    body: JSON.stringify(payload),
  });

  const jsonData = await jsonRes.json().catch(() => ({}));
  if (!jsonRes.ok) {
    throw new Error(
      (jsonData as { message?: string }).message ??
        `التسجيل فشل (${jsonRes.status})`,
    );
  }

  const { doctorId } = jsonData as { doctorId: string };

  // ── Step B: upload certificates as multipart/form-data ────────────────────
  const form = new FormData();
  Array.from(certificates).forEach((file) => {
    form.append("certificates", file, file.name);
  });

  const uploadRes = await fetch(
    `${API_BASE}/auth/doctors/${doctorId}/certificates`,
    {
      method: "POST",
      credentials: "include",
      headers: { "X-CSRF-Token": getCsrfToken() },
      body: form,
    },
  );

  if (!uploadRes.ok) {
    const uploadData = await uploadRes.json().catch(() => ({}));
    throw new Error(
      (uploadData as { message?: string }).message ??
        `رفع الشهادات فشل (${uploadRes.status})`,
    );
  }

  return { doctorId };
}

export async function checkLicenseAvailability(
  licenseNumber: string,
): Promise<boolean> {
  if (IS_MOCK_MODE) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // محاكاة: لو كتب رقم "12345" افترض أنه محجوز مسبقاً، أي رقم آخر متاح
    if (licenseNumber === "12345") {
      console.log(`🔍 [Mock Server] فحص الرخصة: ${licenseNumber} غير متاح ❌`);
      return false;
    }
    console.log(`🔍 [Mock Server] فحص الرخصة: ${licenseNumber} متاح ✅`);
    return true;
  }

  const res = await fetch(
    `${API_BASE}/auth/doctors/check-license?number=${encodeURIComponent(licenseNumber)}`,
    { credentials: "include" },
  );
  if (!res.ok) return true;
  const { available } = (await res.json()) as { available: boolean };
  return available;
}
