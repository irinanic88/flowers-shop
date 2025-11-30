"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { UserType } from "@/src/types";
import { equals, anyPass } from "ramda";

type AuthContextType = {
  userId: string | null;
  user: UserType | null;
  name: string | null;
  loading: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isUnknownUser: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  userId: null,
  name: null,
  loading: true,
  isAdmin: false,
  isUser: false,
  isUnknownUser: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [name, setName] = useState<string | null>(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isUnknownUser, setIsUnknownUser] = useState(true);

  const [loading, setLoading] = useState(true);

  const applyRole = (role: string | null) => {
    const safeRole = role ?? "none";
    const isAdminRole = equals(safeRole, "admin");
    const isUserRole = equals(safeRole, "user");
    const isNone = !anyPass([equals("admin"), equals("user")])(safeRole);

    setIsAdmin(isAdminRole);
    setIsUser(isUserRole);
    setIsUnknownUser(isNone);
  };

  async function loadAuth() {
    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser();

    if (supabaseUser) {
      const formattedUser: UserType = {
        id: supabaseUser.id,
        email: supabaseUser.email,
        name: supabaseUser.user_metadata?.name ?? null,
        role: supabaseUser.user_metadata?.role ?? "none",
        created_at: supabaseUser.created_at,
      };

      setUser(formattedUser);

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, name")
        .eq("id", supabaseUser.id)
        .single();

      const dbRole = profile?.role ?? "none";

      applyRole(dbRole);
      setName(profile?.name ?? null);
    } else {
      setUser(null);
      applyRole("none");
      setName(null);
    }

    setLoading(false);
  }

  useEffect(() => {
    void loadAuth();

    supabase.auth.onAuthStateChange((event, session) => {
      if (equals(event, "SIGNED_OUT") || !session) {
        setUser(null);
        applyRole("none");
        setName(null);
        setLoading(false);
        return;
      }

      void loadAuth();
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userId: user?.id ?? null,
        name,
        loading,
        isAdmin,
        isUser,
        isUnknownUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
