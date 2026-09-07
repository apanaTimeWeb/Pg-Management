'use client';

import { useState, useEffect } from 'react';
import { settingsApi } from '@/app/superadmin/lib/api/settings';
import { SuperAdminSettingsData } from '../SuperAdminSettings_types/SuperAdminSettings.types';
import { useToast } from '@/lib/ui/ToastContext';

export function useSuperAdminSettingsData() {
  const [settings, setSettings] = useState<SuperAdminSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

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
      showToast('Platform settings saved successfully.', 'success');
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
