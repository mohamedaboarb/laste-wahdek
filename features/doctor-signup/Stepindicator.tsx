"use client";

import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: 1 | 2;
}

const steps = [
  { number: 1, label: "البيانات الأساسية" },
  { number: 2, label: "البيانات المهنية" },
] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div
      dir="rtl"
      className="flex items-center justify-center gap-0"
      role="list"
      aria-label="خطوات التسجيل"
    >
      {steps.map((step, idx) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        const isLast = idx === steps.length - 1;

        return (
          <div key={step.number} role="listitem" className="flex items-center">
            {/* Step pill */}
            <div className="flex flex-col items-center gap-1">
              <div
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : isCompleted
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {isCompleted ? (
                  // Checkmark for completed steps
                  <svg viewBox="0 0 16 16" className="size-4 fill-current">
                    <path d="M13.485 1.431a1.473 1.473 0 0 0-2.104 0L6.42 6.88 3.513 3.977a1.473 1.473 0 0 0-2.104 2.104l3.961 3.962a1.474 1.474 0 0 0 2.104 0l5.011-5.011a1.473 1.473 0 0 0 0-2.104z" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line between steps */}
            {!isLast && (
              <div
                aria-hidden="true"
                className={cn(
                  "mx-3 mb-4 h-px w-16 transition-colors duration-300",
                  isCompleted ? "bg-primary/40" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
