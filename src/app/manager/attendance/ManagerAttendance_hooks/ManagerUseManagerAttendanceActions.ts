// DATA FLOW: [AI_TODO: Document data flow direction for ManagerUseManagerAttendanceActions.ts]
// [ACTION HOOK] ManagerUseManagerAttendanceActions
// Responsibility: Handles write operations for student attendance (mark present/absent/on-leave).
// Data Flow: handleMark → api.managerOperations.markStudentAttendance → loadData() to refresh UI
import { authApi as api } from '@/app/manager/manager_lib/manager_api/ManagerAuth';

export function ManagerUseManagerAttendanceActions(selectedPropertyId: string | null, userId: string | undefined, loadData: () => void) {
  
  const handleMark = (studentId: string, status: 'Present' | 'Absent' | 'On Leave') => {
    if (!userId || !selectedPropertyId) return;
    (api as any).managerOperations.markStudentAttendance(studentId, selectedPropertyId, status, userId);
    loadData();
  };

  return { handleMark };
}
