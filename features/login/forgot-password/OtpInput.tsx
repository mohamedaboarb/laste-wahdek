"use client";

import { useRef, useCallback, KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  value: string; // 6-char string, e.g. "123456" or "12    "
  onChange: (val: string) => void;
  disabled?: boolean;
  hasError?: boolean;
}

const OTP_LENGTH = 6;

/**
 * OtpInput
 * ─────────────────────────────────────────────────────────────────────────────
 * A 6-box OTP grid that:
 *  • Auto-focuses the next box on every digit entry
 *  • Auto-focuses the previous box on Backspace
 *  • Handles paste — pastes the full code across all boxes instantly
 *  • Controlled via a single string value ("123456")
 *  • Works with React Hook Form via onChange callback
 */
export function OtpInput({
  value,
  onChange,
  disabled,
  hasError,
}: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // Pad/truncate the value string to exactly OTP_LENGTH chars
  const digits = value.padEnd(OTP_LENGTH, " ").split("").slice(0, OTP_LENGTH);

  const focusBox = (index: number) => {
    refs.current[Math.max(0, Math.min(OTP_LENGTH - 1, index))]?.focus();
  };

  const handleChange = useCallback(
    (index: number, raw: string) => {
      // Accept only the last digit typed (handles autofill multi-char)
      const digit = raw.replace(/\D/g, "").slice(-1);
      const next = digits.slice();
      next[index] = digit;
      onChange(next.join("").trimEnd());

      if (digit && index < OTP_LENGTH - 1) focusBox(index + 1);
    },
    [digits, onChange],
  );

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const next = digits.slice();
        if (next[index].trim()) {
          // Clear current box
          next[index] = " ";
          onChange(next.join("").trimEnd());
        } else if (index > 0) {
          // Move back and clear previous box
          next[index - 1] = " ";
          onChange(next.join("").trimEnd());
          focusBox(index - 1);
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        focusBox(index - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        focusBox(index + 1);
      }
    },
    [digits, onChange],
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, OTP_LENGTH);
      if (!pasted) return;
      onChange(pasted);
      // Focus the box after the last pasted digit
      focusBox(Math.min(pasted.length, OTP_LENGTH - 1));
    },
    [onChange],
  );

  return (
    // RTL-safe: flex-row-reverse so box 0 is on the right in RTL layouts
    <div
      className="flex flex-row justify-center gap-3"
      role="group"
      aria-label="رمز التحقق"
    >
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={digit.trim()}
          disabled={disabled}
          aria-label={`الرقم ${i + 1}`}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={cn(
            "h-14 w-12 rounded-xl border-2 bg-card text-center text-xl font-bold",
            "transition-all duration-150 outline-none",
            "focus:scale-105 focus:shadow-md",
            hasError
              ? "border-destructive text-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
              : digit.trim()
                ? "border-primary bg-primary/5 text-primary"
                : "border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20",
            disabled && "cursor-not-allowed opacity-50",
          )}
        />
      ))}
    </div>
  );
}
