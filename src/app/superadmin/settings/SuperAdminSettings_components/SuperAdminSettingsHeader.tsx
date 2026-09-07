// RESPONSIBILITY: Renders the SuperAdminSettingsHeader component.
import React from 'react';
import { SuperAdminSettingsHeaderProps } from '@/app/superadmin/settings/SuperAdminSettings_types/SuperAdminSettings.types';

export const SuperAdminSettingsHeader: React.FC<SuperAdminSettingsHeaderProps> = () => {
  return (
    <div>
      <h1 className="text-[22px] font-bold text-[var(--text-primary)]">Platform Settings</h1>
      <p className="text-[var(--text-secondary)] text-sm">Configure core behaviors for the SmartPG network.</p>
    </div>
  );
};
