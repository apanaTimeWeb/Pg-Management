import { Suspense } from 'react';
import { ManagerInventoryMain } from './ManagerInventory_components/ManagerInventoryMain';

export default function ManagerInventoryPage() {
  return (
    <Suspense fallback={<div className="p-6 text-[var(--text-secondary)]">Loading...</div>}>
      <ManagerInventoryMain />
    </Suspense>
  );
}
