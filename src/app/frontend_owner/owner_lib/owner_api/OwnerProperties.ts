// @ts-nocheck
import { listAll, listByOwner, getById } from '@/app/frontend_owner/owner_lib/owner_api/owner_properties/OwnerRead';
import { OwnerCreate as create } from '@/app/frontend_owner/owner_lib/owner_api/owner_properties/OwnerCreate';
export * from '@/app/frontend_owner/owner_lib/owner_api/owner_properties/OwnerTypes';

export const propertiesApi = {
  listAll,
  listByOwner,
  getById,
  create
};
