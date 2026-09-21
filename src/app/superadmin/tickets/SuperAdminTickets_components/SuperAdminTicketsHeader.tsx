// RESPONSIBILITY: Renders the SuperAdminTicketsHeader component.
import React from 'react';
import { Plus } from 'lucide-react';

import type { SuperAdminTicketsHeaderProps } from '@/app/superadmin/tickets/SuperAdminTickets_types/SuperAdminTickets.types';

export const SuperAdminTicketsHeader: React.FC<SuperAdminTicketsHeaderProps> = ({ onCreateClick }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border)] pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">Support Tickets</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Manage issues reported by PG Owners.</p>
      </div>
      <button 
        onClick={onCreateClick} 
        className="inline-flex items-center gap-2 bg-[#4F46E5] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#4338CA] transition-all shadow-sm focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
      >
        <Plus className="w-4 h-4" /> Create on Behalf
      </button>
    </div>
  );
};
