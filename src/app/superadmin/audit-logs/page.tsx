'use client';

import React from 'react';
import { useSuperAdminAuditLogsData } from './SuperAdminAuditLogs_hooks/useSuperAdminAuditLogsData';
import { SuperAdminAuditLogsHeader } from './SuperAdminAuditLogs_components/SuperAdminAuditLogsHeader';
import { SuperAdminAuditLogsFilters } from './SuperAdminAuditLogs_components/SuperAdminAuditLogsFilters';
import { SuperAdminAuditLogsTimeline } from './SuperAdminAuditLogs_components/SuperAdminAuditLogsTimeline';

export default function AuditLogsPage() {
  const {
    loading,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    filters
  } = useSuperAdminAuditLogsData();

  if (loading) return null; // Let loading.tsx handle it

  return (
    <div className="space-y-6 pb-20">
      <SuperAdminAuditLogsHeader />

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] shadow-sm">
        <SuperAdminAuditLogsFilters 
          search={search} 
          setSearch={setSearch} 
          roleFilter={roleFilter} 
          setRoleFilter={setRoleFilter} 
          filters={filters} 
        />

        <SuperAdminAuditLogsTimeline 
          logs={paginatedData} 
          currentPage={currentPage} 
          totalPages={totalPages} 
          setCurrentPage={setCurrentPage} 
        />
      </div>
    </div>
  );
}