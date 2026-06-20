"use client";

import { cn } from "@/lib/utils";

interface AuthShellProps {
  children: React.ReactNode;
  imageSrc?: string;
  className?: string;
}

export function AuthShell({ children, imageSrc, className }: AuthShellProps) {
  return (
    <div
      className={cn(
        "h-screen w-full grid grid-cols-1 md:grid-cols-12 bg-zinc-950 text-slate-100 overflow-x-hidden",
        className,
      )}
    >
      {/* ── (Mobile view) ── */}
      {imageSrc && (
        <div className="relative w-full h-60 sm:h-72 md:hidden bg-linear-to-t from-popover-foreground to bg-primary overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20 z-10" />
          <img
            src={imageSrc}
            alt="Authentication banner"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay scale-100"
          />
          {/* section divider */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-zinc-950 rounded-t-[2.5rem] z-20" />
        </div>
      )}

      <div className="flex flex-col justify-center items-center px-4 pb-12 pt-4 sm:px-8 md:p-12 md:col-span-6 bg-zinc-950 relative z-30 -mt-6 md:mt-0">
        <div className="w-full max-w-md mx-auto">{children}</div>
      </div>

      {/* ── (Desktop view) ── */}
      <div className="hidden md:flex md:col-span-6 relative items-center justify-center bg-linear-to-t from-popover-foreground to bg-primary p-16 overflow-hidden">
        {imageSrc && (
          <div className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl transform transition-all duration-700 hover:scale-[1.01]">
            <img
              src={imageSrc}
              alt="Portal Illustration"
              className="w-full h-screen object-contain rounded-2xl shadow-2xl border border-white/10"
            />
          </div>
        )}
      </div>
    </div>
  );
}
