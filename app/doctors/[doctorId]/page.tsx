"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Award } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useLocale } from "@/contexts/locale-context";
import DoctorAppointmentPicker from "@/components/sharedComponents/AppointmentPicker";
import LoadingState from "@/components/ui/LoadingState";
import StatItem from "@/components/ui/StatItem";
import DoctorSelectionCard from "@/components/sharedComponents/DoctorSelectionCard";
import { useDoctors } from "@/hooks/useDoctors";
import BookingModal from "@/components/ui/BookingModal";

export default function BookingPage() {
  const { t, locale } = useLocale();
  const { doctorId } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    type: "success" | "warning" | "limit-reached" | "specialization-conflict";
    message: string;
  }>({ type: "success", message: "" });

  const allRequiredIds = useMemo(() => {
    const ids = new Set([doctorId as string, ...(user?.assignedDoctors || [])]);
    return Array.from(ids);
  }, [user?.assignedDoctors, doctorId]);

  const { data: doctors, isLoading, isError } = useDoctors(allRequiredIds);
  console.log(doctors);
  const activeDoctor = useMemo(() => {
    return doctors?.find((d) => d.id === doctorId);
  }, [doctors, doctorId]);

  const assignedDoctors = useMemo(() => {
    return doctors?.filter((d) => user?.assignedDoctors?.includes(d.id)) || [];
  }, [doctors, user?.assignedDoctors]);

  const handleBookingRequest = () => {
    const assignedDocs = assignedDoctors;
    const userSessions = user?.maxSessions ?? 0;

    if (
      assignedDocs.length >= 2 &&
      !assignedDocs.find((d) => d.id === doctorId)
    ) {
      setModalConfig({
        type: "limit-reached",
        message: t.booking.modals.limitReached,
      });
      setIsModalOpen(true);
      return;
    }

    const sameSpecialtyDoc = assignedDocs.find(
      (d) =>
        d.specialization === activeDoctor.specialization && d.id !== doctorId,
    );
    if (sameSpecialtyDoc) {
      setModalConfig({
        type: "specialization-conflict",
        message: t.booking.modals.specialtyConflict,
      });
      setIsModalOpen(true);
      return;
    }

    const sessionType = userSessions > 0 ? "free" : "paid";
    setModalConfig({
      type: "success",
      message:
        sessionType === "free"
          ? t.booking.modals.confirmFree
          : t.booking.modals.confirmPaid,
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      const callbackUrl = encodeURIComponent(pathname);
      router.push(`/login?callbackUrl=${callbackUrl}`);
    }
  }, [isAuthenticated, router, pathname]);

  if (isLoading) return <LoadingState message={t.common.loading} />;
  if (!isAuthenticated) return null;
  if (isError || !doctors?.length)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffbf0]">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl">
          <p className="text-red-500 font-black text-xl">{t.common.error}</p>
        </div>
      </div>
    );

  return (
    <main className="flex flex-col lg:grid lg:grid-cols-12 min-h-[calc(100vh-57px)] bg-slate-50/30">
      <aside className="lg:col-span-4 bg-linear-to-br from-primary to-popover-foreground p-8 flex flex-col gap-8 shadow-inner text-white">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden mb-6 shadow-2xl border-4 border-white/20"
          >
            <img
              src={activeDoctor.avatar}
              alt={activeDoctor.fullName}
              className="w-full h-full object-center"
            />
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-black mb-2">
            {locale === "ar" ? activeDoctor.fullNameAr : activeDoctor.fullName}
          </h2>
          <span className="px-4 py-1 bg-secondary/20 rounded-full text-secondary text-xs font-bold uppercase tracking-widest">
            {
              t.Specialties[
                activeDoctor.specialization as keyof typeof t.Specialties
              ]
            }
          </span>

          <div className="grid grid-cols-2 gap-4 w-full mt-8 pt-8 border-t border-white/10">
            <StatItem
              label={t.stats.experience}
              value={activeDoctor.experience}
              icon={<Award size={14} />}
            />
            <StatItem
              label={t.stats.rating}
              value={activeDoctor.rating}
              icon={<Star size={14} className="fill-current" />}
            />
          </div>
        </div>

        <div className="hidden lg:block">
          <h3 className="text-sm font-black uppercase tracking-wider mb-3 opacity-70">
            {t.DoctorCard.labels.bio}
          </h3>
          <p className="text-sm leading-relaxed font-medium text-white/90">
            {locale === "ar" ? activeDoctor.bioAr : activeDoctor.bio}
          </p>
        </div>
      </aside>
      {/* appointment Section */}
      <div className="lg:col-span-8 p-6 md:p-16">
        <div className="max-w-4xl mx-auto">
          {assignedDoctors.length > 0 && (
            <section className="mb-12">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wide mb-6">
                {t.booking.selectDoctor}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {assignedDoctors.map((doc) => (
                  <DoctorSelectionCard
                    key={doc.id}
                    doc={doc}
                    isSelected={doc.id === doctorId}
                    onClick={() => router.push(`/doctors/${doc.id}`)}
                    name={locale === "ar" ? doc.fullNameAr : doc.fullName}
                    specialty={
                      t.Specialties[
                        doc.specialization as keyof typeof t.Specialties
                      ]
                    }
                  />
                ))}
              </div>
            </section>
          )}
          <header className="mb-10">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              {t.booking.title}
            </h1>
            <p className="text-slate-400 mt-2 font-medium">
              {t.booking.slogan}
            </p>
          </header>

          <div className="bg-white rounded-2xl p-2 shadow-xl shadow-slate-200/50 border border-slate-100">
            <DoctorAppointmentPicker
              onBookingRequest={handleBookingRequest}
              doctor={activeDoctor}
            />
          </div>
        </div>
      </div>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        config={modalConfig}
        onConfirm={handleBookingRequest}
      />
    </main>
  );
}
