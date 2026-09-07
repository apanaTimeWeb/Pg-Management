'use client';

import React from 'react';
import { SuperAdminOwnerRequestsFilters } from './SuperAdminOwnerRequests_components/SuperAdminOwnerRequestsFilters';
import { SuperAdminOwnerRequestsTable } from './SuperAdminOwnerRequests_components/SuperAdminOwnerRequestsTable';
import { SuperAdminOwnerRequestsReviewModal } from './SuperAdminOwnerRequests_components/SuperAdminOwnerRequestsReviewModal';
import { useSuperAdminOwnerRequestsData } from './SuperAdminOwnerRequests_hooks/useSuperAdminOwnerRequestsData';
import { useSuperAdminOwnerRequestsActions } from './SuperAdminOwnerRequests_hooks/useSuperAdminOwnerRequestsActions';
import { ConfirmDialog } from '@/lib/ui/ConfirmDialog';

// RESPONSIBILITY: Entry wrapper. Composes UI components and passes state.

export default function SuperAdminOwnerRequestsPage() {
  const dataHook = useSuperAdminOwnerRequestsData();
  const actionsHook = useSuperAdminOwnerRequestsActions(dataHook.refetch);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[var(--text-primary)]">Owner Requests</h1>
          <p className="text-[var(--text-secondary)] text-[14px]">Manage incoming inquiries for new PGs.</p>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] shadow-sm">
        <SuperAdminOwnerRequestsFilters 
          filter={dataHook.filter}
          setFilter={dataHook.setFilter}
          search={dataHook.search}
          setSearch={dataHook.setSearch}
        />
        <SuperAdminOwnerRequestsTable 
          requests={dataHook.requests}
          loading={dataHook.loading}
          currentPage={dataHook.currentPage}
          totalPages={dataHook.totalPages}
          onPageChange={dataHook.setCurrentPage}
          onApprove={actionsHook.onApproveClick}
          onHold={actionsHook.onHoldClick}
          onReject={actionsHook.onRejectClick}
        />
      </div>

      <SuperAdminOwnerRequestsReviewModal 
        isOpen={actionsHook.rejectModalOpen}
        onClose={() => actionsHook.setRejectModalOpen(false)}
        onSubmit={actionsHook.handleRejectSubmit}
      />

      <ConfirmDialog 
        isOpen={actionsHook.holdModalOpen}
        title="Hold Request"
        message="Are you sure you want to put this request on hold? You can process it later."
        confirmText="Yes, put on hold"
        onConfirm={actionsHook.handleHold}
        onCancel={() => actionsHook.setHoldModalOpen(false)}
      />
    </div>
  );
}
