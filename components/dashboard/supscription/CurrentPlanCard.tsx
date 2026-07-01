"use client";

import { CalendarDays, CheckCircle2, Clock3, Crown, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLocale } from "@/contexts/locale-context";
import { CurrentPlanCardProps } from "@/features/dashboard/supscription/supscription.types";

export function CurrentPlanCard({
  planName,
  price,
  currency,
  status,
  cancelAtPeriodEnd,
  startDate,
  renewalDate,
  sessionsUsed,
  sessionsLimit,
  onCancelRequest,
}: CurrentPlanCardProps) {
  const { t } = useLocale();
  const sd = t.subscriptionDashboard;

  const progress = (sessionsUsed / sessionsLimit) * 100;
  const remaining = sessionsLimit - sessionsUsed;

  const statusLabel = cancelAtPeriodEnd
    ? sd.status.cancelsOn.replace("{date}", renewalDate)
    : status === "active"
      ? sd.status.active
      : status === "pending_payment"
        ? sd.status.pendingPayment
        : status === "expired"
          ? sd.status.expired
          : sd.status.cancelled;

  const renewLabel = cancelAtPeriodEnd
    ? sd.planCard.expiresOn
    : sd.planCard.renewsOn;

  return (
    <section className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm">
      <div className="bg-linear-to-r from-primary to-secondary p-6 text-white">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Badge className="mb-4 rounded-full border-white/30 bg-white/15 px-4 py-1 text-white backdrop-blur">
              {cancelAtPeriodEnd ? (
                <XCircle className="mr-2 h-4 w-4" />
              ) : (
                <CheckCircle2 className="mr-2 h-4 w-4" />
              )}
              {statusLabel}
            </Badge>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
                <Crown className="h-7 w-7" />
              </div>

              <div>
                <h2 className="text-3xl font-bold">{planName}</h2>

                <p className="mt-1 text-white/90">
                  {currency} {price} {sd.planCard.perMonth}
                </p>
              </div>
            </div>
          </div>

          {status === "active" && !cancelAtPeriodEnd && (
            <Button
              variant="secondary"
              className="rounded-xl bg-white/15 text-white hover:bg-white/25 border border-white/20 backdrop-blur self-start lg:self-auto"
              onClick={onCancelRequest}
            >
              {sd.cancel.button}
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2 text-pink-500">
            <CalendarDays className="h-5 w-5" />
            <span className="font-medium">{sd.planCard.started}</span>
          </div>

          <p className="text-lg font-semibold text-slate-800">{startDate}</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2 text-violet-500">
            <Clock3 className="h-5 w-5" />
            <span className="font-medium">{renewLabel}</span>
          </div>

          <p className="text-lg font-semibold text-slate-800">{renewalDate}</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-700">
              {sd.planCard.monthlySessions}
            </span>

            <span className="font-bold text-pink-600">
              {sessionsUsed}/{sessionsLimit}
            </span>
          </div>

          <Progress value={progress} className="mt-5 h-3" />

          <p className="mt-3 text-sm text-slate-500">
            {remaining} {sd.planCard.sessionsLeft}
          </p>
        </div>
      </div>
    </section>
  );
}
