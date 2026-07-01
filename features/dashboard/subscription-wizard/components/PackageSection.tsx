"use client";

import { Loader2, AlertCircle, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/contexts/locale-context";
import { SectionShell } from "./SectionShell";
import { PackageCard } from "./PackageCard";
import { usePackages } from "../hooks/usePackages";
import type { Package } from "../types";

interface PackageSectionProps {
  selectedPackage: Package | null;
  isActive: boolean;
  isCompleted: boolean;
  onSelect: (pkg: Package) => void;
  onEdit: () => void;
  isLast?: boolean;
}

export function PackageSection({
  selectedPackage,
  isActive,
  isCompleted,
  onSelect,
  onEdit,
  isLast = false,
}: PackageSectionProps) {
  const { t } = useLocale();
  const sw = t.subscriptionWizard;
  const { data: packages, isLoading, isError, refetch } = usePackages();

  const collapsedSummary = selectedPackage ? (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pink-50">
        <Stethoscope className="h-4 w-4 text-[#d11765]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-slate-800">
          {selectedPackage.name}
        </p>
        <p className="text-xs text-slate-500">
          {selectedPackage.sessionsPerMonth} {sw.packages.sessionsPerMonth} ·{" "}
          {selectedPackage.priceEgp.toLocaleString("en-EG")}{" "}
          {sw.packages.egpPerMonth}
        </p>
      </div>
    </div>
  ) : null;

  return (
    <SectionShell
      step={1}
      title={sw.sections.package.title}
      subtitle={sw.sections.package.subtitle}
      isActive={isActive}
      isCompleted={isCompleted}
      isPending={false}
      collapsedSummary={collapsedSummary}
      onEdit={onEdit}
      isLast={isLast}
    >
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-[#d11765]" />
        </div>
      )}

      {isError && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p>
            {sw.errors.loadFailed}{" "}
            <button onClick={() => refetch()} className="font-bold underline">
              {sw.errors.retry}
            </button>
          </p>
        </div>
      )}

      {packages && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5 pt-1">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              isSelected={selectedPackage?.id === pkg.id}
              onSelect={() => onSelect(pkg)}
            />
          ))}
        </div>
      )}
    </SectionShell>
  );
}
