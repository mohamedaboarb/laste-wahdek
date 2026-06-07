import { LoginForm } from "@/features/login/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <main className="w-full h-screen overflow-hidden">
        <LoginForm />
      </main>
    </Suspense>
  );
}
