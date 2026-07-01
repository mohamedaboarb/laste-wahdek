// ─── Subscription Wizard Service ──────────────────────────────────────────────
// Phase 1: backed by mock data so the UI is fully functional end-to-end.
// Phase 2: swap every function body for a real Supabase query — the signatures
// and return types stay identical, so callers (hooks + components) need no edits.

import { mockDoctors } from "@/lib/mock-data";
import type { WizardDoctor } from "./types";

// ─── Doctors ──────────────────────────────────────────────────────────────────

function mockDoctorToWizard(d: (typeof mockDoctors)[number]): WizardDoctor {
  const idNum = parseInt(d.id.replace("doc-", ""), 10);
  const degree: WizardDoctor["scientificDegree"] =
    d.experience >= 10
      ? "Consultant"
      : d.experience >= 5
        ? "Specialist"
        : "General";
  // Deterministically vary availability so the UI shows both states
  const availableToday = idNum % 2 === 1;
  const currentFamilies = d.currentFamilies;
  const maxPatients = d.capacity;

  return {
    id: d.id,
    fullName: d.fullName,
    specialization: d.specialization,
    scientificDegree: degree,
    title:
      d.specialization === "pediatrician"
        ? "Pediatrician"
        : "Child Psychologist",
    bio: d.bio,
    rating: d.rating,
    reviewCount: d.review,
    currentFamilies,
    maxPatients,
    isAcceptingPatients: currentFamilies < maxPatients,
    availableToday,
    profileImageUrl: d.avatar,
    // Mock: all doctors eligible for all packages
    // Phase 2: derive from doctor_details.package_eligibility (uuid[])
    packageEligibility: ["essential", "integrated", "comprehensive"],
    experienceYears: d.experience,
  };
}

export async function fetchAvailableDoctors(
  specialization: "pediatrician" | "psychologist",
  packageId: string,
  searchQuery: string,
  filterAvailableToday: boolean,
  filterMinRating: number | null,
): Promise<WizardDoctor[]> {
  // TODO Phase 2:
  // const supabase = createClient();
  // const { data, error } = await supabase
  //   .from("doctor_details")
  //   .select("id, full_name, specialization, scientific_degree, title, bio, rating, ...")
  //   .eq("specialization", specialization)
  //   .eq("status", "approved")
  //   .eq("is_accepting_patients", true)
  //   .contains("package_eligibility", [packageId]);
  // if (error) throw new Error(error.message);
  // return data.map(dbRowToWizardDoctor);

  await new Promise((r) => setTimeout(r, 500));

  let doctors = mockDoctors
    .filter((d) => d.specialization === specialization)
    .map(mockDoctorToWizard);

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
