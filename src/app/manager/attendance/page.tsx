import { Suspense } from 'react';
import { ManagerAttendanceMain } from './ManagerAttendance_components/ManagerAttendanceMain';

export default function ManagerAttendancePage() {
  return (
    <Suspense fallback={<div className="p-6 text-[var(--text-secondary)]">Loading...</div>}>
      <ManagerAttendanceMain />
    </Suspense>
  );
}
