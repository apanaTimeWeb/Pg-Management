import { db } from '@/lib/storage/db';
import { STORAGE_KEYS } from '@/lib/storage/keys';

export const parentOperationsApi = {
  getLinkedChild: (parentId: string) => {
    const parents = db.getAll<any>(STORAGE_KEYS.PARENTS);
    const p = parents.find(x => x.userId === parentId);
    if (!p) return null;

    const students = db.getAll<any>(STORAGE_KEYS.STUDENTS);
    let child = students.find(t => t.parentEmail === p.email || t.parentId === p.id);
    if (!child) {
      child = students[0];
    }
    return child || null;
  },

  getChildGateLogs: (studentId: string) => {
    return db.getAll<any>('spg_gate_logs').filter(l => l.studentId === studentId && !l.isDeleted).sort((a,b) => new Date((b as any).createdAt).getTime() - new Date((a as any).createdAt).getTime());
  },

  getChildAlerts: (studentId: string) => {
    const alerts: any[] = [];
    
    // Check SOS
    const sos = db.getAll<any>('spg_sos').filter(s => s.studentId === studentId && s.status === 'active' && !s.isDeleted);
    sos.forEach(s => alerts.push({ id: s.id, type: 'sos', title: 'Emergency SOS Triggered', date: s.createdAt, severity: 'high' }));

    // Check Late Entries
    const late = db.getAll<any>('spg_gate_logs').filter(l => l.studentId === studentId && l.isLate && !l.isDeleted);
    late.forEach(l => alerts.push({ id: l.id, type: 'late', title: 'Late Entry Logged', date: l.createdAt, severity: 'medium' }));

    // Check Dues
    const invoices = db.getAll<any>(STORAGE_KEYS.INVOICES).filter(i => i.studentId === studentId && i.status !== 'Paid' && !i.isDeleted);
    invoices.forEach(i => alerts.push({ id: i.id, type: 'due', title: `Rent Due: ₹${i.amount}`, date: i.dueDate, severity: 'low' }));

    return alerts.sort((a,b) => new Date((b as any).date).getTime() - new Date((a as any).date).getTime());
  },

  getChildInvoices: (studentId: string) => {
    return db.getAll<any>(STORAGE_KEYS.INVOICES).filter(i => i.studentId === studentId && !i.isDeleted).sort((a,b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
  },

  getChildComplaints: (studentId: string) => {
    return db.getAll<any>(STORAGE_KEYS.COMPLAINTS).filter(c => c.studentId === studentId && !c.isDeleted).sort((a,b) => new Date((b as any).createdAt).getTime() - new Date((a as any).createdAt).getTime());
  },

  getWalletBalance: (studentId: string) => {
    const w = db.getAll<any>('spg_wallets').find(w => w.studentId === studentId);
    return w ? w.balance : 0;
  }
};
