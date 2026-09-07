// RESPONSIBILITY: Renders the OwnerFinanceTabs component. Receives data via props/hooks.

import { Receipt, TrendingDown, FileText } from 'lucide-react';
import { Payment, Expense, Invoice } from '@/app/owner/owner_lib/owner_api/OwnerFinance';
import { formatINR, formatDateOnly } from '@/lib/utils/formatters';
import { Pagination } from '@/components/shared/Pagination';
import { Dispatch, SetStateAction } from 'react';

export interface OwnerFinanceTabsProps {
  activeTab: 'payments' | 'invoices' | 'expenses';
  setActiveTab: Dispatch<SetStateAction<'payments' | 'invoices' | 'expenses'>>;
  paymentsData: { paginated: Payment[]; totalPages: number };
  expensesData: { paginated: Expense[]; totalPages: number };
  invoicesData: { paginated: Invoice[]; totalPages: number };
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export function OwnerFinanceTabs({
  activeTab,
  setActiveTab,
  paymentsData,
  expensesData,
  invoicesData,
  currentPage,
  setCurrentPage
}: OwnerFinanceTabsProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex border-b border-border">
        {[
          { id: 'payments', label: 'Recent Income', icon: Receipt },
          { id: 'expenses', label: 'Recent Expenses', icon: TrendingDown },
          { id: 'invoices', label: 'All Invoices', icon: FileText },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors relative ${
                activeTab === tab.id ? 'text-primary' : 'text-secondary hover:text-primary'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
            </button>
          );
        })}
      </div>

      <div className="p-0 overflow-x-auto max-h-[500px] overflow-y-auto">
        {activeTab === 'payments' && (
          <>
          <table className="w-full text-sm text-left">
            <thead className="bg-card border-b border-border text-secondary text-xs uppercase sticky top-0 z-10 shadow-sm shadow-black/5">
              <tr>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Source / Student</th>
                <th className="px-6 py-3 font-medium">Method</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Ref No</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {paymentsData.paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-secondary">No income records found.</td>
                </tr>
              ) : (
                paymentsData.paginated.map((p: Payment) => (
                  <tr key={p.id} className="hover:bg-page transition-colors">
                    <td className="px-6 py-4 text-primary">{formatDateOnly(p.date)}</td>
                    <td className="px-6 py-4 text-primary font-medium">{p.studentId === 'dummy' ? 'Unknown Student' : p.studentId}</td>
                    <td className="px-6 py-4 uppercase text-xs font-bold text-secondary">{p.method.replace('_', ' ')}</td>
                    <td className="px-6 py-4 font-bold text-success">+{formatINR(p.amount)}</td>
                    <td className="px-6 py-4 text-xs font-mono">{p.referenceNo || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {paymentsData.totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={paymentsData.totalPages} onPageChange={setCurrentPage} />
          )}
          </>
        )}

        {activeTab === 'expenses' && (
          <>
          <table className="w-full text-sm text-left">
            <thead className="bg-card border-b border-border text-secondary text-xs uppercase sticky top-0 z-10 shadow-sm shadow-black/5">
              <tr>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Description</th>
                <th className="px-6 py-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {expensesData.paginated.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-secondary">No expense records found.</td>
                </tr>
              ) : (
                expensesData.paginated.map((e: Expense) => (
                  <tr key={e.id} className="hover:bg-page transition-colors">
                    <td className="px-6 py-4 text-primary">{formatDateOnly(e.date)}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-input rounded border border-border text-xs font-bold uppercase tracking-wider text-secondary">
                        {e.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-primary max-w-xs truncate">{e.description}</td>
                    <td className="px-6 py-4 font-bold text-danger">-{formatINR(e.amount)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {expensesData.totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={expensesData.totalPages} onPageChange={setCurrentPage} />
          )}
          </>
        )}
        
        {activeTab === 'invoices' && (
          <>
          <table className="w-full text-sm text-left">
            <thead className="bg-card border-b border-border text-secondary text-xs uppercase sticky top-0 z-10 shadow-sm shadow-black/5">
              <tr>
                <th className="px-6 py-3 font-medium">Month</th>
                <th className="px-6 py-3 font-medium">Due Date</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {invoicesData.paginated.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-secondary">No invoices found.</td>
                </tr>
              ) : (
                invoicesData.paginated.map((i: Invoice) => (
                  <tr key={i.id} className="hover:bg-page transition-colors">
                    <td className="px-6 py-4 font-medium text-primary">{i.month}</td>
                    <td className="px-6 py-4 text-primary">{formatDateOnly(i.dueDate)}</td>
                    <td className="px-6 py-4 font-bold">{formatINR(i.amount)}</td>
                    <td className="px-6 py-4">
                      {i.status.toLowerCase() === 'paid' ? <span className="text-success bg-success-bg px-2 py-1 rounded text-xs font-semibold border border-success">Paid</span> :
                       i.status.toLowerCase() === 'pending' ? <span className="text-warning bg-warning-bg px-2 py-1 rounded text-xs font-semibold border border-warning">Pending</span> :
                       <span className="text-danger bg-danger-bg px-2 py-1 rounded text-xs font-semibold border border-danger">Overdue</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {invoicesData.totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={invoicesData.totalPages} onPageChange={setCurrentPage} />
          )}
          </>
        )}
      </div>
    </div>
  );
}
