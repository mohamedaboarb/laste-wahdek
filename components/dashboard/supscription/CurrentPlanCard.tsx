"use client";

import { CalendarDays, CheckCircle2, Clock3, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CurrentPlanCardProps } from "@/features/dashboard/supscription/supscription.types";
import { Progress } from "@/components/ui/progress";

export function CurrentPlanCard({
  planName,
  price,
  currency,
  status,
  startDate,
  renewalDate,
  sessionsUsed,
  sessionsLimit,
  onManage,
  onUpgrade,
}: CurrentPlanCardProps) {
  const progress = (sessionsUsed / sessionsLimit) * 100;

  return (
    <section className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm">
      <div className="bg-linear-to-r from-pink-500 via-rose-500 to-violet-500 p-6 text-white">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Badge className="mb-4 rounded-full border-white/30 bg-white/15 px-4 py-1 text-white backdrop-blur">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {status === "active" ? "Active Subscription" : status}
            </Badge>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
                <Crown className="h-7 w-7" />
              </div>

              <div>
                <h2 className="text-3xl font-bold">{planName}</h2>

                <p className="mt-1 text-white/90">
                  {currency} {price} / Month
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="rounded-xl bg-white text-pink-600 hover:bg-pink-50"
              onClick={onManage}
            >
              Manage Plan
            </Button>

            <Button
              className="rounded-xl bg-slate-900 hover:bg-black"
              onClick={onUpgrade}
            >
              Upgrade
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2 text-pink-500">
            <CalendarDays className="h-5 w-5" />
            <span className="font-medium">Started</span>
          </div>

          <p className="text-lg font-semibold text-slate-800">{startDate}</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2 text-violet-500">
            <Clock3 className="h-5 w-5" />
            <span className="font-medium">Renews</span>
          </div>

          <p className="text-lg font-semibold text-slate-800">{renewalDate}</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-700">Monthly Sessions</span>

            <span className="font-bold text-pink-600">
              {sessionsUsed}/{sessionsLimit}
            </span>
          </div>

          <Progress value={progress} className="mt-5 h-3" />

          <p className="mt-3 text-sm text-slate-500">
            {sessionsLimit - sessionsUsed} sessions remaining this month
          </p>
        </div>
      </div>
    </section>
  );
}
