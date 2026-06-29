import { z } from "zod";

export const psychologicalStatuses = [
  "Regular",
  "Transient Occupational Stress",
  "Acute Postpartum Mood Variance",
  "Under Observation",
] as const;

export const chronicDiseases = [
  "Diabetes",
  "Hypertension",
  "Thyroid Profile",
  "Heart Disease",
  "Asthma",
  "Other",
] as const;

export const childSchema = z.object({
  id: z.string(),

  fullName: z
    .string()
    .min(2, "Child name must be at least 2 characters")
    .max(100, "Child name is too long"),

  birthDate: z.date({
    required_error: "Birth date is required",
  }),

  medicalSummary: z
    .string()
    .max(1000, "Medical summary is too long")
    .optional(),

  image_url: z.string().nullable().optional(),

  // Transient cache-buster — never stored in the database.
  // Set to Date.now() after a successful upload so the CDN URL
  // gets a unique ?v= query param and bypasses the browser cache.
  image_version: z.number().optional(),
});

export const profileSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(150, "Full name is too long"),

  email: z.string().email("Please enter a valid email address"),

  nationalId: z
    .string()
    .min(5, "National ID is too short")
    .max(50, "National ID is too long"),

  phone: z
    .string()
    .min(8, "Please enter a valid phone number")
    .max(30, "Phone number is too long"),

  birthDate: z.date({
    required_error: "Birth date is required",
  }),

  chronicDiseases: z.array(z.string()),

  psychologicalStatus: z.enum(psychologicalStatuses, {
    required_error: "Psychological status is required",
  }),

  clinicalHistory: z.string().max(5000, "Clinical history is too long"),

  children: z.array(childSchema),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export type ChildFormValues = z.infer<typeof childSchema>;
