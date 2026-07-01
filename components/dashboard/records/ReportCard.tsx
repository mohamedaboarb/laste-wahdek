"use client";

import { FileText, User, Baby, Calendar, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/contexts/locale-context";
import type { MedicalReport } from "@/features/dashboard/records/hooks/useMedicalReports";

interface Props {
  report: MedicalReport;
  index: number;
}

const TYPE_STYLES = {
  pediatric: "bg-blue-50 text-blue-700 border-blue-100",
  psychological: "bg-violet-50 text-violet-700 border-violet-100",
};

const TYPE_BG = {
  pediatric: "from-blue-50 to-cyan-50",
  psychological: "from-violet-50 to-fuchsia-50",
};

export function ReportCard({ report, index }: Props) {
  const { t, locale } = useLocale();
  const mr = t.medicalReports;
  const dateLocale = locale === "ar" ? "ar-EG" : "en-EG";

  const formattedDate = new Date(report.submittedAt).toLocaleDateString(
    dateLocale,
    { year: "numeric", month: "long", day: "numeric" },
  );

  const typeLabel =
    report.reportType === "pediatric"
      ? mr.types.pediatric
      : mr.types.psychological;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
    >
      {/* Top strip */}
      <div
        className={`flex items-center gap-3 bg-linear-to-r ${TYPE_BG[report.reportType]} px-4 py-3`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
          <FileText className="h-5 w-5 text-[#d11765]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">
            {report.title}
          </p>
          <span
            className={`mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${TYPE_STYLES[report.reportType]}`}
          >
            {typeLabel}
          </span>
        </div>
        <span className="shrink-0 rounded-full bg-[#d11765]/10 px-2.5 py-1 text-xs font-bold text-[#d11765]">
          {mr.session} {report.sessionNumber}
        </span>
      </div>

      {/* Body */}
      <div className="space-y-2 px-4 py-3">
        {/* Doctor */}
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <User className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="font-medium">{report.doctor.fullName}</span>
        </div>

        {/* Child */}
        {report.child && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Baby className="h-4 w-4 shrink-0 text-slate-400" />
            <span>{report.child.fullName}</span>
          </div>
        )}

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-50 px-4 py-3">
        <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#d11765]/20 bg-[#d11765]/5 px-4 py-2 text-sm font-medium text-[#d11765] transition-colors hover:bg-[#d11765]/10">
          <ExternalLink className="h-4 w-4" />
          {mr.table.view}
        </button>
      </div>
    </motion.div>
  );
}
