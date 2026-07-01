import { useQuery } from "@tanstack/react-query";
import { fetchAvailableDoctors } from "../subscription-wizard.service";
import type { DoctorFilterState, Specialization } from "../types";

interface UseAvailableDoctorsArgs {
  specialization: Specialization;
  packageId: string | null;
  filters: DoctorFilterState;
  /** Only fetch when the containing section is active */
  enabled: boolean;
}

export function useAvailableDoctors({
  specialization,
  packageId,
  filters,
  enabled,
}: UseAvailableDoctorsArgs) {
  return useQuery({
    queryKey: [
      "subscription-wizard",
      "doctors",
      specialization,
      packageId,
      filters.searchQuery,
      filters.availableToday,
      filters.minRating,
    ],
    queryFn: () =>
      fetchAvailableDoctors(
        specialization,
        packageId ?? "",
        filters.searchQuery,
        filters.availableToday,
        filters.minRating,
      ),
    enabled: enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes — doctor availability can shift
  });
}
