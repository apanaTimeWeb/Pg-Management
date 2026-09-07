// DATA FLOW: [AI_TODO: Document data flow direction for ManagerUseManagerStudents.ts]
// [DATA HOOK] ManagerUseManagerStudents
// Responsibility: Fetches enriched student list (profile + user data) for the selected property.
// Data Flow: ManagerPropertyContext → (api as any).students.listByProperty → local state → ManagerStudentsMain

import { useState, useEffect } from 'react';

import { authApi as api } from '@/app/manager/manager_lib/manager_api/ManagerAuth';

import type { ManagerStudentData } from '@/app/manager/students/ManagerStudents_types/ManagerStudents.types';

export function ManagerUseManagerStudents(selectedPropertyId: string | null, ctxLoading: boolean) {
  const [students, setStudents] = useState<ManagerStudentData[]>([]);

  const fetchStudents = () => {
    if (!ctxLoading && selectedPropertyId) {
      const data = (api as any).students.listByProperty(selectedPropertyId);
      setStudents(data);
    }
  };

  // Re-fetch students when property changes or context loading state updates.
  useEffect(() => {
    fetchStudents();
  }, [selectedPropertyId, ctxLoading]);

  return { students, fetchStudents };
}
