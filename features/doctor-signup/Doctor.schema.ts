import { z } from "zod";

// ─── Specialization options ───────────────────────────────────────────────────
export const DOCTOR_SPECIALIZATIONS = ["pediatrician", "psychologist"] as const;
export type DoctorSpecialization = (typeof DOCTOR_SPECIALIZATIONS)[number];

export const SPECIALIZATION_LABELS: Record<DoctorSpecialization, string> = {
  pediatrician: "طب الأطفال",
  psychologist: "الطب النفسي",
};

// ─── Scientific degrees — keyed by specialization ────────────────────────────
export const SCIENTIFIC_DEGREES: Record<
  DoctorSpecialization,
  readonly string[]
> = {
  pediatrician: ["ممارس عام أطفال", "أخصائي", "استشاري"],
  psychologist: ["أخصائي نفسي", "طبيب نفسي"],
};

// ─── Gender ──────────────────────────────────────────────────────────────────
export const DOCTOR_GENDERS = ["male", "female"] as const;
export type DoctorGender = (typeof DOCTOR_GENDERS)[number];

// ─── Step 1 schema — Personal information ────────────────────────────────────
export const step1Schema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: "الاسم يجب أن يكون 3 أحرف على الأقل" })
      .max(100, { message: "الاسم طويل جداً" }),
    email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
    password: z
      .string()
      .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" })
      .regex(/[A-Z]/, { message: "يجب أن تحتوي على حرف كبير واحد على الأقل" })
      .regex(/[0-9]/, { message: "يجب أن تحتوي على رقم واحد على الأقل" })
      .regex(/[^A-Za-z0-9]/, {
        message: "يجب أن تحتوي على رمز خاص واحد على الأقل",
      }),
    confirmPassword: z.string(),
    gender: z.enum(["male", "female"], {
      required_error: "يرجى تحديد الجنس",
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

export type Step1Values = z.infer<typeof step1Schema>;

// ─── Step 2 schema — Professional information ─────────────────────────────────
export const step2Schema = z.object({
  specialization: z.enum(["pediatrician", "psychologist"], {
    message: "يرجى اختيار التخصص",
  }),
  scientificDegree: z
    .string()
    .min(1, { message: "يرجى اختيار الدرجة العلمية" }),
  title: z
    .string()
    .min(5, { message: "العنوان يجب أن يكون 5 أحرف على الأقل" })
    .max(150, { message: "العنوان طويل جداً" }),
  medicalLicenseNumber: z
    .string()
    .min(3, { message: "رقم الترخيص الطبي مطلوب" }),
  bio: z.string().max(500, { message: "النبذة لا تتجاوز 500 حرف" }).optional(),
  certificates: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, {
      message: "يرجى رفع شهادة أو أكثر",
    })
    .refine(
      (files) => {
        if (!files) return true;
        return Array.from(files).every(
          (f) => f.size <= 10 * 1024 * 1024, // 10 MB per file
        );
      },
      { message: "حجم كل ملف يجب أن لا يتجاوز 10 ميغابايت" },
    )
    .refine(
      (files) => {
        if (!files) return true;
        const allowed = [
          "image/jpeg",
          "image/png",
          "image/webp",
          "application/pdf",
        ];
        return Array.from(files).every((f) => allowed.includes(f.type));
      },
      { message: "يُسمح فقط بملفات JPG, PNG, WEBP, أو PDF" },
    ),
});

export type Step2Values = z.infer<typeof step2Schema>;

// ─── Combined doctor form values ──────────────────────────────────────────────
export type DoctorFormValues = Step1Values & Step2Values;

// ─── Backend payload ──────────────────────────────────────────────────────────
export interface DoctorRegisterPayload {
  fullName: string;
  email: string;
  password: string;
  gender: DoctorGender;
  role: "doctor";
  specialization: DoctorSpecialization;
  scientificDegree: string;
  title: string;
  medicalLicenseNumber: string;
  bio?: string;
  status: "pending_approval";
  // certificates are sent as FormData — handled separately in the service
}

export function buildDoctorPayload(
  step1: Step1Values,
  step2: Step2Values,
): DoctorRegisterPayload {
  return {
    fullName: step1.fullName.trim(),
    email: step1.email.trim().toLowerCase(),
    password: step1.password,
    gender: step1.gender,
    role: "doctor",
    specialization: step2.specialization,
    scientificDegree: step2.scientificDegree,
    title: step2.title.trim(),
    medicalLicenseNumber: step2.medicalLicenseNumber.trim(),
    bio: step2.bio?.trim() || undefined,
    status: "pending_approval",
  };
}
