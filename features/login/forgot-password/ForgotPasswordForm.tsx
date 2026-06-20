"use client";

import { Mail, Loader2 } from "lucide-react";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import Err from "@/components/ui/Err";
import { ForgotEmailValues } from "@/lib/schemas";
import { StepShell } from "./StepShell";
import { cn } from "@/lib/utils";

interface EmailStepProps {
  form: UseFormReturn<ForgotEmailValues>;
  onSubmit: (data: ForgotEmailValues) => void;
  labels: any;
  onClearError: () => void;
}

export function EmailStep({
  form,
  onSubmit,
  labels,
  onClearError,
}: EmailStepProps) {
  return (
    <StepShell
      stepKey="email"
      title={labels.step1.title}
      subtitle={labels.step1.subtitle}
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col py-2 space-y-4"
      >
        {/* Email Field */}
        <Field className="space-y-1.5">
          <FieldLabel
            htmlFor="fp-email"
            className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
          >
            {labels.step1.email_label}
            <span className="text-purple-400">*</span>
          </FieldLabel>

          <div className="relative">
            <Input
              id="fp-email"
              type="email"
              placeholder={labels.step1.email_placeholder}
              disabled={form.formState.isSubmitting}
              className="form-input"
              {...form.register("email")}
              onChange={(e) => {
                form.register("email").onChange(e);
                onClearError();
              }}
            />
            <Mail
              className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
              aria-hidden="true"
            />
          </div>
          <Err field="email" errors={form.formState.errors} />
        </Field>

        {/* Submit Button Section */}
        <Field className="pt-2">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-purple-600 font-bold text-white hover:bg-purple-500 active:scale-[0.98] transition-all h-11 shadow-lg shadow-purple-600/20"
            size="lg"
            aria-busy={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              </span>
            ) : (
              labels.step1.submit
            )}
          </Button>
        </Field>

        {/* Sign-in / Back to login Link Footer */}
        <FieldDescription className="text-center text-sm text-zinc-400 pt-4">
          <Link
            href="/login"
            className={cn(
              "font-bold text-purple-400 hover:text-purple-300 hover:underline transition-colors",
            )}
          >
            {labels.back_to_login}
          </Link>
        </FieldDescription>
      </form>
    </StepShell>
  );
}
