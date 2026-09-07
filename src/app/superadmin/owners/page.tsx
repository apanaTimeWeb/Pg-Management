'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SuperAdminOwnersFilters } from './SuperAdminOwners_components/SuperAdminOwnersFilters';
import { SuperAdminOwnersTable } from './SuperAdminOwners_components/SuperAdminOwnersTable';
import { useSuperAdminOwnersData } from './SuperAdminOwners_hooks/useSuperAdminOwnersData';

export default function SuperAdminOwnersDirectoryPage() {
  const router = useRouter();
  const dataHook = useSuperAdminOwnersData();

  const handleRowClick = (id: string) => {
    router.push(`/superadmin/owners/${id}`);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[var(--text-primary)]">PG Owners Directory</h1>
          <p className="text-[var(--text-secondary)] text-sm">Manage registered owners and their platform usage.</p>
        </div>
        <Link 
          href="/superadmin/create-owner" 
          className="bg-[var(--primary)] text-white px-4 py-2 rounded-[var(--radius-md,8px)] text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors shadow-sm"
        >
          + Add New Owner
        </Link>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] shadow-sm">
        <SuperAdminOwnersFilters 
          statusFilter={dataHook.statusFilter}
          setStatusFilter={dataHook.setStatusFilter}
          search={dataHook.search}
          setSearch={dataHook.setSearch}
        />
        <SuperAdminOwnersTable 
          owners={dataHook.owners}
          loading={dataHook.loading}
          currentPage={dataHook.currentPage}
          totalPages={dataHook.totalPages}
          onPageChange={dataHook.setCurrentPage}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}