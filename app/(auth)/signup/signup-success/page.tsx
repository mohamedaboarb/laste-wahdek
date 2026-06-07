"use client";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/locale-context";
import { Link, MailIcon } from "lucide-react";

export default function SignupSuccessPage() {
  const { t } = useLocale();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 bg-zinc-950 ">
      <div className="w-full max-w-md mx-auto space-y-6 text-center animate-in fade-in zoom-in-95 duration-500 ease-out">
        {/* mail icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
          <MailIcon
            className="h-7 w-7 animate-bounce"
            style={{ animationDuration: "2s" }}
          />
        </div>

        {/* 📝 النصوص التوضيحية */}
        <div className="space-y-2.5">
          <h1 className="text-2xl md:text-3xl font-black text-zinc-100 tracking-tight">
            {t.register.submitted}
          </h1>
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-sm mx-auto">
            {t.register.checkEmail}
          </p>
        </div>

        {/* 🚀 زر التوجيه السريع الـ Micro-UX */}
        <div className="pt-2 max-w-xs mx-auto">
          <Button
            onClick={() => window.open("https://mail.google.com", "_blank")}
            className="w-full h-11 font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-lg shadow-purple-600/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            {t.register.checkEmailButton}
          </Button>
          <Button
            variant="link"
            onClick={() => window.open("/login", "_self")}
            className="w-full mt-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            {t.register.signInLink}
          </Button>
        </div>
      </div>
    </div>
  );
}
