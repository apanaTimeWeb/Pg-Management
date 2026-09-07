// @ts-nocheck
import { db } from '@/lib/storage/db';
import { STORAGE_KEYS } from '@/lib/storage/keys';


export const studentsApi = {
  listByOwner: (ownerId: string) => {
    return [] || [];
  },
  getById: (id: string) => {
    return { profile: [].find((s: any) => s.id === id) || [][0], documents: [] };
  },
  seedMocksIfEmpty: (ownerId: string) => {},
  markNotice: (id: string, ownerId: string) => {},
  checkout: (id: string, ownerId: string) => {}
};
