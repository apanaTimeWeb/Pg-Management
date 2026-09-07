// RESPONSIBILITY: Renders the SuperAdminOwnersTable component.
import React from 'react';
import { MoreVertical, Users } from 'lucide-react';
import { SuperAdminOwnersTableProps } from '@/app/superadmin/owners/SuperAdminOwners_types/SuperAdminOwners.types';
import { StatusBadge } from '@/config/statusBadgeConfig';
import { formatINR } from '@/lib/utils/formatters';
import { Pagination } from '@/components/shared/Pagination';

export const SuperAdminOwnersTable: React.FC<SuperAdminOwnersTableProps> = ({
  owners,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onRowClick
}) => {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] shadow-sm">
      <div className="overflow-x-auto max-h-[60vh] custom-scrollbar">
        <table className="w-full text-sm text-left">
          <thead className="bg-[var(--bg-card)] border-b border-[var(--border)] text-[var(--text-secondary)] uppercase text-[12px] sticky top-0 z-10 shadow-sm shadow-black/5">
            <tr>
              <th className="px-6 py-4 font-semibold">Owner Info</th>
              <th className="px-6 py-4 font-semibold">Plan</th>
              <th className="px-6 py-4 font-semibold text-center">Portfolio</th>
              <th className="px-6 py-4 font-semibold text-right">Collection</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[var(--text-secondary)] motion-safe:animate-pulse">
                  Loading owners...
                </td>
              </tr>
            ) : owners.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <Users className="w-12 h-12 text-[var(--text-secondary)] opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">No owners found</h3>
                  <p className="text-[var(--text-secondary)] text-sm">No owners match your current filters.</p>
                </td>
              </tr>
            ) : (
              owners.map((o) => (
                <tr 
                  key={o.id} 
                  onClick={() => onRowClick(o.id)} 
                  className="h-12 even:bg-black/5 dark:even:bg-white/[0.02] hover:bg-[var(--primary-subtle)] transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-[var(--text-primary)] truncate max-w-[200px]">{o.name}</div>
                    <div className="text-[var(--text-secondary)] truncate max-w-[200px]">{o.businessName}</div>
                    <div className="text-[11px] text-[var(--text-disabled)] mt-0.5 truncate max-w-[200px]">{o.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-[var(--text-primary)] capitalize">{o.planId}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="font-medium text-[var(--text-primary)]">{o.propertiesCount} PGs</div>
                    <div className="text-[var(--text-secondary)] text-[12px]">{o.bedsCount} Beds ({o.occupancy}% full)</div>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-[var(--success)]">
                    {formatINR(o.collectionThisMonth)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="transition-opacity">
                      <button 
                        className="p-2 text-[var(--text-secondary)] hover:text-[var(--danger)] hover:bg-[var(--danger-bg)] rounded-[var(--radius-md,8px)] transition-colors" 
                        title="Quick Actions"
                        onClick={(e) => e.stopPropagation()} // Prevent row click
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
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
