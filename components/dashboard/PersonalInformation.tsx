"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  User,
  Mail,
  Phone,
  CreditCard,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import { ProfileFormValues } from "@/app/dashboard/DashboardSchemas/motherSchema";
import { DatePickerField } from "./DatePicker";

interface Props {
  isEditing: boolean;
}

const fieldClassName =
  "h-14 rounded-2xl border-slate-200 bg-white shadow-sm transition-all focus-visible:ring-pink-200 focus-visible:border-pink-400 ps-11 text-xs";

export function PersonalInfoCard({ isEditing }: Props) {
  const { control } = useFormContext<ProfileFormValues>();

  return (
    <section className="overflow-hidden rounded-[32px] border border-pink-100 bg-white shadow-[0_10px_40px_rgba(236,72,153,0.06)]">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 px-4 md:px-10 py-7">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-pink-100 to-purple-100">
            <User className="h-6 w-6 text-pink-600" />
          </div>

          <div>
            <h2 className="text-md md:text-2xl font-bold tracking-tight text-slate-900">
              Personal Information
            </h2>

            <p className="mt-1 text-xs md:text-base text-slate-500">
              Your personal profile details.
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          Up to date
        </div>
      </div>

      {/* Body */}

      <div className="p-4 md:p-10">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Full Name */}

          <FormField
            control={control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 text-sm font-semibold text-slate-700">
                  Full Name
                </FormLabel>

                <FormControl>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      {...field}
                      disabled={!isEditing}
                      className={fieldClassName}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 text-sm font-semibold text-slate-700">
                  Email Address
                </FormLabel>

                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      {...field}
                      disabled
                      className={`${fieldClassName} bg-slate-50`}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* National ID */}

          <FormField
            control={control}
            name="nationalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 text-sm font-semibold text-slate-700">
                  National ID
                </FormLabel>

                <FormControl>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      {...field}
                      disabled={!isEditing}
                      className={fieldClassName}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}

          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 text-sm font-semibold text-slate-700">
                  Mobile Phone
                </FormLabel>

                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      {...field}
                      disabled={!isEditing}
                      className={fieldClassName}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Birth Date */}

          <div className="md:col-span-2">
            <FormField
              control={control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 text-sm font-semibold text-slate-700">
                    Date of Birth
                  </FormLabel>

                  <FormControl>
                    <DatePickerField
                      value={field.value}
                      onChange={field.onChange}
                      disabled={!isEditing}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
