"use client";

import { motion } from "framer-motion";
import {
  Star,
  Users,
  CheckCircle2,
  Clock,
  BadgeCheck,
  UserX,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/locale-context";
import type { WizardDoctor } from "../types";

interface DoctorSubscriptionCardProps {
  doctor: WizardDoctor;
  isSelected: boolean;
  /** e.g. "Your pediatrician" or "Your family's psychologist" */
  relationshipLabel: string;
  /** text for the choose button */
  chooseLabel: string;
  onSelect: () => void;
}

const DEGREE_COLORS = {
  Consultant: "bg-violet-100 text-violet-700",
  Specialist: "bg-blue-100 text-blue-700",
  General: "bg-slate-100 text-slate-600",
} as const;

export function DoctorSubscriptionCard({
  doctor,
  isSelected,
  relationshipLabel,
  chooseLabel,
  onSelect,
}: DoctorSubscriptionCardProps) {
  const { t } = useLocale();
  const sw = t.subscriptionWizard.doctors;

  const isAtCapacity = !doctor.isAcceptingPatients;
  const spotsLeft = doctor.maxPatients - doctor.currentFamilies;
  const capacityPercent = (doctor.currentFamilies / doctor.maxPatients) * 100;
  const degreeColor =
    DEGREE_COLORS[doctor.scientificDegree] ?? DEGREE_COLORS.General;

  return (
    <motion.div
      whileHover={!isAtCapacity ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative overflow-hidden rounded-3xl border-2 bg-white shadow-sm transition-shadow duration-200",
        isSelected
          ? "border-[#d11765] shadow-lg shadow-pink-100 ring-4 ring-pink-50"
          : isAtCapacity
            ? "cursor-not-allowed border-slate-100 opacity-55"
            : "cursor-pointer border-slate-100 hover:border-[#d11765]/30 hover:shadow-md",
      )}
      onClick={!isAtCapacity ? onSelect : undefined}
      role="button"
      aria-pressed={isSelected}
      aria-disabled={isAtCapacity}
      tabIndex={isAtCapacity ? -1 : 0}
      onKeyDown={(e) => {
        if (!isAtCapacity && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {/* ── Doctor photo top section ────────────────────────────── */}
      <div className="relative h-44 w-full overflow-hidden bg-linear-to-br from-slate-100 to-slate-200">
        {doctor.profileImageUrl ? (
          <Image
            src={doctor.profileImageUrl}
            alt={doctor.fullName}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-6xl font-black text-slate-300">
              {doctor.fullName[0]}
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

        {/* At-capacity overlay */}
        {isAtCapacity && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2">
              <UserX className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-bold text-slate-700">
                {sw.atCapacity}
              </span>
            </div>
          </div>
        )}

        {/* Selected badge */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="absolute right-3 top-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d11765] shadow-lg">
              <CheckCircle2 className="h-5 w-5 text-white" />
            </div>
          </motion.div>
        )}

        {/* Verified badge on photo */}
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 shadow-sm backdrop-blur-sm">
          <BadgeCheck className="h-3.5 w-3.5 text-[#d11765]" />
          <span className="text-xs font-bold text-slate-700">
            {sw.verified}
          </span>
        </div>

        {/* Degree badge bottom-left */}
        <div className="absolute bottom-3 left-3">
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-bold shadow-sm",
              degreeColor,
            )}
          >
            {doctor.scientificDegree}
          </span>
        </div>

        {/* Available today indicator */}
        {doctor.availableToday && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 shadow-sm">
            <Clock className="h-3 w-3 text-white" />
            <span className="text-[10px] font-bold text-white">
              {sw.availableToday}
            </span>
          </div>
        )}
      </div>

      {/* ── Info section ─────────────────────────────────────────── */}
      <div className="p-4">
        {/* Name + rating row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-bold text-slate-900">
              {doctor.fullName}
            </h3>
            <p className="mt-0.5 text-xs font-semibold text-[#d11765]">
              {doctor.title}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-0.5 rounded-xl bg-amber-50 px-2 py-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-amber-700">
              {doctor.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Experience + reviews */}
        <p className="mt-1.5 text-xs text-slate-400">
          {doctor.experienceYears}+ {sw.experienceYears} · {doctor.reviewCount}{" "}
          {sw.reviews}
        </p>

        {/* Capacity bar */}
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-slate-500">
              <Users className="h-3.5 w-3.5" />
              <span>
                {doctor.currentFamilies}/{doctor.maxPatients} {sw.families}
              </span>
            </div>
            {!isAtCapacity && spotsLeft <= 3 && (
              <span className="font-bold text-amber-600">
                {spotsLeft === 1
                  ? `1 ${sw.onlySpotLeft}`
                  : `${spotsLeft} ${sw.onlySpotsLeft}`}
              </span>
            )}
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                capacityPercent >= 90
                  ? "bg-red-400"
                  : capacityPercent >= 70
                    ? "bg-amber-400"
                    : "bg-emerald-400",
              )}
              style={{ width: `${Math.min(capacityPercent, 100)}%` }}
            />
          </div>
        </div>

        {/* Bio */}
        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-500">
          {doctor.bio}
        </p>

        {/* Select button */}
        {!isAtCapacity && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={cn(
              "mt-4 w-full rounded-2xl py-2.5 text-sm font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d11765]",
              isSelected
                ? "bg-[#d11765] text-white shadow-md shadow-pink-100"
                : "bg-slate-50 text-slate-700 hover:bg-pink-50 hover:text-[#d11765]",
            )}
          >
            {isSelected ? `✓ ${relationshipLabel}` : chooseLabel}
          </button>
        )}
      </div>
    </motion.div>
  );
}
