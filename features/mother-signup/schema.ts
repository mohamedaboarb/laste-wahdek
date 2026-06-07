import { z } from "zod";
import { MotherRegisterPayload } from "../types/types";

// ─── Mother Signup Schema ───────────────────────────────────────────────────
export const signupSchema = (t: any) =>
  z
    .object({
      role: z.literal("mother"),
      email: z
        .string()
        .email({ message: t.register.validation.invalid_email })
        .toLowerCase()
        .trim(),
      password: z
        .string()
        .min(8, { message: t.register.validation.password_min })
        .regex(/[A-Z]/, { message: t.register.validation.password_uppercase })
        .regex(/[0-9]/, { message: t.register.validation.password_number })
        .regex(/[^A-Za-z0-9]/, {
          message: t.register.validation.password_special,
        }),
      confirmPassword: z.string(),
    })
    .refine((d) => d.password === d.confirmPassword, {
      message: t.register.validation.password_match,
      path: ["confirmPassword"],
    });

export type SignupFormValues = z.infer<ReturnType<typeof signupSchema>>;

// ─── Backend Payload for Mother ─────────────────────────────────────────────

export function buildPayload(values: SignupFormValues): MotherRegisterPayload {
  return {
    email: values.email.trim().toLowerCase(),
    password: values.password,
    role: "mother",
    status: "active",
  };
}
