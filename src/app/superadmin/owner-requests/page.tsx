'use client';

import React from 'react';

import { SuperAdminOwnerRequestsFilters } from '@/app/superadmin/owner-requests/SuperAdminOwnerRequests_components/SuperAdminOwnerRequestsFilters';
import { SuperAdminOwnerRequestsTable } from '@/app/superadmin/owner-requests/SuperAdminOwnerRequests_components/SuperAdminOwnerRequestsTable';
import { SuperAdminOwnerRequestsReviewModal } from '@/app/superadmin/owner-requests/SuperAdminOwnerRequests_components/SuperAdminOwnerRequestsReviewModal';
import { SuperadminUseSuperAdminOwnerRequestsData } from '@/app/superadmin/owner-requests/SuperAdminOwnerRequests_hooks/SuperadminUseSuperAdminOwnerRequestsData';
import { SuperadminUseSuperAdminOwnerRequestsActions } from '@/app/superadmin/owner-requests/SuperAdminOwnerRequests_hooks/SuperadminUseSuperAdminOwnerRequestsActions';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

// RESPONSIBILITY: Entry wrapper. Composes UI components and passes state.

export default function SuperAdminOwnerRequestsPage() {
  const dataHook = SuperadminUseSuperAdminOwnerRequestsData();
  const actionsHook = SuperadminUseSuperAdminOwnerRequestsActions(dataHook.refetch);

  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">Owner Requests</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Manage incoming inquiries for new PGs.</p>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
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
