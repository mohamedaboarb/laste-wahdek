"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserRound,
  CalendarDays,
  PackageCheckIcon,
  FileHeart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/locale-context";

export function MobileBottomNav() {
  const { t } = useLocale();
  const pathname = usePathname();

  const navlinks = [
    { id: "home", href: "/dashboard/mother", icon: LayoutDashboard, label: t.nav.home },
    { id: "profile", href: "/dashboard/mother/profile", icon: UserRound, label: t.sideNav.profile },
    {
      id: "appointments",
      href: "/dashboard/mother/appointments",
      icon: CalendarDays,
      label: t.sideNav.appointments,
    },
    {
      id: "supscription",
      href: "/dashboard/mother/supscription",
      icon: PackageCheckIcon,
      label: t.sideNav.subscription,
    },
    { id: "records", href: "/dashboard/mother/records", icon: FileHeart, label: t.sideNav.records },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm lg:hidden">
      <div className="flex h-full items-center justify-around px-1">
        {navlinks.map(({ id, href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={id}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition-colors",
                isActive ? "text-[#d11765]" : "text-slate-400 hover:text-slate-600",
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
