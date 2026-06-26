import SideNavbar from "@/features/dashboard/SideNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex ">
      <aside className=" sticky top-14 h-[calc(100vh-57px)] lg:w-64 shrink-0 overflow-hidden border-r">
        <SideNavbar />
      </aside>

      <main className="flex-1 p-4 overflow-hidden">{children}</main>
    </div>
  );
}
