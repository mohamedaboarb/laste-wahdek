"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Option<T extends string> {
  id: T;
  label: string;
  Icon: React.ElementType;
}

interface SegmentedSelectorProps<T extends string> {
  options: Option<T>[];
  value: T | "";
  onChange: (value: T) => void;
  label?: string;
  error?: string;
}

export function SegmentedSelector<T extends string>({
  options,
  value,
  onChange,
  label,
  error,
}: SegmentedSelectorProps<T>) {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block ">
          {label}
          <span className="text-purple-400 ms-2">*</span>
        </span>
      )}

      <div
        role="group"
        className={cn(
          "flex overflow-hidden rounded-lg border bg-zinc-900/40 p-1 gap-1 transition-colors duration-200",
          error ? "border-rose-500/15" : "border-zinc-800",
        )}
      >
        {options.map(({ id, Icon, label: optionLabel }) => {
          const isSelected = value === id;

          return (
            <button
              key={id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-all duration-200 outline-none",
                "focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                isSelected
                  ? "bg-purple-600 text-white shadow-md font-bold"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200",
              )}
            >
              <Icon
                className={cn(
                  "size-4 transition-transform duration-200",
                  isSelected && "scale-110",
                )}
                aria-hidden="true"
              />
              <span>{optionLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
