'use client';

// RESPONSIBILITY: Renders the OwnerRequireOwner component. Receives data via props/hooks.
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { getSession } from '@/app/owner/owner_lib/owner_auth/OwnerSession';

export function OwnerRequireOwner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== 'owner') {
      router.replace('/owner/login');
      return;
    }
    
    if (session.mustChangePassword && !pathname.includes('/owner/first-login')) {
      router.replace('/owner/first-login');
      return;
    }
    
    setAuthorized(true);
  }, [router, pathname]);

  if (!authorized) return <div className="min-h-screen flex items-center justify-center bg-page text-primary">Loading Owner Portal...</div>;
  return <>{children}</>;
}
