import { createBrowserClient } from "@supabase/ssr";

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole = "mother" | "doctor";
export type UserStatus = "active" | "pending_approval" | "suspended";

/** Minimal shape stored in AuthContext after login. */
export interface UserSession {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  status: UserStatus;
  expiresAt: number;
}

/** What the profiles table row looks like (select-projected). */
interface ProfileRow {
  role: UserRole;
  status: UserStatus;
}

/** Structured error thrown to the UI — never raw Supabase errors. */
export interface AuthError {
  code:
    | "invalid_credentials"
    | "pending_approval"
    | "suspended"
    | "profile_missing"
    | "unknown";
  i18nKey: string;
}

// ─── Supabase browser client ──────────────────────────────────────────────────
// persistSession=false → session cookie is cleared when the tab closes (rememberMe:false).
// persistSession=true  → session survives browser restarts (rememberMe:true).

function getSupabase(persistSession = true) {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession } },
  );
}

// ─── Credentials type ────────────────────────────────────────────────────────

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

// ─── Login ───────────────────────────────────────────────────────────────────

/**
 * Authenticates the user and returns a fully-typed UserSession.
 * Throws AuthError on any failure so the UI can show a specific message.
 */
export async function loginUser(
  credentials: LoginCredentials,
): Promise<UserSession> {
  // rememberMe drives session persistence
  const supabase = getSupabase(credentials.rememberMe);

  // ── Step 1: Supabase Auth sign-in ─────────────────────────────────────────
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email: credentials.email.trim().toLowerCase(),
      password: credentials.password,
    });

  if (authError || !authData.user || !authData.session) {
    throw {
      code: "invalid_credentials",
      i18nKey: "login.errors.invalid_credentials",
    } satisfies AuthError;
  }

  // ── Step 2: Fetch profile row ──────────────────────────────────────────────
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", authData.user.id)
    .single<ProfileRow>();

  if (profileError || !profile) {
    // Auth OK but no profile row — data integrity issue, sign out cleanly
    await supabase.auth.signOut();
    throw {
      code: "profile_missing",
      i18nKey: "login.errors.profile_missing",
    } satisfies AuthError;
  }

  // ── Step 3: Status guard ───────────────────────────────────────────────────
  if (profile.status === "pending_approval") {
    await supabase.auth.signOut();
    throw {
      code: "pending_approval",
      i18nKey: "login.errors.pending_approval",
    } satisfies AuthError;
  }

  if (profile.status === "suspended") {
    await supabase.auth.signOut();
    throw {
      code: "suspended",
      i18nKey: "login.errors.suspended",
    } satisfies AuthError;
  }

  // Resolve full name: prefer doctor_details, fall back to auth metadata if available
  let fullName =
    (authData.user.user_metadata as any)?.full_name ??
    (authData.user.user_metadata as any)?.fullName ??
    "";

  if (profile.role === "doctor") {
    const { data: doctorDetails, error: doctorDetailsError } = await supabase
      .from("doctor_details")
      .select("full_name")
      .eq("id", authData.user.id)
      .single<{ full_name?: string }>();

    if (!doctorDetailsError && doctorDetails?.full_name) {
      fullName = doctorDetails.full_name;
    }
  }

  // ── Step 4: Return typed session ──────────────────────────────────────────
  return {
    id: authData.user.id,
    email: authData.user.email!,
    fullName,
    role: profile.role,
    status: profile.status,
    expiresAt: authData.session.expires_at ?? 0,
  };
}

// ─── Forgot password ──────────────────────────────────────────────────────────

/**
 * Sends a password-reset email via Supabase Auth.
 * The redirect URL must be whitelisted in Supabase dashboard →
 * Authentication → URL Configuration → Redirect URLs.
 */
export async function sendPasswordReset(email: string): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase.auth.resetPasswordForEmail(
    email.trim().toLowerCase(),
    { redirectTo: `${window.location.origin}/auth/reset-password` },
  );

  if (error) {
    throw {
      code: "unknown",
      i18nKey: "login.errors.reset_failed",
    } satisfies AuthError;
  }
}

// ─── Role → route mapping ────────────────────────────────────────────────────

export const ROLE_DASHBOARD: Record<UserRole, string> = {
  mother: "/dashboard/mom",
  doctor: "/dashboard/doctor",
};
