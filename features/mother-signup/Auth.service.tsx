import { createClient } from "@/lib/supabase/client";
import { MotherRegisterPayload } from "../types/types";

export async function registerUser(payload: MotherRegisterPayload) {
  const supabase = createClient();

  const { email, password } = payload;

  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: `${window.location.origin}/login`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

export const handleLogout = async () => {
  const supabase = createClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    window.location.href = "/login";
  } catch (error) {
    console.error("خطأ أثناء تسجيل الخروج:", error);
  }
};
