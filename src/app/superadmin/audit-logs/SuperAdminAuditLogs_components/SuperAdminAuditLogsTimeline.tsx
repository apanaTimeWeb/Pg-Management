// RESPONSIBILITY: Renders the SuperAdminAuditLogsTimeline component.
import React from 'react';
import { Shield, Clock } from 'lucide-react';

import { Pagination } from '@/components/ui/Pagination';

import type { SuperAdminAuditLogsTimelineProps } from '@/app/superadmin/audit-logs/SuperAdminAuditLogs_types/SuperAdminAuditLogs.types';

export const SuperAdminAuditLogsTimeline: React.FC<SuperAdminAuditLogsTimelineProps> = ({ logs, currentPage, totalPages, setCurrentPage }) => {
  return (
    <>
      <div className="overflow-x-auto p-4 sm:p-6">
        <div className="relative border-l border-[var(--border)] ml-3 space-y-8 pb-8">
          {logs.length === 0 && <div className="pl-6 text-secondary">No logs found.</div>}
          
          {logs.map(log => (
            <div key={log.id} className="relative pl-8">
              <span className="absolute -left-[17px] top-1 bg-[var(--bg-card)] border-[3px] border-[#4F46E5] w-[32px] h-[32px] rounded-full flex items-center justify-center shadow-sm">
                <Shield className="w-4 h-4 text-[#4F46E5]" />
              </span>
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#4F46E5]/30 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-primary text-sm">
                    {log.action ? log.action.replace(/_/g, ' ') : 'Unknown Action'}
                  </div>
                  <div className="text-[11px] text-secondary flex items-center gap-1">
                    <Clock className="w-3 h-3"/> {new Date(log.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-sm text-secondary">
                  {log.details || log.entity || ''}
                </div>
                <div className="mt-3 text-[11px] text-disabled font-mono">
                  Actor: {log.actorId} | Target: {log.targetId || log.entityId || 'N/A'} | Ref: {log.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      )}
    </>
  );
};
