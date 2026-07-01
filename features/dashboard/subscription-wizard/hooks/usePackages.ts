"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "@/contexts/locale-context";
import { createClient } from "@/lib/supabase/client";
import type { Package, PackageIcon } from "../types";

// Maps DB English name → slug used throughout the app
const NAME_TO_SLUG: Record<string, PackageIcon> = {
  "Essential Care": "essential",
  "Integrated Support": "integrated",
  "Comprehensive Care": "comprehensive",
};

export function usePackages() {
  const { t } = useLocale();
  const i18nPlans = t.landing.pricing.plans;

  const query = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("packages")
        .select("id, name, price_egp, sessions_count")
        .eq("is_active", true)
        .order("sessions_count", { ascending: true });

      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60 * 1000,
  });

  // Merge DB rows (id, price, sessions) with i18n (name, description, features, featured)
  const merged: Package[] | undefined = query.data?.map((row) => {
    const slug: PackageIcon = NAME_TO_SLUG[row.name] ?? "essential";
    const i18n = i18nPlans.find((p) => p.id === slug);

    return {
      id: row.id,
      slug,
      name: i18n?.name ?? row.name,
      description: i18n?.description ?? "",
      features: i18n ? [...i18n.features] : [],
      sessionsPerMonth: row.sessions_count,
      priceEgp: Number(row.price_egp),
      featured: i18n?.featured ?? false,
      icon: slug,
    };
  });

  return {
    data: merged,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
