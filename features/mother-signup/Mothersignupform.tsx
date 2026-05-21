// "use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { signupSchema, buildPayload, type SignupFormValues } from "./schema";
import { registerUser } from "./Auth.service";
import { SocialAuth } from "./Socialauth";
import { PasswordFields } from "./PasswordFields";
import { useRouter } from "next/navigation";

const MOTHER_DEFAULTS: SignupFormValues = {
  role: "mother",
  email: "",
  password: "",
  confirmPassword: "",
};

/**
 * MotherSignupForm
 * Pure form content — no layout shell. Rendered inside AuthShell by the
 * parent SignupForm router.
 */
export function MotherSignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: MOTHER_DEFAULTS,
  });

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    setApiError(null);
    try {
      await registerUser(buildPayload(values));
      router.push("/dashboard/mom");
    } catch (err: unknown) {
      setApiError(
        err instanceof Error ? err.message : "حدث خطأ غير متوقع. حاول مجدداً.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const Err = ({ field }: { field: keyof SignupFormValues }) =>
    errors[field] ? (
      <p className="mt-1 text-xs text-destructive" role="alert">
        {errors[field]?.message as string}
      </p>
    ) : null;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col p-6 md:p-8"
      >
        <FieldGroup className="flex flex-1 flex-col gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="m-email">البريد الإلكتروني</FieldLabel>
            <Input
              id="m-email"
              type="email"
              placeholder="example@domain.com"
              autoComplete="email"
              {...register("email")}
            />
            <FieldDescription>
              لن نشارك بريدك الإلكتروني مع أي جهة أخرى.
            </FieldDescription>
            <Err field="email" />
          </Field>

          <PasswordFields register={register} errors={errors} />

          {/* Hidden role */}
          <input type="hidden" {...register("role")} value="mother" />

          {/* API error */}
          {apiError && (
            <p
              role="alert"
              className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {apiError}
            </p>
          )}

          {/* Submit */}
          <Field className="mt-auto pt-2">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2
                    className="ml-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                  جارٍ إنشاء الحساب...
                </>
              ) : (
                "إنشاء الحساب"
              )}
            </Button>
          </Field>

          {/* Social auth */}
          <SocialAuth />

          {/* Sign-in link */}
          <FieldDescription className="text-center">
            لديك حساب بالفعل؟{" "}
            <a
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              تسجيل الدخول
            </a>
          </FieldDescription>
        </FieldGroup>
      </form>
    </>
  );
}
