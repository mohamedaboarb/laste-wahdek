"use client";

import {
  CheckCircle2,
  Package,
  Baby,
  Brain,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  CalendarClock,
  Loader2,
  AlertCircle,
  Wand2,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/locale-context";
import { SectionShell } from "./SectionShell";
import type { WizardState } from "../types";

interface ReviewSectionProps {
  state: WizardState;
  step: number;
  isActive: boolean;
  isCompleted: boolean;
  isPending: boolean;
  onEdit: () => void;
  onGoToSection: (section: WizardState["activeSection"]) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  submitError?: string | null;
  isLast?: boolean;
}

interface ReviewRowProps {
  icon: React.ElementType;
  iconBg: string;
  label: string;
  primaryText: string;
  secondaryText?: string;
  imageUrl?: string | null;
  onEdit?: () => void;
  isAutoAssigned?: boolean;
}

function ReviewRow({
  icon: Icon,
  iconBg,
  label,
  primaryText,
  secondaryText,
  imageUrl,
  onEdit,
  isAutoAssigned,
}: ReviewRowProps) {
  return (
    // ضبط الهوامش والمسافات لتكون رشيقة على الموبايل وتتسع بشكل مريح على الشاشات الكبيرة
    <div className="flex flex-col lg:flex-row items-center gap-3 sm:gap-4 p-3.5 sm:p-4 hover:bg-slate-50/50 transition-colors">
      {/* حاوية الصورة أو الأيقونة بحجم متجاوب دقيق */}
      <div
        className={cn(
          "relative flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl shadow-inner",
          !imageUrl && iconBg,
        )}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={primaryText}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 40px, 48px"
          />
        ) : (
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        )}
      </div>

      {/* توزيع النصوص بأحجام صغيرة مريحة للعين على الهواتف لمنع الانكسار المفاجئ للأسطر */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center flex-wrap gap-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {label}
          </p>
          {isAutoAssigned && (
            <div className="flex items-center gap-0.5 rounded-full bg-violet-50 px-1.5 py-0.5 border border-violet-100">
              <Wand2 className="h-2.5 w-2.5 text-violet-500" />
              <span className="text-[9px] font-bold text-violet-600">Auto</span>
            </div>
          )}
        </div>
        <p className="truncate text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
          {primaryText}
        </p>
        {secondaryText && (
          <p className="truncate text-[11px] sm:text-xs text-slate-500 mt-0.5 font-medium leading-tight">
            {secondaryText}
          </p>
        )}
      </div>

      {onEdit && (
        <button
          onClick={onEdit}
          className="w-100 lg:w-50 shrink-0 rounded-xl px-2.5 py-1.5 text-[11px] sm:text-xs font-bold text-[#8c0641] bg-[#8c0641]/5 hover:bg-[#8c0641]/10 transition-colors"
        >
          Change
        </button>
      )}
    </div>
  );
}

export function ReviewSection({
  state,
  step,
  isActive,
  isCompleted,
  isPending,
  onEdit,
  onGoToSection,
  onSubmit,
  isSubmitting = false,
  submitError = null,
  isLast = true,
}: ReviewSectionProps) {
  const { t } = useLocale();
  const sw = t.subscriptionWizard;
  const { selectedPackage, selectedPediatrician, selectedPsychologist, mode } =
    state;

  const collapsedSummary = isCompleted ? (
    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
      <span>Subscription confirmed</span>
    </div>
  ) : null;

  return (
    <SectionShell
      step={step}
      title={sw.sections.review.title}
      subtitle={sw.sections.review.subtitle}
      isActive={isActive}
      isCompleted={isCompleted}
      isPending={isPending}
      collapsedSummary={collapsedSummary}
      onEdit={onEdit}
      isLast={isLast}
    >
      {selectedPackage && selectedPediatrician && selectedPsychologist && (
        <>
          {/* ── كارد فريق الرعاية الفاخر (Care Team Summary Card) ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-2xl sm:rounded-[1.5rem] border border-slate-100 bg-white shadow-xs"
          >
            <div className="divide-y divide-slate-100/70">
              <ReviewRow
                icon={Package}
                iconBg="bg-[#8c0641]/5 text-[#8c0641]"
                label={sw.review.carePlan}
                primaryText={selectedPackage.name}
                secondaryText={`${selectedPackage.sessionsPerMonth} ${sw.packages.sessionsPerMonth} · ${selectedPackage.priceEgp.toLocaleString("en-EG")} ${sw.packages.egpPerMonth}`}
                isAutoAssigned={mode === "doctor-first"}
                onEdit={
                  mode === "package-first"
                    ? () => onGoToSection("package")
                    : undefined
                }
              />

              <ReviewRow
                icon={Baby}
                iconBg="bg-blue-50/70 text-blue-600"
                label={sw.review.pediatrician}
                primaryText={selectedPediatrician.fullName}
                secondaryText={`${selectedPediatrician.scientificDegree} · ${selectedPediatrician.title}`}
                imageUrl={selectedPediatrician.profileImageUrl}
                onEdit={() => onGoToSection("pediatrician")}
              />

              <ReviewRow
                icon={Brain}
                iconBg="bg-violet-50/70 text-violet-600"
                label={sw.review.psychologist}
                primaryText={selectedPsychologist.fullName}
                secondaryText={`${selectedPsychologist.scientificDegree} · ${selectedPsychologist.title}`}
                imageUrl={selectedPsychologist.profileImageUrl}
                onEdit={() => onGoToSection("psychologist")}
              />
            </div>
          </motion.div>

          {/* ── ملحوظة التعيين التلقائي ── */}
          {mode === "doctor-first" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="mt-3 flex items-start sm:items-center gap-2 rounded-xl border border-violet-100 bg-violet-50/50 px-3.5 py-2.5"
            >
              <Wand2 className="h-3.5 w-3.5 shrink-0 text-violet-500 mt-0.5 sm:mt-0" />
              <p className="text-[11px] sm:text-xs text-violet-700 leading-normal">
                {sw.sections.review.autoAssigned}
              </p>
            </motion.div>
          )}

          {/* ── الفاتورة والملخص المالي (Billing Summary) ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="mt-4 rounded-2xl border border-slate-100 bg-[#fffdfb] p-4 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
                <CalendarClock className="h-4 w-4 text-slate-400 shrink-0" />
                {sw.review.monthlyTotal}
              </div>
              <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {selectedPackage.priceEgp.toLocaleString("en-EG")}{" "}
                <span className="text-xs sm:text-sm font-semibold text-slate-400">
                  EGP
                </span>
              </span>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
              {sw.review.billedMonthly}
            </p>
          </motion.div>

          {/* ── شارات الأمان والثقة (Trust Signals) ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.14 }}
            className="mt-4 flex flex-wrap gap-x-4 gap-y-2 px-1"
          >
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              {sw.review.securePay}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 font-medium">
              <CreditCard className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              {sw.review.noCharge}
            </div>
          </motion.div>

          {/* ── رسائل الأخطاء إن وجدت ── */}
          {submitError && (
            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-red-100 bg-red-50 p-3 text-xs sm:text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p className="font-medium">{submitError}</p>
            </div>
          )}

          {/* ── زر التأكيد والدفع النهائي المتناسق (Ultimate Call To Action) ── */}
          <motion.button
            whileHover={!isSubmitting ? { scale: 1.005 } : {}}
            whileTap={!isSubmitting ? { scale: 0.99 } : {}}
            onClick={onSubmit}
            disabled={isSubmitting}
            className={cn(
              "mt-5 flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl py-3.5 text-sm sm:text-base font-bold text-white shadow-lg transition-all duration-200",
              isSubmitting
                ? "cursor-not-allowed bg-[#8c0641]/40 shadow-none"
                : "bg-[#8c0641] hover:bg-[#700533] shadow-[#8c0641]/10 hover:shadow-[#8c0641]/20",
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                <span>{sw.review.confirming}</span>
              </>
            ) : (
              <>
                <span>{sw.review.confirmPay}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </>
            )}
          </motion.button>
        </>
      )}
    </SectionShell>
  );
}
