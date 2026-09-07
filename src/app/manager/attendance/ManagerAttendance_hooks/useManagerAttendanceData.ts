// [DATA HOOK] useManagerAttendanceData
// Responsibility: Fetches today's student roster and attendance records for the selected property.
// Data Flow: ManagerPropertyContext (selectedPropertyId) → api.managerOperations → local state → consumers (ManagerAttendanceMain)
import { useState, useEffect } from 'react';
import { authApi as api } from '@/app/login/lib/api/auth';
import type { ManagerAttendanceStudent, ManagerAttendanceRecord } from '@/app/manager/attendance/ManagerAttendance_types/ManagerAttendance.types';

export function useManagerAttendanceData(selectedPropertyId: string | null, ctxLoading: boolean) {
  const [students, setStudents] = useState<ManagerAttendanceStudent[]>([]);
  const [attendance, setAttendance] = useState<ManagerAttendanceRecord[]>([]);

  const loadData = () => {
    if (!ctxLoading && selectedPropertyId) {
      setStudents(api.managerOperations.listStudents(selectedPropertyId));
      setAttendance(api.managerOperations.listStudentAttendanceToday(selectedPropertyId));
    }
  };

  // Re-fetch when the property selection changes or context finishes loading.
  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPropertyId, ctxLoading]);

  return { students, attendance, loadData };
}
