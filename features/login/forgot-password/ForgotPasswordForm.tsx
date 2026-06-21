"use client";

/**
 * ForgotPasswordForm.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * 4-step forgot-password wizard configured to perfectly match the dark theme.
 */

import { useState, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import Err from "@/components/ui/Err";

import { useLocale } from "@/contexts/locale-context";
import {
  forgotEmailSchema,
  type ForgotEmailValues,
  forgotOtpSchema,
  type ForgotOtpValues,
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/lib/schemas";
import {
  sendOtp,
  verifyOtp,
  updatePassword,
  type ForgotPasswordError,
} from "./forgot-password.service";
import { OtpInput } from "./OtpInput";
import { ResendTimer } from "./ResendTimer";
import { StepShell } from "./StepShell";
import { PasswordFields } from "@/features/mother-signup/PasswordFields";
import IconTextField from "@/components/ui/IconTextField";

type Step = "email" | "otp" | "password" | "success";

// ─── Shared error banner ──────────────────────────────────────────────────────

function ApiErrorBanner({ message }: { message: string | null }) {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          key={message}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: 1,
            height: "auto",
            x: [0, -7, 7, -5, 5, -2, 2, 0],
            transition: {
              height: { duration: 0.2 },
              x: { duration: 0.4, delay: 0.1 },
            },
          }}
          exit={{ opacity: 0, height: 0, transition: { duration: 0.15 } }}
          role="alert"
          aria-live="assertive"
          className="mb-5 overflow-hidden"
        >
          <div className="flex items-center gap-3 rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm font-medium">
            <AlertCircle
              className="h-5 w-5 shrink-0 text-destructive"
              aria-hidden="true"
            />
            <p className="text-destructive leading-normal text-xs md:text-sm">
              {message}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ForgotPasswordForm() {
  const { t } = useLocale();
  const fp = t.forgotPassword;

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);

  const errMsg = useCallback(
    (e: unknown): string => {
      const code = (e as ForgotPasswordError).code ?? "unknown";
      const map: Record<ForgotPasswordError["code"], string> = {
        email_not_found: fp.errors.api_email_not_found,
        otp_invalid: fp.errors.otp_invalid,
        otp_expired: fp.errors.otp_expired,
        update_failed: fp.errors.update_failed,
        unknown: fp.errors.api_send_failed,
      };
      return (
        map[code as ForgotPasswordError["code"]] ?? fp.errors.api_send_failed
      );
    },
    [fp],
  );

  // ── Step 1: Email ──
  const emailForm = useForm<ForgotEmailValues>({
    resolver: zodResolver(forgotEmailSchema(t)),
    defaultValues: { email: "" },
  });

  const onEmailSubmit = async (data: ForgotEmailValues) => {
    setApiError(null);
    try {
      await sendOtp(data.email);
      setEmail(data.email);
      setStep("otp");
    } catch (e) {
      setApiError(errMsg(e));
    }
  };

  // ── Step 2: OTP ──
  const otpForm = useForm<ForgotOtpValues>({
    resolver: zodResolver(forgotOtpSchema(t)),
    defaultValues: { otp: "" },
  });

  const onOtpSubmit = async (data: ForgotOtpValues) => {
    setApiError(null);
    try {
      await verifyOtp(email, data.otp);
      setStep("password");
    } catch (e) {
      setApiError(errMsg(e));
    }
  };

  const handleResend = useCallback(async () => {
    setApiError(null);
    // clear otp inputs
    otpForm.reset();
    try {
      await sendOtp(email);
    } catch (e) {
      setApiError(errMsg(e));
    }
  }, [email, errMsg]);

  // ── Step 3: New password ──
  const pwForm = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema(t)),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onPasswordSubmit = async (data: ForgotPasswordValues) => {
    setApiError(null);
    try {
      await updatePassword(data.password);
      setStep("success");
    } catch (e) {
      setApiError(errMsg(e));
    }
  };

  const goBack = (target: Step) => {
    setApiError(null);
    setStep(target);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4 py-8 antialiased">
      <div className="w-full max-w-md mx-auto">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md p-6 shadow-2xl shadow-purple-500/[0.01] md:p-8">
          <AnimatePresence mode="wait">
            {/* ── Step 1: Email ─────────────────────────────────────────── */}
            {step === "email" && (
              <StepShell
                stepKey="email"
                title={fp.step1.title}
                subtitle={fp.step1.subtitle}
              >
                <ApiErrorBanner message={apiError} />

                <form
                  onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                  noValidate
                  className="flex flex-col space-y-4 pt-2"
                >
                  {/* <Field className="space-y-2">
                    <FieldLabel
                      htmlFor="fp-email"
                      className="text-xs font-bold text-zinc-300 uppercase tracking-wider"
                    >
                      {fp.step1.email_label}
                      <span className="text-purple-500">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id="fp-email"
                        type="email"
                        placeholder={fp.step1.email_placeholder}
                        autoComplete="email"
                        disabled={emailForm.formState.isSubmitting}
                        className="form-input"
                        {...emailForm.register("email")}
                        onChange={(e) => {
                          emailForm.register("email").onChange(e);
                          setApiError(null);
                        }}
                      />
                      <Mail
                        className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                        aria-hidden="true"
                      />
                    </div>
                    <Err field="email" errors={emailForm.formState.errors} />
                  </Field> */}
                  <IconTextField
                    id="fp-email"
                    label={fp.step1.email_label}
                    icon={Mail}
                    required={true}
                    fieldName="email"
                    type="email"
                    placeholder={fp.step1.email_placeholder}
                    autoComplete="email"
                    disabled={emailForm.formState.isSubmitting}
                    register={emailForm.register}
                    errors={emailForm.formState.errors}
                    onChange={() => setApiError(null)}
                  />
                  <Field className="pt-2">
                    <Button
                      type="submit"
                      disabled={emailForm.formState.isSubmitting}
                      className="w-full bg-purple-600 font-bold text-white hover:bg-purple-500 active:scale-[0.99] transition-all h-11 rounded-xl shadow-lg shadow-purple-600/10"
                      size="lg"
                    >
                      {emailForm.formState.isSubmitting ? (
                        <Loader2
                          className="h-4 w-4 animate-spin"
                          aria-hidden="true"
                        />
                      ) : (
                        fp.step1.submit
                      )}
                    </Button>
                  </Field>

                  <FieldDescription className="text-center text-sm pt-4">
                    <Link
                      href="/login"
                      className="font-bold text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                    >
                      {fp.back_to_login}
                    </Link>
                  </FieldDescription>
                </form>
              </StepShell>
            )}

            {/* ── Step 2: OTP ───────────────────────────────────────────── */}
            {step === "otp" && (
              <StepShell
                stepKey="otp"
                title={fp.step2.title}
                subtitle={`${fp.step2.subtitle} ${email}`}
                onBack={() => goBack("email")}
                backLabel={fp.back}
              >
                <ApiErrorBanner message={apiError} />

                <form
                  onSubmit={otpForm.handleSubmit(onOtpSubmit)}
                  noValidate
                  className="flex flex-col space-y-5 pt-2"
                >
                  <Controller
                    name="otp"
                    control={otpForm.control}
                    render={({ field }) => (
                      <OtpInput
                        value={field.value}
                        onChange={(val) => {
                          field.onChange(val);
                          setApiError(null);
                        }}
                        disabled={otpForm.formState.isSubmitting}
                        hasError={!!otpForm.formState.errors.otp}
                      />
                    )}
                  />

                  {otpForm.formState.errors.otp && (
                    <p
                      className="text-center text-xs text-destructive font-semibold"
                      role="alert"
                    >
                      {otpForm.formState.errors.otp.message}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={otpForm.formState.isSubmitting}
                    className="w-full bg-purple-600 font-bold text-white hover:bg-purple-500 active:scale-[0.99] transition-all h-11 rounded-xl shadow-lg shadow-purple-600/10"
                    size="lg"
                  >
                    {otpForm.formState.isSubmitting ? (
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      fp.step2.submit
                    )}
                  </Button>

                  <ResendTimer
                    onResend={handleResend}
                    disabled={otpForm.formState.isSubmitting}
                    labelResend={fp.step2.resend_code}
                    labelWait={fp.step2.resend_in}
                  />
                </form>
              </StepShell>
            )}

            {/* ── Step 3: New password ──────────────────────────────────── */}
            {step === "password" && (
              <StepShell
                stepKey="password"
                title={fp.step3.title}
                subtitle={fp.step3.subtitle}
                onBack={() => goBack("otp")}
                backLabel={fp.back}
              >
                <ApiErrorBanner message={apiError} />

                <form
                  onSubmit={pwForm.handleSubmit(onPasswordSubmit)}
                  noValidate
                  className="flex flex-col space-y-4 pt-2"
                >
                  <PasswordFields
                    register={pwForm.register}
                    errors={pwForm.formState.errors}
                  />

                  <Field className="pt-2">
                    <Button
                      type="submit"
                      disabled={pwForm.formState.isSubmitting}
                      className="w-full bg-purple-600 font-bold text-white hover:bg-purple-500 active:scale-[0.99] transition-all h-11 rounded-xl shadow-lg shadow-purple-600/10"
                      size="lg"
                    >
                      {pwForm.formState.isSubmitting ? (
                        <Loader2
                          className="h-4 w-4 animate-spin"
                          aria-hidden="true"
                        />
                      ) : (
                        fp.step3.submit
                      )}
                    </Button>
                  </Field>
                </form>
              </StepShell>
            )}

            {/* ── Step 4: Success ───────────────────────────────────────── */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
                className="flex flex-col items-center gap-6 py-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                >
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </motion.div>

                <div className="space-y-2">
                  <h1 className="text-2xl font-black text-zinc-100 tracking-tight">
                    {fp.step4.title}
                  </h1>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
                    {fp.step4.subtitle}
                  </p>
                </div>

                <div className="w-full pt-2 max-w-xs mx-auto">
                  <Link href="/login" className="w-full">
                    <Button
                      className="w-full h-11 font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-lg shadow-purple-600/10 active:scale-[0.99] transition-all"
                      size="lg"
                    >
                      {fp.step4.back_to_login}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
