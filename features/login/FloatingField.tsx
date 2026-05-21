"use client";

import { useState } from "react";

interface FloatingFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  icon: React.ReactNode;
  suffix?: React.ReactNode;
  hasError?: boolean;
}

export function FloatingField({
  id,
  label,
  value,
  onValueChange,
  icon,
  suffix,
  hasError,
  ...props
}: FloatingFieldProps) {
  const [focused, setFocused] = useState(false);
  const isLabelFloating = focused || value.length > 0;

  return (
    <div className="relative w-full text-right" dir="rtl">
      {/* الأيقونة الأساسية اليمينية */}
      <div
        className={`pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 z-10
          ${isLabelFloating ? "text-teal-600 dark:text-teal-400" : "text-slate-400"}
          ${hasError ? "text-rose-500 dark:text-rose-400" : ""}
        `}
      >
        {icon}
      </div>

      {/* حقل الإدخال الحقيقي */}
      <input
        id={id}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full rounded-xl border bg-white/60 pb-2.5 pr-11 pt-6 text-right text-sm text-slate-800 backdrop-blur-sm transition-all duration-200 outline-none dark:bg-slate-800/60 dark:text-slate-100
          ${suffix ? "pl-11" : "pl-4"}
          ${
            hasError
              ? "border-rose-400 ring-2 ring-rose-400/20 dark:border-rose-500/50"
              : focused
                ? "border-teal-500 ring-2 ring-teal-500/20 dark:border-teal-400"
                : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
          }
          disabled:cursor-not-allowed disabled:opacity-60
        `}
        {...props}
      />

      {/* النص العائم الذكي */}
      <label
        htmlFor={id}
        className={`pointer-events-none absolute right-11 transition-all duration-200 select-none
          ${
            isLabelFloating
              ? "top-2 text-[10px] font-semibold tracking-wide text-teal-600 dark:text-teal-400"
              : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
          }
          ${hasError && isLabelFloating ? "text-rose-500 dark:text-rose-400" : ""}
        `}
      >
        {label}
      </label>

      {/* الأيقونة اليسارية الإضافية (مثل كشف كلمة المرور) */}
      {suffix && (
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 flex items-center">
          {suffix}
        </div>
      )}
    </div>
  );
}
