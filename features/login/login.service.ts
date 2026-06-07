import {
  ProfileRow,
  UserSession,
  LoginCredentials,
  UserRole,
  AuthError,
} from "../types/types";
import { createClient } from "@/lib/supabase/client";

async function fetchProfileAndGuard(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  emailConfirmed: boolean,
): Promise<ProfileRow> {
  if (!emailConfirmed) {
    await supabase.auth.signOut();
    throw {
      code: "email_not_confirmed",
    } satisfies AuthError;
  }
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", userId)
    .single<ProfileRow>();

  if (error || !profile) {
    await supabase.auth.signOut();
    throw {
      code: "profile_missing",
    } satisfies AuthError;
  }

  if (profile.status === "pending_approval") {
    await supabase.auth.signOut();
    throw {
      code: "pending_approval",
    } satisfies AuthError;
  }

  if (profile.status === "suspended") {
    await supabase.auth.signOut();
    throw {
      code: "suspended",
    } satisfies AuthError;
  }

  return profile;
}

// ─── Email / password login ───────────────────────────────────────────────────

export async function loginUser(
  credentials: LoginCredentials,
): Promise<UserSession> {
  const supabase = createClient();

  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email: credentials.email.trim().toLowerCase(),
      password: credentials.password.trim(),
    });

  if (authError || !authData.user || !authData.session) {
    throw {
      code: "invalid_credentials",
    } satisfies AuthError;
  }
  const emailConfirmed = !!authData.user.email_confirmed_at;
  const profile = await fetchProfileAndGuard(
    supabase,
    authData.user.id,
    emailConfirmed,
  );

  return {
    id: authData.user.id,
    email: authData.user.email!,
    role: profile.role,
    status: profile.status,
    expiresAt: authData.session.expires_at ?? 0,
  };
}

export async function getSessionFromOAuth(): Promise<UserSession | null> {
  const supabase = createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) return null;

  try {
    const profile = await fetchProfileAndGuard(supabase, session.user.id, true);
    return {
      id: session.user.id,
      email: session.user.email!,
      role: profile.role,
      status: profile.status,
      expiresAt: session.expires_at ?? 0,
    };
  } catch {
    return null;
  }
}

// ─── Google OAuth: initiate sign-in

export async function signInWithGoogle(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        prompt: "select_account",
      },
    },
  });
}

// ─── Role → route mapping

export const ROLE_DASHBOARD: Record<UserRole, string> = {
  mother: "/dashboard/mom",
  doctor: "/dashboard/doctor",
};
