import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SuperAdminDashboardLatestRequestsTableProps } from '@/app/superadmin/dashboard/SuperAdminDashboard_types/SuperAdminDashboard.types';

export const SuperAdminDashboardLatestRequestsTable: React.FC<SuperAdminDashboardLatestRequestsTableProps> = ({ requests }) => {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-[var(--border)] flex justify-between items-center">
        <h3 className="font-semibold text-[var(--text-primary)]">Latest Owner Requests</h3>
        <Link href="/superadmin/owner-requests" className="text-sm text-[var(--primary)] hover:underline flex items-center">
          View All <ArrowUpRight className="w-4 h-4 ml-1"/>
        </Link>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm text-left">
          <thead className="bg-[var(--primary-subtle)] text-[var(--text-secondary)] uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Business</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {requests.map((r) => (
              <tr key={r.id} className="h-12 even:bg-black/5 dark:even:bg-white/[0.02] hover:bg-[var(--primary-subtle)] transition-colors">
                <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{r.name}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{r.businessName}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{r.city}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${r.status === 'Pending' ? 'bg-[var(--warning-bg)] text-[var(--warning)] border border-[var(--warning)]' : r.status === 'Hold' ? 'bg-[var(--info-bg)] text-[var(--info)] border border-[var(--info)]' : r.status === 'Rejected' ? 'bg-[var(--danger-bg)] text-[var(--danger)] border border-[var(--danger)]' : 'bg-[var(--success-bg)] text-[var(--success)] border border-[var(--success)]'}`}>
                    {r.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-[var(--text-secondary)] h-12">No requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
