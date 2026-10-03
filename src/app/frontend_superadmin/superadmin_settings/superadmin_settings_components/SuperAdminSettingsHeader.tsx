// RESPONSIBILITY: Renders the SuperAdminSettingsHeader component.
import React from 'react';

import type { SuperAdminSettingsHeaderProps } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_types/SuperAdminSettings.types';

export const SuperAdminSettingsHeader: React.FC<SuperAdminSettingsHeaderProps> = () => {
  return (
    <div className="border-b border-border pb-6">
      <h1 className="text-3xl font-bold tracking-tight text-primary">Platform Settings</h1>
      <p className="text-secondary text-sm mt-1">Configure core behaviors for the SmartPG network.</p>
    </div>
  );
};
