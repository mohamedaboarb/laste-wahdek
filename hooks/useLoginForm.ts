"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "@/contexts/locale-context";
import { loginSchema, type LoginValues } from "@/lib/schemas";
import {
  loginUser,
  getSessionFromOAuth,
  ROLE_DASHBOARD,
} from "@/features/login/login.service";
import { AuthError } from "@/features/types/types";

function sanitizeCallbackUrl(raw: string | null): string | null {
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    if (decoded.startsWith("/") && !decoded.startsWith("//")) return decoded;
  } catch {
    // decodeURIComponent فشل — تجاهل القيمة
  }
  return null;
}

const OAUTH_TIMEOUT_MS = 10_000;

export function useLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLocale();

  const [apiError, setApiError] = useState<string | null>(null);
  const [oauthLoading, setOauthLoading] = useState(false);

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const oauthError = searchParams.get("error");
    const oauthDesc = searchParams.get("error_description");

    if (oauthError) {
      router.replace("/login");
      setApiError(
        oauthDesc
          ? decodeURIComponent(oauthDesc.replace(/\+/g, " "))
          : t.login.errors.unknown,
      );
      return;
    }

    const pickUpOAuthSession = async () => {
      if (!mountedRef.current) return;
      setOauthLoading(true);

      let didTimeout = false;

      const timeoutId = setTimeout(() => {
        if (!mountedRef.current) return;
        didTimeout = true;
        setOauthLoading(false);
        setApiError(t.login.errors.unknown);
      }, OAUTH_TIMEOUT_MS);

      try {
        const session = await getSessionFromOAuth();

        clearTimeout(timeoutId);
        if (!mountedRef.current || didTimeout) return;

        if (!session) {
          setOauthLoading(false);
          return;
        }

        const safeCallback = sanitizeCallbackUrl(
          searchParams.get("callbackUrl"),
        );
        const destination = safeCallback ?? ROLE_DASHBOARD[session.role];

        router.replace(destination);
      } catch (err: unknown) {
        clearTimeout(timeoutId);
        if (!mountedRef.current || didTimeout) return;

        const authErr = err as AuthError;
        setApiError(t.login.errors[authErr.code] ?? t.login.errors.unknown);
        setOauthLoading(false);
      }
    };

    pickUpOAuthSession();
  }, []);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema(t)),
    defaultValues: { email: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting || oauthLoading;

  const onSubmit = async (data: LoginValues) => {
    setApiError(null);
    try {
      const session = await loginUser({
        email: data.email,
        password: data.password,
      });

      const safeCallback = sanitizeCallbackUrl(searchParams.get("callbackUrl"));
      const destination = safeCallback ?? ROLE_DASHBOARD[session.role];

      router.refresh();
      router.replace(destination);
    } catch (err: unknown) {
      const authErr = err as AuthError;
      setApiError(t.login.errors[authErr.code] ?? t.login.errors.unknown);
    }
  };

  return {
    t,
    form,
    isLoading,
    apiError,
    setApiError,
    oauthLoading,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
