import { fetchDoctorById } from "@/lib/mock-data";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useDoctors(doctorIds: string[]) {
  const queryClient = useQueryClient();
  const stableIds = [...doctorIds].sort();

  return useQuery({
    queryKey: ["doctors", "doctors/booking", stableIds],
    queryFn: async () => {
      console.log(
        "%c🌐 NETWORK FETCH: Requesting doctors from server...",
        "color: #ff9800; font-weight: bold;",
      );
      const promises = stableIds.map((id) => fetchDoctorById(id));
      return Promise.all(promises);
    },
    initialData: () => {
      const allQueries = queryClient.getQueriesData({ queryKey: ["doctors"] });
      // console.log("All Queries Data:", allQueries);
      const foundDoctors: any[] = [];

      stableIds.forEach((id) => {
        for (const [key, cache] of allQueries) {
          const dataArray =
            (cache as any)?.data || (Array.isArray(cache) ? cache : []);
          const found = dataArray.find((d: any) => d.id === id);
          if (found) {
            foundDoctors.push(found);
            break;
          }
        }
      });
      // console.log("Founded Doctors:", foundDoctors);

      if (foundDoctors.length === stableIds.length && stableIds.length > 0) {
        // 🟢 هذه الرسالة تظهر فقط إذا تم العثور على البيانات في الكاش (Instant Load)
        console.log(
          "%c🚀 CACHE HIT: Doctors found in existing cache!",
          "color: #4caf50; font-weight: bold;",
        );
        return foundDoctors;
      }

      console.log(
        "%c⚠️ CACHE MISS: Data not found in cache, starting fetch...",
        "color: #f44336; font-weight: bold;",
      );
      return undefined;
    },
    staleTime: 1000 * 60 * 15,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
