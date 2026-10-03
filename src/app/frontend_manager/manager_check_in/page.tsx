import { Suspense } from 'react';

import { ManagerCheckinMain } from '@/app/frontend_manager/manager_check_in/ManagerCheckin_components/ManagerCheckinMain';
export default function ManagerCheckinPage() {
  return (
    <Suspense fallback={<div className="p-6 text-secondary">Loading...</div>}>
      <ManagerCheckinMain />
    </Suspense>
  );
}