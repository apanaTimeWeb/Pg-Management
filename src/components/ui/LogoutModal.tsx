'use client';

import React, { useEffect } from 'react';
import { LogOut, X } from 'lucide-react';

export interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Logout',
  message = 'Are you sure you want to log out of your account? You will need to login again to access your dashboard.',
  confirmText = 'Logout',
  cancelText = 'Cancel'
}: LogoutModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
    >
      <div 
        className="bg-card text-primary border border-border/80 rounded-2xl w-full max-w-sm sm:max-w-md shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close (X) button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-secondary hover:text-primary hover:bg-page transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 pt-8 text-center">
          {/* Logout Icon with pulsing aura */}
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <LogOut className="w-8 h-8" />
          </div>

          <h3 id="logout-modal-title" className="text-xl font-black text-primary mb-2">
            {title}
          </h3>
          <p className="text-sm text-secondary leading-relaxed max-w-xs mx-auto">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 p-4 bg-page/40 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-card hover:bg-page border border-border text-secondary hover:text-primary font-bold rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-border"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <LogOut className="w-4 h-4" />
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
