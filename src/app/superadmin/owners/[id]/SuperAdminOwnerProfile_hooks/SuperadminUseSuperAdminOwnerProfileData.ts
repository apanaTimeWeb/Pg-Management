// DATA FLOW: [AI_TODO: Document data flow direction for SuperadminUseSuperAdminOwnerProfileData.ts]
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ownersApi } from '@/app/owner/owner_lib/owner_api/owners';

import type { Owner360Data } from '@/app/superadmin/owners/SuperAdminOwners_types/SuperAdminOwners.types';

export function SuperadminUseSuperAdminOwnerProfileData(id: string) {
  const router = useRouter();
  const [data, setData] = useState<Owner360Data | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    try {
      setLoading(true);
      const fetched = ownersApi.getOwner360(id);
      setData(fetched as Owner360Data);
    } catch (e: any) {
      router.push('/superadmin/owners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id, router]);

  return { data, loading, refetch: loadData };
}
