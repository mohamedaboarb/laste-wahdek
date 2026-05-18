"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocaleProvider } from "@/contexts/locale-context";
import { AuthProvider } from "@/contexts/auth-context";
import { Navbar } from "@/components/navbar";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavbar = pathname !== "/login" && pathname !== "/signup";

  // إنشاء الـ QueryClient داخل useState لمنع إعادة إنشائه مع كل Render للمتصفح
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LocaleProvider>
          {showNavbar && <Navbar />}
          <main>{children}</main>
        </LocaleProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
