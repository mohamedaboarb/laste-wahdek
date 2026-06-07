"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, "type">;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative w-full">
        <Input
          {...props}
          ref={ref}
          type={visible ? "text" : "password"}
          // 👈 تم دمج جميع الكلاسات الخاصة بك هنا بشكل افتراضي داخل المكون مع الحفاظ على مرونة استقبال كلاسات إضافية
          className={cn(
            "ps-10 pe-10 bg-zinc-900/60 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500 h-11 caret-[#a855f7]",
            className,
          )}
          autoComplete={props.autoComplete ?? "new-password"}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute inset-y-0 inset-e-0 flex items-center px-3 text-zinc-500 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 rounded-e-md"
          tabIndex={-1}
        >
          {visible ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
        <Lock
          className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
          aria-hidden="true"
        />
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
