import { listAll, listByOwner, getById } from './properties/read';
import { create } from './properties/create';
export * from './properties/types';

export const propertiesApi = {
  listAll,
  listByOwner,
  getById,
  create
};
