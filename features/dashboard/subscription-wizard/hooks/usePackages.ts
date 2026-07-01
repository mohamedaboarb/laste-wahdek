"use client";

import { useMemo } from "react";
import { useLocale } from "@/contexts/locale-context";
import type { Package, PackageIcon } from "../types";

// Session counts are not stored in i18n — they are fixed business rules per plan tier.
const SESSION_COUNTS: Record<string, number> = {
  essential: 2,
  integrated: 4,
  comprehensive: 6,
};

export function usePackages() {
  const { t } = useLocale();

  const data = useMemo<Package[]>(
    () =>
      t.landing.pricing.plans.map((plan) => ({
        id: plan.id,
        name: plan.name,
        description: plan.description,
        features: [...plan.features],
        sessionsPerMonth: SESSION_COUNTS[plan.id] ?? 0,
        priceEgp: parseInt(plan.price.replace(/,/g, ""), 10),
        featured: plan.featured ?? false,
        icon: plan.id as PackageIcon,
      })),
    [t],
  );

  return {
    data,
    isLoading: false as const,
    isError: false as const,
    refetch: () => {},
  };
}
