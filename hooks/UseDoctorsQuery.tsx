import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { filterSchema, FilterValues } from "@/lib/schemas";
import { fetchDoctors } from "@/lib/utils";

export function useDoctorsQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      name: searchParams.get("name") || "",
      gender: (searchParams.get("gender") as any) || "",
      specialty: searchParams.get("specialty") || "",
      experience: searchParams.get("experience") || "",
      page: searchParams.get("page") || "1",
    },
  });

  const queryParams = Object.fromEntries(searchParams.entries());
  const validatedFilters = filterSchema.parse(queryParams);
  const query = useQuery({
    queryKey: ["doctors", validatedFilters],
    queryFn: () => fetchDoctors(validatedFilters),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 60,
  });

  const onSubmit = (values: FilterValues) => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value && value !== "") params.set(key, value);
    });
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    form,
    query,
    onSubmit: form.handleSubmit(onSubmit),
    currentParams: validatedFilters,
  };
}
