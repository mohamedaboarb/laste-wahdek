"use client";

import {
  UserRound,
  CalendarDays,
  FileHeart,
  LayoutDashboard,
  LogOut,
  PackageCheckIcon,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

const navlinks = [
  {
    id: "home",
    label: "Home",
    href: "/dashboard/mother",
    icon: LayoutDashboard,
  },
  {
    id: "profile",
    label: "Profile",
    href: "/dashboard/mother/profile",
    icon: UserRound,
  },
  {
    id: "appointments",
    label: "Appointements & Calendars",
    href: "/dashboard/mother/appointments",
    icon: CalendarDays,
  },
  {
    id: "supscription",
    label: "supscription & Marketplace",
    href: "/dashboard/mother/supscription",
    icon: PackageCheckIcon,
  },
  {
    id: "records",
    label: "Medical Records",
    href: "/dashboard/mother/records",
    icon: FileHeart,
  },
];

export default function SideNavbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "h-full bg-white border-e border-[#EADFF2]/60 p-2 flex flex-col",
        "w-20 md:w-64",
      )}
    >
      {/* الجزء العلوي: اللوجو والـ Brand Name */}
      <div className="flex flex-col items-center md:items-start px-2 py-4 flex-none">
        <Link
          href="/dashboard/mother"
          className="flex items-center gap-3 group"
        >
          <div className="h-10 w-10 bg-linear-to-b from-pink-500 via-rose-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-[#A83279]/20 shrink-0">
            <WandSparkles size={20} />
          </div>
          <span
            className={cn(
              "hidden md:block font-extrabold text-xl bg-linear-to-r from-popover-foreground to-primary bg-clip-text text-transparent tracking-tight transition-all duration-300",
            )}
          >
            Laste Wahdek
          </span>
        </Link>
      </div>

      {/* الجزء الأوسط: روابط التنقل الأساسية */}
      {/* تم تغيير overflow-y-auto إلى overflow-hidden لمنع ظهور أي سكرول نهائياً */}
      <div className="flex-1 min-h-0 flex flex-col gap-1.5 mt-2">
        {navlinks.map((link) => {
          const LinkIcon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.id}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex h-10 shrink-0 items-center justify-center gap-3 rounded-sm px-3 text-sm font-semibold transition-all duration-200 md:justify-start",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                isActive
                  ? "bg-linear-to-r from-pink-500 via-rose-500 to-violet-500 text-white"
                  : "text-[#7A6E85] hover:bg-[#FAF8FC] hover:text-[#1E152A]",
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
                  isActive
                    ? "text-white"
                    : "text-[#7A6E85] group-hover:text-[#1E152A]",
                )}
              >
                <LinkIcon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </span>

              <p className="hidden md:block truncate transition-all duration-200">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>

      {/* الجزء السفلي: كارت المستخدم - أضفنا mt-auto ليدفع نفسه لأسفل السايد بار بدقة وبدون مشاكل أبعاد */}
      <div className="pt-4 border-t border-[#F7F3FA] flex flex-col gap-2 flex-none mt-auto">
        <div className="flex items-center justify-center md:justify-between p-2 rounded-2xl bg-[#f4e9ff] border border-[#EADFF2]/40 transition-all group">
          <div className="flex items-center gap-3 truncate">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 uppercase">
              {(user?.name || "U")
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="hidden md:flex flex-col text-left truncate">
              <span className="text-xs font-bold text-[#1E152A] truncate">
                {user?.name?.toUpperCase() || "User"}
              </span>
              <span className="text-[10px] font-medium text-[#7A6E85] truncate">
                {user?.email || "Email Not Found"}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="hidden md:flex h-7 w-7 items-center justify-center rounded-lg text-[#7A6E85] hover:bg-red-50 hover:text-red-600 transition-colors shrink-0"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}
