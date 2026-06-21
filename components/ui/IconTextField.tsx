import React from "react";
import { Field, FieldLabel } from "./field";
import { Input } from "./input";
import Err from "./Err";
import { cn } from "@/lib/utils";

interface IconTextFieldProps {
  id: string;
  label: string;
  icon: React.ElementType;
  fieldName: string;
  register: any;
  errors: any;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description?: string;
  labelClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
}

export default function IconTextField({
  id,
  label,
  icon: Icon,
  fieldName,
  register,
  errors,
  required = false,
  type = "text",
  placeholder,
  autoComplete,
  disabled,
  onChange,
  description,
  labelClassName,
  inputClassName,
  iconClassName,
}: IconTextFieldProps) {
  return (
    <Field className="space-y-1.5">
      <FieldLabel
        htmlFor={id}
        className={cn(
          "text-xs font-semibold text-zinc-300 uppercase tracking-wider",
          labelClassName,
        )}
      >
        {label}
        {required && <span className="text-purple-400">*</span>}
      </FieldLabel>

      <div className="relative">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className={cn("form-input", inputClassName)}
          {...register(fieldName)}
          onChange={(e) => {
            register(fieldName).onChange(e);
            if (onChange) onChange(e);
          }}
        />

        <Icon
          className={cn(
            "pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500",
            iconClassName,
          )}
          aria-hidden="true"
        />
      </div>

      {description && <p className="text-xs text-zinc-400">{description}</p>}
      <Err field={fieldName} errors={errors} />
    </Field>
  );
}
