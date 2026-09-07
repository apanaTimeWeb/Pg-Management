// RESPONSIBILITY: Renders the ManagerVisitorsMain component.
'use client';

import { ManagerUseManagerVisitors } from '@/app/manager/visitors/ManagerVisitors_hooks/ManagerUseManagerVisitors';
import { ManagerVisitorsList } from '@/app/manager/visitors/ManagerVisitors_components/ManagerVisitorsList';

export function ManagerVisitorsMain() {
  const { visitors, loading, handleStatus, selectedPropertyId, ctxLoading } = ManagerUseManagerVisitors();

  if (ctxLoading || loading) return <div className="p-6 text-[var(--text-secondary)]">Loading...</div>;
  if (!selectedPropertyId) return <div className="p-6 text-center text-[var(--text-secondary)]">Property Required</div>;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[24px] font-bold text-[var(--text-primary)]">Visitors</h1>
          <p className="text-sm text-[var(--text-secondary)]">Approve and log visitor entries.</p>
        </div>
      </div>

      <ManagerVisitorsList visitors={visitors} handleStatus={handleStatus} />
    </div>
  );
}
