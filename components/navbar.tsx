"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/locale-context";
import { useAuth } from "@/contexts/auth-context";
import {
  Globe,
  Menu,
  X,
  Heart,
  LayoutDashboard,
  Stethoscope,
  Home,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/features/mother-signup/Auth.service";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t, locale, setLocale, dir } = useLocale();
  const { isAuthenticated, role } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleLocale = () => {
    setLocale(locale === "ar" ? "en" : "ar");
  };

  const getDashboardPath = () => {
    if (role === "mother") return "/dashboard/mother";
    if (role === "doctor") return "/dashboard/doctor";
    if (role === "admin") return "/dashboard/admin";
    return "/signup";
  };

  const navLinks = [
    {
      href: "/",
      label: t.nav.home,
      icon: Home,
    },
    {
      href: "/doctors",
      label: t.nav.doctors,
      icon: Stethoscope,
    },
  ];

  return (
    <header
      dir={dir}
      className="sticky top-0 z-50 h-14 bg-linear-to-r from-[#fff7f8] via-white to-[#fff5ef] backdrop-blur-xl shadow-[0_12px_40px_rgba(209,23,101,0.10)]"
    >
      <div className="flex h-full items-center justify-between px-4 md:px-8 relative mx-auto max-w-7xl">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20 transition-all duration-300 group-hover:rotate-6">
            <Heart className="h-5 w-5" fill="currentColor" />
          </div>

          <div className="hidden sm:block">
            <h1 className="text-lg font-extrabold tracking-tight bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              {locale === "ar" ? "لست وحدك" : "Laste Wahdek"}
            </h1>
            <p className="text-[11px] text-muted-foreground">
              Family Mental Health Platform
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all duration-300",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      active && "scale-110",
                    )}
                  />
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1 left-1/2 h-[3px] w-7 -translate-x-1/2 rounded-full bg-linear-to-r from-primary to-secondary" />
                  )}
                </Link>
              );
            })}
          </div>

          {isAuthenticated && (
            <Link
              href={getDashboardPath()}
              className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-primary via-primary to-secondary px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(209,23,101,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(209,23,101,0.35)]"
            >
              <LayoutDashboard className="h-4 w-4" />
              {t.nav.dashboard}
            </Link>
          )}

          {!isAuthenticated && (
            <>
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
              >
                {t.nav.login}
              </Link>

              <Link href="/signup">
                <Button className="rounded-xl bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20 hover:opacity-95">
                  {t.nav.register}
                </Button>
              </Link>
            </>
          )}

          {isAuthenticated && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="mr-1 h-4 w-4" />
              {t.nav.logout}
            </Button>
          )}

          <div>
            <Button
              onClick={toggleLocale}
              variant="outline"
              size="sm"
              className="gap-2 rounded-2xl border-primary/15 bg-white/80 text-foreground shadow-sm hover:bg-primary/5 hover:border-primary/30"
            >
              <Globe className="h-4 w-4 text-primary" />
              {locale === "ar" ? "English" : "العربية"}
            </Button>
          </div>
        </div>

        {/* Mobile Actions (Hamburger & Lang) */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            onClick={toggleLocale}
            variant="outline"
            size="icon"
            className="rounded-xl border-primary/15 bg-white/50 backdrop-blur-md"
          >
            <Globe className="h-4 w-4 text-primary" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "rounded-xl transition-all duration-300",
              mobileOpen
                ? "bg-primary/10 text-primary rotate-90"
                : "text-foreground",
            )}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={cn(
          "absolute inset-x-4 md:hidden ",
          "overflow-hidden border border-white/60 bg-white backdrop-blur-sm ",
          "transition-all duration-300 ease-in-out",
          mobileOpen
            ? "opacity-100 translate-x-0 scale-100 pointer-events-auto visible"
            : "opacity-0 -translate-y-4 scale-95 pointer-events-none invisible",
        )}
      >
        <div className="flex flex-col p-3 gap-1">
          {/* Loop through the same links as desktop for consistency */}
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-200",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                />
                {item.label}
              </Link>
            );
          })}

          <hr className="my-2 border-[#EADFF2]/60 mx-2" />

          {isAuthenticated ? (
            <>
              <Link
                href={getDashboardPath()}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-linear-to-r from-primary to-secondary px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all active:scale-95"
              >
                <LayoutDashboard className="h-5 w-5" />
                {t.nav.dashboard}
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold text-red-500 transition-all hover:bg-red-50 active:scale-95"
              >
                <LogOut className="h-5 w-5" />
                {t.nav.logout}
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center rounded-2xl bg-primary/5 px-4 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10 active:scale-95"
              >
                {t.nav.login}
              </Link>

              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center rounded-2xl bg-linear-to-r from-primary to-secondary px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all active:scale-95"
              >
                {t.nav.register}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
