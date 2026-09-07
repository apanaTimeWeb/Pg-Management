// DATA FLOW: [AI_TODO: Document data flow direction for SuperadminUseSuperAdminSettingsData.ts]
'use client';

import { useState, useEffect } from 'react';
import { settingsApi } from '@/app/superadmin/superadmin_lib/superadmin_api/SuperadminSettings';
import { SuperAdminSettingsData } from '@/app/superadmin/settings/SuperAdminSettings_types/SuperAdminSettings.types';
import { toast } from 'sonner';

export function SuperadminUseSuperAdminSettingsData() {
  const [settings, setSettings] = useState<SuperAdminSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  

  useEffect(() => {
    setSettings(settingsApi.getSettings() as SuperAdminSettingsData);
    setLoading(false);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    settingsApi.updateSettings(settings);
    setTimeout(() => {
      setSaving(false);
      toast.success('Platform settings saved successfully.');
    }, 500);
  };

  return {
    settings,
    setSettings,
    loading,
    saving,
    handleSave
  };
}
