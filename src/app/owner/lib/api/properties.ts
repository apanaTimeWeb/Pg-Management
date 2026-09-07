import { listAll, listByOwner, getById } from '@/app/owner/lib/api/properties/read';
import { create } from '@/app/owner/lib/api/properties/create';
export * from './properties/types';

export const propertiesApi = {
  listAll,
  listByOwner,
  getById,
  create
};
