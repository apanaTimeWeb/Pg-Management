import React, { useState } from 'react';
import { Key, Power } from 'lucide-react';
import { Owner360Data } from '@/app/superadmin/owners/SuperAdminOwners_types/SuperAdminOwners.types';

interface SidebarProps {
  data: Owner360Data;
  onResetPasswordClick: () => void;
  onToggleStatus: () => void;
  onAddNote: (note: string) => void;
}

export const SuperAdminOwnerProfileSidebar: React.FC<SidebarProps> = ({ 
  data, 
  onResetPasswordClick, 
  onToggleStatus, 
  onAddNote 
}) => {
  const [note, setNote] = useState('');
  const { owner, user } = data;

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNote(note);
    setNote('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] p-6 shadow-sm">
        <h2 className="text-[16px] font-semibold text-[var(--text-primary)] mb-4">Contact Info</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-[var(--border)] pb-2">
            <span className="text-[var(--text-secondary)]">Email</span>
            <span className="text-[var(--text-primary)] font-medium truncate max-w-[200px]" title={owner.email}>{owner.email}</span>
          </div>
          <div className="flex justify-between border-b border-[var(--border)] pb-2">
            <span className="text-[var(--text-secondary)]">Phone</span>
            <span className="text-[var(--text-primary)] font-medium">{owner.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-secondary)]">Address</span>
            <span className="text-[var(--text-primary)] font-medium text-right max-w-[150px] truncate" title={owner.address}>{owner.address || '-'}</span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] p-6 shadow-sm">
        <h2 className="text-[16px] font-semibold text-[var(--text-primary)] mb-4">Administrative Actions</h2>
        <div className="space-y-3">
          <button 
            onClick={onResetPasswordClick} 
            className="w-full flex items-center justify-center gap-2 p-3 text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-page)] hover:bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius-md,8px)] transition-colors"
          >
            <Key className="w-4 h-4 text-[var(--info)]" /> Reset Password
          </button>
          <button 
            onClick={onToggleStatus} 
            className={`w-full flex items-center justify-center gap-2 p-3 text-sm font-medium border rounded-[var(--radius-md,8px)] transition-colors ${
              user?.status === 'Active' 
                ? 'text-[var(--danger)] bg-[var(--danger-bg)] border-[var(--danger)] hover:bg-[var(--danger)] hover:text-white' 
                : 'text-[var(--success)] bg-[var(--success-bg)] border-[var(--success)] hover:bg-[var(--success)] hover:text-white'
            }`}
          >
            <Power className="w-4 h-4" /> {user?.status === 'Active' ? 'Suspend Account' : 'Activate Account'}
          </button>
        </div>
      </div>
      
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] p-6 shadow-sm">
        <h2 className="text-[16px] font-semibold text-[var(--text-primary)] mb-4">Internal Notes</h2>
        <form onSubmit={handleNoteSubmit} className="space-y-3">
          <textarea 
            className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-[var(--radius-md,8px)] p-3 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--primary)] resize-none"
            rows={3} 
            placeholder="Add a note (saved to audit logs)..."
            value={note} 
            onChange={e => setNote(e.target.value)} 
            required
          />
          <button 
            type="submit" 
            className="w-full py-2 bg-[var(--bg-page)] border border-[var(--border)] text-[var(--text-primary)] font-medium rounded-[var(--radius-md,8px)] text-sm hover:bg-[var(--border)] transition-colors"
          >
            Save Note
          </button>
        </form>
      </div>
    </div>
  );
};
