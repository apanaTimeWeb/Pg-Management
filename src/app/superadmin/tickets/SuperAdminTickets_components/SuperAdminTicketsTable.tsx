import React from 'react';
import { Search } from 'lucide-react';
import { StatusBadge } from '@/config/statusBadgeConfig';
import { Pagination } from '@/components/shared/Pagination';
import { SuperAdminTicketsTableProps, SuperAdminTicket } from '../SuperAdminTickets_types/SuperAdminTickets.types';

const PriorityBadge = ({ p }: { p: string }) => {
  const color = p === 'High' ? 'text-[var(--danger)]' : p === 'Medium' ? 'text-[var(--warning)]' : 'text-[var(--success)]';
  return <span className={`text-[12px] font-medium ${color}`}>{p}</span>;
};

export const SuperAdminTicketsTable: React.FC<SuperAdminTicketsTableProps> = ({
  tickets,
  owners,
  loading,
  search,
  setSearch,
  currentPage,
  totalPages,
  onPageChange,
  onStatusChange
}) => {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] shadow-sm">
      <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg-card)] rounded-t-[var(--radius-lg,12px)]">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--text-secondary)]" />
          <input 
            type="text" 
            placeholder="Search tickets..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[var(--bg-input)] border border-[var(--border)] pl-9 pr-4 py-2 rounded-[var(--radius-md,8px)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-sm text-left">
          <thead className="bg-[var(--bg-card)] border-b border-[var(--border)] text-[var(--text-secondary)] uppercase text-[12px] sticky top-0 z-10 shadow-sm shadow-black/5">
            <tr>
              <th className="px-6 py-4 font-semibold">Issue</th>
              <th className="px-6 py-4 font-semibold">Owner</th>
              <th className="px-6 py-4 font-semibold text-center">Priority</th>
              <th className="px-6 py-4 font-semibold text-center">Date</th>
              <th className="px-6 py-4 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[var(--text-secondary)] motion-safe:animate-pulse">
                  Loading tickets...
                </td>
              </tr>
            ) : tickets.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[var(--text-secondary)]">
                  No tickets found.
                </td>
              </tr>
            ) : (
              tickets.map((t: SuperAdminTicket) => {
                const owner = owners.find(o => o.id === t.ownerId);
                return (
                  <tr key={t.id} className="h-12 even:bg-black/5 dark:even:bg-white/[0.02] hover:bg-[var(--primary-subtle)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-[var(--text-primary)]">{t.title}</div>
                      <div className="text-[11px] text-[var(--text-secondary)] truncate max-w-[250px]">{t.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[var(--text-primary)]">{owner?.name || 'Unknown'}</div>
                      <div className="text-[11px] text-[var(--text-disabled)]">{owner?.businessName}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <PriorityBadge p={t.priority} />
                    </td>
                    <td className="px-6 py-4 text-center text-[12px] text-[var(--text-secondary)]">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end gap-2">
                        <StatusBadge status={t.status} />
                        <select 
                          value={t.status}
                          onChange={(e) => onStatusChange(t.id, e.target.value)}
                          className="bg-transparent border border-[var(--border)] text-[11px] text-[var(--text-primary)] rounded-md px-1 py-0.5 focus:outline-none focus:border-[var(--primary)] cursor-pointer"
                        >
                          <option value="Open" className="text-[var(--text-primary)] bg-[var(--bg-card)]">Open</option>
                          <option value="In Progress" className="text-[var(--text-primary)] bg-[var(--bg-card)]">In Progress</option>
                          <option value="Resolved" className="text-[var(--text-primary)] bg-[var(--bg-card)]">Resolved</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={onPageChange} 
        />
      )}
    </div>
  );
};
