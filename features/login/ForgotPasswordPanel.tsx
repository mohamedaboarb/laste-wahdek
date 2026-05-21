"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { sendPasswordReset, type AuthError } from "./login.service";
import { overlayVariant } from "./login.animations";
import { FloatingField } from "./FloatingField";
interface ForgotPanelProps {
  initialEmail: string;
  onClose: () => void;
  t: any;
}

export function ForgotPasswordPanel({
  initialEmail,
  onClose,
  t,
}: ForgotPanelProps) {
  const [email, setEmail] = useState(initialEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError(t.login.errors.email_required);
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      await sendPasswordReset(email);
      setIsSent(true);
    } catch (e: unknown) {
      const authErr = e as AuthError;
      setError(t.login.errors[authErr.code] ?? t.login.errors.unknown);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={overlayVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 z-20 flex flex-col justify-center rounded-2xl bg-white/95 px-8 backdrop-blur-md dark:bg-slate-900/95"
    >
      <button
        onClick={onClose}
        type="button"
        className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 self-start"
      >
        <ArrowLeft className="size-3.5" />
        <span>رجوع</span>
      </button>

      {isSent ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-900/30">
            <CheckCircle2 className="size-6 text-teal-600 dark:text-teal-400" />
          </div>
          <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
            {t.login.reset_sent}
          </p>
        </div>
      ) : (
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              {t.login.forgot_password}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              أدخل بريدك الإلكتروني المسجل وسنرسل لك رابطاً آمناً لإعادة تعيين
              كلمة المرور.
            </p>
          </div>

          <FloatingField
            id="reset-email"
            label={t.login.email}
            type="email"
            value={email}
            onValueChange={setEmail}
            placeholder={t.login.email_placeholder}
            icon={<Mail className="size-4" />}
            disabled={isLoading}
            hasError={!!error}
          />

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-medium text-rose-500"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-teal-600 to-teal-700 py-3 text-sm font-bold text-white shadow-md shadow-teal-500/20 hover:opacity-95 disabled:opacity-50 transition-all"
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            <span>{isLoading ? t.login.submitting : "إرسال رابط التعيين"}</span>
          </button>
        </form>
      )}
    </motion.div>
  );
}
