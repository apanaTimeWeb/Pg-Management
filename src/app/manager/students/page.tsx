import { Suspense } from 'react';
import { ManagerStudentsMain } from './ManagerStudents_components/ManagerStudentsMain';

export default function ManagerStudentsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-[var(--text-secondary)]">Loading...</div>}>
      <ManagerStudentsMain />
    </Suspense>
  );
}
