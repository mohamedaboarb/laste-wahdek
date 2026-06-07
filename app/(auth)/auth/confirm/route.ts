import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const _next = searchParams.get("next");

  let next = "/login";
  if (_next) {
    if (_next.startsWith("/")) {
      next = _next;
    } else if (_next.startsWith("http")) {
      next = new URL(_next).pathname;
    }
  }

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      redirect(`${next}`);
    } else {
      redirect("/auth/auth-code-error");
    }
  }

  redirect("/auth/auth-code-error");
}
