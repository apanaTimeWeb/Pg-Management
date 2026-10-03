// @ts-nocheck
import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface SuperadminMasterDataDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  recordName: string;
}

export function SuperadminMasterDataDeleteModal({ isOpen, onClose, onConfirm, recordName }: SuperadminMasterDataDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-sm rounded-3xl shadow-xl border border-border/50 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 p-6 text-center">
        
        <div className="w-16 h-16 bg-danger-bg rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-danger" />
        </div>
        
        <h3 className="text-xl font-black text-primary mb-2">Delete Record?</h3>
        <p className="text-secondary font-medium mb-8">
          Are you sure you want to delete <strong className="text-primary">{recordName}</strong>? This action cannot be undone and may affect related data.
        </p>

        <div className="flex gap-3 w-full">
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-bold text-secondary hover:bg-bg-page border border-border/50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl font-bold text-white bg-danger hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
