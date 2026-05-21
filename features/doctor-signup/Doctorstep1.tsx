"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { step1Schema, type Step1Values } from "./Doctor.schema";
import { GenderSelector } from "./GenderSelector";
import { PasswordFields } from "../mother-signup/PasswordFields";
import Err from "@/components/ui/Err";

interface DoctorStep1Props {
  defaultValues?: Partial<Step1Values>;
  onNext: (data: Step1Values) => void;
}

export function DoctorStep1({ defaultValues, onNext }: DoctorStep1Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
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
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <FieldGroup className="flex flex-col gap-4">
        {/* Full name */}
        <Field>
          <FieldLabel htmlFor="fullName">الاسم الكامل</FieldLabel>
          <Input
            id="fullName"
            placeholder="أدخل اسمك الكامل"
            autoComplete="name"
            {...register("fullName")}
          />
          <Err field="fullName" errors={errors} />
        </Field>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="example@domain.com"
            className="text-left"
            autoComplete="email"
            {...register("email")}
          />
          <FieldDescription>
            لن نشارك بريدك الإلكتروني مع أي جهة أخرى.
          </FieldDescription>
          <Err field="email" errors={errors} />
        </Field>

        {/* Password */}
        <PasswordFields register={register} errors={errors} />

        {/* gender */}
        <Field>
          <FieldLabel htmlFor="gender">النوع</FieldLabel>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <GenderSelector
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            )}
          />
          <Err field="gender" errors={errors} />
        </Field>

        {/* Next button — matches design (pink, RTL chevron) */}

        <Field>
          <Button type="submit" className="gap-2">
            <ChevronLeft className="size-4" aria-hidden="true" />
            التالي
          </Button>
        </Field>

        <p className="text-center text-sm text-muted-foreground">
          لديك حساب بالفعل؟{" "}
          <a href="/login" className="font-medium text-primary hover:underline">
            تسجيل الدخول
          </a>
        </p>
      </FieldGroup>
    </form>
  );
}
