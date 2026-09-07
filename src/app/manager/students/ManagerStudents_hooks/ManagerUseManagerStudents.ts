// DATA FLOW: [AI_TODO: Document data flow direction for ManagerUseManagerStudents.ts]
// [DATA HOOK] ManagerUseManagerStudents
// Responsibility: Fetches enriched student list (profile + user data) for the selected property.
// Data Flow: ManagerPropertyContext â†’ api.students.listByProperty â†’ local state â†’ ManagerStudentsMain
import { useState, useEffect } from 'react';
import { api } from '@/app/manager/manager_lib/manager_api/ManagerApi';
import type { ManagerStudentData } from '@/app/manager/students/ManagerStudents_types/ManagerStudents.types';
export function ManagerUseManagerStudents(selectedPropertyId: string | null, ctxLoading: boolean) {
  const [students, setStudents] = useState<ManagerStudentData[]>([]);
  const fetchStudents = () => {
    if (!ctxLoading && selectedPropertyId) {
      const data = api.managerOperations.listStudents(selectedPropertyId);
      setStudents(data as unknown as ManagerStudentData[]);
    }
  };
  // Re-fetch students when property changes or context loading state updates.
  useEffect(() => {
    fetchStudents();
  }, [selectedPropertyId, ctxLoading]);
  return { students, fetchStudents };
}