"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export interface MedicalReport {
  id: string;
  sessionNumber: number;
  title: string;
  reportType: "pediatric" | "psychological";
  contentText: string | null;
  submittedAt: string;
  doctor: {
    id: string;
    fullName: string;
    specialization: string;
    profileImageUrl: string | null;
  };
  child: {
    id: string;
    fullName: string;
  } | null;
}

export interface MedicalReportsFilters {
  childId: string | null;
  doctorId: string | null;
  reportType: "pediatric" | "psychological" | null;
  search: string;
  sort: "newest" | "oldest";
}

export interface MedicalReportsResult {
  reports: MedicalReport[];
  totalCount: number;
}

const PAGE_SIZE = 5;

export function useMedicalReports(
  filters: MedicalReportsFilters,
  page: number,
) {
  return useQuery<MedicalReportsResult>({
    queryKey: ["medical-reports", filters, page],
    queryFn: async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { reports: [], totalCount: 0 };

      let query = supabase
        .from("medical_reports")
        .select(
          `
          id, session_number, title, report_type, content_text, submitted_at,
          doctor:doctor_details!medical_reports_doctor_id_fkey(id, full_name, specialization, profile_image_url),
          child:children!medical_reports_child_id_fkey(id, full_name)
        `,
          { count: "exact" },
        )
        .eq("mother_id", user.id);

      if (filters.childId) query = query.eq("child_id", filters.childId);
      if (filters.doctorId) query = query.eq("doctor_id", filters.doctorId);
      if (filters.reportType) query = query.eq("report_type", filters.reportType);
      if (filters.search.trim()) {
        query = query.ilike("title", `%${filters.search.trim()}%`);
      }

      query = query.order("submitted_at", {
        ascending: filters.sort === "oldest",
      });

      const from = (page - 1) * PAGE_SIZE;
      query = query.range(from, from + PAGE_SIZE - 1);

      const { data, error, count } = await query;
      if (error) throw error;

      const reports: MedicalReport[] = (data ?? []).map((row) => {
        const doctor = row.doctor as unknown as {
          id: string;
          full_name: string;
          specialization: string;
          profile_image_url: string | null;
        } | null;
        const child = row.child as unknown as {
          id: string;
          full_name: string;
        } | null;

        return {
          id: row.id,
          sessionNumber: row.session_number,
          title: row.title,
          reportType: row.report_type as "pediatric" | "psychological",
          contentText: row.content_text,
          submittedAt: row.submitted_at,
          doctor: {
            id: doctor?.id ?? "",
            fullName: doctor?.full_name ?? "",
            specialization: doctor?.specialization ?? "",
            profileImageUrl: doctor?.profile_image_url ?? null,
          },
          child: child ? { id: child.id, fullName: child.full_name } : null,
        };
      });

      return { reports, totalCount: count ?? 0 };
    },
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
}

export { PAGE_SIZE };
