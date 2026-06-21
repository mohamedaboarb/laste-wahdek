"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { DashboardUser } from "./dashboard.types";

const EMPTY_USER: DashboardUser = { name: "", email: null, avatarUrl: null };

/**
 * Resolves the greeting name shown in DashboardNavbar.
 * Priority:
 *  1. profiles.full_name (or doctor_details.full_name for doctors) once the user sets it
 *  2. the part of their email before "@" (e.g. "fatma.ali@gmail.com" -> "fatma.ali")
 */
export function useDashboardUser() {
  const [user, setUser] = useState<DashboardUser>(EMPTY_USER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const supabase = createClient();

    async function load() {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        if (mounted) setLoading(false);
        return;
      }

      const email = authUser.email ?? null;
      const emailPrefix = email ? email.split("@")[0] : "";
      let displayName = emailPrefix;

      // Best-effort: read a stored display name once the user has set one.
      // Falls back silently to the email prefix if the column/row doesn't exist yet.
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", authUser.id)
          .maybeSingle();

        if (profile && (profile as { full_name?: string }).full_name) {
          displayName = (profile as { full_name: string }).full_name;
        }
      } catch {
        // profiles.full_name may not exist for every role yet — safe to ignore.
      }

      if (mounted) {
        setUser({
          name: displayName,
          email,
          avatarUrl: (authUser.user_metadata?.avatar_url as string | undefined) ?? null,
        });
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return { ...user, loading };
}
