// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';

interface SuperadminMasterDataFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  editData: any | null;
  activeMasterLabel: string;
}

export function SuperadminMasterDataFormModal({ isOpen, onClose, onSave, editData, activeMasterLabel }: SuperadminMasterDataFormModalProps) {
  const [formData, setFormData] = useState({ name: '', code: '', status: 'Active' });

  useEffect(() => {
    if (editData) {
      setFormData({ name: editData.name, code: editData.code, status: editData.status });
    } else {
      setFormData({ name: '', code: '', status: 'Active' });
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-md rounded-3xl shadow-xl border border-border/50 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-border/50 bg-bg-page/50">
          <h3 className="text-xl font-black text-primary">
            {editData ? 'Edit' : 'Add New'} {activeMasterLabel}
          </h3>
          <button onClick={onClose} className="p-2 text-secondary hover:text-danger hover:bg-danger-bg rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary">Name <span className="text-danger">*</span></label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl text-primary font-medium focus:outline-none focus:ring-2 focus:ring-theme-primary/50" 
              placeholder={`Enter ${activeMasterLabel} name`} 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary">Short Code <span className="text-danger">*</span></label>
            <input 
              type="text" 
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
              className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl text-primary font-mono focus:outline-none focus:ring-2 focus:ring-theme-primary/50" 
              placeholder="e.g. BPG, SAC" 
            />
            <p className="text-xs text-secondary/70 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> Unique short identifier (2-4 chars)
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary">Status</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="status" 
                  checked={formData.status === 'Active'} 
                  onChange={() => setFormData({...formData, status: 'Active'})} 
                  className="accent-success"
                />
                <span className="text-sm font-bold text-primary">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="status" 
                  checked={formData.status === 'Inactive'} 
                  onChange={() => setFormData({...formData, status: 'Inactive'})} 
                  className="accent-danger"
                />
                <span className="text-sm font-bold text-primary">Inactive</span>
              </label>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border/50 bg-bg-page/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl font-bold text-secondary hover:bg-card border border-border/50 transition-colors">
            Cancel
          </button>
          <button 
            onClick={() => {
              if(!formData.name || !formData.code) return; // Simple validation
              onSave(formData);
            }}
            disabled={!formData.name || !formData.code}
            className="px-5 py-2.5 rounded-xl font-bold text-white bg-theme-primary hover:bg-theme-primary-hover transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {editData ? 'Update Record' : 'Save Record'}
          </button>
        </div>
      </div>
    </div>
  );
}
