"use client";

import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrProps {
  field: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: Record<string, any>;
  className?: string;
}

export default function Err({ field, errors, className }: ErrProps) {
  const error = errors[field];

  if (!error) return null;

  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-2.5 rounded-lg border border-rose-500/15 bg-rose-500/2 px-3 py-2 text-xs font-medium text-rose-400 shadow-sm shadow-rose-950/20 backdrop-blur-md transition-all w-full",
        "animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        className,
      )}
    >
      <div className="flex shrink-0 items-center justify-center rounded-md bg-rose-500/10 p-1 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)] animate-pulse [animation-duration:4s]">
        <TriangleAlert
          className="h-3.5 w-3.5 text-rose-400 drop-shadow-[0_0_2px_rgba(244,63,94,0.5)]"
          aria-hidden="true"
        />
      </div>

      <span className="leading-relaxed tracking-wide text-rose-300/90 mt-0.5">
        {error.message as string}
      </span>
    </div>
  );
}
