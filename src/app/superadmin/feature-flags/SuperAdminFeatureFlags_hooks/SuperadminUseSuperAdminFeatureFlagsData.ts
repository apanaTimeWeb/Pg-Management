// DATA FLOW: [AI_TODO: Document data flow direction for SuperadminUseSuperAdminFeatureFlagsData.ts]
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { ownersApi } from '@/app/owner/owner_lib/owner_api/owners';

import type { SuperAdminFeatureFlagOwner } from '@/app/superadmin/feature-flags/SuperAdminFeatureFlags_types/SuperAdminFeatureFlags.types';

export function SuperadminUseSuperAdminFeatureFlagsData() {
  const [owners, setOwners] = useState<SuperAdminFeatureFlagOwner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  
  const availableFeatures = ['whatsapp_alerts', 'custom_domain', 'smart_meters', 'payment_gateway'];

  useEffect(() => {
    setOwners(ownersApi.listOwners() as unknown as SuperAdminFeatureFlagOwner[]);
    setLoading(false);
  }, []);

  const handleToggle = (ownerId: string, feature: string) => {
    // In a real system, this would call an API.
    // For now, we simulate success.
    // showToast(`Toggled ${feature.replace('_', ' ')} for owner ${ownerId}`, 'info');
  };

  const filtered = owners.filter(o => {
    if (!search) return true;
    return o.businessName?.toLowerCase().includes(search.toLowerCase());
  });

  return {
    filtered,
    loading,
    search,
    setSearch,
    handleToggle,
    availableFeatures
  };
}
