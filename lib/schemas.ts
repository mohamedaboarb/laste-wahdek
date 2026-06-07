// import { ForgotT } from "@/features/types/types";
// import { z } from "zod";

// export const filterSchema = z.object({
//   name: z.string().optional(),
//   gender: z.enum(["male", "female", ""]).optional(),
//   specialty: z.string().optional(),
//   experience: z.string().optional(),
//   page: z.string().default("1"),
// });

// export type FilterValues = z.infer<typeof filterSchema>;

// export const loginSchema = (t: any) =>
//   z.object({
//     email: z.string().min(1, { message: t.login.emailRequired }).trim().email({
//       message: t.login.emailInvalid,
//     }),
//     password: z.string().min(8, {
//       message: t.login.passwordMin,
//     }),
//   });

// export type LoginValues = z.infer<ReturnType<typeof loginSchema>>;
// /**
//  * forgot-password.schema.ts
//  * ─────────────────────────────────────────────────────────────────────────────
//  * Three separate Zod schemas, one per step.
//  * Each is a factory that accepts the translation slice it needs,
//  * matching the same pattern as loginSchema(t).
//  *
//  * Add these to your existing src/lib/schemas.ts
//  */

// // ─── Translation shape required by the schemas ───────────────────────────────

// // ─── Step 1: Email ────────────────────────────────────────────────────────────

// export function forgotEmailSchema(t: ForgotT) {
//   const e = t.forgotPassword.errors;
//   return z.object({
//     email: z
//       .string()
//       .min(1, { message: e.email_required })
//       .email({ message: e.email_invalid }),
//   });
// }

// export type ForgotEmailValues = z.infer<ReturnType<typeof forgotEmailSchema>>;

// // ─── Step 2: OTP ──────────────────────────────────────────────────────────────

// export function forgotOtpSchema(t: ForgotT) {
//   const e = t.forgotPassword.errors;
//   return z.object({
//     // We store the 6 digits as a single concatenated string
//     otp: z
//       .string()
//       .min(1, { message: e.otp_required })
//       .length(6, { message: e.otp_length })
//       .regex(/^\d+$/, { message: e.otp_digits_only }),
//   });
// }

// export type ForgotOtpValues = z.infer<ReturnType<typeof forgotOtpSchema>>;

// // ─── Step 3: New password ─────────────────────────────────────────────────────

// export function forgotPasswordSchema(t: ForgotT) {
//   const e = t.forgotPassword.errors;
//   return z
//     .object({
//       password: z
//         .string()
//         .min(1, { message: e.password_required })
//         .min(8, { message: e.password_min })
//         .regex(/[A-Z]/, { message: e.password_uppercase })
//         .regex(/[0-9]/, { message: e.password_number })
//         .regex(/[^A-Za-z0-9]/, { message: e.password_symbol }),
//       confirmPassword: z.string(),
//     })
//     .refine((d) => d.password === d.confirmPassword, {
//       message: e.password_mismatch,
//       path: ["confirmPassword"],
//     });
// }

// export type ForgotPasswordValues = z.infer<
//   ReturnType<typeof forgotPasswordSchema>
// >;

import { ForgotT } from "@/features/types/types";
import { z } from "zod";

// ─── Filter Schema ────────────────────────────────────────────────────────────
// 📝 فريد وخاص بصفحة البحث عن الأطباء (Doctors Filter) - ايرتبط مباشرة بملف الأطباء
export const filterSchema = z.object({
  name: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
  specialty: z.string().optional(),
  experience: z.string().optional(),
  page: z.string().default("1"),
});

export type FilterValues = z.infer<typeof filterSchema>;

// ─── Login Schema ─────────────────────────────────────────────────────────────
// 📝 فريد وخاص بصفحة تسجيل الدخول، يعتمد على نصوص الـ login في ملف الترجمة
export const loginSchema = (t: any) =>
  z.object({
    email: z.string().min(1, { message: t.login.emailRequired }).trim().email({
      message: t.login.emailInvalid,
    }),
    password: z.string().min(8, {
      message: t.login.passwordMin,
    }),
  });

export type LoginValues = z.infer<ReturnType<typeof loginSchema>>;

// ─── Step 1: Forgot Password (Email) ──────────────────────────────────────────
export function forgotEmailSchema(t: ForgotT) {
  const e = t.forgotPassword.errors;
  return z.object({
    // ⚠️ تكرار منطقي: قواعد التحقق من الإيميل هنا هي نفسها المستخدمة في الأطباء والأمهات.
    // لكن يُفضل تركها هنا لأنها تقرأ من مسار ترجمة مختلف تماماً (t.forgotPassword.errors).
    email: z
      .string()
      .min(1, { message: e.email_required })
      .email({ message: e.email_invalid }),
  });
}

export type ForgotEmailValues = z.infer<ReturnType<typeof forgotEmailSchema>>;

// ─── Step 2: Forgot Password (OTP) ────────────────────────────────────────────
// 📝 فريد وخاص بمرحلة استعادة كلمة المرور فقط
export function forgotOtpSchema(t: ForgotT) {
  const e = t.forgotPassword.errors;
  return z.object({
    otp: z
      .string()
      .min(1, { message: e.otp_required })
      .length(6, { message: e.otp_length })
      .regex(/^\d+$/, { message: e.otp_digits_only }),
  });
}

export type ForgotOtpValues = z.infer<ReturnType<typeof forgotOtpSchema>>;

// ─── Step 3: Forgot Password (New password) ────────────────────────────────────
export function forgotPasswordSchema(t: ForgotT) {
  const e = t.forgotPassword.errors;
  return z
    .object({
      // ⚠️ تكرار منطقي كامل: قواعد كلمة المرور (الرموز، الأرقام، الحرف الكبير) تطابق تماماً
      // خطوة الأطباء الأولى (Step 1) وخطوة الأمهات.
      // وجه الاختلاف الوحيد هو مسار رسالة الخطأ (e.password_uppercase بدلاً من t.register.validation...).
      password: z
        .string()
        .min(1, { message: e.password_required })
        .min(8, { message: e.password_min })
        .regex(/[A-Z]/, { message: e.password_uppercase })
        .regex(/[0-9]/, { message: e.password_number })
        .regex(/[^A-Za-z0-9]/, { message: e.password_symbol }),
      confirmPassword: z.string(),
    })
    .refine((d) => d.password === d.confirmPassword, {
      message: e.password_mismatch,
      path: ["confirmPassword"],
    });
}

export type ForgotPasswordValues = z.infer<
  ReturnType<typeof forgotPasswordSchema>
>;
