"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AuthShell } from "./Authshell";
import { MotherSignupForm } from "./Mothersignupform";
import { DoctorSignupContent } from "@/features/doctor-signup/DoctorSignupContent";
import { useLocale } from "@/contexts/locale-context";
import { Role } from "@/lib/mock-data";
import { SegmentedSelector } from "@/components/ui/SegmentedSelector";
import { Baby, Stethoscope } from "lucide-react";

// ─── Image-panel copy per role ────────────────────────────────────────────────
const IMAGE_COPY: Record<Role, { imgPath: string }> = {
  mother: {
    imgPath: "/images/register-image.jpg",
  },
  doctor: {
    imgPath: "/images/doctor-image.webp",
  },
};

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useLocale();
  const roleOptions = [
    { id: "mother" as Role, Icon: Baby, label: t.register.roleSelector.mother },
    {
      id: "doctor" as Role,
      Icon: Stethoscope,
      label: t.register.roleSelector.doctor,
    },
  ];
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
      className={cn("w-full", className)}
      {...props}
    >
      <div
        id="auth-scroll-panel"
        className="flex flex-col w-full h-full justify-between "
      >
        {/* ── Shared role-switcher header ─────────────────────────────── */}
        <div className="w-full space-y-6">
          <div className="text-center md:text-start space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t.register.title}
            </h1>
            <p className="text-sm text-zinc-400">{t.register.subtitle}</p>
          </div>

          <div className="pt-2">
            <SegmentedSelector
              options={roleOptions}
              value={role}
              onChange={handleRoleSwitch}
            />
            {role === "doctor" && (
              <p
                role="status"
                className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-xs text-amber-400 leading-relaxed animate-in fade-in slide-in-from-top-1"
              >
                {t.signupAlerts.doctorAlert}
              </p>
            )}
          </div>
        </div>

        {/* ── Forms Content ── */}
        <div className="flex-1 w-full mt-4">
          {role === "mother" ? <MotherSignupForm /> : <DoctorSignupContent />}
        </div>
      </div>
    </AuthShell>
  );
}

export default SignupForm;
