// RESPONSIBILITY: Renders the SuperAdminPlansEditModal component.
import React from 'react';
import { X, Save } from 'lucide-react';
import { SuperAdminPlansEditModalProps } from '@/app/superadmin/plans/SuperAdminPlans_types/SuperAdminPlans.types';

export const SuperAdminPlansEditModal: React.FC<SuperAdminPlansEditModalProps> = ({ editPlan, setEditPlan, onSave }) => {
  if (!editPlan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-xl,16px)] p-6 max-w-md w-full shadow-2xl motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-[var(--text-primary)] uppercase">Edit {editPlan.name} Plan</h3>
          <button 
            onClick={() => setEditPlan(null)} 
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-5 h-5"/>
          </button>
        </div>
        
        <form onSubmit={onSave} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Monthly Price (₹)</label>
            <input 
              type="number" 
              required 
              min="0" 
              value={editPlan.price} 
              onChange={e => setEditPlan({ ...editPlan, price: parseInt(e.target.value) || 0 })} 
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] p-2.5 rounded-[var(--radius-md,8px)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none transition-colors" 
            />
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Properties</label>
              <input 
                type="number" 
                required 
                min="1" 
                value={editPlan.maxProperties} 
                onChange={e => setEditPlan({ ...editPlan, maxProperties: parseInt(e.target.value) || 0 })} 
                className="w-full bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] p-2 rounded-[var(--radius-md,8px)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none transition-colors" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Beds</label>
              <input 
                type="number" 
                required 
                min="1" 
                value={editPlan.maxBeds} 
                onChange={e => setEditPlan({ ...editPlan, maxBeds: parseInt(e.target.value) || 0 })} 
                className="w-full bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] p-2 rounded-[var(--radius-md,8px)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none transition-colors" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Staff</label>
              <input 
                type="number" 
                required 
                min="1" 
                value={editPlan.maxStaff} 
                onChange={e => setEditPlan({ ...editPlan, maxStaff: parseInt(e.target.value) || 0 })} 
                className="w-full bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] p-2 rounded-[var(--radius-md,8px)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none transition-colors" 
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border)] flex justify-end gap-3 mt-6">
            <button 
              type="button" 
              onClick={() => setEditPlan(null)} 
              className="px-4 py-2 text-sm font-medium text-[var(--text-primary)] bg-transparent border border-[var(--border)] hover:bg-[var(--bg-page)] rounded-[var(--radius-md,8px)] transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 flex items-center gap-2 text-sm font-medium bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] rounded-[var(--radius-md,8px)] transition-colors shadow-sm"
            >
              <Save className="w-4 h-4"/> Save Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
