import { getStats } from './finance/stats';
import { listInvoices, recordCashPayment, updateElectricityBill, createExpense } from './finance/transactions';
import { seedMocksIfEmpty, seedMonthlyInvoices } from './finance/seed';
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
