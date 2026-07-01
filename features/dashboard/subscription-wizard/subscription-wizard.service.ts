import { createClient } from "@/lib/supabase/client";
import type { WizardDoctor } from "./types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DoctorRow {
  id: string;
  full_name: string;
  specialization: string;
  scientific_degree: string;
  title: string;
  bio: string;
  profile_image_url: string | null;
  is_accepting_patients: boolean;
  max_patients: number;
  package_eligibility: string[];
  experience_years: number;
  avg_rating: number;
  review_count: number;
  current_families: number;
  available_today: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function dbRowToWizardDoctor(row: DoctorRow): WizardDoctor {
  const VALID_DEGREES = ["General", "Specialist", "Consultant"] as const;
  const degree = VALID_DEGREES.includes(
    row.scientific_degree as (typeof VALID_DEGREES)[number],
  )
    ? (row.scientific_degree as WizardDoctor["scientificDegree"])
    : "General";

  return {
    id: row.id,
    fullName: row.full_name,
    specialization: row.specialization as WizardDoctor["specialization"],
    scientificDegree: degree,
    title: row.title,
    bio: row.bio,
    rating: Number(row.avg_rating),
    reviewCount: Number(row.review_count),
    currentFamilies: Number(row.current_families),
    maxPatients: row.max_patients,
    isAcceptingPatients: row.is_accepting_patients,
    availableToday: row.available_today,
    profileImageUrl: row.profile_image_url,
    packageEligibility: row.package_eligibility,
    experienceYears: row.experience_years,
  };
}

// ─── Doctors ──────────────────────────────────────────────────────────────────

export async function fetchAvailableDoctors(
  specialization: "pediatrician" | "psychologist",
  packageId: string,
  searchQuery: string,
  filterAvailableToday: boolean,
  filterMinRating: number | null,
): Promise<WizardDoctor[]> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("fetch_available_doctors", {
    p_specialization: specialization,
    p_package_id: packageId || null,
  });

  if (error) throw new Error(error.message);

  let doctors = (data as DoctorRow[]).map(dbRowToWizardDoctor);

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    doctors = doctors.filter((d) => d.fullName.toLowerCase().includes(q));
  }

  if (filterAvailableToday) {
    doctors = doctors.filter((d) => d.availableToday);
  }

  if (filterMinRating !== null) {
    doctors = doctors.filter((d) => d.rating >= filterMinRating);
  }

  return doctors;
}

// ─── Subscription creation ────────────────────────────────────────────────────
// Creates a pending_payment subscription row.
// TODO (Phase 3): After this returns, redirect to Paymob with the subscriptionId.

export async function createSubscription(
  packageId: string,
  pediatricianId: string,
  psychologistId: string,
): Promise<string> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("create_subscription", {
    p_package_id: packageId,
    p_pediatrician_id: pediatricianId,
    p_psychologist_id: psychologistId,
  });

  if (error) throw error;
  return data as string;
}

// ─── Cancellation ─────────────────────────────────────────────────────────────

// Netflix-style: keeps the subscription active until end_date, disables auto-renewal.
export async function requestCancellation(subscriptionId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.rpc("request_cancellation", {
    p_subscription_id: subscriptionId,
  });
  if (error) throw error;
}

// Immediate cancel — used before an upgrade so the wizard is accessible again.
export async function cancelSubscriptionImmediately(subscriptionId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.rpc("cancel_subscription_immediately", {
    p_subscription_id: subscriptionId,
  });
  if (error) throw error;
}
