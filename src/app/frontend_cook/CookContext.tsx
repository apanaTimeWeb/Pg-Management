'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSession } from './cook_lib/cook_auth/CookSession';
import { useRouter } from 'next/navigation';

interface CookContextProps {
  userRole: string | null;
  loading: boolean;
}

const CookContext = createContext<CookContextProps | undefined>(undefined);

export function CookProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const session = getSession();
    if (!session || ((session.role as string) !== 'cook' && (session.role as string) !== 'staff' && (session.role as string) !== 'admin')) {
      router.replace('/staff/login'); // Redirect to staff login if not authorized
    } else {
      setUserRole(session.role);
      setLoading(false);
    }
  }, [router]);

  return (
    <CookContext.Provider value={{ userRole, loading }}>
      {children}
    </CookContext.Provider>
  );
}

export function useCookContext() {
  const context = useContext(CookContext);
  if (!context) {
    throw new Error('useCookContext must be used within CookProvider');
  }
  return context;
}
