// ─── Domain Types ─────────────────────────────────────────────────────────────

export type Specialization = "pediatrician" | "psychologist";

export type PackageIcon = "essential" | "integrated" | "comprehensive";

export type WizardMode = "package-first" | "doctor-first";

export interface Package {
  id: string;        // UUID from DB
  slug: PackageIcon; // "essential" | "integrated" | "comprehensive"
  name: string;
  description: string;
  sessionsPerMonth: number;
  priceEgp: number;
  featured?: boolean;
  icon: PackageIcon;
  features: string[];
}

export interface WizardDoctor {
  id: string;
  fullName: string;
  specialization: Specialization;
  scientificDegree: "General" | "Specialist" | "Consultant";
  title: string;
  bio: string;
  rating: number;
  reviewCount: number;
  currentFamilies: number;
  maxPatients: number;
  isAcceptingPatients: boolean;
  availableToday: boolean;
  profileImageUrl: string | null;
  packageEligibility: string[];
  experienceYears: number;
}

// ─── Wizard State ─────────────────────────────────────────────────────────────

export type WizardSection = "package" | "pediatrician" | "psychologist" | "review";

export interface WizardState {
  mode: WizardMode;
  selectedPackage: Package | null;
  selectedPediatrician: WizardDoctor | null;
  selectedPsychologist: WizardDoctor | null;
  activeSection: WizardSection;
}

// ─── Filter State (local to DoctorSection) ────────────────────────────────────

export interface DoctorFilterState {
  searchQuery: string;
  availableToday: boolean;
  minRating: number | null;
}

// ─── Package auto-assignment matrix ──────────────────────────────────────────
// Consultant + Consultant or Consultant + Specialist → Comprehensive
// Anything else with a non-General → Integrated
// Both General → Essential
export function resolveAutoPackageId(
  pedDegree: WizardDoctor["scientificDegree"],
  psychDegree: WizardDoctor["scientificDegree"],
): "essential" | "integrated" | "comprehensive" {
  if (pedDegree === "General" && psychDegree === "General") return "essential";
  if (
    (pedDegree === "Consultant" && psychDegree === "Consultant") ||
    (pedDegree === "Consultant" && psychDegree === "Specialist") ||
    (pedDegree === "Specialist" && psychDegree === "Consultant")
  ) {
    return "comprehensive";
  }
  return "integrated";
}
