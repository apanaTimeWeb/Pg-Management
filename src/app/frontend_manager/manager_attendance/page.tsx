import { Suspense } from 'react';

import { ManagerAttendanceMain } from '@/app/frontend_manager/manager_attendance/ManagerAttendance_components/ManagerAttendanceMain';
export default function ManagerAttendancePage() {
  return (
    <Suspense fallback={<div className="p-6 text-secondary">Loading...</div>}>
      <ManagerAttendanceMain />
    </Suspense>
  );
}