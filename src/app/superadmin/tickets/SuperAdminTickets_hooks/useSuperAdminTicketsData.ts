'use client';

import { useState, useEffect } from 'react';
import { ticketsApi } from '@/app/superadmin/lib/api/tickets';
import { ownersApi } from '@/app/owner/lib/api/owners';
import { SuperAdminTicket } from '../SuperAdminTickets_types/SuperAdminTickets.types';
import { SUPER_ADMIN_TICKETS_ITEMS_PER_PAGE } from '../SuperAdminTickets_utils/SuperAdminTickets.constants';

export function useSuperAdminTicketsData() {
  const [tickets, setTickets] = useState<SuperAdminTicket[]>([]);
  const [owners, setOwners] = useState<any[]>([]); // Will be typed properly when owners global types exist
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const loadData = () => {
    setLoading(true);
    // Explicit casting to match our strictly typed frontend model
    setTickets(ticketsApi.listTickets() as unknown as SuperAdminTicket[]);
    setOwners(ownersApi.listOwners());
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filtered = tickets.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.description.toLowerCase().includes(search.toLowerCase())
  );
  
  const totalPages = Math.ceil(filtered.length / SUPER_ADMIN_TICKETS_ITEMS_PER_PAGE);
  const paginatedData = filtered.slice(
    (currentPage - 1) * SUPER_ADMIN_TICKETS_ITEMS_PER_PAGE, 
    currentPage * SUPER_ADMIN_TICKETS_ITEMS_PER_PAGE
  );

  return {
    tickets: paginatedData,
    owners,
    loading,
    search,
    setSearch,
    currentPage,
    totalPages,
    setCurrentPage,
    refetch: loadData
  };
}
