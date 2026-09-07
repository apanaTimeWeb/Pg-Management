'use client';

import React from 'react';
import { SuperAdminTicketsHeader } from './SuperAdminTickets_components/SuperAdminTicketsHeader';
import { SuperAdminTicketsTable } from './SuperAdminTickets_components/SuperAdminTicketsTable';
import { SuperAdminTicketsCreateModal } from './SuperAdminTickets_components/SuperAdminTicketsCreateModal';
import { useSuperAdminTicketsData } from './SuperAdminTickets_hooks/useSuperAdminTicketsData';
import { useSuperAdminTicketsActions } from './SuperAdminTickets_hooks/useSuperAdminTicketsActions';

export default function TicketsPage() {
  const {
    tickets,
    owners,
    loading,
    search,
    setSearch,
    currentPage,
    totalPages,
    setCurrentPage,
    refetch
  } = useSuperAdminTicketsData();

  const {
    createModal,
    setCreateModal,
    formData,
    setFormData,
    handleCreate,
    handleStatusChange
  } = useSuperAdminTicketsActions(refetch);

  return (
    <div className="space-y-6 pb-20">
      <SuperAdminTicketsHeader onCreateClick={() => setCreateModal(true)} />
      
      <SuperAdminTicketsTable 
        tickets={tickets}
        owners={owners}
        loading={loading}
        search={search}
        setSearch={setSearch}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onStatusChange={handleStatusChange}
      />

      <SuperAdminTicketsCreateModal 
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        owners={owners}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreate}
      />
    </div>
  );
}