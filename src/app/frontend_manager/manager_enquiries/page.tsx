import { Suspense } from 'react';

import { ManagerEnquiriesMain } from '@/app/frontend_manager/manager_enquiries/manager_enquiries_components/ManagerEnquiriesMain';
export default function ManagerEnquiriesPage() {
  return (
    <Suspense fallback={<div className="p-6 motion-safe:animate-pulse text-secondary">Loading...</div>}>
      <ManagerEnquiriesMain />
    </Suspense>
  );
}