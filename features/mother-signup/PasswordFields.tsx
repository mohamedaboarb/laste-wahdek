"use client";

import type {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { PasswordInput } from "./PasswordInput";
import Err from "@/components/ui/Err";

interface PasswordFieldsProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  passwordField?: Path<T>;
  confirmField?: Path<T>;
}

export function PasswordFields<T extends FieldValues>({
  register,
  errors,
  passwordField = "password" as Path<T>,
  confirmField = "confirmPassword" as Path<T>,
}: PasswordFieldsProps<T>) {
  const passwordError = errors[passwordField];
  const confirmError = errors[confirmField];

  return (
    <Field>
      <Field className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Password */}
        <Field>
          <FieldLabel htmlFor={passwordField}>كلمة المرور</FieldLabel>
          <PasswordInput
            id={passwordField}
            placeholder="••••••••"
            autoComplete="new-password"
            {...register(passwordField)}
          />
          <Err field={passwordField} errors={errors} />
        </Field>

        {/* Confirm password */}
        <Field>
          <FieldLabel htmlFor={confirmField}>تأكيد كلمة المرور</FieldLabel>
          <PasswordInput
            id={confirmField}
            placeholder="••••••••"
            autoComplete="new-password"
            {...register(confirmField)}
          />
          <Err field={confirmField} errors={errors} />
        </Field>
      </Field>

      {/* Shared hint shown once below both inputs */}
      <FieldDescription>
        {/* professional clarificaiton for password title */}
        يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، حرف كبير، رقم، ورمز خاص.
      </FieldDescription>
    </Field>
  );
}
