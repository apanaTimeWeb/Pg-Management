import { useState, useEffect, useCallback } from 'react';
import { api } from '@/app/frontend_manager/manager_lib/manager_api/ManagerApi';

export type AttendanceStatus = 'Present' | 'Absent' | 'Leave' | 'Late' | 'Unmarked';

export interface AttendanceRecord {
  id: string;
  name: string;
  room?: string;
  role?: string;
  status: AttendanceStatus;
  time?: string;
  note?: string;
  studentId?: string;
}

export function useManagerAttendance(selectedPropertyId: string | null, ctxLoading: boolean, managerId: string = 'manager-1') {
  const [students, setStudents] = useState<AttendanceRecord[]>([]);
  const [staff, setStaff] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAttendance = useCallback(() => {
    if (ctxLoading) return;
    if (!selectedPropertyId) {
      setStudents([]);
      setStaff([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      // 1. Fetch Students
      const allStudents = api.managerOperations.listStudents(selectedPropertyId);
      const todayAtt = api.managerOperations.listStudentAttendanceToday(selectedPropertyId);
      
      const mappedStudents: AttendanceRecord[] = allStudents.map((s: any) => {
        const att = todayAtt.find((a: any) => a.studentId === s.profile.id);
        
        let statusStr: AttendanceStatus = 'Unmarked';
        if (s.profile.status === 'leave') {
          statusStr = 'Leave';
        } else if (att) {
          if (['Present', 'Absent', 'Late', 'Leave'].includes(att.status as string)) {
            statusStr = att.status as AttendanceStatus;
          }
        }
        
        return {
          id: s.profile.id, // Using profile.id as unique row ID
          studentId: s.profile.id,
          name: s.user.name || 'Unknown',
          room: s.roomNumber || 'Unassigned',
          status: statusStr,
          time: att?.createdAt ? new Date(att.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : undefined,
          note: s.profile.status === 'leave' ? 'On Leave' : undefined,
        };
      });
      setStudents(mappedStudents);

      // 2. Fetch Staff (Currently mocked as they are usually tied to OwnerStaff API)
      // Since managerOperations doesn't have listStaff, we'll use a dynamic mock for now
      setStaff([
        { id: 'EMP-01', name: 'Ramesh (Electrician)', role: 'Maintenance', status: 'Unmarked' },
        { id: 'EMP-02', name: 'Sita Devi', role: 'Cook', status: 'Unmarked' },
        { id: 'EMP-03', name: 'Mohan Singh', role: 'Guard', status: 'Unmarked' },
        { id: 'EMP-04', name: 'Sunita', role: 'Cleaner', status: 'Unmarked' },
      ]);
      
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [ctxLoading, selectedPropertyId]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const markStudentAttendance = (studentId: string, status: AttendanceStatus) => {
    if (!selectedPropertyId) return;
    try {
      api.managerOperations.markStudentAttendance(studentId, selectedPropertyId, status as any, managerId);
      setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) } : s));
    } catch (error) {
      console.error("Failed to mark attendance", error);
    }
  };

  const markStaffAttendance = (id: string, status: AttendanceStatus) => {
    // Currently only local state update as there's no staff attendance API yet
    setStaff(prev => prev.map(s => s.id === id ? { ...s, status, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) } : s));
  };

  const markAllStudentsPresent = () => {
    if (!selectedPropertyId) return;
    students.forEach(s => {
      if (s.status === 'Unmarked') {
        api.managerOperations.markStudentAttendance(s.studentId!, selectedPropertyId, 'Present', managerId);
      }
    });
    setStudents(prev => prev.map(s => s.status === 'Unmarked' ? { ...s, status: 'Present', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) } : s));
  };

  return { students, staff, loading, markStudentAttendance, markStaffAttendance, markAllStudentsPresent };
}
