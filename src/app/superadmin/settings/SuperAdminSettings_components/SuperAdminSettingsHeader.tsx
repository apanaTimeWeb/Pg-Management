// RESPONSIBILITY: Renders the SuperAdminSettingsHeader component.
import React from 'react';

import type { SuperAdminSettingsHeaderProps } from '@/app/superadmin/settings/SuperAdminSettings_types/SuperAdminSettings.types';

export const SuperAdminSettingsHeader: React.FC<SuperAdminSettingsHeaderProps> = () => {
  return (
    <div className="border-b border-[var(--border)] pb-6">
      <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">Platform Settings</h1>
      <p className="text-[var(--text-secondary)] text-sm mt-1">Configure core behaviors for the SmartPG network.</p>
    </div>
  );
};
