"use client";

import { Activity, CalendarCheck, Clock3, PieChart } from "lucide-react";
import { useLocale } from "@/contexts/locale-context";
import { StatisticCard } from "./StatisticCard";

interface Props {
  sessionsIncluded: number;
  sessionsUsed: number;
}

export function StatisticsSection({ sessionsIncluded, sessionsUsed }: Props) {
  const { t } = useLocale();
  const s = t.subscriptionDashboard.stats;

  const remaining = sessionsIncluded - sessionsUsed;
  const usage = Math.round((sessionsUsed / sessionsIncluded) * 100);

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatisticCard title={s.included} value={sessionsIncluded} icon={CalendarCheck} />

      <StatisticCard
        title={s.used}
        value={sessionsUsed}
        icon={Activity}
        iconColor="text-violet-500"
      />

      <StatisticCard
        title={s.remaining}
        value={remaining}
        icon={Clock3}
        iconColor="text-emerald-500"
      />

      <StatisticCard
        title={s.usage}
        value={`${usage}%`}
        icon={PieChart}
        iconColor="text-amber-500"
      />
    </section>
  );
}
