"use client";

import { handleLogout } from "@/features/mother-signup/Auth.service";
import { createClient } from "@/lib/supabase/client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

const supabase = createClient();

export type UserRole = "mother" | "doctor" | "admin" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  assignedDoctors?: string[];
  maxSessions?: number;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean; // أضفنا هذه الحالة لمنع الوميض أثناء جلب الجلسة
}

const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback((userData: User) => {
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    await handleLogout();
    setUser(null);
  }, []);

  useEffect(() => {
    async function getInitialSession() {
      try {
        // 1. جلب المستخدم الحالي إذا كان مسجلاً بالفعل عند عمل Refresh
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email ?? "",
            name: session.user.user_metadata?.full_name || "user",
            role: (session.user.user_metadata?.role as UserRole) || "doctor", // سحب الـ role المخزن في الـ metadata
          });
        }
      } catch (err) {
        console.error("Error getting initial session:", err);
      } finally {
        setIsLoading(false);
      }
    }

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.full_name || "User",
          email: session.user.email ?? "",
          role: (session.user.user_metadata?.role as UserRole) || "mother",
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
