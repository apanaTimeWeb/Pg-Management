'use client';

import React from 'react';
import { useSuperAdminFeatureFlagsData } from '@/app/superadmin/feature-flags/SuperAdminFeatureFlags_hooks/useSuperAdminFeatureFlagsData';
import { SuperAdminFeatureFlagsHeader } from '@/app/superadmin/feature-flags/SuperAdminFeatureFlags_components/SuperAdminFeatureFlagsHeader';
import { SuperAdminFeatureFlagsToolbar } from '@/app/superadmin/feature-flags/SuperAdminFeatureFlags_components/SuperAdminFeatureFlagsToolbar';
import { SuperAdminFeatureFlagsTable } from '@/app/superadmin/feature-flags/SuperAdminFeatureFlags_components/SuperAdminFeatureFlagsTable';

export default function FeatureFlagsPage() {
  const {
    filtered,
    loading,
    search,
    setSearch,
    handleToggle,
    availableFeatures
  } = useSuperAdminFeatureFlagsData();

  if (loading) return null; // Let loading.tsx handle it

  return (
    <div className="space-y-6 pb-20">
      <SuperAdminFeatureFlagsHeader />

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] shadow-sm">
        <SuperAdminFeatureFlagsToolbar 
          search={search} 
          setSearch={setSearch} 
        />

        <SuperAdminFeatureFlagsTable 
          owners={filtered} 
          availableFeatures={availableFeatures} 
          onToggle={handleToggle} 
        />
      </div>
    </div>
  );
}