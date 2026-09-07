// RESPONSIBILITY: Renders the SuperAdminRequireSuperAdmin component.
'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getSession } from '@/app/superadmin/superadmin_lib/superadmin_auth/SuperadminSession';

export function SuperAdminRequireSuperAdmin({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== 'superadmin') {
      router.replace('/superadmin/login');
    } else {
      setAuthorized(true);
    }
  }, [router, pathname]);

  if (!authorized) {
    return <div className="min-h-screen flex items-center justify-center bg-page text-primary">Loading SPG Platform...</div>;
  }
  return <>{children}</>;
}
