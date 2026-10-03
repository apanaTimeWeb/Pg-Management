import { SuperadminAuditSecurityMain } from '@/app/frontend_superadmin/superadmin_audit_logs/superadmin_audit_logs_components/SuperadminAuditSecurityMain';

export const metadata = {
  title: 'Audit & Security | SuperAdmin',
};

import { Suspense } from 'react';

export default function SuperadminAuditSecurityPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuperadminAuditSecurityMain />
    </Suspense>
  );
}