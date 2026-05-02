"use client";
import HeadlineSection from "./sharedComponents/HeadlineSection";
import DoctorCard from "./sharedComponents/DoctorCard";
import Link from "next/link";
import { useLocale } from "@/contexts/locale-context";

function MeetSpecialists() {
  const { t } = useLocale();
  return (
    // Added radial-gradient to match the "glow" from your images
    <section className="relative py-20 overflow-hidden bg-[#fffbf0]">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#fb9b8f]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 z-10">
        <HeadlineSection
          heading={t.landing.specialists.title}
          paragraph={t.landing.specialists.subtitle}
        />

        <div className="flex flex-row flex-wrap lg:flex-nowrap items-center justify-center gap-8 mt-12">
          <DoctorCard
            image={"/images/d1.webp"}
            name={"Youssef Ahmed"}
            role={t.landing.specialists.doctors.youssef.role}
            bio={t.landing.specialists.doctors.youssef.bio}
          />
          <DoctorCard
            image={"/images/d5.webp"}
            name={"Mai Mohamed"}
            role={t.landing.specialists.doctors.mai.role}
            bio={t.landing.specialists.doctors.mai.bio}
          />
          <DoctorCard
            image={"/images/d11.webp"}
            name={"Mohamed Hamed"}
            role={t.landing.specialists.doctors.hamed.role}
            bio={t.landing.specialists.doctors.hamed.bio}
          />
        </div>

        {/* Updated Button Styling */}
        <Link href={"/doctors"}>
          <button className="block mx-auto justify-center btn-primary">
            <span>{t.landing.specialists.cta}</span>
          </button>
        </Link>
      </div>
    </section>
  );
}

export default MeetSpecialists;
