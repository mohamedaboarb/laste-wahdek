import { LoginForm } from "@/components/login-form";
import LoadingState from "@/components/ui/LoadingState";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading login form..." />}>
      <LoginForm />
    </Suspense>
  );
}
