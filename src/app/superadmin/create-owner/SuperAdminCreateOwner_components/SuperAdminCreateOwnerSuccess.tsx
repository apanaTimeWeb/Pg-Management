import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { SuperAdminCreateOwnerSuccessProps } from '../SuperAdminCreateOwner_types/SuperAdminCreateOwner.types';

export const SuperAdminCreateOwnerSuccess: React.FC<SuperAdminCreateOwnerSuccessProps> = ({ credentials }) => {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="bg-[var(--success-bg)] border border-[var(--success)] p-8 rounded-[var(--radius-lg,12px)] text-center shadow-lg">
        <CheckCircle className="w-16 h-16 text-[var(--success)] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Owner Created Successfully</h2>
        <p className="text-[var(--text-secondary)] mb-6">The owner account and subscription have been provisioned.</p>
        
        <div className="bg-[var(--bg-card)] border border-[var(--border)] p-4 rounded-md text-left mb-6">
          <div className="text-xs text-[var(--text-secondary)] uppercase font-bold tracking-wider mb-2">Secure Credentials</div>
          <div className="font-mono text-[var(--text-primary)]">Email: {credentials.email}</div>
          <div className="font-mono text-[var(--text-primary)]">Password: {credentials.password}</div>
        </div>
        
        <Link 
          href="/superadmin/owners" 
          className="inline-block bg-[var(--primary)] text-white font-medium px-6 py-3 rounded-md hover:bg-[var(--primary-hover)] transition-colors"
        >
          Go to Owners Directory
        </Link>
      </div>
    </div>
  );
};
