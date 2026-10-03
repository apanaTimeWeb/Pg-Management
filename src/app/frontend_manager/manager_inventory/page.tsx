import { Suspense } from 'react';

import { ManagerInventoryMain } from '@/app/frontend_manager/manager_inventory/manager_inventory_components/ManagerInventoryMain';
export default function ManagerInventoryPage() {
  return (
    <Suspense fallback={<div className="p-6 text-secondary">Loading...</div>}>
      <ManagerInventoryMain />
    </Suspense>
  );
}