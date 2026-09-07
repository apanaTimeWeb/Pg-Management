// RESPONSIBILITY: Renders the SuperAdminAuditLogsHeader component.
import React from 'react';
import { SuperAdminAuditLogsHeaderProps } from '@/app/superadmin/audit-logs/SuperAdminAuditLogs_types/SuperAdminAuditLogs.types';

export const SuperAdminAuditLogsHeader: React.FC<SuperAdminAuditLogsHeaderProps> = () => {
  return (
    <div>
      <h1 className="text-[22px] font-bold text-[var(--text-primary)]">System Audit Logs</h1>
      <p className="text-[var(--text-secondary)] text-sm">Chronological record of critical system actions.</p>
    </div>
  );
};
