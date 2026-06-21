"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Loader2, BookUserIcon, IdCard } from "lucide-react";
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
  type Step2Values,
  type DoctorSpecialization,
  step2schema,
} from "./Doctor.schema";
import { CertificateUploader } from "./Certificateuploader";
import Err from "@/components/ui/Err";
import { useLocale } from "@/contexts/locale-context";
import IconTextField from "@/components/ui/IconTextField";

interface DoctorStep2Props {
  defaultValues?: Partial<Step2Values>;
  isLoading: boolean;
  onBack: (data?: Step2Values) => void;
  onSubmit: (data: Step2Values) => void;
}

// 🎨 ترقية كلاسات القوائم المنسدلة لتطابق حقول الإدخال الفاخرة للهوية الداكنة
const selectClass = cn(
  "flex h-11 w-full text-white rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-sm shadow-sm transition-all focus:bg-zinc-950",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500",
  "disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-zinc-900/20",
);

export function DoctorStep2({
  defaultValues,
  isLoading,
  onBack,
  onSubmit,
}: DoctorStep2Props) {
  const { t } = useLocale();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Step2Values>({
    resolver: zodResolver(step2schema(t)),
    defaultValues: {
      specialization: undefined,
      scientificDegree: "",
      title: "",
      medicalLicenseNumber: undefined,
      bio: "",
      certificates: undefined,
      ...defaultValues,
    },
  });

  // 🟢 التحديث الاحترافي الكامل لـ الـ useEffect والـ Selectors المعتمدة عليها:

  const watchedSpecialization = watch("specialization");
  const watchedDegree = watch("scientificDegree");

  useEffect(() => {
    // 1. حارس الكود (Guard Clause): إذا لم يتم اختيار تخصص بعد، لا داعي لفحص الدرجات العلمية
    if (!watchedSpecialization) return;

    const currentDegree = getValues("scientificDegree");

    // 2. تحديد نوع المصفوفة صراحةً لمنع الـ Type Inference الخاطئ (never[])
    const validDegrees: readonly string[] =
      t.register.scientificDegrees[watchedSpecialization] ?? [];

    // 3. التحقق الذكي: إذا كانت هناك درجة مخزنة ولكنها غير متوافقة مع التخصص الحالي، يتم تصفيرها
    const isDegreeInvalid =
      currentDegree && !validDegrees.includes(currentDegree);

    if (isDegreeInvalid) {
      setValue("scientificDegree", "", { shouldValidate: false });
    }
  }, [watchedSpecialization, setValue, getValues, t]);

  // 4. تحديث الـ Selector الممرر لخيارات الـ HTML Select ليكون متوافقاً تماماً وبدون أخطاء تيب-سكربت:
  const availableDegrees: readonly string[] = watchedSpecialization
    ? t.register.scientificDegrees[watchedSpecialization]
    : [];

  const handleDegreeChange = (degree: string) => {
    setValue("scientificDegree", degree, { shouldValidate: true });

    const inferredSpec = (
      Object.entries(t.register.scientificDegrees) as [
        DoctorSpecialization,
        readonly string[],
      ][]
    ).find(([, degrees]) => degrees.includes(degree))?.[0];

    if (inferredSpec && inferredSpec !== watchedSpecialization) {
      setValue("specialization", inferredSpec, { shouldValidate: true });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col w-full space-y-4" // 👈 توحيد أبعاد الحاوية الرأسية لعدم قص الحواف الجانبية
    >
      <FieldGroup className="flex flex-col gap-4">
        {/* ── التخصص والدرجة العلمية (مرتبطان ببعضهما) ─────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Specialization */}
          <Field className="space-y-1.5">
            <FieldLabel
              htmlFor="specialization"
              className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
            >
              {t.register.doctorFields.specialization}
              <span className="text-purple-400">*</span>
            </FieldLabel>
            <select
              id="specialization"
              className={selectClass}
              {...register("specialization")}
            >
              <option value="" className="bg-zinc-950 text-zinc-500">
                {t.register.doctorFields.selectSpecialization}
              </option>
              {(
                Object.keys(
                  t.register.specializationLabels,
                ) as DoctorSpecialization[]
              ).map((key) => (
                <option
                  key={key}
                  value={key}
                  className="bg-zinc-950 text-white"
                >
                  {t.register.specializationLabels[key]}
                </option>
              ))}
            </select>
            <Err field="specialization" errors={errors} />
          </Field>

          {/* Scientific degree */}
          <Field className="space-y-1.5">
            <FieldLabel
              htmlFor="scientificDegree"
              className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
            >
              {t.register.doctorFields.scientificDegree}
              <span className="text-purple-400">*</span>
            </FieldLabel>
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
              <option value="" className="bg-zinc-950 text-zinc-500">
                {watchedSpecialization
                  ? t.register.doctorFields.scientificDegree
                  : t.register.doctorFields.selectDegreeFirst}
              </option>
              {availableDegrees.map((degree) => (
                <option
                  key={degree}
                  value={degree}
                  className="bg-zinc-950 text-white"
                >
                  {degree}
                </option>
              ))}
            </select>
            {!watchedSpecialization && (
              <p
                id="degree-hint"
                className="text-xs text-amber-500/90 font-medium animate-in fade-in duration-200"
              >
                {t.register.doctorFields.degreeHint}
              </p>
            )}
            <Err field="scientificDegree" errors={errors} />
          </Field>
        </div>

        {/* ── المسمى الوظيفي ───────────────────────────────────────────────────── */}
        {/* <Field className="space-y-1.5">
          <FieldLabel
            htmlFor="title"
            className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
          >
            {t.register.doctorFields.professionalTitle}
            <span className="text-purple-400">*</span>
          </FieldLabel>
          <div className="relative">
            <Input
              id="title"
              placeholder={t.register.doctorFields.professionalTitlePlaceholder}
              autoComplete="off"
              className="form-input"
              {...register("title")}
            />
            <BookUserIcon
              className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
              aria-hidden="true"
            />
          </div>
          <FieldDescription className="text-xs text-zinc-400">
            {t.register.doctorFields.professionalTitleHint}
          </FieldDescription>
          <Err field="title" errors={errors} />
        </Field> */}

        {/* ── رقم ترخيص ممارسة المهنة ──────────────────────────────────────────── */}
        {/* <Field className="space-y-1.5">
          <FieldLabel
            htmlFor="medicalLicenseNumber"
            className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
          >
            {t.register.doctorFields.medicalLicenseNumber}
            <span className="text-purple-400">*</span>
          </FieldLabel>
          <div className="relative">
            {" "}
            <Input
              id="medicalLicenseNumber"
              type="number"
              maxLength={10}
              placeholder={
                t.register.doctorFields.medicalLicenseNumberPlaceholder
              }
              autoComplete="off"
              className="form-input"
              {...register("medicalLicenseNumber")}
            />
            <IdCard
              className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
              aria-hidden="true"
            />
          </div>
          <Err field="medicalLicenseNumber" errors={errors} />
        </Field> */}
        {/* المسمى الوظيفي - مع التلميح الاختياري */}
        <IconTextField
          id="title"
          label={t.register.doctorFields.professionalTitle}
          icon={BookUserIcon}
          required={true}
          fieldName="title"
          placeholder={t.register.doctorFields.professionalTitlePlaceholder}
          autoComplete="off"
          register={register}
          errors={errors}
          description={t.register.doctorFields.professionalTitleHint} // 👈 مررنا التلميح هنا بسهولة
        />

        {/* رقم ترخيص ممارسة المهنة */}
        <IconTextField
          id="medicalLicenseNumber"
          label={t.register.doctorFields.medicalLicenseNumber}
          icon={IdCard}
          required={true}
          fieldName="medicalLicenseNumber"
          type="number"
          placeholder={t.register.doctorFields.medicalLicenseNumberPlaceholder}
          autoComplete="off"
          register={register}
          errors={errors}
        />
        {/* ── نبذة تعريفية (اختياري) ────────────────────────────────────────────── */}
        <Field className="space-y-1.5">
          <FieldLabel
            htmlFor="bio"
            className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
          >
            {t.register.doctorFields.bio}{" "}
            <span className="font-normal text-zinc-500 lowercase">
              ({t.register.doctorFields.bioOptional})
            </span>
          </FieldLabel>
          <textarea
            id="bio"
            rows={3}
            placeholder={t.register.doctorFields.bioPlaceholder}
            className={cn(
              "flex min-h-20 max-h-40 w-full rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-white shadow-sm transition-all",
              "placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 caret-[#a855f7]",
              "disabled:cursor-not-allowed disabled:opacity-50 resize-y",
            )}
            {...register("bio")}
          />
          <FieldDescription className="text-xs text-zinc-500">
            {t.register.doctorFields.bioHint}
          </FieldDescription>
        </Field>

        {/* ── رافع الشهادات الطبية ─────────────────────────────────────── */}
        <Field className="space-y-1.5">
          <FieldLabel className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            {t.register.doctorFields.certificates}
            <span className="text-purple-400">*</span>
          </FieldLabel>
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

        {/* ── أزرار التنقل بين المراحل ── */}
        <Field className="flex items-center gap-3 pt-3">
          {/* زر العودة للمرحلة الأولى */}
          <Button
            type="button"
            variant="outline"
            onClick={() => onBack(getValues())}
            disabled={isLoading}
            className="flex-1 h-11 bg-zinc-800 text-white gap-2 hover:bg-zinc-700 "
          >
            {/* دعم حركة السهم للـ RTL والـ LTR بشكل ديناميكي */}
            <ChevronLeft className="size-4 " aria-hidden="true" />
            {t.register.doctorFields.back}
          </Button>

          {/* زر التأكيد النهائي وإرسال الطلب */}
          <Button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="flex-2 h-11 bg-purple-600 font-bold text-white hover:bg-purple-500 active:scale-[0.98] transition-all shadow-lg shadow-purple-600/20 gap-2 group"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                {t.register.submitting}
              </>
            ) : (
              <>{t.register.submit}</>
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
