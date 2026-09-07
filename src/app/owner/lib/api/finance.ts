import { getStats } from '@/app/owner/lib/api/finance/stats';
import { listInvoices, recordCashPayment, updateElectricityBill, createExpense } from '@/app/owner/lib/api/finance/transactions';
import { seedMocksIfEmpty, seedMonthlyInvoices } from '@/app/owner/lib/api/finance/seed';
export * from './finance/types';

export const financeApi = {
  getStats,
  listInvoices,
  recordCashPayment,
  updateElectricityBill,
  createExpense,
  seedMocksIfEmpty,
  seedMonthlyInvoices
};
