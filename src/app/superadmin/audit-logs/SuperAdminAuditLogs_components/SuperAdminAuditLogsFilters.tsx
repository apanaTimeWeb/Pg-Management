import React from 'react';
import { Search } from 'lucide-react';
import { SuperAdminAuditLogsFiltersProps } from '@/app/superadmin/audit-logs/SuperAdminAuditLogs_types/SuperAdminAuditLogs.types';

export const SuperAdminAuditLogsFilters: React.FC<SuperAdminAuditLogsFiltersProps> = ({ search, setSearch, roleFilter, setRoleFilter, filters }) => {
  return (
    <div className="p-4 border-b border-[var(--border)] flex flex-col sm:flex-row gap-4 justify-between items-center bg-[var(--bg-card)] rounded-t-[var(--radius-lg,12px)]">
      <div className="flex gap-2">
        {filters.map(f => (
          <button 
            key={f} 
            onClick={() => setRoleFilter(f)}
            className={`px-3 py-1.5 text-sm font-medium rounded-[var(--radius-full,999px)] transition-colors ${roleFilter === f ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-page)] text-[var(--text-secondary)] hover:bg-[var(--border)]'}`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="relative w-full sm:w-72">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--text-secondary)]" />
        <input 
          type="text" 
          placeholder="Search logs..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[var(--bg-input)] border border-[var(--border)] pl-9 pr-4 py-2 rounded-[var(--radius-md,8px)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors"
        />
      </div>
    </div>
  );
};
