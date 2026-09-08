import { db } from '@/lib/storage/db';
import { STORAGE_KEYS } from '@/lib/storage/keys';

export const studentsApi = {
  listByOwner: (ownerId: string) => {
    return db.getAll<any>(STORAGE_KEYS.USERS).filter((u: any) => u.role === 'student' && u.ownerId === ownerId).map((u: any) => ({ user: u, profile: { ...u, duesAmount: u.duesAmount || 0 } }));
  },
  getById: (id: string) => {
    const user = db.getById<any>(STORAGE_KEYS.USERS, id);
    return { 
      user,
      profile: user || {}, 
      documents: [] 
    };
  },
  getInvoices: (studentId: string) => {
    return db.getAll<any>(STORAGE_KEYS.INVOICES)
      .filter(i => i.studentId === studentId && !i.isDeleted)
      .sort((a,b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
  },
  checkout: (id: string, actorId: string) => {},
  onboardStudent: (data: any, actorId: string) => {}
};

export const roomsApi = {
  listByProperty: (propertyId: string): any[] => {
    return [];
  }
};

export const bedsApi = {
  listByProperty: (propertyId: string): any[] => {
    return [];
  },
  listByRoom: (roomId: string): any[] => {
    return [];
  }
};

export const propertiesApi = {
  listByOwner: (ownerId: string) => {
    return db.getAll<any>(STORAGE_KEYS.PROPERTIES).filter((p: any) => p.ownerId === ownerId);
  },
  getByProperty: (propertyId: string) => {
    return db.getById<any>(STORAGE_KEYS.PROPERTIES, propertyId) || null;
  },
  listAll: () => {
    return db.getAll<any>(STORAGE_KEYS.PROPERTIES);
  }
};

export const foodApi = {
  getByProperty: (propertyId: string): any => {
    return null;
  }
};

export const financeApi = {
  updateElectricityBill: (_invoiceId: string, _amount: number, _imageUrl: string, _actorId: string): void => {},
  seedMonthlyInvoices: (_propertyId: string): void => {},
  listInvoices: (_propertyId: string): any[] => { return []; },
  recordCashPayment: (_data: { propertyId: string; studentId: string; amount: number; method: string }, _actorId: string, _invoiceId: string): void => {},
  createExpense: (_data: { propertyId: string; category: string; amount: number; description: string }, _actorId: string): void => {},
  getStats: (_actorId: string, _propertyId: string): { expenses: any[]; [key: string]: any } => { return { expenses: [] }; }
};

export const stockRequestsApi = {
  getByProperty: (propertyId: string): any[] => {
    return [];
  }
};
