import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ManagerConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export function ManagerConfirmModal({
  isOpen, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  onConfirm, onCancel, isDestructive = false
}: ManagerConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border rounded-xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in motion-safe:duration-300">
        <div className="flex items-start gap-4 p-6">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDestructive ? 'bg-danger-bg text-danger' : 'bg-primary-subtle text-primary'}`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-primary">{title}</h2>
            <p className="text-sm text-secondary mt-2 leading-relaxed">{message}</p>
          </div>
          <button onClick={onCancel} className="p-1 hover:bg-input rounded-full text-secondary motion-safe:transition-colors shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-end gap-3 p-4 border-t border bg-input/50">
          <button 
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-secondary hover:text-primary motion-safe:transition-colors"
          >
            {cancelLabel}
          </button>
          <button 
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-bold text-white rounded-lg motion-safe:transition-colors ${isDestructive ? 'bg-danger hover:bg-red-600' : 'bg-primary hover:bg-primary-hover'}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
