"use client";

import { useLocale } from "@/contexts/locale-context";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: 1 | 2;
}

const steps = [{ number: 1 }, { number: 2 }] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const { t } = useLocale();
  return (
    <div
      className="flex items-center justify-center gap-0"
      role="list"
      aria-label="Registration Steps"
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
                      ? " text-primary"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {isCompleted ? (
                  // Checkmark for completed steps
                  <svg
                    height="200px"
                    width="200px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        style={{ fill: "#32BEA6" }}
                        d="M256,0C177.328,82.672,46.672,64,46.672,64s0,92,0,224S256,512,256,512s209.328-92,209.328-224 s0-224,0-224S334.672,82.672,256,0z"
                      ></path>
                      <polygon
                        style={{ fill: "#FFFFFF" }}
                        points="240.88,355.664 148.048,283.152 167.728,257.936 233.632,309.376 340.576,151.888 367.04,169.856 "
                      ></polygon>
                    </g>
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
                {step.number === 1
                  ? t.register.steps.step1
                  : t.register.steps.stepDoctor2}
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
