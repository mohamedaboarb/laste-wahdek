"use client";

import { useState, useEffect, useCallback } from "react";
import { RotateCcw } from "lucide-react";

interface ResendTimerProps {
  onResend: () => Promise<void>;
  initialSecs?: number; // default 60
  disabled?: boolean;
  labelResend: string; // t.forgotPassword.resend_code
  labelWait: string; // t.forgotPassword.resend_in  "إعادة الإرسال بعد"
}

/**
 * ResendTimer
 * Counts down from initialSecs. When it reaches 0 the "Resend" button
 * becomes active. Clicking it calls onResend() and resets the timer.
 */
export function ResendTimer({
  onResend,
  initialSecs = 60,
  disabled,
  labelResend,
  labelWait,
}: ResendTimerProps) {
  const [secs, setSecs] = useState(initialSecs);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (secs <= 0) return;
    const id = setInterval(() => setSecs((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secs]);

  const handleResend = useCallback(async () => {
    setLoading(true);
    try {
      await onResend();
      setSecs(initialSecs);
    } finally {
      setLoading(false);
    }
  }, [onResend, initialSecs]);

  if (secs > 0) {
    return (
      <p className="text-center text-sm text-primary">
        {labelWait}{" "}
        <span className="font-semibold tabular-nums text-white">
          {String(Math.floor(secs / 60)).padStart(2, "0")}:
          {String(secs % 60).padStart(2, "0")}
        </span>
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={handleResend}
      disabled={loading || disabled}
      className="mx-auto flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline disabled:opacity-50"
    >
      <RotateCcw
        className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
        aria-hidden="true"
      />
      {labelResend}
    </button>
  );
}
