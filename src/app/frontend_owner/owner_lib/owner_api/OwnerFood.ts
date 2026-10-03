import { db } from '@/lib/storage/db';
import { STORAGE_KEYS } from '@/lib/storage/keys';

export const foodApi = {
  getByProperty: (propertyId: string) => {
    const all = db.getAll<any>(STORAGE_KEYS.MENUS);
    return all.find((m: any) => m.propertyId === propertyId) || {
      id: propertyId,
      propertyId,
      status: 'Active',
      dailyMenu: { monday: {}, tuesday: {}, wednesday: {}, thursday: {}, friday: {}, saturday: {}, sunday: {} }
    };
  },
  save: (propertyId: string, menu: any) => {
    const all = db.getAll<any>(STORAGE_KEYS.MENUS);
    const existing = all.find((m: any) => m.propertyId === propertyId);
    if (existing) {
      db.update(STORAGE_KEYS.MENUS, existing.id, { ...existing, ...menu, propertyId, updatedAt: new Date().toISOString() });
    } else {
      db.insert(STORAGE_KEYS.MENUS, { propertyId, ...menu, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as any);
    }
  }
};
