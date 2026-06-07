import { z } from "zod";

export const DOCTOR_SPECIALIZATIONS = ["pediatrician", "psychologist"] as const;
export type DoctorSpecialization = (typeof DOCTOR_SPECIALIZATIONS)[number];

export const DOCTOR_GENDERS = ["male", "female"] as const;
export type DoctorGender = (typeof DOCTOR_GENDERS)[number];

// ─── Step 1 schema — Personal information ────────────────────────────────────
export const step1Schema = (t: any) =>
  z
    .object({
      fullName: z
        .string()
        .min(3, { message: t.register.validation.name_min })
        .max(100, { message: t.register.validation.name_max }),
      email: z
        .string()
        .email({ message: t.register.validation.invalid_email })
        .trim()
        .toLowerCase(),
      password: z
        .string()
        .min(8, { message: t.register.validation.password_min })
        .trim()
        .regex(/[A-Z]/, { message: t.register.validation.password_uppercase })
        .regex(/[0-9]/, { message: t.register.validation.password_number })
        .regex(/[^A-Za-z0-9]/, {
          message: t.register.validation.password_special,
        }),
      confirmPassword: z.string(),
      gender: z.enum(["male", "female"], {
        required_error: t.register.validation.gender_required,
      }),
    })
    .refine((d) => d.password === d.confirmPassword, {
      message: t.register.validation.password_match,
      path: ["confirmPassword"],
    });

// نستخدمReturnType لاستخراج الـ Type بشكل صحيح بما أن الـ Schema أصبحت دالة
export type Step1Values = z.infer<ReturnType<typeof step1Schema>>;

// ─── Step 2 schema — Professional information ─────────────────────────────────
export const step2schema = (t: any) =>
  z.object({
    specialization: z.enum(["pediatrician", "psychologist"], {
      message: t.register.validation.specialization_required,
    }),
    scientificDegree: z
      .string()
      .min(1, { message: t.register.validation.degree_required }),
    title: z
      .string()
      .min(5, { message: t.register.validation.title_min })
      .max(150, { message: t.register.validation.title_max }),
    medicalLicenseNumber: z
      .string()
      .min(1, { message: t.register.validation.license_required })
      .max(10, { message: t.register.validation.license_invalid })
      .regex(/[0-9]/, { message: t.register.validation.license_invalid }),
    bio: z
      .string()
      .max(500, { message: t.register.validation.bio_max })
      .optional(),
    certificates: z
      .custom<FileList>()
      .refine((files) => files instanceof FileList && files.length > 0, {
        message: t.register.validation.file_required,
      })
      .refine(
        (files) => {
          if (!files || !(files instanceof FileList)) return true;
          return Array.from(files).every((f) => f.size <= 10 * 1024 * 1024);
        },
        { message: t.register.validation.file_size },
      )
      .refine(
        (files) => {
          if (!files || !(files instanceof FileList)) return true;
          const allowed = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "application/pdf",
          ];
          return Array.from(files).every((f) => allowed.includes(f.type));
        },
        { message: t.register.validation.file_type },
      ),
  });

export type Step2Values = z.infer<ReturnType<typeof step2schema>>;

// Combined Form Values Type
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
}

export function buildDoctorPayload(
  step1: Step1Values,
  step2: Step2Values,
): DoctorRegisterPayload {
  return {
    fullName: step1.fullName.trim(),
    email: step1.email.trim().toLowerCase(),
    password: step1.password.trim(),
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
