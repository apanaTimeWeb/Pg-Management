import React from 'react';
import { ShieldAlert, Clock, Smartphone, Info, Save } from 'lucide-react';
import { SuperAdminSettingsFormProps } from '@/app/superadmin/settings/SuperAdminSettings_types/SuperAdminSettings.types';

export const SuperAdminSettingsForm: React.FC<SuperAdminSettingsFormProps> = ({ settings, setSettings, handleSave, saving }) => {
  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Security & Access */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] overflow-hidden shadow-sm">
        <div className="bg-[var(--bg-page)] border-b border-[var(--border)] p-4 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[var(--primary)]" />
          <h2 className="font-bold text-[var(--text-primary)]">Security & Operations</h2>
        </div>
        <div className="p-6 space-y-4">
          <label className="flex items-center gap-3 p-3 border border-[var(--border)] rounded-[var(--radius-md,8px)] hover:bg-[var(--bg-page)] transition-colors cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.maintenanceMode} 
              onChange={e => setSettings({...settings, maintenanceMode: e.target.checked})} 
              className="w-4 h-4 text-[var(--primary)] bg-[var(--bg-input)] border-[var(--border)] rounded focus:ring-[var(--primary)]" 
            />
            <div>
              <div className="font-medium text-[var(--text-primary)] text-sm">Maintenance Mode</div>
              <div className="text-[var(--text-secondary)] text-xs">Block all non-superadmin logins and show a maintenance screen.</div>
            </div>
          </label>
          
          <label className="flex items-center gap-3 p-3 border border-[var(--border)] rounded-[var(--radius-md,8px)] hover:bg-[var(--bg-page)] transition-colors cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.otpEnabled} 
              onChange={e => setSettings({...settings, otpEnabled: e.target.checked})} 
              className="w-4 h-4 text-[var(--primary)] bg-[var(--bg-input)] border-[var(--border)] rounded focus:ring-[var(--primary)]" 
            />
            <div>
              <div className="font-medium text-[var(--text-primary)] text-sm">Enforce 2FA / OTP Logins</div>
              <div className="text-[var(--text-secondary)] text-xs">Require SMS OTP in addition to passwords for all Owner & Manager logins.</div>
            </div>
          </label>
        </div>
      </div>

      {/* Defaults */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] overflow-hidden shadow-sm">
        <div className="bg-[var(--bg-page)] border-b border-[var(--border)] p-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[var(--primary)]" />
          <h2 className="font-bold text-[var(--text-primary)]">System Defaults</h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Default Night Entry Time limit</label>
            <input 
              type="time" 
              value={settings.defaultNightEntryTime} 
              onChange={e => setSettings({...settings, defaultNightEntryTime: e.target.value})} 
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-md,8px)] text-sm focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none transition-colors" 
            />
            <p className="text-[11px] text-[var(--text-secondary)] mt-1">Applied to new properties unless overridden.</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Default Notice Period (Days)</label>
            <input 
              type="number" 
              value={settings.defaultNoticeDays} 
              onChange={e => setSettings({...settings, defaultNoticeDays: parseInt(e.target.value) || 0})} 
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-md,8px)] text-sm focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none transition-colors" 
            />
          </div>
        </div>
      </div>

      {/* Communication */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] overflow-hidden shadow-sm">
        <div className="bg-[var(--bg-page)] border-b border-[var(--border)] p-4 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-[var(--primary)]" />
          <h2 className="font-bold text-[var(--text-primary)]">Communication & Support</h2>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Global Support Phone (visible to students)</label>
            <input 
              type="text" 
              value={settings.supportPhone} 
              onChange={e => setSettings({...settings, supportPhone: e.target.value})} 
              className="w-full max-w-sm bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-md,8px)] text-sm focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none transition-colors" 
            />
          </div>
          <label className="flex items-center gap-3 p-3 border border-[var(--border)] rounded-[var(--radius-md,8px)] hover:bg-[var(--bg-page)] transition-colors cursor-pointer max-w-sm">
            <input 
              type="checkbox" 
              checked={settings.whatsappEnabled} 
              onChange={e => setSettings({...settings, whatsappEnabled: e.target.checked})} 
              className="w-4 h-4 text-[var(--primary)] bg-[var(--bg-input)] border-[var(--border)] rounded focus:ring-[var(--primary)]" 
            />
            <div>
              <div className="font-medium text-[var(--text-primary)] text-sm">WhatsApp Integration</div>
              <div className="text-[var(--text-secondary)] text-xs">Enable global WhatsApp API for rent reminders.</div>
            </div>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
          <Info className="w-4 h-4" /> Changes take effect instantly across the network.
        </div>
        <button 
          type="submit" 
          disabled={saving} 
          className="flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-2.5 rounded-[var(--radius-md,8px)] font-medium hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50 shadow-sm"
        >
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

    </form>
  );
};
