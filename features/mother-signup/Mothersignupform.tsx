"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; // 👈 استيراد الـ Router للتوجيه البرمجي
import { AlertTriangle, Loader2, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { buildPayload, signupSchema, type SignupFormValues } from "./schema";
import { registerUser } from "./Auth.service";
import { SocialAuth } from "./Socialauth";
import { PasswordFields } from "./PasswordFields";
import { useLocale } from "@/contexts/locale-context";
import Link from "next/link";
import Err from "@/components/ui/Err";
import { MotherRegisterPayload } from "../types/types";
import { cn } from "@/lib/utils";
import { ApiErrorMessage } from "@/components/ui/api-error-message";
import IconTextField from "@/components/ui/IconTextField";

const MOTHER_DEFAULTS: SignupFormValues = {
  role: "mother",
  email: "",
  password: "",
  confirmPassword: "",
};

export function MotherSignupForm() {
  const { t } = useLocale();
  const router = useRouter(); // 👈 تفعيل الـ router هنا
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema(t)),
    defaultValues: MOTHER_DEFAULTS,
  });

  const handleInputChange =
    (fieldName: "email" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      register(fieldName).onChange(e);
      if (apiMessage) setApiMessage(null);
    };

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    setApiMessage(null);

    try {
      const response = await registerUser(buildPayload(values));

      if (response.success) {
        reset();
        router.push("/signup/signup-success");
      }
    } catch (err: unknown) {
      setApiMessage(
        err instanceof Error ? err.message : t.login.errors.unknown,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col py-2 space-y-4"
      >
        <FieldGroup className="flex flex-col gap-4">
          {/* Email */}
          {/* <Field className="space-y-1.5">
            <FieldLabel
              htmlFor="m-email"
              className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
            >
              {t.register.fields.email}
              <span className="text-purple-400">*</span>
            </FieldLabel>
            <div className="relative">
              <Input
                id="m-email"
                type="email"
                placeholder={t.register.fields.email_placeholder}
                autoComplete="email"
                disabled={isLoading}
                className="form-input"
                {...register("email")}
                onChange={handleInputChange("email")}
              />
              <MailIcon
                className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                aria-hidden="true"
              />
            </div>
            <Err field={"email"} errors={errors} />
          </Field> */}
          <IconTextField
            id="email"
            label={t.register.fields.email}
            icon={MailIcon}
            required={true}
            errors={errors}
            register={register}
            fieldName="email"
            type="email"
            placeholder={t.register.fields.email_placeholder}
            autoComplete="email"
            disabled={isLoading}
          />
          <PasswordFields register={register} errors={errors} />

          {/* Hidden role */}
          <input type="hidden" {...register("role")} value="mother" />

          {/* API Error Messages (فقط في حال حدوث خطأ بما أن النجاح ينقل لصفحة أخرى) */}
          {apiMessage && <ApiErrorMessage error={apiMessage} />}

          {/* Submit Button Section */}
          <Field className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 font-bold text-white hover:bg-purple-500 active:scale-[0.98] transition-all h-11 shadow-lg shadow-purple-600/20"
              size="lg"
              aria-busy={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  {t.register.submitting}
                </span>
              ) : (
                t.register.submit
              )}
            </Button>
          </Field>

          {/* Social auth */}
          <SocialAuth
            disabled={isLoading}
            onError={(errorText) => {
              setApiMessage(errorText);
            }}
          />

          {/* Sign-in link */}
          <FieldDescription className="text-center text-sm text-zinc-400 pt-4">
            {t.register.alreadyHaveAccount}
            <Link
              href="/login"
              className={cn(
                "font-bold text-purple-400 hover:text-purple-300 hover:underline ms-1.5 transition-colors",
              )}
            >
              {t.register.signInLink}
            </Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </>
  );
}
