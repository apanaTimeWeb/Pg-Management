// [DATA HOOK] useManagerStudents
// Responsibility: Fetches enriched student list (profile + user data) for the selected property.
// Data Flow: ManagerPropertyContext → api.students.listByProperty → local state → ManagerStudentsMain

import { useState, useEffect } from 'react';
import { api } from '@/app/login/lib/api/auth';
import type { ManagerStudentData } from '@/app/manager/students/ManagerStudents_types/ManagerStudents.types';

export function useManagerStudents(selectedPropertyId: string | null, ctxLoading: boolean) {
  const [students, setStudents] = useState<ManagerStudentData[]>([]);

  const fetchStudents = () => {
    if (!ctxLoading && selectedPropertyId) {
      const data = api.students.listByProperty(selectedPropertyId);
      setStudents(data);
    }
  };

  // Re-fetch students when property changes or context loading state updates.
  useEffect(() => {
    fetchStudents();
  }, [selectedPropertyId, ctxLoading]);

  return { students, fetchStudents };
}
