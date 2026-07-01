"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "@/contexts/locale-context";
import { createClient } from "@/lib/supabase/client";
import {
  useMedicalReports,
  PAGE_SIZE,
  type MedicalReportsFilters,
} from "@/features/dashboard/records/hooks/useMedicalReports";
import { ReportsTable } from "@/components/dashboard/records/ReportsTable";
import { ReportCard } from "@/components/dashboard/records/ReportCard";
import { ReportsTableSkeleton } from "@/components/dashboard/records/ReportsSkeleton";
import { ReportsEmptyState } from "@/components/dashboard/records/ReportsEmptyState";
import { ReportsErrorState } from "@/components/dashboard/records/ReportsErrorState";
import { ReportsFilters } from "@/components/dashboard/records/ReportsFilters";

const DEFAULT_FILTERS: MedicalReportsFilters = {
  childId: null,
  doctorId: null,
  reportType: null,
  search: "",
  sort: "newest",
};

interface FilterOption {
  id: string;
  fullName: string;
}

export default function MedicalReportsPage() {
  const { t, locale } = useLocale();
  const mr = t.medicalReports;
  const dateLocale = locale === "ar" ? "ar-EG" : "en-EG";

  const [filters, setFilters] = useState<MedicalReportsFilters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const [childrenOptions, setChildrenOptions] = useState<FilterOption[]>([]);
  const [doctorsOptions, setDoctorsOptions] = useState<FilterOption[]>([]);

  // Reset to page 1 when filters change
  const handleFiltersChange = useCallback(
    (next: MedicalReportsFilters) => {
      setFilters(next);
      setPage(1);
    },
    [],
  );

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  // Fetch distinct children + doctors from this mother's reports (once)
  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: reports } = await supabase
        .from("medical_reports")
        .select(
          "doctor_id, child_id, doctor:doctor_details!medical_reports_doctor_id_fkey(id, full_name), child:children!medical_reports_child_id_fkey(id, full_name)",
        )
        .eq("mother_id", user.id);

      if (!reports) return;

      const doctorMap = new Map<string, string>();
      const childMap = new Map<string, string>();

      for (const r of reports) {
        const doctor = r.doctor as unknown as { id: string; full_name: string } | null;
        const child = r.child as unknown as { id: string; full_name: string } | null;
        if (doctor) doctorMap.set(doctor.id, doctor.full_name);
        if (child) childMap.set(child.id, child.full_name);
      }

      setDoctorsOptions(
        Array.from(doctorMap.entries()).map(([id, fullName]) => ({ id, fullName })),
      );
      setChildrenOptions(
        Array.from(childMap.entries()).map(([id, fullName]) => ({ id, fullName })),
      );
    }
    load();
  }, []);

  const { data, isLoading, isError, refetch } = useMedicalReports(filters, page);

  const reports = data?.reports ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const hasActiveFilters =
    filters.childId !== null ||
    filters.doctorId !== null ||
    filters.reportType !== null ||
    filters.search.trim() !== "";

  // Pagination range label
  const from = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, totalCount);
  const paginationLabel = `${mr.pagination.showing} ${from.toLocaleString(dateLocale)} ${mr.pagination.to} ${to.toLocaleString(dateLocale)} ${mr.pagination.of} ${totalCount.toLocaleString(dateLocale)} ${mr.pagination.reports}`;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 pb-24 md:px-6 md:py-8 lg:pb-8">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-4"
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-pink-100 to-rose-100">
          <FileText className="h-7 w-7 text-[#d11765]" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
            {mr.pageTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-500 md:text-base">
            {mr.pageSubtitle}
          </p>
        </div>
      </motion.div>

      {/* ── Filters ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
      >
        <ReportsFilters
          filters={filters}
          children={childrenOptions}
          doctors={doctorsOptions}
          onChange={handleFiltersChange}
        />
      </motion.div>

      {/* ── Content ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {isLoading ? (
          <ReportsTableSkeleton />
        ) : isError ? (
          <ReportsErrorState onRetry={refetch} />
        ) : reports.length === 0 ? (
          <ReportsEmptyState
            filtered={hasActiveFilters}
            onClearFilters={handleClearFilters}
          />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block">
              <ReportsTable reports={reports} />
            </div>

            {/* Mobile cards */}
            <div className="flex flex-col gap-3 md:hidden">
              {reports.map((report, i) => (
                <ReportCard key={report.id} report={report} index={i} />
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* ── Pagination ─────────────────────────────────────────────── */}
      {!isLoading && !isError && totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-3 shadow-sm"
        >
          <span className="text-sm text-slate-500">{paginationLabel}</span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-8 min-w-[2rem] items-center justify-center rounded-lg border px-2 text-sm font-medium transition-colors ${
                  p === page
                    ? "border-[#d11765] bg-[#d11765] text-white"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
