"use client";

import { FileText } from "lucide-react";
import { useLocale } from "@/contexts/locale-context";

interface Props {
  filtered?: boolean;
  onClearFilters?: () => void;
}

export function ReportsEmptyState({ filtered = false, onClearFilters }: Props) {
  const { t } = useLocale();
  const mr = t.medicalReports;

  const section = filtered ? mr.emptyFiltered : mr.empty;

  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-slate-100 bg-white px-6 py-20 text-center shadow-sm">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-50">
        <FileText className="h-10 w-10 text-[#d11765]" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
        <p className="mt-2 text-sm text-slate-500">{section.subtitle}</p>
      </div>
      {filtered && onClearFilters && (
        <button
          onClick={onClearFilters}
          className="mt-2 rounded-xl border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          {mr.emptyFiltered.clearFilters}
        </button>
      )}
    </div>
  );
}
