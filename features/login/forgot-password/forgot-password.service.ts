/**
 * forgot-password.service.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Three Supabase calls — one per step of the forgot-password flow.
 *
 * Safe Supabase Password Recovery Flow:
 * Step 1  →  resetPasswordForEmail({ email })  Sends a 6-digit email OTP via Recovery Template
 * Step 2  →  verifyOtp({ email, token, type: 'recovery' }) Verifies the code & creates temporary session
 * Step 3  →  updateUser({ password })          Sets the new password securely
 */

import { createClient } from "@/lib/supabase/client";

// ─── Error type (same pattern as login.service.ts) ───────────────────────────

export interface ForgotPasswordError {
  code:
    | "email_not_found"
    | "otp_invalid"
    | "otp_expired"
    | "update_failed"
    | "unknown";
}

// ─── Supabase client ──────────────────────────────────────────────────────────

// ─── Step 1: Send Recovery OTP to email ───────────────────────────────────────

export async function sendOtp(email: string): Promise<void> {
  const supabase = createClient();

  // 🌟 تعديل جوهري: تم استبدال signInWithOtp بـ resetPasswordForEmail
  const { error } = await supabase.auth.resetPasswordForEmail(
    email.trim().toLowerCase(),
    {
      // الرابط المسجل في الـ Allowlist بـ Supabase
      redirectTo: `${window.location.origin}/reset-password`,
    },
  );

  if (error) {
    // Supabase returns a generic error for non-existent emails
    // to avoid user enumeration — we surface it as unknown intentionally
    throw {
      code: "unknown",
      // i18nKey: "forgotPassword.errors.api_send_failed",
    } satisfies ForgotPasswordError;
  }
}

// ─── Step 2: Verify OTP ───────────────────────────────────────────────────────

export async function verifyOtp(email: string, token: string): Promise<void> {
  const supabase = createClient();

  // 🌟 تعديل جوهري: تغيير الـ type من "email" إلى "recovery"
  const { error } = await supabase.auth.verifyOtp({
    email: email.trim().toLowerCase(),
    token: token.trim(),
    type: "recovery", // هذا يجبر النظام على قراءة كود استعادة الباسورد
  });

  if (error) {
    const isExpired = error.message?.toLowerCase().includes("expired");
    throw {
      code: isExpired ? "otp_expired" : "otp_invalid",
    } satisfies ForgotPasswordError;
  }
}

// ─── Step 3: Update password ──────────────────────────────────────────────────

export async function updatePassword(newPassword: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw {
      code: "update_failed",
    } satisfies ForgotPasswordError;
  }

  await supabase.auth.signOut();
}
