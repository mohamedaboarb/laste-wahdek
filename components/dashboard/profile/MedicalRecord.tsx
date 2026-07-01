"use client";

import { useFormContext } from "react-hook-form";
import { Activity, Brain, Check, FileText, ShieldCheck } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  chronicDiseases,
  ProfileFormValues,
  psychologicalStatuses,
} from "@/features/dashboard/profile/motherSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/locale-context";

interface Props {
  isEditing: boolean;
}

export function MedicalRecordCard({ isEditing }: Props) {
  const { control, watch, setValue } = useFormContext<ProfileFormValues>();
  const { t } = useLocale();
  const m = t.profile.medical;

  const selectedDiseases = watch("chronicDiseases");

  function toggleDisease(disease: string, e: React.MouseEvent) {
    if (!isEditing) return;
    e.preventDefault();
    e.stopPropagation();

    const exists = selectedDiseases.includes(disease);
    if (exists) {
      setValue(
        "chronicDiseases",
        selectedDiseases.filter((item) => item !== disease),
        { shouldDirty: true },
      );
    } else {
      setValue("chronicDiseases", [...selectedDiseases, disease], {
        shouldDirty: true,
      });
    }
  }

  return (
    <section className="overflow-hidden rounded-[32px] border border-pink-100 bg-white shadow-[0_10px_40px_rgba(236,72,153,0.06)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 md:px-10 py-7">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-100 to-cyan-100">
            <Activity className="h-6 w-6 text-emerald-600" />
          </div>

          <div>
            <h2 className="text-md md:text-2xl font-bold text-slate-900">
              {m.title}
            </h2>
            <p className="mt-1 text-xs md:text-base text-slate-500">
              {m.subtitle}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
          <ShieldCheck className="h-4 w-4" />
          {m.complete}
        </div>
      </div>

      <div className="space-y-8 p-4 md:p-10">
        {/* Chronic Diseases */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-pink-600" />
            <h3 className="font-semibold text-slate-900">
              {m.chronicDiseases}
            </h3>
          </div>

          <div className="grid gap-3 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
            {chronicDiseases.map((disease) => {
              const selected = selectedDiseases.includes(disease);
              return (
                <button
                  key={disease}
                  type="button"
                  disabled={!isEditing}
                  onClick={(e) => toggleDisease(disease, e)}
                  className={`
                    flex items-center gap-1 md:gap-3 rounded-xl border p-3 text-start transition-all text-xs md:text-base
                    ${
                      selected
                        ? "border-emerald-300 bg-emerald-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-pink-200 hover:bg-pink-50"
                    }
                  `}
                >
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full border",
                      selected
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-300",
                    )}
                  >
                    {selected && <Check className="h-2 w-2" />}
                  </div>
                  <span className="font-medium text-slate-700">{disease}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Psychological Status */}
        <div className="rounded-3xl border border-violet-100 bg-linear-to-r from-violet-50 to-fuchsia-50 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-violet-600" />
            <h3 className="font-semibold text-slate-900">{m.mentalWellness}</h3>
          </div>

          <FormField
            control={control}
            name="psychologicalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{m.currentAssessment}</FormLabel>
                <Select
                  disabled={!isEditing}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="p-4 mt-2 rounded-xl bg-white">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {psychologicalStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Clinical Notes */}
        <FormField
          control={control}
          name="clinicalHistory"
          render={({ field }) => (
            <FormItem>
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">
                  {m.clinicalNotes}
                </h3>
              </div>

              <p className="mb-4 text-sm text-slate-500">
                {m.clinicalNotesHint}
              </p>

              <FormControl>
                <Textarea
                  {...field}
                  disabled={!isEditing}
                  placeholder={m.clinicalNotesPlaceholder}
                  className="min-h-[180px] resize-none rounded-3xl border-slate-200 bg-slate-50 p-5 text-sm shadow-sm focus-visible:ring-pink-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}
