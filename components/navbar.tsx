"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/locale-context";
import { useAuth } from "@/contexts/auth-context";
import { Globe, Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/features/mother-signup/Auth.service";

export function Navbar() {
  const { t, locale, setLocale, dir } = useLocale();
  const { user, isAuthenticated, logout, role } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleLocale = () => {
    setLocale(locale === "ar" ? "en" : "ar");
  };

  const getDashboardPath = () => {
    if (role === "mother") return "/dashboard/mom";
    if (role === "doctor") return "/dashboard/doctor";
    if (role === "admin") return "/dashboard/admin";
    return "/signup";
  };

  return (
    <nav
      dir={dir}
      className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-secondary" fill="currentColor" />
          <span className="text-lg font-bold text-primary">
            {locale === "ar" ? "لست وحدك" : "Laste Wahdek"}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/doctors"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            {t.nav.doctors}
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                href={getDashboardPath()}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {t.nav.dashboard}
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-sm text-foreground"
              >
                {t.nav.logout}
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {t.nav.login}
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {t.nav.register}
                </Button>
              </Link>
            </>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLocale}
            className="gap-1.5 border-border text-foreground"
          >
            <Globe className="h-4 w-4" />
            {t.nav.language}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleLocale}
            className="border-border text-foreground"
          >
            <Globe className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div
          className="border-t border-border bg-card px-4 pb-4 pt-2 md:hidden"
          dir={dir}
        >
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm font-medium text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.home}
            </Link>
            <Link
              href="/doctors"
              className="text-sm font-medium text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.doctors}
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href={getDashboardPath()}
                  className="text-sm font-medium text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.nav.dashboard}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="text-start text-sm font-medium text-foreground"
                >
                  {t.nav.logout}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.nav.register}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
