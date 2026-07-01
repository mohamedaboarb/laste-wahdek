"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  step: number;
  title: string;
  subtitle?: string;
  isActive: boolean;
  isCompleted: boolean;
  isPending: boolean;
  collapsedSummary?: ReactNode;
  onEdit?: () => void;
  children: ReactNode;
  isLast?: boolean;
}

export function SectionShell({
  step,
  title,
  subtitle,
  isActive,
  isCompleted,
  isPending,
  collapsedSummary,
  onEdit,
  children,
  isLast = false,
}: SectionShellProps) {
  return (
    <div className="flex gap-0">
      {/* ── Step rail (left column, desktop only) ───────────────────── */}
      <div
        className="hidden flex-col items-center md:flex"
        style={{ width: 56 }}
      >
        <div
          className={cn(
            "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black shadow-sm transition-all duration-300",
            isCompleted && !isActive
              ? "bg-emerald-500 text-white shadow-emerald-200"
              : isActive
                ? "bg-[#d11765] text-white shadow-lg shadow-pink-200"
                : "border-2 border-slate-200 bg-white text-slate-400",
          )}
        >
          {isCompleted && !isActive ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            step
          )}
        </div>

        {!isLast && (
          <div
            className={cn(
              "mt-1 min-h-8 w-0.5 flex-1 transition-colors duration-500",
              isCompleted ? "bg-emerald-300" : "bg-slate-200",
            )}
          />
        )}
      </div>

      {/* ── Section card ─────────────────────────────────────────────── */}
      <div
        className={cn(
          "mb-4 flex-1 overflow-hidden rounded-3xl border bg-white shadow-sm transition-[border-color,box-shadow] duration-200",
          isActive
            ? "border-[#d11765]/30 shadow-lg shadow-pink-50/80"
            : "border-slate-100",
          isPending && "pointer-events-none select-none opacity-45",
        )}
      >
        {/* ── Header ──────────────────────────────────────────────────── */}
        {/* Mobile step badge */}
        <div className="flex flex-col items-center justify-center gap-4 p-4 text-center md:flex-row md:items-start md:justify-between md:px-8 md:py-10 md:text-left">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black shadow-sm transition-all duration-300 md:hidden",
              isCompleted && !isActive
                ? "bg-emerald-500 text-white"
                : isActive
                  ? "bg-[#b30d57] text-white"
                  : "border border-[#e8d8dc] bg-white text-[#b9a6ac]",
            )}
          >
            {isCompleted && !isActive ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              step
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-center md:items-start">
            <h2
              className={cn(
                "text-2xl font-extrabold tracking-tight transition-colors md:text-[2rem]",
                isActive
                  ? "text-[#7d0f45]"
                  : isCompleted
                    ? "text-[#5f3243]"
                    : "text-[#b6a6ad]",
              )}
            >
              {title}
            </h2>

            {isActive && subtitle && (
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6d5f66] md:text-base">
                {subtitle}
              </p>
            )}
          </div>

          {isCompleted && !isActive && onEdit && (
            <button
              onClick={onEdit}
              className="rounded-xl border border-[#efd6df] bg-white px-5 py-2 text-sm font-semibold text-[#b30d57] transition-all duration-200 hover:border-[#b30d57] hover:bg-[#fff4f8]"
            >
              Change
            </button>
          )}
        </div>

        {/* ── Collapsed summary ────────────────────────────────────────── */}
        <AnimatePresence>
          {isCompleted && !isActive && collapsedSummary && (
            <motion.div
              key="summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <div className="px-5 pb-5 pt-3 md:px-6">{collapsedSummary}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Expanded content ─────────────────────────────────────────── */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="px-5 pb-6 pt-4 md:px-6">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
