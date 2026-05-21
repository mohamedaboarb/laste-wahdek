"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// ── Shared shell ──────────────────────────────────────────────────────────────
import { AuthShell } from "./Authshell";

// ── Role switcher ─────────────────────────────────────────────────────────────
import { RoleSwitcher } from "./RoleSwitcher";

// ── Role-specific form content ────────────────────────────────────────────────
import { MotherSignupForm } from "./Mothersignupform";

import { DoctorSignupContent } from "@/features/doctor-signup/DoctorSignupContent";

import type { Role } from "./schema";

// ─── Props ────────────────────────────────────────────────────────────────────

// ─── Image-panel copy per role ────────────────────────────────────────────────
const IMAGE_COPY: Record<
  Role,
  { headline: string; subtext: string; imgPath: string }
> = {
  mother: {
    headline: "منصة صحة الأم والطفل",
    subtext: "نربط الأمهات بالأطباء المتخصصين في رحلة الأمومة",
    imgPath: "/images/register-image.jpg",
  },
  doctor: {
    headline: "انضم إلى منصة صحة الأم والطفل",
    subtext: "ساعد الأمهات في رحلتهن مع طاقم طبي متخصص وموثوق",
    imgPath: "/images/doctor-image.webp",
  },
};
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [role, setRole] = useState<Role>("mother");

  const handleRoleSwitch = (newRole: Role) => {
    setRole(newRole);
    document
      .getElementById("auth-scroll-panel")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AuthShell
      imageSrc={IMAGE_COPY[role].imgPath}
      imageHeadline={IMAGE_COPY[role].headline}
      imageSubtext={IMAGE_COPY[role].subtext}
      className={cn("w-full", className)}
      {...props}
    >
      <div id="auth-scroll-panel" className="flex flex-col overflow-y-auto">
        {/* ── Shared role-switcher header ─────────────────────────────── */}
        <div className="px-6 pt-6 md:px-8 md:pt-8">
          <div className="mb-4 flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold text-primary">إنشاء حساب جديد</h1>
            <p className="text-sm text-muted-foreground">
              اختر نوع حسابك للبدء
            </p>
          </div>
          <RoleSwitcher value={role} onChange={handleRoleSwitch} />
        </div>

        {role === "mother" ? <MotherSignupForm /> : <DoctorSignupContent />}
      </div>
    </AuthShell>
  );
}

export default SignupForm;
