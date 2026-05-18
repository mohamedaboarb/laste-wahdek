import { RegisterPayload } from "./schema";

// ─── Base config ──────────────────────────────────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "/api";

// 💡 مفتاح التحكم: غيره إلى false عندما يصبح الـ Backend حقيقياً وجاهزاً
const IS_MOCK_MODE = true;

/** Reads the CSRF token the server embeds as a readable cookie on page load. */
function getCsrfToken(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

/** Generic fetch wrapper with shared security headers. */
async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": getCsrfToken(),
      ...(options.headers ?? {}),
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message: string =
      (data as { message?: string }).message ??
      `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data as T;
}

// ─── Auth endpoints ───────────────────────────────────────────────────────────

export async function registerUser(payload: RegisterPayload): Promise<void> {
  if (IS_MOCK_MODE) {
    // ⏳ محاكاة ثانية ونصف انتظار كأننا نتصل بالسيرفر ليظهر الـ Loading Spinner
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 🚨 اختبار محاكاة الأخطاء: لو كتب المستخدم هذا الإيميل، أظهر له خطأ
    if (payload.email === "error@test.com") {
      throw new Error("هذا البريد الإلكتروني مستخدم بالفعل.");
    }

    console.log(
      "🎯 [Mock Server] تم استقبال بيانات التسجيل بنجاح في الخلفية:",
      payload,
    );
    return; // إرجاع فارغ (Void) تماماً كما تتوقع الدالة الحقيقية
  }

  // الكود الحقيقي يعمل هنا فقط لو الـ API جاهز
  await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** POST /auth/login */
export async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<void> {
  if (IS_MOCK_MODE) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("🎯 [Mock Server] تم تسجيل الدخول بـ:", credentials);
    return;
  }

  await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

/** POST /auth/logout */
export async function logoutUser(): Promise<void> {
  if (IS_MOCK_MODE) return;
  await apiFetch("/auth/logout", { method: "POST" });
}

/** POST /auth/refresh */
export async function refreshAccessToken(): Promise<void> {
  if (IS_MOCK_MODE) return;
  await apiFetch("/auth/refresh", { method: "POST" });
}

/** OAuth redirect helpers */
export const oauthRedirect = {
  google: () => {
    if (IS_MOCK_MODE) {
      alert("سيتم توجيهك إلى حساب Google في البيئة الحقيقية!");
      return;
    }
    window.location.href = `${API_BASE}/auth/oauth/google`;
  },
};
