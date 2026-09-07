'use client';

import { useState } from 'react';
import { ticketsApi } from '@/app/superadmin/lib/api/tickets';
import { CreateTicketFormData } from '../SuperAdminTickets_types/SuperAdminTickets.types';
import { DEFAULT_CREATE_TICKET_FORM_DATA } from '../SuperAdminTickets_utils/SuperAdminTickets.constants';

export function useSuperAdminTicketsActions(refetch: () => void) {
  const [createModal, setCreateModal] = useState(false);
  const [formData, setFormData] = useState<CreateTicketFormData>(DEFAULT_CREATE_TICKET_FORM_DATA);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ownerId || !formData.title || !formData.description) return;
    
    ticketsApi.createTicketOnBehalf(formData);
    setCreateModal(false);
    setFormData(DEFAULT_CREATE_TICKET_FORM_DATA);
    refetch();
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    ticketsApi.updateTicketStatus(id, newStatus);
    refetch();
  };

  return {
    createModal,
    setCreateModal,
    formData,
    setFormData,
    handleCreate,
    handleStatusChange
  };
}
