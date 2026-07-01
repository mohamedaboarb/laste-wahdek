"use client";

import { FileText, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/contexts/locale-context";
import type { MedicalReport } from "@/features/dashboard/records/hooks/useMedicalReports";

interface Props {
  reports: MedicalReport[];
}

const TYPE_STYLES = {
  pediatric: "bg-blue-50 text-blue-700 border-blue-100",
  psychological: "bg-violet-50 text-violet-700 border-violet-100",
};

const AVATAR_BG = [
  "from-pink-400 to-rose-500",
  "from-violet-400 to-purple-500",
  "from-blue-400 to-cyan-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
];

export function ReportsTable({ reports }: Props) {
  const { t, locale } = useLocale();
  const mr = t.medicalReports;
  const dateLocale = locale === "ar" ? "ar-EG" : "en-EG";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      {/* Header row */}
      <div className="grid grid-cols-[2fr_100px_1.5fr_1.2fr_1.5fr_80px] gap-4 border-b border-slate-100 bg-slate-50 px-6 py-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {mr.table.report}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {mr.table.session}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {mr.table.doctor}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {mr.table.child}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {mr.table.dateIssued}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500" />
      </div>

      {/* Data rows */}
      {reports.map((report, i) => {
        const typeLabel =
          report.reportType === "pediatric"
            ? mr.types.pediatric
            : mr.types.psychological;

        const formattedDate = new Date(report.submittedAt).toLocaleDateString(
          dateLocale,
          { year: "numeric", month: "short", day: "numeric" },
        );

        const avatarBg = AVATAR_BG[i % AVATAR_BG.length];
        const initials = report.doctor.fullName
          .split(" ")
          .slice(0, 2)
          .map((w) => w[0])
          .join("")
          .toUpperCase();

        return (
          <motion.div
            key={report.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            className="grid grid-cols-[2fr_100px_1.5fr_1.2fr_1.5fr_80px] items-center gap-4 border-b border-slate-50 px-6 py-4 last:border-0 hover:bg-slate-50/60 transition-colors"
          >
            {/* Report title + type */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-50">
                <FileText className="h-5 w-5 text-[#d11765]" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {report.title}
                </p>
                <span
                  className={`mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${TYPE_STYLES[report.reportType]}`}
                >
                  {typeLabel}
                </span>
              </div>
            </div>

            {/* Session badge */}
            <div>
              <span className="inline-flex items-center rounded-full bg-[#d11765]/10 px-3 py-1 text-xs font-bold text-[#d11765]">
                #{report.sessionNumber}
              </span>
            </div>

            {/* Doctor */}
            <div className="flex min-w-0 items-center gap-2">
              {report.doctor.profileImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={report.doctor.profileImageUrl}
                  alt={report.doctor.fullName}
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${avatarBg} text-xs font-bold text-white`}
                >
                  {initials}
                </div>
              )}
              <span className="truncate text-sm text-slate-700">
                {report.doctor.fullName}
              </span>
            </div>

            {/* Child */}
            <div>
              <span className="truncate text-sm text-slate-600">
                {report.child?.fullName ?? "—"}
              </span>
            </div>

            {/* Date */}
            <div>
              <span className="text-sm text-slate-500">{formattedDate}</span>
            </div>

            {/* View button */}
            <div>
              <button className="inline-flex items-center gap-1.5 rounded-xl border border-[#d11765]/20 bg-[#d11765]/5 px-3 py-1.5 text-xs font-medium text-[#d11765] transition-colors hover:bg-[#d11765]/10">
                <ExternalLink className="h-3.5 w-3.5" />
                {mr.table.view}
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
