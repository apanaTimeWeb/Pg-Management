import { Suspense } from 'react';

import { ManagerInventoryMain } from '@/app/frontend_manager/inventory/ManagerInventory_components/ManagerInventoryMain';
export default function ManagerInventoryPage() {
  return (
    <Suspense fallback={<div className="p-6 text-secondary">Loading...</div>}>
      <ManagerInventoryMain />
    </Suspense>
  );
}