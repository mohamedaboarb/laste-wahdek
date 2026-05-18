import { SignupForm } from "@/features/signup/SignupForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-svh items-center justify-center py-8 bg-linear-to-r from-popover-foreground to bg-primary">
      <SignupForm className="w-full max-w-5xl" />
    </main>
  );
}
