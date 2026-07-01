"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { useLocale } from "@/contexts/locale-context";

interface Props {
  onRetry: () => void;
}

export function ReportsErrorState({ onRetry }: Props) {
  const { t } = useLocale();
  const mr = t.medicalReports;

  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-red-100 bg-red-50 px-6 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-100">
        <AlertCircle className="h-10 w-10 text-red-500" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900">{mr.error.title}</h3>
        <p className="mt-2 text-sm text-slate-500">{mr.error.subtitle}</p>
      </div>
      <button
        onClick={onRetry}
        className="mt-2 inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
      >
        <RefreshCw className="h-4 w-4" />
        {mr.error.retry}
      </button>
    </div>
  );
}
