// features/forgot-password/hooks/useForgotPassword.ts
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "@/contexts/locale-context";
import {
  forgotEmailSchema,
  forgotOtpSchema,
  forgotPasswordSchema,
  type ForgotEmailValues,
  type ForgotOtpValues,
  type ForgotPasswordValues,
} from "@/lib/schemas";
import {
  ForgotPasswordError,
  sendOtp,
  updatePassword,
  verifyOtp,
} from "@/features/login/forgot-password/forgot-password.service";

export type Step = "email" | "otp" | "password" | "success";

export function useForgotPassword() {
  const { t } = useLocale();
  const fp = t.forgotPassword;

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);

  const errMsg = useCallback(
    (err: unknown): string => {
      const code = (err as ForgotPasswordError).code ?? "unknown";
      const map: Record<ForgotPasswordError["code"], string> = {
        email_not_found: fp.errors.api_email_not_found,
        otp_invalid: fp.errors.otp_invalid,
        otp_expired: fp.errors.otp_expired,
        update_failed: fp.errors.update_failed,
        unknown: fp.errors.api_send_failed,
      };
      return map[code] ?? fp.errors.api_send_failed;
    },
    [fp],
  );

  const emailForm = useForm<ForgotEmailValues>({
    resolver: zodResolver(forgotEmailSchema(t)),
    defaultValues: { email: "" },
  });

  const otpForm = useForm<ForgotOtpValues>({
    resolver: zodResolver(forgotOtpSchema(t)),
    defaultValues: { otp: "" },
  });

  const pwForm = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema(t)),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const handleEmailSubmit = async (data: ForgotEmailValues) => {
    setApiError(null);
    try {
      await sendOtp(data.email);
      setEmail(data.email);
      setStep("otp");
    } catch (e) {
      setApiError(errMsg(e));
    }
  };

  const handleOtpSubmit = async (data: ForgotOtpValues) => {
    setApiError(null);
    try {
      await verifyOtp(email, data.otp);
      setStep("password");
    } catch (e) {
      setApiError(errMsg(e));
    }
  };

  const handleResendOtp = async () => {
    setApiError(null);
    try {
      await sendOtp(email);
    } catch (e) {
      setApiError(errMsg(e));
    }
  };

  const handlePasswordSubmit = async (data: ForgotPasswordValues) => {
    setApiError(null);
    try {
      await updatePassword(data.password);
      setStep("success");
    } catch (e) {
      setApiError(errMsg(e));
    }
  };

  const goBackTo = (target: Step) => {
    setApiError(null);
    setStep(target);
  };

  return {
    step,
    email,
    apiError,
    setApiError,
    fp,
    emailForm,
    otpForm,
    pwForm,
    handleEmailSubmit,
    handleOtpSubmit,
    handleResendOtp,
    handlePasswordSubmit,
    goBackTo,
  };
}
