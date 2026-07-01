"use client";

import { usePathname } from "next/navigation";
import SideNavbar from "@/features/dashboard/SideNavbar";
import { MobileBottomNav } from "@/features/dashboard/MobileBottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/dashboard/mother/supscription/new") {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      {/* Sidebar — hidden on small screens, visible at lg+ */}
      <aside className="hidden lg:block sticky top-14 h-[calc(100vh-57px)] lg:w-64 shrink-0 overflow-hidden border-r">
        <SideNavbar />
      </aside>

      {/* Main content — add bottom padding on mobile to avoid nav overlap */}
      <main className="flex-1 p-4 overflow-hidden pb-20 lg:pb-4">{children}</main>

      {/* Mobile bottom nav — only visible below lg */}
      <MobileBottomNav />
    </div>
  );
}
