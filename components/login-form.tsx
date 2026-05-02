"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/contexts/locale-context";
import { useAuth } from "@/contexts/auth-context";
import { mockLogin } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Heart,
  Stethoscope,
  LogIn,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const { t, dir, locale } = useLocale();
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const callbackUrl = searchParams.get("callbackUrl");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await mockLogin({ email, password });

    if (result.success && result.user) {
      login(result.user);

      if (callbackUrl) {
        router.push(decodeURIComponent(callbackUrl));
      } else {
        const defaultPath =
          result.user.role === "mother"
            ? "/dashboard/mom"
            : "/dashboard/doctor";
        router.push(defaultPath);
      }
    } else {
      setError(t.login.invalidCredentials);
    }
    setIsLoading(false);
  };

  const handleDemoLogin = async (role: "mother" | "doctor") => {
    setError("");
    setIsLoading(true);
    const demoEmail = role === "mother" ? "demo-mother" : "demo-doctor";
    const result = await mockLogin({ email: demoEmail, password: "" });

    if (result.success && result.user) {
      login(result.user);
      router.push(
        result.user.role === "mother" ? "/dashboard/mom" : "/dashboard/doctor",
      );
    }
    setIsLoading(false);
  };

  return (
    <div
      dir={dir}
      className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background px-4 py-12"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10"
            >
              <LogIn className="h-7 w-7 text-primary" />
            </motion.div>
            <h1 className="text-2xl font-bold text-primary">{t.login.title}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {t.login.subtitle}
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-5 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <Label htmlFor="login-email">{t.login.email}</Label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.login.emailPlaceholder}
                  className="ps-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="login-password">{t.login.password}</Label>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.login.passwordPlaceholder}
                  className="ps-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <span className="text-sm text-foreground">
                  {t.login.rememberMe}
                </span>
              </label>
              <button
                type="button"
                className="text-sm font-medium text-primary hover:underline"
              >
                {t.login.forgotPassword}
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <LogIn className="h-4 w-4 me-2" />
                  {t.login.submit}
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium text-muted-foreground">
              {t.login.orDivider}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Demo Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin("mother")}
              disabled={isLoading}
              className="gap-2 border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
            >
              <Heart className="h-4 w-4" />
              <span className="text-xs">{t.login.loginAsMother}</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin("doctor")}
              disabled={isLoading}
              className="gap-2 border-secondary/30 text-secondary hover:bg-secondary/5 hover:text-secondary"
            >
              <Stethoscope className="h-4 w-4" />
              <span className="text-xs">{t.login.loginAsDoctor}</span>
            </Button>
          </div>

          {/* Link to register */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t.login.noAccount}{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              {t.login.createAccount}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
