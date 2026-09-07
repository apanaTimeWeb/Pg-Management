// RESPONSIBILITY: Renders the ManagerRequireManager component.
'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getSession } from '@/app/manager/manager_lib/manager_auth/ManagerSession';

export function ManagerRequireManager({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== 'manager') {
      router.replace('/manager/login');
      return;
    }
    if (session.mustChangePassword && !pathname.includes('/manager/first-login')) {
      router.replace('/manager/first-login');
      return;
    }
    setAuthorized(true);
  }, [router, pathname]);

  if (!authorized) return <div className="min-h-screen flex items-center justify-center bg-page text-primary">Loading Manager Portal...</div>;
  return <>{children}</>;
}
