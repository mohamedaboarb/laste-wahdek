"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/locale-context";
import type { Package } from "../types";

interface PackageCardProps {
  pkg: Package;
  isSelected: boolean;
  onSelect: () => void;
}

export function PackageCard({ pkg, isSelected, onSelect }: PackageCardProps) {
  const { t } = useLocale();
  const sw = t.subscriptionWizard.packages;

  return (
    <motion.button
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onSelect}
      className={cn(
        // الحاوية الأساسية للكارد بـ Flexbox عمودي لضمان مرونة توزيع المسافات بالتساوي
        "relative w-full rounded-lg border-2 bg-white p-4 md:p-8 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c0641] flex flex-col justify-between min-h-[500px] md:min-h-[560px] mt-4",
        isSelected
          ? "border-[#8c0641] shadow-xl bg-[#fffdfd] ring-1 ring-[#8c0641]/10"
          : "border-slate-100 hover:border-slate-200 hover:shadow-lg",
      )}
    >
      {/* شارة الأكثر شعبية المتناسقة هندسياً */}
      {pkg.featured && (
        <div
          className={`absolute -top-4 inset-s-8 flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-xs font-bold shadow-lg shadow-primary/30`}
        >
          <Sparkles size={14} />
          {sw.mostPopular}
        </div>
      )}

      {/* ── الجزء العلوي (الهيدر المتناظر) ── */}
      <div className="w-full flex flex-col">
        {/* اسم الفئة العلوي الصغير */}
        <p className="flex items-center text-md min-h-[8vh] md:text-lg font-extrabold leading-tight uppercase tracking-wide text-primary">
          {pkg.name}
        </p>

        {/* 1. تحديد ارتفاع ثابت ومحكم للوصف لضمان ثبات خط البداية والنهاية عبر كل الباقات */}
        <h3 className="mt-2 md:mt-3 font-bold text-md md:text-base  text-slate-800 tracking-tight leading-tight min-h-[10vh] md:min-h-[17vh] overflow-hidden flex items-start">
          <span>{pkg.description}</span>
        </h3>

        {/* 2. خط الجلسات سيصطف الآن على نفس الخط الأفقي تماماً في الكروت الثلاثة */}
        <div className="mt-4 flex items-baseline gap-1 text-[#8c0641] border-b border-slate-100/50 pb-3">
          <span className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight leading-none">
            {pkg.sessionsPerMonth}
          </span>
          <span className="text-xs sm:text-sm md:text-md lg:text-lg font-extrabold tracking-tight">
            {sw.sessionsPerMonth}
          </span>
        </div>
      </div>

      {/* ── الجزء الأوسط (المميزات المتناسقة) ── */}
      {/* استخدام flex-grow لملء الفراغات وجعل القائمة تبدأ وتنتهي في نفس الموضع الرأسي */}
      <ul className="mt-5 space-y-3 flex-grow w-full flex flex-col justify-start">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 md:gap-2.5">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-[#8c0641]">
              <Check className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={3} />
            </span>
            <span className="text-[11px] md:text-xs font-medium leading-snug text-slate-600">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* ── الجزء السفلي (السعر مثبت في القاع) ── */}
      <div className="mt-6 pt-3 border-t border-slate-100 w-full flex items-baseline gap-1 text-slate-700">
        <span className="text-sm md:text-md lg:text-xl font-black tracking-tight">
          EGP {pkg.priceEgp.toLocaleString("en-EG")}
        </span>
        <span className="text-[10px] md:text-xs font-medium text-slate-400">
          {sw.egpPerMonth}
        </span>
      </div>
    </motion.button>
  );
}
