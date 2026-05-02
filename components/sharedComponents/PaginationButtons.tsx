"use client";
import { usePagination } from "@/hooks/usePagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PaginationButtons({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const { goToPage } = usePagination();

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center items-center gap-3 py-12">
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="group relative p-4 rounded-2xl bg-white border border-slate-100 shadow-sm disabled:opacity-20 transition-all duration-300 hover:border-primary/30 hover:shadow-md active:scale-95"
      >
        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors rtl:rotate-0 ltr:rotate-180" />
      </button>

      <div className="flex items-center p-1.5 bg-slate-50/50 backdrop-blur-md rounded-2xl border border-white shadow-inner">
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          const isActive = currentPage === pageNum;

          return (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              className="relative px-5 py-2.5 text-sm font-bold transition-all duration-500"
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill" // هذا المفتاح هو ما يربط الحركة بين الأرقام
                  className="absolute inset-0 bg-white rounded-xl shadow-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <span
                className={`relative z-10 ${
                  isActive
                    ? "text-primary scale-110"
                    : "text-slate-400 hover:text-slate-600"
                } transition-all duration-300`}
              >
                {pageNum}
              </span>
            </button>
          );
        })}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="group relative p-4 rounded-2xl bg-white border border-slate-100 shadow-sm disabled:opacity-20 transition-all duration-300 hover:border-primary/30 hover:shadow-md active:scale-95"
      >
        <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors rtl:rotate-0 ltr:rotate-180" />
      </button>
    </nav>
  );
}
