// RESPONSIBILITY: Renders the SuperAdminTicketsCreateModal component.
import React from 'react';
import { SuperAdminTicketsCreateModalProps } from '@/app/superadmin/tickets/SuperAdminTickets_types/SuperAdminTickets.types';

export const SuperAdminTicketsCreateModal: React.FC<SuperAdminTicketsCreateModalProps> = ({
  isOpen,
  onClose,
  owners,
  formData,
  setFormData,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-xl,16px)] p-6 max-w-md w-full shadow-2xl motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95">
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Create Ticket on Behalf</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Select Owner *</label>
            <select 
              required 
              value={formData.ownerId} 
              onChange={e => setFormData({ ...formData, ownerId: e.target.value })} 
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-md,8px)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none text-sm transition-colors"
            >
              <option value="">-- Choose Owner --</option>
              {owners.map(o => <option key={o.id} value={o.id}>{o.businessName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Title *</label>
            <input 
              type="text" 
              required 
              value={formData.title} 
              onChange={e => setFormData({ ...formData, title: e.target.value })} 
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-md,8px)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none text-sm transition-colors" 
              placeholder="E.g. Cannot access dashboard"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Description *</label>
            <textarea 
              required 
              value={formData.description} 
              onChange={e => setFormData({ ...formData, description: e.target.value })} 
              rows={3} 
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-md,8px)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none text-sm transition-colors resize-none" 
              placeholder="Describe the issue in detail..."
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Priority *</label>
            <select 
              value={formData.priority} 
              onChange={e => setFormData({ ...formData, priority: e.target.value })} 
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-md,8px)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none text-sm transition-colors"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="pt-4 border-t border-[var(--border)] flex justify-end gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-sm font-medium text-[var(--text-primary)] bg-transparent border border-[var(--border)] hover:bg-[var(--bg-page)] rounded-[var(--radius-md,8px)] transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 text-sm font-medium bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] rounded-[var(--radius-md,8px)] transition-colors shadow-sm"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
