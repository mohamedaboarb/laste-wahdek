"use client";

import type { UseFormRegister, FieldErrors, Path } from "react-hook-form";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { PasswordInput } from "./PasswordInput";
import Err from "@/components/ui/Err";
import { useLocale } from "@/contexts/locale-context";

// 🌟 قمنا بتحويل الـ Props إلى Generic يعتمد على الـ FieldValues الأصلية للمكتبة
interface PasswordFieldsProps<
  TFormValues extends import("react-hook-form").FieldValues,
> {
  register: UseFormRegister<TFormValues>;
  errors: FieldErrors<TFormValues>;
}

export function PasswordFields<
  TFormValues extends import("react-hook-form").FieldValues,
>({ register, errors }: PasswordFieldsProps<TFormValues>) {
  const { t } = useLocale();

  return (
    <Field>
      <Field className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Password */}
        <Field>
          <FieldLabel
            htmlFor="password"
            className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
          >
            {t.register.fields.password}
            <span className="text-purple-400">*</span>
          </FieldLabel>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            autoComplete="new-password"
            {...register("password" as Path<TFormValues>)}
          />
          <Err field={"password" as Path<TFormValues>} errors={errors} />
        </Field>

        {/* Confirm password */}
        <Field>
          <FieldLabel
            htmlFor="confirmPassword"
            className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
          >
            {t.register.fields.confirmPassword}
            <span className="text-purple-400">*</span>
          </FieldLabel>
          <PasswordInput
            id="confirmPassword"
            placeholder="••••••••"
            autoComplete="new-password"
            {...register("confirmPassword" as Path<TFormValues>)} // 🌟 تحويل آمن وديناميكي تماماً
          />
          <Err field={"confirmPassword" as Path<TFormValues>} errors={errors} />
        </Field>
      </Field>

      {/* Shared hint shown once below both inputs */}
      <FieldDescription className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
        {t.signupAlerts.passwordClarification}
      </FieldDescription>
    </Field>
  );
}
