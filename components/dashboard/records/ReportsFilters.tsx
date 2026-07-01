"use client";

import { Search, X } from "lucide-react";
import { useLocale } from "@/contexts/locale-context";
import type { MedicalReportsFilters } from "@/features/dashboard/records/hooks/useMedicalReports";

const DEFAULT_FILTERS: MedicalReportsFilters = {
  childId: null,
  doctorId: null,
  reportType: null,
  search: "",
  sort: "newest",
};

interface Child {
  id: string;
  fullName: string;
}

interface Doctor {
  id: string;
  fullName: string;
}

interface Props {
  filters: MedicalReportsFilters;
  children: Child[];
  doctors: Doctor[];
  onChange: (filters: MedicalReportsFilters) => void;
}

export function ReportsFilters({ filters, children, doctors, onChange }: Props) {
  const { t } = useLocale();
  const mr = t.medicalReports;

  function set<K extends keyof MedicalReportsFilters>(
    key: K,
    value: MedicalReportsFilters[K],
  ) {
    onChange({ ...filters, [key]: value });
  }

  const hasActiveFilters =
    filters.childId !== null ||
    filters.doctorId !== null ||
    filters.reportType !== null ||
    filters.search.trim() !== "";

  const selectClass =
    "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d11765]/30 transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[180px]">
        <Search className="pointer-events-none absolute inset-y-0 start-3 my-auto h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => set("search", e.target.value)}
          placeholder={mr.searchPlaceholder}
          className="w-full rounded-xl border border-slate-200 bg-white py-2 ps-9 pe-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d11765]/30"
        />
      </div>

      {/* Child filter */}
      <select
        value={filters.childId ?? ""}
        onChange={(e) => set("childId", e.target.value || null)}
        className={selectClass}
      >
        <option value="">{mr.allChildren}</option>
        {children.map((c) => (
          <option key={c.id} value={c.id}>
            {c.fullName}
          </option>
        ))}
      </select>

      {/* Doctor filter */}
      <select
        value={filters.doctorId ?? ""}
        onChange={(e) => set("doctorId", e.target.value || null)}
        className={selectClass}
      >
        <option value="">{mr.allDoctors}</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>
            {d.fullName}
          </option>
        ))}
      </select>

      {/* Report type filter */}
      <select
        value={filters.reportType ?? ""}
        onChange={(e) =>
          set(
            "reportType",
            (e.target.value as "pediatric" | "psychological") || null,
          )
        }
        className={selectClass}
      >
        <option value="">{mr.allTypes}</option>
        <option value="pediatric">{mr.types.pediatric}</option>
        <option value="psychological">{mr.types.psychological}</option>
      </select>

      {/* Sort */}
      <select
        value={filters.sort}
        onChange={(e) => set("sort", e.target.value as "newest" | "oldest")}
        className={selectClass}
      >
        <option value="newest">{mr.sortNewest}</option>
        <option value="oldest">{mr.sortOldest}</option>
      </select>

      {/* Clear button — only shown when at least one filter is active */}
      {hasActiveFilters && (
        <button
          onClick={() => onChange(DEFAULT_FILTERS)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
        >
          <X className="h-3.5 w-3.5" />
          {mr.emptyFiltered.clearFilters}
        </button>
      )}
    </div>
  );
}
