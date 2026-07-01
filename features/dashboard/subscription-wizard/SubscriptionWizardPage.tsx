"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  Baby,
  Brain,
  ClipboardCheck,
  LayoutGrid,
  UserSearch,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/locale-context";
import { useSubscriptionWizard } from "./hooks/useSubscriptionWizard";
import { TrustStrip } from "./components/TrustStrip";
import { PackageSection } from "./components/PackageSection";
import { DoctorSection } from "./components/DoctorSection";
import { ReviewSection } from "./components/ReviewSection";
import { WizardSummaryPanel } from "./components/WizardSummaryPanel";
import type { WizardSection, WizardMode } from "./types";

// ─── Mobile step config ────────────────────────────────────────────────────────

type MobileStep = {
  key: WizardSection;
  icon: React.ElementType;
  labelKey: "package" | "pediatrician" | "psychologist" | "review";
};

const PACKAGE_FIRST_STEPS: MobileStep[] = [
  { key: "package", icon: Package, labelKey: "package" },
  { key: "pediatrician", icon: Baby, labelKey: "pediatrician" },
  { key: "psychologist", icon: Brain, labelKey: "psychologist" },
  { key: "review", icon: ClipboardCheck, labelKey: "review" },
];

const DOCTOR_FIRST_STEPS: MobileStep[] = [
  { key: "pediatrician", icon: Baby, labelKey: "pediatrician" },
  { key: "psychologist", icon: Brain, labelKey: "psychologist" },
  { key: "review", icon: ClipboardCheck, labelKey: "review" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function SubscriptionWizardPage() {
  const router = useRouter();
  const { t } = useLocale();
  const sw = t.subscriptionWizard;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    state,
    completedSections,
    canProceedToPayment,
    setMode,
    selectPackage,
    selectPediatrician,
    selectPsychologist,
    goToSection,
    reset,
  } = useSubscriptionWizard();

  const isDocFirst = state.mode === "doctor-first";
  const mobileSteps = isDocFirst ? DOCTOR_FIRST_STEPS : PACKAGE_FIRST_STEPS;

  // ── Auto-scroll ────────────────────────────────────────────────────────────
  const sectionRefs = useRef<Record<WizardSection, HTMLDivElement | null>>({
    package: null,
    pediatrician: null,
    psychologist: null,
    review: null,
  });

  useEffect(() => {
    const el = sectionRefs.current[state.activeSection];
    if (!el) return;
    const timer = setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 420);
    return () => clearTimeout(timer);
  }, [state.activeSection]);

  // ── Mode toggle ────────────────────────────────────────────────────────────
  const handleModeChange = useCallback(
    (mode: WizardMode) => {
      setSubmitError(null);
      setMode(mode);
    },
    [setMode],
  );

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    if (!canProceedToPayment) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // TODO (Phase 2): Supabase RPC + Paymob redirect
      await new Promise((resolve) => setTimeout(resolve, 2000));
      reset();
      router.push("/dashboard/mother/supscription");
    } catch {
      setSubmitError(sw.errors.somethingWrong);
      setIsSubmitting(false);
    }
  }, [canProceedToPayment, reset, router, sw]);

  // ── Pending logic ──────────────────────────────────────────────────────────
  const isPending = (section: WizardSection): boolean => {
    if (isDocFirst) {
      if (section === "psychologist")
        return (
          !completedSections.pediatrician &&
          state.activeSection !== "psychologist"
        );
      if (section === "review")
        return !canProceedToPayment && state.activeSection !== "review";
      return false;
    }
    if (section === "pediatrician")
      return (
        !completedSections.package && state.activeSection !== "pediatrician"
      );
    if (section === "psychologist")
      return (
        !completedSections.pediatrician &&
        state.activeSection !== "psychologist"
      );
    if (section === "review")
      return !canProceedToPayment && state.activeSection !== "review";
    return false;
  };

  const reviewStep = isDocFirst ? 3 : 4;
  const psychStep = isDocFirst ? 2 : 3;
  const pediStep = isDocFirst ? 1 : 2;

  return (
    <div className="min-h-screen bg-[#fffbf0] px-2">
      {/* ── Page header ───────────────────────────────────────────── */}

      <header>
        <div className="mx-auto max-w-7xl p-2">
          {/* Back button*/}
          <button
            onClick={() => router.back()}
            className="group inline-flex items-center gap-2 text-md font-medium text-slate-500 transition-all duration-200 hover:text-slate-900 d-block pr-5 py-5"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>{t.common.back}</span>
          </button>

          {/* Hero */}
          <div className="mt-2">
            <h1 className="text-2xl font-black tracking-tight text-primary md:text-5xl">
              {sw.page.title}
            </h1>

            <p className="text-xs leading-12 md:text-lg text-slate-600">
              {sw.page.subtitle}
            </p>
          </div>
        </div>
      </header>

      {/* Trust Strip */}
      {/* ── Body ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl py-4 md:px-4">
        {/* Trust strip */}
        <TrustStrip />

        {/* ── Mode toggle ───────────────────────────────────────── */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
          <div className="flex">
            {(
              [
                {
                  mode: "package-first" as WizardMode,
                  icon: LayoutGrid,
                  label: sw.modeToggle.packageFirst,
                },
                {
                  mode: "doctor-first" as WizardMode,
                  icon: UserSearch,
                  label: sw.modeToggle.doctorFirst,
                },
              ] as const
            ).map(({ mode, icon: Icon, label }) => (
              <motion.button
                key={mode}
                onClick={() => handleModeChange(mode)}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors duration-200",
                  state.mode === mode
                    ? "bg-[#d11765] text-white shadow-md"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── Main layout: sections + sidebar ───────────────────── */}
        <div className="mt-6 flex items-start gap-6">
          {/* Left: wizard sections */}
          <div className="min-w-0 flex-1 pb-28 md:pb-8">
            {/* Section 1 — Package (package-first only) */}
            {!isDocFirst && (
              <div
                ref={(el) => {
                  sectionRefs.current.package = el;
                }}
                className="scroll-mt-20"
              >
                <PackageSection
                  selectedPackage={state.selectedPackage}
                  isActive={state.activeSection === "package"}
                  isCompleted={completedSections.package}
                  onSelect={selectPackage}
                  onEdit={() => goToSection("package")}
                  isLast={false}
                />
              </div>
            )}

            {/* Section — Pediatrician */}
            <div
              ref={(el) => {
                sectionRefs.current.pediatrician = el;
              }}
              className="scroll-mt-20"
            >
              <DoctorSection
                specialization="pediatrician"
                step={pediStep}
                selectedDoctor={state.selectedPediatrician}
                packageId={state.selectedPackage?.id ?? null}
                isActive={state.activeSection === "pediatrician"}
                isCompleted={completedSections.pediatrician}
                isPending={isPending("pediatrician")}
                onSelect={selectPediatrician}
                onEdit={() => goToSection("pediatrician")}
                isLast={false}
              />
            </div>

            {/* Section — Psychologist */}
            <div
              ref={(el) => {
                sectionRefs.current.psychologist = el;
              }}
              className="scroll-mt-20"
            >
              <DoctorSection
                specialization="psychologist"
                step={psychStep}
                selectedDoctor={state.selectedPsychologist}
                packageId={state.selectedPackage?.id ?? null}
                isActive={state.activeSection === "psychologist"}
                isCompleted={completedSections.psychologist}
                isPending={isPending("psychologist")}
                partnerDoctorName={
                  state.selectedPediatrician?.fullName ?? undefined
                }
                onSelect={selectPsychologist}
                onEdit={() => goToSection("psychologist")}
                isLast={false}
              />
            </div>

            {/* Section — Review */}
            <div
              ref={(el) => {
                sectionRefs.current.review = el;
              }}
              className="scroll-mt-20"
            >
              <ReviewSection
                state={state}
                step={reviewStep}
                isActive={state.activeSection === "review"}
                isCompleted={false}
                isPending={isPending("review")}
                onEdit={() => goToSection("review")}
                onGoToSection={goToSection}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitError={submitError}
                isLast={true}
              />
            </div>
          </div>

          {/* Right: sticky summary panel (xl+) */}
          <div className="hidden xl:block">
            <WizardSummaryPanel
              state={state}
              onGoToSection={goToSection}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>

      {/* ── Mobile sticky bottom progress bar ─────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-2 backdrop-blur-sm xl:hidden">
        {/* Progress bar */}
        <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#d11765] transition-all duration-500"
            style={{
              width: `${
                (((isDocFirst ? 0 : completedSections.package ? 1 : 0) +
                  (completedSections.pediatrician ? 1 : 0) +
                  (completedSections.psychologist ? 1 : 0)) /
                  (isDocFirst ? 2 : 3)) *
                100
              }%`,
            }}
          />
        </div>

        <div className="flex items-center justify-around">
          {mobileSteps.map(({ key, icon: Icon, labelKey }) => {
            const isStepCompleted =
              key === "package"
                ? completedSections.package
                : key === "pediatrician"
                  ? completedSections.pediatrician
                  : key === "psychologist"
                    ? completedSections.psychologist
                    : canProceedToPayment;
            const isStepActive = state.activeSection === key;
            const stepLabel = sw.sections[labelKey].step;

            return (
              <button
                key={key}
                onClick={() => {
                  if (
                    isStepCompleted ||
                    isStepActive ||
                    (key === "package" && !isDocFirst) ||
                    (key === "pediatrician" && isDocFirst)
                  ) {
                    goToSection(key);
                  }
                }}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition-colors",
                  isStepActive
                    ? "text-[#d11765]"
                    : isStepCompleted
                      ? "text-emerald-600"
                      : "text-slate-300",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-bold leading-none">
                  {stepLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
