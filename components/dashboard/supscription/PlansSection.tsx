"use client";

import { useLocale } from "@/contexts/locale-context";
import { SubscriptionPlan } from "@/features/dashboard/supscription/supscription.types";
import { PlanCard } from "./PlanCard";

interface Props {
  currentPlanId?: string;
  plans: SubscriptionPlan[];
  onSelectPlan?: (planId: string) => void;
}

export function PlansSection({ currentPlanId, plans, onSelectPlan }: Props) {
  const { t } = useLocale();
  const p = t.subscriptionDashboard.plans;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{p.sectionTitle}</h2>
        <p className="mt-2 text-slate-500">{p.sectionSubtitle}</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            {...plan}
            current={currentPlanId === plan.id}
            onSelect={() => onSelectPlan?.(plan.id)}
          />
        ))}
      </div>
    </section>
  );
}
