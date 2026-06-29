"use client";

import { Activity, CalendarCheck, Clock3, PieChart } from "lucide-react";

import { StatisticCard } from "./StatisticCard";

interface Props {
  sessionsIncluded: number;
  sessionsUsed: number;
}

export function StatisticsSection({ sessionsIncluded, sessionsUsed }: Props) {
  const remaining = sessionsIncluded - sessionsUsed;

  const usage = Math.round((sessionsUsed / sessionsIncluded) * 100);

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatisticCard
        title="Included Sessions"
        value={sessionsIncluded}
        icon={CalendarCheck}
      />

      <StatisticCard
        title="Used Sessions"
        value={sessionsUsed}
        icon={Activity}
        iconColor="text-violet-500"
      />

      <StatisticCard
        title="Remaining"
        value={remaining}
        icon={Clock3}
        iconColor="text-emerald-500"
      />

      <StatisticCard
        title="Usage"
        value={`${usage}%`}
        icon={PieChart}
        iconColor="text-amber-500"
      />
    </section>
  );
}
