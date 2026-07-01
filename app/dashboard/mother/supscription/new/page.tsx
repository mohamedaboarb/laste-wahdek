import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SubscriptionWizardPage } from "@/features/dashboard/subscription-wizard/SubscriptionWizardPage";

export default async function NewSubscriptionPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: active } = await supabase
    .from("subscriptions")
    .select("id")
    .eq("mother_id", user.id)
    .in("status", ["active", "pending_payment"])
    .limit(1)
    .maybeSingle();

  if (active) {
    redirect("/dashboard/mother/supscription");
  }

  return <SubscriptionWizardPage />;
}
