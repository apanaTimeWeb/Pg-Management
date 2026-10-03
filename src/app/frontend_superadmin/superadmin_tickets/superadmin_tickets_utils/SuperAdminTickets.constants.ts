import type { CreateTicketFormData } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperAdminTickets.types';

export const SUPER_ADMIN_TICKETS_ITEMS_PER_PAGE = 10;

export const DEFAULT_CREATE_TICKET_FORM_DATA: CreateTicketFormData = {
  ownerId: '', 
  title: '', 
  description: '', 
  priority: 'Medium'
};
