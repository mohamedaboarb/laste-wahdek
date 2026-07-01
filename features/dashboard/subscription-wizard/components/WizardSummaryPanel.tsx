"use client";

import Image from "next/image";
import {
  Package,
  Baby,
  Brain,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/locale-context";
import type { WizardState } from "../types";

interface WizardSummaryPanelProps {
  state: WizardState;
  onGoToSection: (section: WizardState["activeSection"]) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

// ─── Step row ─────────────────────────────────────────────────────────────────

interface StepRowProps {
  icon: React.ElementType;
  iconBg: string;
  label: string;
  doctorName: string | null;
  doctorImageUrl?: string | null;
  subtitle?: string;
  isCompleted: boolean;
  isActive: boolean;
  isAutoAssigned?: boolean;
  onClick?: () => void;
}

function StepRow({
  icon: Icon,
  iconBg,
  label,
  doctorName,
  doctorImageUrl,
  subtitle,
  isCompleted,
  isActive,
  isAutoAssigned,
  onClick,
}: StepRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl p-3 transition-colors",
        isActive && "bg-pink-50",
        !isActive &&
          isCompleted &&
          onClick &&
          "cursor-pointer hover:bg-slate-50",
      )}
      onClick={isCompleted && onClick ? onClick : undefined}
    >
      {/* Doctor photo or icon */}
      <div
        className={cn(
          "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl",
          isCompleted && doctorImageUrl ? "" : iconBg,
        )}
      >
        {isCompleted && doctorImageUrl ? (
          <Image
            src={doctorImageUrl}
            alt={doctorName ?? ""}
            fill
            className="object-cover"
            sizes="40px"
          />
        ) : isCompleted && doctorName && !doctorImageUrl ? (
          <span className="text-sm font-black text-slate-400">
            {doctorName[0]}
          </span>
        ) : (
          <Icon className="h-5 w-5" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        {doctorName ? (
          <>
            <p className="truncate text-sm font-bold text-slate-900">
              {doctorName}
            </p>
            {subtitle && (
              <p className="truncate text-xs text-slate-400">{subtitle}</p>
            )}
          </>
        ) : (
          <p className="text-xs text-slate-300">—</p>
        )}
      </div>

      {isCompleted && (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
      )}
      {isAutoAssigned && <Wand2 className="h-4 w-4 shrink-0 text-violet-400" />}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function WizardSummaryPanel({
  state,
  onGoToSection,
  onSubmit,
  isSubmitting = false,
}: WizardSummaryPanelProps) {
  const { t } = useLocale();
  const sw = t.subscriptionWizard;
  const {
    selectedPackage,
    selectedPediatrician,
    selectedPsychologist,
    activeSection,
    mode,
  } = state;

  const canSubmit =
    selectedPackage !== null &&
    selectedPediatrician !== null &&
    selectedPsychologist !== null;

  const guidanceText = !selectedPackage
    ? mode === "doctor-first"
      ? sw.careTeam.guidancePediatrician
      : sw.careTeam.guidancePackage
    : !selectedPediatrician
      ? sw.careTeam.guidancePediatrician
      : !selectedPsychologist
        ? sw.careTeam.guidancePsychologist
        : null;

  return (
    <div className="sticky top-6 w-72 shrink-0">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="border-b border-slate-100 bg-linear-to-br from-[#d11765] to-[#fb9b8f] px-5 py-4">
          <h3 className="font-bold text-white">{sw.careTeam.title}</h3>
          <p className="text-xs text-white/70">{sw.careTeam.inProgress}</p>
        </div>

        {/* ── Steps ───────────────────────────────────────────────── */}
        <div className="space-y-1 p-3">
          {mode === "package-first" && (
            <StepRow
              icon={Package}
              iconBg="bg-pink-50 text-pink-600"
              label={sw.sections.package.step}
              doctorName={selectedPackage?.name ?? null}
              subtitle={
                selectedPackage
                  ? `${selectedPackage.sessionsPerMonth} sessions · ${selectedPackage.priceEgp.toLocaleString("en-EG")} EGP`
                  : undefined
              }
              isCompleted={selectedPackage !== null}
              isActive={activeSection === "package"}
              onClick={() => onGoToSection("package")}
            />
          )}

          <StepRow
            icon={Baby}
            iconBg="bg-blue-50 text-blue-600"
            label={sw.doctors.yourPediatrician}
            doctorName={selectedPediatrician?.fullName ?? null}
            doctorImageUrl={selectedPediatrician?.profileImageUrl}
            subtitle={
              selectedPediatrician
                ? `${selectedPediatrician.scientificDegree} · ${selectedPediatrician.title}`
                : undefined
            }
            isCompleted={selectedPediatrician !== null}
            isActive={activeSection === "pediatrician"}
            onClick={() => onGoToSection("pediatrician")}
          />

          <StepRow
            icon={Brain}
            iconBg="bg-violet-50 text-violet-600"
            label={sw.doctors.yourPsychologist}
            doctorName={selectedPsychologist?.fullName ?? null}
            doctorImageUrl={selectedPsychologist?.profileImageUrl}
            subtitle={
              selectedPsychologist
                ? `${selectedPsychologist.scientificDegree} · ${selectedPsychologist.title}`
                : undefined
            }
            isCompleted={selectedPsychologist !== null}
            isActive={activeSection === "psychologist"}
            onClick={() => onGoToSection("psychologist")}
          />

          {mode === "doctor-first" && selectedPackage && (
            <StepRow
              icon={Package}
              iconBg="bg-violet-50 text-violet-600"
              label={sw.careTeam.autoAssignedLabel}
              doctorName={selectedPackage.name}
              subtitle={`${selectedPackage.sessionsPerMonth} sessions · ${selectedPackage.priceEgp.toLocaleString("en-EG")} EGP`}
              isCompleted
              isActive={false}
              isAutoAssigned
            />
          )}
        </div>

        {/* ── Price ───────────────────────────────────────────────── */}
        {selectedPackage && (
          <div className="border-t border-slate-100 px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                {sw.careTeam.monthlyTotal}
              </span>
              <span className="text-lg font-black text-slate-900">
                {selectedPackage.priceEgp.toLocaleString("en-EG")}{" "}
                <span className="text-xs font-semibold text-slate-400">
                  EGP
                </span>
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-400">
              {sw.careTeam.vatIncluded}
            </p>
          </div>
        )}

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <div className="px-4 pb-5 pt-1">
          <button
            onClick={canSubmit ? onSubmit : undefined}
            disabled={!canSubmit || isSubmitting}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-all duration-200",
              canSubmit && !isSubmitting
                ? "bg-[#d11765] shadow-md shadow-pink-200 hover:bg-pink-700"
                : "cursor-not-allowed bg-slate-200 text-slate-400",
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {sw.review.confirming}
              </>
            ) : canSubmit ? (
              <>
                {sw.careTeam.confirmTeam}
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              sw.careTeam.completeAllSteps
            )}
          </button>

          {guidanceText && (
            <p className="mt-2 text-center text-xs text-slate-400">
              {guidanceText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
