import { z } from "zod";

export type Role = "mother" | "doctor";

export const SPECIALIZATIONS = ["طب الأطفال", "الطب النفسي"] as const;

export const signupSchema = z
  .object({
    role: z.enum(["mother", "doctor"]),
    email: z
      .string()
      .email({ message: "البريد الإلكتروني غير صحيح" })
      .toLowerCase(),
    password: z
      .string()
      .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" })
      .regex(/[A-Z]/, { message: "يجب أن تحتوي على حرف كبير واحد على الأقل" })
      .regex(/[0-9]/, { message: "يجب أن تحتوي على رقم واحد على الأقل" })
      .regex(/[^A-Za-z0-9]/, {
        message: "يجب أن تحتوي على رمز خاص واحد على الأقل",
      }),
    confirmPassword: z.string(),

    fullName: z.string().optional(),
    phone: z.string().optional(),
    medicalLicenseNumber: z.string().optional(),
    specialization: z.string().optional(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (data.role === "doctor") {
      if (!data.fullName || data.fullName.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "الاسم يجب أن يكون 3 أحرف على الأقل ومطلوب للطبيب",
          path: ["fullName"],
        });
      }

      const phoneRegex = /^[0-9+\-\s()]+$/;
      if (!data.phone || data.phone.trim().length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "رقم الهاتف مطلوب ويجب أن يكون 10 أرقام على الأقل",
          path: ["phone"],
        });
      } else if (!phoneRegex.test(data.phone)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "رقم الهاتف غير صالح",
          path: ["phone"],
        });
      }

      if (!data.medicalLicenseNumber?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "رقم الترخيص الطبي مطلوب",
          path: ["medicalLicenseNumber"],
        });
      }

      if (!data.specialization?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "التخصص مطلوب",
          path: ["specialization"],
        });
      }
    }
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

export type MotherPayload = {
  email: string;
  password: string;
  role: "mother";
  status: "active";
};

export type DoctorPayload = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "doctor";
  medicalLicenseNumber: string;
  specialization: string;
  status: "pending_approval";
};

export type RegisterPayload = MotherPayload | DoctorPayload;

export function buildPayload(values: SignupFormValues): RegisterPayload {
  const base = {
    email: values.email.trim().toLowerCase(),
    password: values.password,
  };

  if (values.role === "doctor") {
    return {
      ...base,
      fullName: values.fullName!.trim(),
      phone: values.phone!.trim(),
      role: "doctor",
      medicalLicenseNumber: values.medicalLicenseNumber!.trim(),
      specialization: values.specialization!.trim(),
      status: "pending_approval",
    };
  }

  return { ...base, role: "mother", status: "active" };
}
