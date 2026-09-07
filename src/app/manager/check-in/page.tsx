import { Suspense } from 'react';
import { ManagerCheckinMain } from './ManagerCheckin_components/ManagerCheckinMain';

export default function ManagerCheckinPage() {
  return (
    <Suspense fallback={<div className="p-6 text-[var(--text-secondary)]">Loading...</div>}>
      <ManagerCheckinMain />
    </Suspense>
  );
}
