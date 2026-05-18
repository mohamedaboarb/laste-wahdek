import { z } from "zod";

// ─── Role ────────────────────────────────────────────────────────────────────

// ─── Specializations ─────────────────────────────────────────────────────────
export const SPECIALIZATIONS = ["طب الأطفال", "الطب النفسي"] as const;

// ─── Mother Registration Schema ───
export const childSchema = z.object({
  name: z.string().min(2, "Child name is required"),
  age: z.coerce.number().min(0).max(18),
  diseaseHistory: z.string().optional(),
});

export const motherSchema = z.object({
  role: z.literal("mother"),
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  nationalId: z.string().min(10, "National ID must be at least 10 digits"),
  age: z.coerce.number().min(16).max(65),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  chronicDiseases: z.array(z.string()).optional(),
  generalHistory: z.string().optional(),
  mentalHealth: z.string().optional(),
  children: z.array(childSchema).min(1, "At least one child is required"),
});

// ─── Doctor Registration Schema ───
export const doctorSchema = z.object({
  role: z.literal("doctor"),
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  specialization: z.enum(["pediatrician", "psychologist"]),
  licenseId: z.string().min(5, "License ID is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

// ─── Discriminated Union ───
export const registrationSchema = z.discriminatedUnion("role", [
  motherSchema,
  doctorSchema,
]);
export const filterSchema = z.object({
  name: z.string().optional(),
  gender: z.enum(["male", "female", ""]).optional(),
  specialty: z.string().optional(),
  experience: z.string().optional(),
  page: z.string().default("1"),
});

export type FilterValues = z.infer<typeof filterSchema>;
export type MotherFormData = z.infer<typeof motherSchema>;
export type DoctorFormData = z.infer<typeof doctorSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type ChildData = z.infer<typeof childSchema>;
// Appointement Schema
export const AppointmentSchema = z.object({
  id: z.string(),
  doctorId: z.string(),
  date: z.date(),
  timeSlot: z.string(),
  type: z.enum(["video", "clinic", "voice"]),
  price: z.number(),
  isFree: z.boolean(),
});

export type Appointment = z.infer<typeof AppointmentSchema>;
export const UserStatsSchema = z.object({
  previousAppointmentsCount: z.number(),
  connectedDoctorIds: z.array(z.string()),
});

export type UserStats = z.infer<typeof UserStatsSchema>;
