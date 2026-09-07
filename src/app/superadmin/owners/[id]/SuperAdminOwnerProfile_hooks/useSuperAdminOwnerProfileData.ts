'use client';

import { useState, useEffect } from 'react';
import { ownersApi } from '@/app/owner/lib/api/owners';
import { Owner360Data } from '@/app/superadmin/owners/SuperAdminOwners_types/SuperAdminOwners.types';
import { useRouter } from 'next/navigation';

export function useSuperAdminOwnerProfileData(id: string) {
  const router = useRouter();
  const [data, setData] = useState<Owner360Data | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    try {
      setLoading(true);
      const fetched = ownersApi.getOwner360(id);
      setData(fetched as Owner360Data);
    } catch (e) {
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
