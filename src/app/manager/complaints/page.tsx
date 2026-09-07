import { Suspense } from 'react';
import { ManagerComplaintsMain } from './ManagerComplaints_components/ManagerComplaintsMain';

export default function ManagerComplaintsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-[var(--text-secondary)]">Loading...</div>}>
      <ManagerComplaintsMain />
    </Suspense>
  );
}
