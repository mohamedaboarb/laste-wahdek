"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/contexts/locale-context";
import { PlanCardProps } from "@/features/dashboard/supscription/supscription.types";

export function PlanCard({
  name,
  description,
  price,
  currency,
  features,
  featured,
  current,
  cta,
  onSelect,
}: PlanCardProps) {
  const { t } = useLocale();
  const p = t.subscriptionDashboard.plans;
  const sw = t.subscriptionWizard.packages;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={`
        relative rounded-3xl border bg-white p-7 shadow-sm transition
        ${current ? "border-pink-300 ring-2 ring-pink-100" : "border-slate-200"}
      `}
    >
      {featured && (
        <Badge className="absolute right-6 top-6 rounded-full bg-pink-500">
          {sw.mostPopular}
        </Badge>
      )}

      {current && (
        <Badge className="absolute left-6 top-6 rounded-full bg-emerald-500">
          <BadgeCheck className="mr-1 h-4 w-4" />
          {p.ctaCurrent}
        </Badge>
      )}

      <div className="mt-8 flex items-center gap-3">
        <div className="rounded-2xl bg-pink-50 p-3">
          <Crown className="text-pink-500" />
        </div>

        <div>
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="text-slate-500">{description}</p>
        </div>
      </div>

      <div className="mt-8">
        <span className="text-5xl font-bold">{price}</span>
        <span className="ml-2 text-slate-500">
          {currency}{p.perMonth}
        </span>
      </div>

      <ul className="mt-8 space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="mt-1 h-5 w-5 text-pink-500" />
            <span className="text-slate-600">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        disabled={current}
        onClick={onSelect}
        className="mt-8 h-12 w-full rounded-xl"
      >
        {current ? p.ctaCurrent : cta}
      </Button>
    </motion.div>
  );
}
