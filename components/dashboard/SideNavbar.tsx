// "use client";
// import clsx from "clsx";
// import {
//   Baby,
//   CalendarDays,
//   FileHeart,
//   LayoutDashboard,
//   PackageCheckIcon,
// } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const navlinks = [
//   {
//     id: "home",
//     label: "Home",
//     href: "/dashboard/mother",
//     icon: LayoutDashboard,
//   },
//   {
//     id: "profile",
//     label: "Profile",
//     href: "/dashboard/mother/profile",
//     icon: Baby,
//   },
//   {
//     id: "appointments",
//     label: "Appointements & Calendars",
//     href: "/dashboard/mother/appointments",
//     icon: CalendarDays,
//   },
//   {
//     id: "supscription",
//     label: "supscription & Marketplace",
//     href: "/dashboard/mother/supscription",
//     icon: PackageCheckIcon,
//   },
//   {
//     id: "records",
//     label: "Medical Records",
//     href: "/dashboard/mother/records",
//     icon: FileHeart,
//   },
// ];
// export default function SideNavbar() {
//   const pathname = usePathname();
//   return (
//     <>
//       {navlinks.map((link) => {
//         const LinkIcon = link.icon;
//         return (
//           <Link
//             key={link.label}
//             href={link.href}
//             className={clsx(
//               "flex h-[56px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
//               {
//                 "bg-sky-100 text-blue-600": pathname === link.href,
//               },
//             )}
//           >
//             <LinkIcon className="w-6" />
//             <p className="hidden md:block">{link.label}</p>
//           </Link>
//         );
//       })}
//     </>
//   );
// }
"use client";

import {
  Baby,
  CalendarDays,
  FileHeart,
  LayoutDashboard,
  PackageCheckIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
    icon: Baby,
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
  const pathname = usePathname();

  return (
    <nav className="flex flex-row gap-2 md:flex-col md:gap-1.5">
      {navlinks.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.id}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group relative flex h-14 grow items-center justify-center gap-3 rounded-2xl ps-3 pe-3 text-sm font-semibold transition-all duration-200 md:flex-none md:justify-start",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
              isActive
                ? "bg-sidebar-primary/10 text-sidebar-primary shadow-sm"
                : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            {/* مؤشر التفعيل الجانبي */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-y-2 start-0 w-1 rounded-full bg-sidebar-primary transition-all duration-200",
                isActive ? "opacity-100" : "opacity-0",
              )}
            />

            {/* أيقونة داخل كبسولة ناعمة */}
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-200",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "bg-sidebar-accent/60 text-sidebar-foreground/60 group-hover:bg-sidebar-accent group-hover:text-sidebar-accent-foreground",
              )}
            >
              <LinkIcon size={18} strokeWidth={2.25} />
            </span>

            <p className="hidden truncate md:block">{link.label}</p>
          </Link>
        );
      })}
    </nav>
  );
}
