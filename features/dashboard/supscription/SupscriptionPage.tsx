"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useLocale } from "@/contexts/locale-context";
import { useSubscription } from "@/features/dashboard/subscription-wizard/hooks/useSubscription";
import { usePackages } from "@/features/dashboard/subscription-wizard/hooks/usePackages";
import {
  requestCancellation,
  cancelSubscriptionImmediately,
} from "@/features/dashboard/subscription-wizard/subscription-wizard.service";
import { CurrentPlanCard } from "@/components/dashboard/supscription/CurrentPlanCard";
import { FAQSection } from "@/components/dashboard/supscription/FaqSection";
import { PlansSection } from "@/components/dashboard/supscription/PlansSection";
import { StatisticsSection } from "@/components/dashboard/supscription/StatisticsSection";
import { UpcomingAppointmentCard } from "@/components/dashboard/supscription/UpcomingAppointementCard";
import { CancelSubscriptionDialog } from "@/components/dashboard/supscription/CancelSubscriptionDialog";
import { UpgradeConfirmDialog } from "@/components/dashboard/supscription/UpgradeConfirmDialog";

export default function SubscriptionPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { t, locale } = useLocale();
  const pricing = t.landing.pricing;
  const sw = t.subscriptionWizard;
  const sd = t.subscriptionDashboard;

  const dateLocale = locale === "ar" ? "ar-EG" : "en-EG";

  const { data: subscription, isLoading } = useSubscription();
  const { data: packages } = usePackages();

  // ── Cancel dialog state ──────────────────────────────────────────────────
  const [cancelOpen, setCancelOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelRequest = useCallback(() => {
    setCancelOpen(true);
  }, []);

  const handleCancelConfirm = useCallback(async () => {
    if (!subscription) return;
    setIsCancelling(true);
    try {
      await requestCancellation(subscription.id);
      await queryClient.invalidateQueries({ queryKey: ["subscription", "active"] });
    } finally {
      setIsCancelling(false);
      setCancelOpen(false);
    }
  }, [subscription, queryClient]);

  // ── Upgrade dialog state ─────────────────────────────────────────────────
  const [upgradeTarget, setUpgradeTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleUpgradeSelect = useCallback(
    (planId: string) => {
      if (!subscription) {
        // No active subscription → go straight to wizard
        router.push("/dashboard/mother/supscription/new");
        return;
      }
      const plan = packages?.find((p) => p.id === planId);
      if (!plan) return;
      setUpgradeTarget({ id: planId, name: plan.name });
    },
    [subscription, packages, router],
  );

  const handleUpgradeConfirm = useCallback(async () => {
    if (!subscription || !upgradeTarget) return;
    setIsUpgrading(true);
    try {
      await cancelSubscriptionImmediately(subscription.id);
      await queryClient.invalidateQueries({ queryKey: ["subscription", "active"] });
      router.push("/dashboard/mother/supscription/new");
    } catch {
      setIsUpgrading(false);
      setUpgradeTarget(null);
    }
  }, [subscription, upgradeTarget, queryClient, router]);

  // ── Derived values ───────────────────────────────────────────────────────
  const sessionsUsed = subscription
    ? subscription.sessionsTotal - subscription.sessionsRemaining
    : 0;

  // Resolve the localized package name from the packages list (bridges DB name → i18n)
  const localizedPlanName =
    packages?.find((p) => p.id === subscription?.package.id)?.name ??
    subscription?.package.name ??
    "";

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(dateLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const endDateFormatted = subscription ? formatDate(subscription.endDate) : "";

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#d11765]" />
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-6 md:py-8 lg:pb-8">
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

          {!subscription && (
            <Link
              href="/dashboard/mother/supscription/new"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#d11765] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-pink-200 transition-colors hover:bg-pink-700"
            >
              <Plus className="h-4 w-4" />
              {sw.page.title}
            </Link>
          )}
        </motion.div>

        {/* ── Active / pending plan card ───────────────────────────── */}
        {subscription && (
          <CurrentPlanCard
            subscriptionId={subscription.id}
            planName={localizedPlanName}
            price={subscription.package.priceEgp}
            currency={pricing.currency}
            status={subscription.status}
            cancelAtPeriodEnd={subscription.cancelAtPeriodEnd}
            startDate={formatDate(subscription.startDate)}
            renewalDate={endDateFormatted}
            sessionsUsed={sessionsUsed}
            sessionsLimit={subscription.sessionsTotal}
            onCancelRequest={handleCancelRequest}
          />
        )}

        {/* ── Session statistics ───────────────────────────────────── */}
        {subscription && (
          <StatisticsSection
            sessionsIncluded={subscription.sessionsTotal}
            sessionsUsed={sessionsUsed}
          />
        )}

        {/* ── Upcoming appointment ─────────────────────────────────── */}
        {subscription && <UpcomingAppointmentCard hasAppointment={false} />}

        {/* ── Available plans ──────────────────────────────────────── */}
        {packages && (
          <PlansSection
            currentPlanId={subscription?.package.id}
            plans={packages.map((p) => ({
              id: p.id,
              name: p.name,
              description: p.description,
              price: p.priceEgp.toLocaleString("en-EG"),
              currency: pricing.currency,
              features: p.features,
              featured: p.featured,
              cta:
                p.id === subscription?.package.id
                  ? sd.plans.ctaCurrent
                  : p.priceEgp > (subscription?.package.priceEgp ?? 0)
                    ? sd.plans.ctaUpgrade
                    : sd.plans.ctaChoose,
            }))}
            onSelectPlan={handleUpgradeSelect}
          />
        )}

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <FAQSection />
      </div>

      {/* ── Dialogs ──────────────────────────────────────────────── */}
      <CancelSubscriptionDialog
        isOpen={cancelOpen}
        endDate={endDateFormatted}
        isLoading={isCancelling}
        onConfirm={handleCancelConfirm}
        onClose={() => setCancelOpen(false)}
      />

      <UpgradeConfirmDialog
        isOpen={!!upgradeTarget}
        targetPlanName={upgradeTarget?.name ?? ""}
        isLoading={isUpgrading}
        onConfirm={handleUpgradeConfirm}
        onClose={() => setUpgradeTarget(null)}
      />
    </>
  );
}
