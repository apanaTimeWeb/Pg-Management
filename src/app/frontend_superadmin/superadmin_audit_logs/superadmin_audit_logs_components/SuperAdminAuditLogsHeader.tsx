// RESPONSIBILITY: Renders the SuperAdminAuditLogsHeader component.
import React from 'react';

import type { SuperAdminAuditLogsHeaderProps } from '@/app/frontend_superadmin/superadmin_audit_logs/superadmin_audit_logs_types/SuperAdminAuditLogs.types';

export const SuperAdminAuditLogsHeader: React.FC<SuperAdminAuditLogsHeaderProps> = () => {
  return (
    <div className="border-b border-border pb-6">
      <h1 className="text-3xl font-bold tracking-tight text-primary">System Audit Logs</h1>
      <p className="text-secondary text-sm mt-1">Chronological record of critical system actions.</p>
    </div>
  );
};
