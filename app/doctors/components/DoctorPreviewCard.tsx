import { useLocale } from "@/contexts/locale-context";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";

function DoctorPreviewCard({ doctor, isFull, hoveredDoc }: any) {
  const { t, locale } = useLocale();

  return (
    <>
      <div className="absolute top-6 left-6 z-10">
        {isFull ? (
          <div className="bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-slate-200">
            <Lock size={12} /> {t.DoctorCard.status.full}
          </div>
        ) : (
          <div className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-green-100 animate-pulse">
            <div className="w-2 h-2 bg-green-500 rounded-full" />{" "}
            {t.DoctorCard.status.available}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center text-center grow">
        <div className="relative mb-6">
          <div
            className={`h-32 w-32 rounded-[2.5rem] p-1 border-2 transition-colors duration-500 ${isFull ? "border-slate-200" : "border-green-500"}`}
          >
            <img
              src={doctor.avatar}
              alt={doctor.fullName}
              className="h-full w-full object-center rounded-[2.2rem]"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-slate-50">
            <ShieldCheck className="text-primary" size={20} />
          </div>
        </div>
        <div className="space-y-3 grow flex flex-col justify-center">
          <h3 className="text-xl font-black text-slate-800 tracking-tight">
            {doctor.fullName}
          </h3>
          <p className="bg-primary/5 text-primary px-4 py-1 rounded-lg text-sm font-bold self-center">
            {doctor.specialization}
          </p>
          <p className="text-slate-500 text-md leading-relaxed line-clamp-2 px-4">
            {locale === "ar" ? doctor.bioAr : doctor.bio}
          </p>
        </div>
        {/* الإحصائيات السفلية */}
        <div className="w-full pt-2 mt-2 border-t border-slate-50 flex items-center justify-around">
          <div className="text-center">
            <p className="text-2xl font-black text-slate-800">
              {doctor.experience}
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              {t.DoctorCard.labels.experienceYears}
            </p>
          </div>
          <div className="h-8 w-px bg-slate-100" />
          <div className="text-center">
            <p
              className={`text-2xl font-black ${isFull ? "text-destructive" : "text-slate-800"}`}
            >
              {doctor.currentFamilies}/{doctor.capacity}
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              {t.DoctorCard.labels.currentFamilies}
            </p>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {hoveredDoc === doctor.id && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 150,
            }}
            className="absolute inset-0 bg-primary text-white p-10 flex flex-col justify-between z-20"
          >
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20">
                  <GraduationCap className="text-white" size={32} />
                </div>
                <div>
                  <h4 className="font-black text-xl leading-none mb-1">
                    {doctor.fullName}
                  </h4>
                  <span className="text-white/50 text-xs tracking-wider uppercase">
                    {t.DoctorCard.labels.professionalCredentials}
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <p className="text-white/60 text-xs mb-1">
                    {t.DoctorCard.labels.bio}
                  </p>
                  {/* condition to show the bio based on the language */}
                  <p className="text-sm leading-relaxed">
                    {locale === "ar" ? doctor.bioAr : doctor.bio}
                  </p>
                </div>
              </div>
            </div>
            {isFull ? (
              <div className="w-full py-4 bg-slate-500/30 text-white/50 font-black rounded-2xl text-center border border-white/10 cursor-not-allowed text-xs">
                {t.DoctorCard.actions.waitingList}
              </div>
            ) : (
              <Link
                href={`/doctors/${doctor.id}`}
                className="w-full py-4 bg-white text-[#6E1A39] font-black rounded-2xl text-center hover:scale-[1.03] active:scale-95 transition-all shadow-2xl block"
              >
                {t.DoctorCard.actions.startJourney}
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default DoctorPreviewCard;
