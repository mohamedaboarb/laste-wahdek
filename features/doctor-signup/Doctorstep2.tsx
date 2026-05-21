"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  step2Schema,
  type Step2Values,
  type DoctorSpecialization,
  SPECIALIZATION_LABELS,
  SCIENTIFIC_DEGREES,
} from "./Doctor.schema";
import { CertificateUploader } from "./Certificateuploader";
import Err from "@/components/ui/Err";

interface DoctorStep2Props {
  defaultValues?: Partial<Step2Values>;
  isLoading: boolean;
  onBack: (data?: Step2Values) => void;
  onSubmit: (data: Step2Values) => void;
}

// Shared select class — matches Shadcn input aesthetic
const selectClass = cn(
  "flex h-9 w-full text-primary rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

export function DoctorStep2({
  defaultValues,
  isLoading,
  onBack,
  onSubmit,
}: DoctorStep2Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      specialization: undefined,
      scientificDegree: "",
      title: "",
      medicalLicenseNumber: "",
      bio: "",
      certificates: undefined,
      ...defaultValues,
    },
  });

  const watchedSpecialization = watch("specialization");
  const watchedDegree = watch("scientificDegree");

  useEffect(() => {
    setValue("scientificDegree", "", { shouldValidate: false });
  }, [watchedSpecialization, setValue]);

  // ── When degree changes, infer specialization ──────────────────────────────
  const handleDegreeChange = (degree: string) => {
    setValue("scientificDegree", degree, { shouldValidate: true });

    // Auto-select specialization based on degree chosen
    const inferredSpec = (
      Object.entries(SCIENTIFIC_DEGREES) as [
        DoctorSpecialization,
        readonly string[],
      ][]
    ).find(([, degrees]) => degrees.includes(degree))?.[0];

    if (inferredSpec && inferredSpec !== watchedSpecialization) {
      setValue("specialization", inferredSpec, { shouldValidate: true });
    }
  };

  const availableDegrees: readonly string[] = watchedSpecialization
    ? SCIENTIFIC_DEGREES[watchedSpecialization]
    : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="flex flex-col gap-1">
        {/* ── Specialization + Degree (linked) ─────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Specialization */}
          <Field>
            <FieldLabel htmlFor="specialization">التخصص</FieldLabel>
            <select
              id="specialization"
              className={selectClass}
              {...register("specialization")}
            >
              <option value="">اختر تخصصك</option>
              {(
                Object.keys(SPECIALIZATION_LABELS) as DoctorSpecialization[]
              ).map((key) => (
                <option key={key} value={key}>
                  {SPECIALIZATION_LABELS[key]}
                </option>
              ))}
            </select>
            <Err field="specialization" errors={errors} />
          </Field>

          {/* Scientific degree — options driven by specialization */}
          <Field>
            <FieldLabel htmlFor="scientificDegree">الدرجة العلمية</FieldLabel>
            <select
              id="scientificDegree"
              className={selectClass}
              value={watchedDegree ?? ""}
              onChange={(e) => handleDegreeChange(e.target.value)}
              disabled={!watchedSpecialization}
              aria-describedby={
                !watchedSpecialization ? "degree-hint" : undefined
              }
            >
              <option value="">
                {watchedSpecialization
                  ? "اختر الدرجة العلمية"
                  : "اختر التخصص أولاً"}
              </option>
              {availableDegrees.map((degree) => (
                <option key={degree} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
            {!watchedSpecialization && (
              <p id="degree-hint" className="mt-0 text-xs text-destructive">
                سيتم تفعيل هذا الحقل بعد اختيار التخصص.
              </p>
            )}
            <Err field="scientificDegree" errors={errors} />
          </Field>
        </div>

        {/* ── Title ───────────────────────────────────────────────────── */}
        <Field>
          <FieldLabel htmlFor="title">العنوان المهني</FieldLabel>
          <Input
            id="title"
            placeholder="مثال: دكتور نفسي أخصائي توحد وتأهيل أسري"
            autoComplete="off"
            {...register("title")}
          />
          <FieldDescription className="mt-0 text-xs text-destructive">
            العنوان الذي سيظهر في ملفك الشخصي للأمهات.
          </FieldDescription>
          <Err field="title" errors={errors} />
        </Field>

        {/* ── Medical license ──────────────────────────────────────────── */}
        <Field>
          <FieldLabel htmlFor="medicalLicenseNumber">
            رقم الترخيص الطبي
          </FieldLabel>
          <Input
            id="medicalLicenseNumber"
            placeholder="أدخل رقم الترخيص"
            autoComplete="off"
            {...register("medicalLicenseNumber")}
          />
          <Err field="medicalLicenseNumber" errors={errors} />
        </Field>

        {/* ── Bio (optional) ────────────────────────────────────────────── */}
        <Field>
          <FieldLabel htmlFor="bio">
            نبذة عنك{" "}
            <span className="font-normal text-muted-foreground">(اختياري)</span>
          </FieldLabel>
          <textarea
            id="bio"
            rows={3}
            placeholder="اكتب نبذة مختصرة عن خبرتك وأسلوب عملك..."
            className={cn(
              "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "resize-y",
            )}
            {...register("bio")}
          />
          <FieldDescription>حد أقصى 500 حرف.</FieldDescription>
        </Field>

        {/* ── Certificates uploader ─────────────────────────────────────── */}
        <Field>
          <FieldLabel>الشهادات والمؤهلات</FieldLabel>
          <Controller
            name="certificates"
            control={control}
            render={({ field }) => (
              <CertificateUploader
                onChange={(files) => field.onChange(files)}
                error={errors.certificates?.message as string | undefined}
              />
            )}
          />
        </Field>

        {/* ── Navigation ───────────────────────────────────────────────── */}
        <Field className="flex items-center gap-3">
          {/* Back */}
          <Button
            type="button"
            variant="outline"
            onClick={() => onBack(getValues())}
            disabled={isLoading}
            className="gap-2"
          >
            رجوع
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                جارٍ إرسال البيانات...
              </>
            ) : (
              <>
                <ChevronLeft className="size-4" aria-hidden="true" />
                إنشاء الحساب
              </>
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
