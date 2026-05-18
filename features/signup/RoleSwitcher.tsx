"use client";

import { Baby, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { Role, RoleSwitcherProps } from "@/lib/mock-data";

const roles: { id: Role; labelAr: string; Icon: React.ElementType }[] = [
  { id: "mother", labelAr: "أم", Icon: Baby },
  { id: "doctor", labelAr: "طبيب / طبيبة", Icon: Stethoscope },
];

export function RoleSwitcher({ value, onChange }: RoleSwitcherProps) {
  return (
    <div className="space-y-2">
      <div
        role="group"
        aria-label="نوع الحساب"
        className="flex overflow-hidden rounded-lg border border-border bg-muted/40"
      >
        {roles.map(({ id, labelAr, Icon }) => (
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
            <span>{labelAr}</span>
          </button>
        ))}
      </div>

      {value === "doctor" && (
        <p
          role="status"
          className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800"
        >
          سيخضع حساب الطبيب لمراجعة الإدارة قبل التفعيل.
        </p>
      )}
    </div>
  );
}
