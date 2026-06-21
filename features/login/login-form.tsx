"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn, Lock, Loader2, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import Err from "@/components/ui/Err";
import { PasswordInput } from "../mother-signup/PasswordInput";
import { SocialAuth } from "../mother-signup/Socialauth";
import { useLoginForm } from "@/hooks/useLoginForm";
import { ApiErrorMessage } from "@/components/ui/api-error-message";
import { AuthShell } from "../mother-signup/Authshell";
import { cn } from "@/lib/utils";
import IconTextField from "@/components/ui/IconTextField";

export function LoginForm() {
  const {
    t,
    form: {
      register,
      formState: { errors },
    },
    isLoading,
    apiError,
    setApiError,
    oauthLoading,
    onSubmit,
  } = useLoginForm();

  const handleInputChange =
    (fieldName: "email" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      register(fieldName).onChange(e);
      if (apiError) setApiError(null);
    };

  if (oauthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="h-9 w-9 animate-spin text-purple-500" />
          <p className="text-sm text-zinc-400">{t.login.submitting}</p>
        </div>
      </div>
    );
  }

  return (
    <AuthShell imageSrc="/images/signup-image.jpg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full space-y-6"
      >
        {/* Header */}
        <div className="text-center md:text-start space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.login.title}
          </h1>
          <p className="text-sm text-zinc-400">{t.login.subtitle}</p>
        </div>

        {/* API Error Message */}
        <ApiErrorMessage error={apiError} />

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 mt-6"
          noValidate
        >
          {/* Email */}
          {/* <Field className="space-y-1.5">
            <FieldLabel
              htmlFor="email"
              className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
            >
              {t.login.email}
            </FieldLabel>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder={t.login.email_placeholder}
                autoComplete="email"
                disabled={isLoading}
                className="form-input"
                {...register("email")}
                onChange={handleInputChange("email")}
              />
              <MailIcon
                className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                aria-hidden="true"
              />
            </div>
            <Err field="email" errors={errors} />
          </Field> */}
          <IconTextField
            id="email"
            label={t.login.email}
            icon={MailIcon}
            fieldName="email"
            type="email"
            placeholder={t.login.email_placeholder}
            autoComplete="email"
            disabled={isLoading}
            register={register}
            errors={errors}
            onChange={handleInputChange("email")}
          />
          {/* Password */}
          <Field className="space-y-1.5">
            <FieldLabel
              htmlFor="password"
              className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
            >
              {t.login.password}
            </FieldLabel>
            <div className="relative">
              <PasswordInput
                id="password"
                placeholder={t.login.password_placeholder}
                autoComplete="current-password"
                disabled={isLoading}
                {...register("password")}
                onChange={handleInputChange("password")}
              />
              <Lock
                className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                aria-hidden="true"
              />
            </div>
            <Err field="password" errors={errors} />
          </Field>

          {/* Forgot password */}
          <div className="flex justify-end -mt-1">
            <Link
              href={isLoading ? "#" : "/forgot-password"}
              className={cn(
                "text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors",
                isLoading && "pointer-events-none opacity-50",
              )}
            >
              <button
                type="button"
                className="cursor-pointer disabled:opacity-50"
                disabled={isLoading}
              >
                {t.login.forgot_password}
              </button>
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 font-bold text-white cursor-pointer hover:bg-purple-500 active:scale-[0.98] transition-all h-11 mt-2 shadow-lg shadow-purple-600/20"
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            ) : (
              <div className="flex items-center justify-center gap-2">
                <LogIn className="h-4 w-4" aria-hidden="true" />
                <span>{t.login.submit}</span>
              </div>
            )}
          </Button>

          {/* Section Divider Style inside SocialAuth if applicable */}
          <SocialAuth disabled={isLoading} />
        </form>

        {/* Register link */}
        <p className="mt-8 text-center text-sm text-zinc-400">
          {t.login.no_account}
          <Link
            href={isLoading ? "#" : "/signup"}
            className={cn(
              "ms-1.5 font-bold text-purple-400 hover:text-purple-300 hover:underline transition-colors",
              isLoading && "pointer-events-none opacity-50",
            )}
          >
            {t.login.register}
          </Link>
        </p>
      </motion.div>
    </AuthShell>
  );
}

export default LoginForm;
