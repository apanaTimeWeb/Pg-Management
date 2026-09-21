'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SuperAdminOwnersFilters } from '@/app/superadmin/owners/SuperAdminOwners_components/SuperAdminOwnersFilters';
import { SuperAdminOwnersTable } from '@/app/superadmin/owners/SuperAdminOwners_components/SuperAdminOwnersTable';
import { SuperadminUseSuperAdminOwnersData } from '@/app/superadmin/owners/SuperAdminOwners_hooks/SuperadminUseSuperAdminOwnersData';

export default function SuperAdminOwnersDirectoryPage() {
  const router = useRouter();
  const dataHook = SuperadminUseSuperAdminOwnersData();

  const handleRowClick = (id: string) => {
    router.push(`/superadmin/owners/${id}`);
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">PG Owners Directory</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Manage registered owners and their platform usage.</p>
        </div>
        <Link 
          href="/superadmin/create-owner" 
          className="inline-flex items-center gap-2 bg-[#4F46E5] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#4338CA] transition-all shadow-sm focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
        >
          + Add New Owner
        </Link>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
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