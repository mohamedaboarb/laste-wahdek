"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import { useDoctorsQuery } from "@/hooks/UseDoctorsQuery";
import DoctorPreviewCard from "@/app/doctors/components/DoctorPreviewCard";
import DoctorsFilter from "@/app/doctors/components/DoctorsFilter";
import SkeletonLoader from "./sharedComponents/SkeletonLoader";
import PaginationButtons from "./sharedComponents/PaginationButtons";

export default function DoctorsPage() {
  const { form, query, onSubmit } = useDoctorsQuery();
  const [hoveredDoc, setHoveredDoc] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data, isLoading } = query;
  return (
    <main className="min-h-screen bg-[#fffbf0] py-8 px-6 lg:px-12 font-sans relative">
      <button
        onClick={() => setIsFilterOpen(true)}
        className="lg:hidden fixed bottom-8 right-6 z-50 flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full shadow-[0_20px_50px_rgba(110,26,57,0.3)] active:scale-90 transition-transform border-4 border-white"
      >
        <Filter size={28} />
      </button>
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFilterOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-60 lg:hidden"
          />
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12">
        {/* الخلفية المظلمة للموبايل فقط (Overlay) */}

        <aside
          className={`
      fixed top-0 right-0 z-70 h-screen p-6 overflow-y-auto transition-transform bg-white w-80 
      ${isFilterOpen ? "translate-x-0" : "translate-x-full"} 
      lg:static lg:inset-auto lg:translate-x-0 lg:z-0 lg:h-fit lg:w-full lg:bg-transparent lg:p-0 lg:block lg:top-10
    `}
          aria-labelledby="drawer-label"
        >
          {/* رأس الـ Drawer للموبايل فقط */}
          <div className="flex items-center justify-between lg:hidden mb-8">
            <h5
              id="drawer-label"
              className="text-base font-black text-slate-500 uppercase flex items-center gap-2"
            >
              <Filter size={16} /> الفلاتر
            </h5>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-slate-400 bg-transparent hover:text-red-500 rounded-lg text-sm p-1.5 inline-flex items-center"
            >
              <X size={20} />
              <span className="sr-only">إغلاق القائمة</span>
            </button>
          </div>

          <DoctorsFilter
            form={form}
            onSubmit={onSubmit}
            setIsFilterOpen={setIsFilterOpen}
          />
        </aside>

        {/* --- شبكة الأطباء (TanStack Query Data) --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            data?.data?.map((doctor) => {
              const isFull = doctor.currentFamilies >= doctor.capacity;
              return (
                <motion.div
                  key={doctor.id}
                  onMouseEnter={() => setHoveredDoc(doctor.id)}
                  onMouseLeave={() => setHoveredDoc(null)}
                  className="relative bg-white p-8 overflow-hidden shadow-2xl shadow-primary/5 border border-primary/30 flex flex-col h-[480px]"
                >
                  {/* شارة الحالة (Status Badge) */}
                  <DoctorPreviewCard
                    doctor={doctor}
                    isFull={isFull}
                    hoveredDoc={hoveredDoc}
                  />
                </motion.div>
              );
            })
          )}
        </section>
      </div>
      <PaginationButtons
        totalPages={data?.totalPages || 0}
        currentPage={data?.currentPage || 1}
      />
    </main>
  );
}
