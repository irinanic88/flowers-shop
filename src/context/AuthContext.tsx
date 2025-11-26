'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { UserType } from '@/app/types';

type AuthContextType = {
  user: UserType | null;
  role: string | null;
  name: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  name: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const formattedUser: UserType = {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name ?? null,
          role: user.user_metadata?.role === 'admin' ? 'admin' : 'user',
          created_at: user.created_at,
        };

        setUser(formattedUser);
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, name')
          .eq('id', user.id)
          .single();

        setRole(profile?.role ?? null);
        setName(profile?.name ?? null);
      }

      setLoading(false);
    }

    void loadAuth();

    supabase.auth.onAuthStateChange(() => {
      void loadAuth();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, name }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
