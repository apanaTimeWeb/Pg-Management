// RESPONSIBILITY: Renders the SuperAdminSettingsDataSync component.
import React from 'react';
import { Database, Download, Upload, AlertTriangle } from 'lucide-react';
import { SuperAdminSettingsDataSyncProps } from '@/app/superadmin/settings/SuperAdminSettings_types/SuperAdminSettings.types';

export const SuperAdminSettingsDataSync: React.FC<SuperAdminSettingsDataSyncProps> = ({ handleExport, handleImport, isImporting }) => {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] overflow-hidden shadow-sm mt-8">
      <div className="bg-[var(--bg-page)] border-b border-[var(--border)] p-4 flex items-center gap-2">
        <Database className="w-5 h-5 text-[var(--primary)]" />
        <h2 className="font-bold text-[var(--text-primary)]">Data Management</h2>
      </div>
      <div className="p-6">
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          Export the entire LocalStorage database to a JSON file, or import an existing backup. Useful for demos, migrations, or backend mapping.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button 
            onClick={handleExport}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--bg-input)] hover:bg-[var(--primary-subtle)] hover:text-[var(--primary)] border border-[var(--border)] hover:border-[var(--primary)] rounded-[var(--radius-md,8px)] transition-all font-medium text-[var(--text-primary)]"
          >
            <Download className="w-5 h-5" />
            Export JSON Backup
          </button>
          
          <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--danger-bg)] text-[var(--danger)] hover:bg-red-900/40 border border-[var(--danger)] rounded-[var(--radius-md,8px)] transition-all font-medium cursor-pointer ${isImporting ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <Upload className="w-5 h-5" />
            {isImporting ? 'Importing...' : 'Import & Replace DB'}
            <input 
              type="file" 
              accept=".json" 
              className="hidden" 
              onChange={handleImport}
              disabled={isImporting}
            />
          </label>
        </div>

        <div className="bg-[var(--warning-bg)] border border-[var(--warning)] text-[var(--warning)] p-4 rounded-[var(--radius-md,8px)] flex gap-3 text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <strong>Warning:</strong> Importing a JSON backup will completely wipe the current state of the application and replace it with the uploaded data. Please ensure you have exported a recent backup before importing.
          </div>
        </div>
      </div>
    </div>
  );
};
