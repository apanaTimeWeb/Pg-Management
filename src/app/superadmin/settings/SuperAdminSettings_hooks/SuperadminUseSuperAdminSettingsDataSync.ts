// DATA FLOW: [AI_TODO: Document data flow direction for SuperadminUseSuperAdminSettingsDataSync.ts]
'use client';

import { useState } from 'react';
import { settingsApi } from '@/app/superadmin/superadmin_lib/superadmin_api/SuperadminSettings';
import { useToast } from '@/components/shared/ToastContext';

export function SuperadminUseSuperAdminSettingsDataSync() {
  const [isImporting, setIsImporting] = useState(false);
  const { showToast } = useToast();

  const handleExport = () => {
    const data = settingsApi.exportDatabase();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartpg_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Database exported successfully', 'success');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!window.confirm('WARNING: Importing a database will completely overwrite all existing data. Are you sure you want to continue?')) {
      return;
    }

    setIsImporting(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = settingsApi.importDatabase(content);
        if (success) {
          showToast('Database imported successfully. Reloading...', 'success');
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          showToast('Failed to import database. Invalid format.', 'error');
        }
      }
      setIsImporting(false);
    };
    
    reader.onerror = () => {
      showToast('Error reading file', 'error');
      setIsImporting(false);
    };
    
    reader.readAsText(file);
  };

  return {
    isImporting,
    handleExport,
    handleImport
  };
}
