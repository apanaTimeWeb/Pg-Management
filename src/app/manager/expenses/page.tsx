import { Suspense } from 'react';
import { ManagerExpensesMain } from './ManagerExpenses_components/ManagerExpensesMain';

export default function ManagerExpensesPage() {
  return (
    <Suspense fallback={<div className="p-6 animate-pulse text-[var(--text-secondary)]">Loading...</div>}>
      <ManagerExpensesMain />
    </Suspense>
  );
}
