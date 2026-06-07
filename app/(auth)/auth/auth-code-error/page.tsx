"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/locale-context";
import { cn } from "@/lib/utils";

export default function AuthCodeErrorPage() {
  const { t } = useLocale();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-6 bg-zinc-950 overflow-hidden">
      {/* 🌌 تأثير الإضاءة الخلفية المحيطية الفاخرة (Ambient Background Glow) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.02),transparent_65%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-purple-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      {/* 🔮 الكبسولة الزجاجية لبطاقة الخطأ */}
      <div
        className={cn(
          "relative max-w-md w-full space-y-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 text-center backdrop-blur-xl shadow-2xl shadow-black/50",
          "animate-in fade-in zoom-in-95 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        )}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.15)] animate-pulse [animation-duration:4s]">
          <TriangleAlert className="h-6 w-6 text-rose-400 drop-shadow-[0_0_4px_rgba(244,63,94,0.4)]" />
        </div>

        <div className="space-y-2.5">
          <h1 className="text-xl font-bold tracking-tight text-zinc-100 bg-gradient-to-b from-zinc-50 to-zinc-200 bg-clip-text">
            {t.register.errors.authLinkInvalidTitle}
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed px-1">
            {t.register.errors.authLinkInvalidDesc}
          </p>
        </div>

        <div className="pt-2">
          <Button
            asChild
            className={cn(
              "w-full h-11 font-bold text-sm rounded-xl transition-all duration-200",
              "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20",
              "active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
            )}
          >
            <Link href="/login">{t.register.errors.backToLogin}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
