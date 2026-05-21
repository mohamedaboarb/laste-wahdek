"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface AuthShellProps {
  children: React.ReactNode;
  imageSrc?: string;
  imageHeadline?: string;
  imageSubtext?: string;
  className?: string;
}

export function AuthShell({
  children,
  imageSrc = "/images/signup-image.jpg",
  imageHeadline = "منصة صحة الأم والطفل",
  imageSubtext = "نربط الأمهات بالأطباء المتخصصين في رحلة الأمومة",
  className,
}: AuthShellProps) {
  return (
    <div className={cn("flex flex-col p-4 md:p-6 lg:p-0", className)}>
      <Card className={cn("w-full overflow-hidden p-0", "lg:h-[90vh]")}>
        <CardContent className={cn("grid p-0 md:grid-cols-2", "lg:h-full")}>
          {/* ── LEFT: scrollable form panel ───────────────────────────── */}
          <div className="flex flex-col overflow-y-auto">{children}</div>

          {/* ── RIGHT: image panel (hidden on mobile) ─────────────────── */}
          <div className="relative hidden bg-muted md:block">
            <img
              src={imageSrc}
              alt="صورة التسجيل"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
            <div className="absolute bottom-8 left-8 right-8 rounded-xl bg-black/40 px-5 py-4 text-white backdrop-blur-sm">
              <p className="text-base font-semibold leading-snug">
                {imageHeadline}
              </p>
              <p className="mt-1 text-xs text-white/70">{imageSubtext}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
