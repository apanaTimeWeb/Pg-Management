import { db } from '@/lib/storage/db';
import { STORAGE_KEYS } from '@/lib/storage/keys';

export const studentsApi = {
  listByOwner: (ownerId: string) => {
    return db.getAll<any>(STORAGE_KEYS.USERS).filter((u: any) => u.role === 'student' && u.ownerId === ownerId).map((u: any) => ({ user: u, profile: { ...u, duesAmount: u.duesAmount || 0 } }));
  },
  getById: (id: string) => {
    return { 
      profile: db.getById<any>(STORAGE_KEYS.USERS, id) || {}, 
      documents: [] 
    };
  },
  seedMocksIfEmpty: (ownerId: string) => {},
  markNotice: (id: string, ownerId: string) => {},
  checkout: (id: string, ownerId: string) => {}
};
