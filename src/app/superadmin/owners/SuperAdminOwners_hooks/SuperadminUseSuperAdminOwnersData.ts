// DATA FLOW: [AI_TODO: Document data flow direction for SuperadminUseSuperAdminOwnersData.ts]
'use client';

import { useState, useEffect } from 'react';

import { ownersApi } from '@/app/owner/owner_lib/owner_api/owners';
import { ITEMS_PER_PAGE } from '@/app/superadmin/owners/SuperAdminOwners_utils/SuperAdminOwners.constants';

import type { OwnerDirectoryItem, OwnerStatus } from '@/app/superadmin/owners/SuperAdminOwners_types/SuperAdminOwners.types';

export function SuperadminUseSuperAdminOwnersData() {
  const [owners, setOwners] = useState<OwnerDirectoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OwnerStatus>('All');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const loadOwners = () => {
    setLoading(true);
    // Cast to OwnerDirectoryItem[] to ensure strict typing. 
    // Real implementation would use TanStack React Query.
    const fetched = ownersApi.listOwners();
    setOwners(fetched as OwnerDirectoryItem[]);
    setLoading(false);
  };

  useEffect(() => {
    loadOwners();
  }, []);

  // Reset page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, search]);

  const filtered = owners.filter(o => {
    if (statusFilter !== 'All' && o.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return o.name.toLowerCase().includes(q) || 
             o.businessName.toLowerCase().includes(q) || 
             o.email.toLowerCase().includes(q);
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedData = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return {
    owners: paginatedData,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    currentPage,
    totalPages,
    setCurrentPage,
    refetch: loadOwners
  };
}
