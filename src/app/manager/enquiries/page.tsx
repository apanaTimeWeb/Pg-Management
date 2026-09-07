import { Suspense } from 'react';
import { ManagerEnquiriesMain } from '@/app/manager/enquiries/ManagerEnquiries_components/ManagerEnquiriesMain';

export default function ManagerEnquiriesPage() {
  return (
    <Suspense fallback={<div className="p-6 animate-pulse text-[var(--text-secondary)]">Loading...</div>}>
      <ManagerEnquiriesMain />
    </Suspense>
  );
}
