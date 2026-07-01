"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/contexts/locale-context";
import { CurrentPlanCard } from "@/components/dashboard/supscription/CurrentPlanCard";
import { FAQSection } from "@/components/dashboard/supscription/FaqSection";
import { PlansSection } from "@/components/dashboard/supscription/PlansSection";
import { StatisticsSection } from "@/components/dashboard/supscription/StatisticsSection";
import { UpcomingAppointmentCard } from "@/components/dashboard/supscription/UpcomingAppointementCard";

// ─── Mock subscription data ────────────────────────────────────────────────────
// TODO (Phase 2): Replace with useSubscription() hook fetching from Supabase
const MOCK_ACTIVE_PLAN_ID = "integrated";
const MOCK_SESSIONS_USED = 2;
const MOCK_SESSIONS_LIMIT = 4;

export default function SubscriptionPage() {
  const { t } = useLocale();
  const pricing = t.landing.pricing;
  const sw = t.subscriptionWizard;

  // Derive the active plan object from i18n so labels stay consistent
  const activePlan = pricing.plans.find((p) => p.id === MOCK_ACTIVE_PLAN_ID);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 md:px-6 md:py-8">
      {/* ── Header ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-start justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            {pricing.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 md:text-base">
            {pricing.subtitle}
          </p>
        </div>

        <Link
          href="/dashboard/mother/supscription/new"
          className="inline-flex items-center gap-2 rounded-2xl bg-[#d11765] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-pink-200 transition-colors hover:bg-pink-700"
        >
          <Plus className="h-4 w-4" />
          {sw.page.title}
        </Link>
      </motion.div>

      {/* ── Active plan card ─────────────────────────────────────── */}
      {activePlan && (
        <CurrentPlanCard
          planName={activePlan.name}
          price={Number(activePlan.price.replace(/,/g, ""))}
          currency={pricing.currency}
          status="active"
          startDate="1 July 2026"
          renewalDate="1 August 2026"
          sessionsUsed={MOCK_SESSIONS_USED}
          sessionsLimit={MOCK_SESSIONS_LIMIT}
        />
      )}

      {/* ── Session statistics ───────────────────────────────────── */}
      <StatisticsSection
        sessionsIncluded={MOCK_SESSIONS_LIMIT}
        sessionsUsed={MOCK_SESSIONS_USED}
      />

      {/* ── Upcoming appointment ─────────────────────────────────── */}
      <UpcomingAppointmentCard
        hasAppointment
        doctor="Dr. Ahmed Hassan"
        specialization="Pediatrician"
        date="Tomorrow"
        time="7:30 PM"
      />

      {/* ── Available plans ──────────────────────────────────────── */}
      <PlansSection
        currentPlanId={MOCK_ACTIVE_PLAN_ID}
        plans={pricing.plans.map((p) => ({
          ...p,
          features: [...p.features],
          currency: pricing.currency,
          cta:
            p.id === MOCK_ACTIVE_PLAN_ID
              ? "Current Plan"
              : Number(p.price.replace(/,/g, "")) >
                  Number(activePlan?.price.replace(/,/g, "") ?? 0)
                ? "Upgrade"
                : "Choose Plan",
        }))}
      />

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <FAQSection />
    </div>
  );
}
