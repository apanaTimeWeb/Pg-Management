import type { OwnerRequestStatus } from '@/app/frontend_superadmin/superadmin_owner_requests/superadmin_owner_requests_types/SuperAdminOwnerRequests.types';

export const SUPER_ADMIN_OWNER_REQUEST_STATUSES: OwnerRequestStatus[] = [
  'All',
  'Pending',
  'Hold',
  'Approved',
  'Rejected'
];

export const ITEMS_PER_PAGE = 10;
