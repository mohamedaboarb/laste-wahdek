"use client";

import HeroSection from "@/components/home-page components/HeroSection";
import HowItWorks from "@/components/home-page components/HowItWorks";
import { FeaturesSection } from "@/components/home-page components/FeaturesSection";
import MeetSpecialists from "@/components/home-page components/MeetSpecialists";
import OurServices from "@/components/home-page components/OurServices";
import { useLocale } from "@/contexts/locale-context";
import { Heart } from "lucide-react";
import PricingSection from "@/components/home-page components/PricingSection";

export default function HomePage() {
  const { t, dir } = useLocale();

  return (
    <div dir={dir}>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <MeetSpecialists />
      <PricingSection />
      <OurServices />
      <footer dir={dir} className="border-t border-border bg-card py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-secondary" fill="currentColor" />
            <span className="text-lg font-bold text-primary">
              {dir === "rtl" ? "لست وحدك" : "Laste Wahdek"}
            </span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {dir === "rtl"
              ? "جميع الحقوق محفوظة 2026"
              : "All rights reserved 2026"}
          </p>
        </div>
      </footer>
    </div>
  );
}
