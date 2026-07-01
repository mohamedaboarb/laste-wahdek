"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export interface ActiveSubscription {
  id: string;
  status: "pending_payment" | "active" | "expired" | "cancelled";
  cancelAtPeriodEnd: boolean;
  package: {
    id: string;
    name: string;
    priceEgp: number;
    sessionsCount: number;
  };
  startDate: string;
  endDate: string;
  sessionsTotal: number;
  sessionsRemaining: number;
  pediatrician: { id: string; fullName: string } | null;
  psychologist: { id: string; fullName: string } | null;
}

export function useSubscription() {
  return useQuery<ActiveSubscription | null>({
    queryKey: ["subscription", "active"],
    queryFn: async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from("subscriptions")
        .select(
          `
          id, status, cancel_at_period_end, start_date, end_date, sessions_total, sessions_remaining,
          package:packages!subscriptions_package_id_fkey(id, name, price_egp, sessions_count),
          pediatrician:doctor_details!subscriptions_pediatrician_id_fkey(id, full_name),
          psychologist:doctor_details!subscriptions_psychologist_id_fkey(id, full_name)
        `,
        )
        .eq("mother_id", user.id)
        .in("status", ["active", "pending_payment"])
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      const pkg = data.package as {
        id: string;
        name: string;
        price_egp: number;
        sessions_count: number;
      };
      const pedi = data.pediatrician as { id: string; full_name: string } | null;
      const psych = data.psychologist as { id: string; full_name: string } | null;

      return {
        id: data.id,
        status: data.status as ActiveSubscription["status"],
        cancelAtPeriodEnd: data.cancel_at_period_end ?? false,
        package: {
          id: pkg.id,
          name: pkg.name,
          priceEgp: Number(pkg.price_egp),
          sessionsCount: pkg.sessions_count,
        },
        startDate: data.start_date,
        endDate: data.end_date,
        sessionsTotal: data.sessions_total,
        sessionsRemaining: data.sessions_remaining,
        pediatrician: pedi ? { id: pedi.id, fullName: pedi.full_name } : null,
        psychologist: psych ? { id: psych.id, fullName: psych.full_name } : null,
      };
    },
    staleTime: 30 * 1000,
  });
}
