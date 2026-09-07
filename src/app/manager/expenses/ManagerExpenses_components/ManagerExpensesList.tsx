// RESPONSIBILITY: Renders the ManagerExpensesList component.
import { Receipt, IndianRupee } from 'lucide-react';
import { formatDateOnly } from '@/lib/utils/formatters';
import { Pagination } from '@/components/shared/Pagination';

interface Props {
  expenses: any[];
  paginatedData: any[];
  categoryLabels: Record<string, string>;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export function ManagerExpensesList({
  expenses, paginatedData, categoryLabels, currentPage, totalPages, setCurrentPage
}: Props) {
  return (
    <>
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[var(--border)] bg-[var(--bg-input)]">
          <h2 className="font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[var(--primary)]" /> Recent Expenses
          </h2>
        </div>
        
        {expenses.length === 0 ? (
          <div className="p-12 text-center text-[var(--text-secondary)] flex flex-col items-center">
            <Receipt className="w-12 h-12 mb-3 opacity-20" />
            <p>No expenses logged for this property yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--bg-card)] border-b border-[var(--border)] text-[var(--text-secondary)] sticky top-0 z-10 shadow-sm shadow-black/5">
                <tr>
                  <th className="p-4 font-semibold uppercase tracking-wider text-[11px]">Date</th>
                  <th className="p-4 font-semibold uppercase tracking-wider text-[11px]">Description</th>
                  <th className="p-4 font-semibold uppercase tracking-wider text-[11px]">Category</th>
                  <th className="p-4 font-semibold uppercase tracking-wider text-[11px] text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {paginatedData.map(exp => (
                  <tr key={exp.id} className="hover:bg-[var(--bg-page)] transition-colors">
                    <td className="p-4 whitespace-nowrap text-[var(--text-secondary)]">
                      {formatDateOnly(exp.date)}
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-[var(--text-primary)]">{exp.description}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-full text-xs text-[var(--text-secondary)]">
                        {categoryLabels[exp.category] || exp.category}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-bold text-[var(--danger)] flex items-center justify-end gap-1">
                        <IndianRupee className="w-3.5 h-3.5" /> {exp.amount.toLocaleString('en-IN')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </>
  );
}
