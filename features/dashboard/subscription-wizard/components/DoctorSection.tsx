"use client";

import { useState } from "react";
import {
  Baby,
  Brain,
  Search,
  Clock,
  Users,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/contexts/locale-context";
import { SectionShell } from "./SectionShell";
import { DoctorSubscriptionCard } from "./DoctorSubscriptionCard";
import { useAvailableDoctors } from "../hooks/useAvailableDoctors";
import type { WizardDoctor, Specialization, DoctorFilterState } from "../types";

// ─── Section configuration ─────────────────────────────────────────────────────

const SECTION_META = {
  pediatrician: {
    icon: Baby,
    step: 2,
  },
  psychologist: {
    icon: Brain,
    step: 3,
  },
} as const;

// ─── Props ────────────────────────────────────────────────────────────────────

interface DoctorSectionProps {
  specialization: Specialization;
  step?: number;
  selectedDoctor: WizardDoctor | null;
  packageId: string | null;
  isActive: boolean;
  isCompleted: boolean;
  isPending: boolean;
  partnerDoctorName?: string;
  onSelect: (doctor: WizardDoctor) => void;
  onEdit: () => void;
  isLast?: boolean;
}

export function DoctorSection({
  specialization,
  step,
  selectedDoctor,
  packageId,
  isActive,
  isCompleted,
  isPending,
  partnerDoctorName,
  onSelect,
  onEdit,
  isLast = false,
}: DoctorSectionProps) {
  const { t } = useLocale();
  const sw = t.subscriptionWizard;
  const meta = SECTION_META[specialization];
  const sectionT =
    specialization === "pediatrician"
      ? sw.sections.pediatrician
      : sw.sections.psychologist;

  const relationshipLabel =
    specialization === "pediatrician"
      ? sw.doctors.yourPediatrician
      : sw.doctors.yourPsychologist;

  const chooseLabel =
    specialization === "pediatrician"
      ? sw.doctors.choosePediatrician
      : sw.doctors.choosePsychologist;

  const [filters, setFilters] = useState<DoctorFilterState>({
    searchQuery: "",
    availableToday: false,
    minRating: null,
  });

  const {
    data: doctors,
    isLoading,
    isError,
    refetch,
  } = useAvailableDoctors({
    specialization,
    packageId,
    filters,
    enabled: isActive,
  });

  // ── Collapsed summary ──────────────────────────────────────────────────────
  const collapsedSummary = selectedDoctor ? (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-slate-100">
        {selectedDoctor.profileImageUrl ? (
          <Image
            src={selectedDoctor.profileImageUrl}
            alt={selectedDoctor.fullName}
            fill
            className="object-stretch"
            sizes="40px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-black text-slate-400">
            {selectedDoctor.fullName[0]}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-wider text-[#d11765]">
          {relationshipLabel}
        </p>
        <p className="truncate text-sm font-bold text-slate-800">
          {selectedDoctor.fullName}
        </p>
        <p className="text-xs text-slate-500">
          {selectedDoctor.scientificDegree} · {selectedDoctor.title}
        </p>
      </div>
    </div>
  ) : null;

  // ── Psychologist subtitle with partner name ────────────────────────────────
  const sectionSubtitle =
    specialization === "psychologist" && partnerDoctorName
      ? sectionT.partnerContext.replace("{name}", partnerDoctorName)
      : sectionT.subtitle;

  const resolvedStep = step ?? meta.step;

  return (
    <SectionShell
      step={resolvedStep}
      title={sectionT.title}
      subtitle={sectionSubtitle}
      isActive={isActive}
      isCompleted={isCompleted}
      isPending={isPending}
      collapsedSummary={collapsedSummary}
      onEdit={onEdit}
      isLast={isLast}
    >
      {/* ── Psychologist: partner context pill ──────────────────────── */}
      {specialization === "psychologist" && partnerDoctorName && (
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
          <Baby className="h-4 w-4 shrink-0 text-blue-600" />
          <p className="text-sm text-blue-800">
            <span className="font-semibold">
              {
                t.subscriptionWizard.sections.psychologist.partnerContext.split(
                  "{name}",
                )[0]
              }
            </span>
            <span className="font-bold">{partnerDoctorName}</span>
            <span>
              {
                t.subscriptionWizard.sections.psychologist.partnerContext.split(
                  "{name}",
                )[1]
              }
            </span>
          </p>
        </div>
      )}

      {/* ── Filters ─────────────────────────────────────────────────── */}
      <div className="mb-5 flex flex-wrap gap-3">
        <div className="relative min-w-40 flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={sw.doctors.searchPlaceholder}
            value={filters.searchQuery}
            onChange={(e) =>
              setFilters((f) => ({ ...f, searchQuery: e.target.value }))
            }
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-[#d11765]/50 focus:ring-2 focus:ring-pink-50"
          />
        </div>

        <button
          onClick={() =>
            setFilters((f) => ({ ...f, availableToday: !f.availableToday }))
          }
          className={cn(
            "flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors",
            filters.availableToday
              ? "border-emerald-300 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300",
          )}
        >
          <Clock
            className={cn(
              "h-3.5 w-3.5",
              filters.availableToday ? "text-emerald-600" : "text-slate-400",
            )}
          />
          {sw.doctors.filterAvailableToday}
        </button>
      </div>

      {/* ── Loading ──────────────────────────────────────────────────── */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-[#d11765]" />
        </div>
      )}

      {/* ── Error ────────────────────────────────────────────────────── */}
      {isError && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p>
            {sw.doctors.loadError}{" "}
            <button onClick={() => refetch()} className="font-bold underline">
              {sw.errors.retry}
            </button>
          </p>
        </div>
      )}

      {/* ── Empty state ───────────────────────────────────────────────── */}
      {doctors && doctors.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="rounded-full bg-slate-100 p-4">
            <Users className="h-6 w-6 text-slate-400" />
          </div>
          <p className="font-semibold text-slate-600">{sw.doctors.noResults}</p>
          <p className="text-sm text-slate-400">
            {filters.searchQuery || filters.availableToday
              ? sw.doctors.noResultsFiltered
              : sw.doctors.noResults}
          </p>
          {(filters.searchQuery || filters.availableToday) && (
            <button
              onClick={() =>
                setFilters({
                  searchQuery: "",
                  availableToday: false,
                  minRating: null,
                })
              }
              className="text-sm font-bold text-[#d11765] hover:underline"
            >
              {sw.doctors.clearFilters}
            </button>
          )}
        </div>
      )}

      {/* ── Doctor grid ───────────────────────────────────────────────── */}
      {doctors && doctors.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {doctors.map((doctor) => (
            <DoctorSubscriptionCard
              key={doctor.id}
              doctor={doctor}
              isSelected={selectedDoctor?.id === doctor.id}
              relationshipLabel={relationshipLabel}
              chooseLabel={chooseLabel}
              onSelect={() => onSelect(doctor)}
            />
          ))}
        </div>
      )}
    </SectionShell>
  );
}
