"use client";

import { VenusIcon, MarsIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DoctorGender } from "./Doctor.schema";

interface GenderSelectorProps {
  value: DoctorGender | "";
  onChange: (gender: DoctorGender) => void;
  error?: string;
}

const options: { id: DoctorGender; label: string; Icon: React.ElementType }[] =
  [
    { id: "male", label: "ذكر", Icon: MarsIcon },
    { id: "female", label: "أنثى", Icon: VenusIcon },
  ];

export function GenderSelector({
  value,
  onChange,
  error,
}: GenderSelectorProps) {
  return (
    <div className="space-y-2">
      <div
        role="group"
        aria-label="نوع الطبيب"
        className="flex overflow-hidden rounded-lg border border-border bg-muted/40"
      >
        {options.map(({ id, label, Icon }) => {
          const selected = value === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={value === id}
              onClick={() => onChange(id)}
              className={cn(
                "main-btn",
                value === id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted/80",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
