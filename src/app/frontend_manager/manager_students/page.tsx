import { Suspense } from 'react';

import { ManagerStudentsMain } from '@/app/frontend_manager/manager_students/manager_students_components/ManagerStudentsMain';
export default function ManagerStudentsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-secondary">Loading...</div>}>
      <ManagerStudentsMain />
    </Suspense>
  );
}