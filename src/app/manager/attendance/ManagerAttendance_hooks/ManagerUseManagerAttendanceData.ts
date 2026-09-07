// DATA FLOW: [AI_TODO: Document data flow direction for ManagerUseManagerAttendanceData.ts]
// [DATA HOOK] ManagerUseManagerAttendanceData
// Responsibility: Fetches today's student roster and attendance records for the selected property.
// Data Flow: ManagerPropertyContext (selectedPropertyId) → api.managerOperations → local state → consumers (ManagerAttendanceMain)
import { useState, useEffect } from 'react';
import { authApi as api } from '@/app/manager/manager_lib/manager_api/ManagerAuth';
import type { ManagerAttendanceStudent, ManagerAttendanceRecord } from '@/app/manager/attendance/ManagerAttendance_types/ManagerAttendance.types';

export function ManagerUseManagerAttendanceData(selectedPropertyId: string | null, ctxLoading: boolean) {
  const [students, setStudents] = useState<ManagerAttendanceStudent[]>([]);
  const [attendance, setAttendance] = useState<ManagerAttendanceRecord[]>([]);

  const loadData = () => {
    if (!ctxLoading && selectedPropertyId) {
      setStudents((api as any).managerOperations.listStudents(selectedPropertyId));
      setAttendance((api as any).managerOperations.listStudentAttendanceToday(selectedPropertyId));
    }
  };

  // Re-fetch when the property selection changes or context finishes loading.
  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPropertyId, ctxLoading]);

  return { students, attendance, loadData };
}
