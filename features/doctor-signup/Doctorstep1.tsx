"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronRight,
  Contact,
  MailIcon,
  MarsIcon,
  VenusIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { DoctorGender, step1Schema, type Step1Values } from "./Doctor.schema";
import { PasswordFields } from "../mother-signup/PasswordFields";
import Err from "@/components/ui/Err";
import { useLocale } from "@/contexts/locale-context";
import Link from "next/link";
import { SegmentedSelector } from "@/components/ui/SegmentedSelector";

interface DoctorStep1Props {
  defaultValues?: Partial<Step1Values>;
  onNext: (data: Step1Values) => void;
}

export function DoctorStep1({ defaultValues, onNext }: DoctorStep1Props) {
  const { t } = useLocale();

  const genderOptions = [
    {
      id: "male" as DoctorGender,
      Icon: MarsIcon,
      label: t.register.fields.male,
    },
    {
      id: "female" as DoctorGender,
      Icon: VenusIcon,
      label: t.register.fields.female,
    },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema(t)),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: undefined,
      ...defaultValues,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      noValidate
      className="flex flex-col w-full space-y-4" // 👈 توحيد توزيع الهيكل الرأسي للـ Form
    >
      <FieldGroup className="flex flex-col gap-4">
        {/* Full name */}
        <Field className="space-y-1.5">
          <FieldLabel
            htmlFor="fullName"
            className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
          >
            {t.register.fields.fullName}
            <span className="text-purple-400">*</span>
          </FieldLabel>
          <div className="relative">
            <Input
              id="fullName"
              placeholder={t.register.fields.fullNamePlaceholder}
              autoComplete="name"
              className="form-input"
              {...register("fullName")}
            />
            <Contact
              className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
              aria-hidden="true"
            />
          </div>
          <Err field="fullName" errors={errors} />
        </Field>

        {/* Email */}
        <Field className="space-y-1.5">
          <FieldLabel
            htmlFor="email"
            className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
          >
            {t.register.fields.email}
            <span className="text-purple-400">*</span>
          </FieldLabel>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="example@domain.com"
              autoComplete="email"
              className="form-input"
              {...register("email")}
            />
            <MailIcon
              className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
              aria-hidden="true"
            />
          </div>
          <Err field="email" errors={errors} />
        </Field>

        {/* Password */}
        <PasswordFields register={register} errors={errors} />

        {/* Gender */}
        <Field>
          <Controller
            name="gender"
            control={control}
            render={({ field, fieldState }) => (
              <SegmentedSelector
                label={t.register.fields.gender}
                options={genderOptions}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          {/* الملك الموحد للأخطاء بالخارج */}
          <Err field="gender" errors={errors} />
        </Field>

        {/* Submit / Next Button */}
        <Field className="pt-2">
          <Button
            type="submit"
            className="w-full bg-purple-600 font-bold text-white hover:bg-purple-500 active:scale-[0.98] transition-all h-11 shadow-lg shadow-purple-600/20 gap-2 group"
          >
            {t.register.next}
            {/* 👈 جعل السهم يلتف تلقائياً لليمين أو اليسار بناءً على لغة الصفحة rtl:rotate-180 */}
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </Field>

        {/* Sign-in link */}
        <p className="text-center text-sm text-zinc-400 pt-4">
          {t.register.alreadyHaveAccount}
          <Link
            href="/login"
            className="ms-1.5 font-bold text-purple-400 hover:text-purple-300 hover:underline transition-colors"
          >
            {t.register.signInLink}
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
