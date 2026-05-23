import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

export async function registerUser(payload: {
  email: string;
  password: string;
}) {
  // 1. Create auth user (Supabase handles hashing + cookies)
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
  });
  if (error) throw new Error(error.message);

  // 2. Save profile
  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user!.id,
    role: "mother",
    status: "active",
  });
  if (profileError) throw new Error(profileError.message);
}
export async function signUpWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/dashboard/mom`,
    },
  });

  if (error) throw new Error(error.message);
  return data;
}
