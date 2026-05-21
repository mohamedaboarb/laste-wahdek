"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, Lock, Loader2, MailIcon, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { loginUser, ROLE_DASHBOARD, type AuthError } from "./login.service";
import { useLocale } from "@/contexts/locale-context";
import { loginSchema, LoginValues } from "@/lib/schemas";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import Err from "@/components/ui/Err";
import { PasswordInput } from "../mother-signup/PasswordInput";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLocale();

  // Global API-level error (not field-level)
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema(t)),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const rememberMe = watch("rememberMe");

  // ── Submit ──────────────────────────────────────────────────────────────────
  const onSubmit = async (data: LoginValues) => {
    setApiError(null);

    try {
      const session = await loginUser({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      // التوجيه الذكي بناءً على دور المستخدم
      const raw = searchParams.get("callbackUrl");
      const destination = raw
        ? decodeURIComponent(raw)
        : ROLE_DASHBOARD[session.role];

      router.push(destination);
      router.refresh();
    } catch (err: any) {
      // طباعة الخطأ الكامل في الكونسول لتتبعه بدقة أثناء التطوير
      const errorCode =
        err && typeof err === "object" && "code" in err
          ? (err.code as AuthError["code"])
          : "unknown";

      // جلب الرسالة المترجمة بناءً على الكود الحقيقي المستخرج
      const errorMessage = t.login.errors[errorCode] || t.login.errors.unknown;

      setApiError(errorMessage);
    }
  };

  return (
    <div className="flex bg-linear-to-r from-popover-foreground to bg-primary min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
        >
          {/* ── Header ─────────────────────────────────────────────────────── */}
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

          {/* ── API error banner ────────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {apiError && (
              <motion.div
                key={apiError}
                initial={{ opacity: 0, y: -6, height: 0 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  height: "auto",
                  x: [0, -8, 8, -6, 6, -3, 3, 0], // shake
                  transition: {
                    height: { duration: 0.2 },
                    opacity: { duration: 0.2 },
                    x: { duration: 0.45, delay: 0.1 },
                  },
                }}
                exit={{ opacity: 0, height: 0, transition: { duration: 0.15 } }}
                role="alert"
                className="mb-5 overflow-hidden"
              >
                <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-destructive"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-destructive">{apiError}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Form ───────────────────────────────────────────────────────── */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
            noValidate
          >
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">{t.login.email}</FieldLabel>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder={t.login.email_placeholder}
                  autoComplete="email"
                  disabled={isSubmitting}
                  className="ps-10"
                  {...register("email", {
                    onChange: () => setApiError(null),
                  })}
                />
                <MailIcon
                  className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <Err field="email" errors={errors} />
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">{t.login.password}</FieldLabel>
              <div className="relative">
                <PasswordInput
                  id="password"
                  placeholder={t.login.password_placeholder}
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  className="ps-10"
                  {...register("password", {
                    onChange: () => setApiError(null),
                  })}
                />
                <Lock
                  className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <Err field="password" errors={errors} />
            </Field>

            {/* Remember me + Forgot password */}
            <div className="grid grid-cols-2 items-center justify-between">
              <FieldGroup>
                <Field orientation="horizontal">
                  <Checkbox
                    id="remember-me"
                    disabled={isSubmitting}
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setValue("rememberMe", checked === true, {
                        shouldValidate: true,
                      })
                    }
                  />
                  <FieldLabel
                    htmlFor="remember-me"
                    className="cursor-pointer select-none text-sm font-normal"
                  >
                    {t.login.remember_me}
                  </FieldLabel>
                </Field>
              </FieldGroup>

              {/* Forgot password — left as-is, wired up later */}
              <button
                type="button"
                className="text-end text-sm font-medium text-primary hover:underline"
                disabled={isSubmitting}
              >
                {t.login.forgot_password}
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary font-bold text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <>
                  <LogIn className="me-2 h-4 w-4" aria-hidden="true" />
                  {t.login.submit}
                </>
              )}
            </Button>
          </form>

          {/* ── Register link ───────────────────────────────────────────────── */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t.login.no_account}{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary hover:underline"
            >
              {t.login.register}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginForm;
