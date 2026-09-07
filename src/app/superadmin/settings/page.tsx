'use client';

import React from 'react';
import { useSuperAdminSettingsData } from './SuperAdminSettings_hooks/useSuperAdminSettingsData';
import { useSuperAdminSettingsDataSync } from './SuperAdminSettings_hooks/useSuperAdminSettingsDataSync';
import { SuperAdminSettingsHeader } from './SuperAdminSettings_components/SuperAdminSettingsHeader';
import { SuperAdminSettingsForm } from './SuperAdminSettings_components/SuperAdminSettingsForm';
import { SuperAdminSettingsDataSync } from './SuperAdminSettings_components/SuperAdminSettingsDataSync';

export default function PlatformSettingsPage() {
  const { settings, setSettings, loading, saving, handleSave } = useSuperAdminSettingsData();
  const { isImporting, handleExport, handleImport } = useSuperAdminSettingsDataSync();

  if (loading || !settings) return null; // Let loading.tsx handle it

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <SuperAdminSettingsHeader />

      <SuperAdminSettingsForm 
        settings={settings} 
        setSettings={setSettings} 
        handleSave={handleSave} 
        saving={saving} 
      />

      <SuperAdminSettingsDataSync 
        handleExport={handleExport} 
        handleImport={handleImport} 
        isImporting={isImporting} 
      />
    </div>
  );
}