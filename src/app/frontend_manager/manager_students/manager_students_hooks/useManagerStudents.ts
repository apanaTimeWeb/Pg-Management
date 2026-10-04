import { useState, useEffect, useCallback } from 'react';
import { api } from '@/app/frontend_manager/manager_lib/manager_api/ManagerApi';
import { financeApi } from '@/app/frontend_owner/owner_lib/owner_api/OwnerFinance';

export type StudentStatus = 'Active' | 'Pending' | 'Notice Period' | 'On Leave' | 'Checked Out' | 'Suspended';

export interface ManagerStudentView {
  id: string;
  name: string;
  mobile: string;
  room: string;
  bed: string;
  joiningDate: string;
  rent: number;
  due: number;
  attendance: 'Present' | 'Absent' | 'Late' | 'Unmarked';
  status: StudentStatus;
  building: string;
  floor: string;
  profile: any;
}

export function useManagerStudents(selectedPropertyId: string | null, ctxLoading: boolean) {
  const [students, setStudents] = useState<ManagerStudentView[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = useCallback(() => {
    if (ctxLoading) return;
    if (!selectedPropertyId) {
      setStudents([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const data = api.managerOperations.listStudents(selectedPropertyId);
      const todayAtt = api.managerOperations.listStudentAttendanceToday(selectedPropertyId);
      financeApi.seedMonthlyInvoices(selectedPropertyId);
      const invoices = financeApi.listInvoices(selectedPropertyId);
      
      const mapped: ManagerStudentView[] = data.map((d: any) => {
        const att = todayAtt.find((a: any) => a.studentId === d.profile.id);
        const stuInvoices = invoices.filter((i: any) => i.studentId === d.profile.id && i.status !== 'Paid');
        const due = stuInvoices.reduce((sum: number, curr: any) => sum + curr.amount, 0);

        let statusStr = d.profile.status;
        if (statusStr === 'active') statusStr = 'Active';
        else if (statusStr === 'on_notice') statusStr = 'Notice Period';
        else if (statusStr === 'checked_out') statusStr = 'Checked Out';
        else if (statusStr === 'leave') statusStr = 'On Leave';
        
        let attStatus = att ? att.status : 'Unmarked';
        if (!['Present', 'Absent', 'Late', 'Unmarked'].includes(attStatus as string)) {
          attStatus = 'Unmarked';
        }

        return {
          id: d.profile.id,
          name: d.user.name,
          mobile: d.user.phone || 'N/A',
          room: d.roomNumber || 'Unassigned',
          bed: d.profile.bedId || 'N/A',
          joiningDate: new Date(d.profile.createdAt || Date.now()).toLocaleDateString(),
          rent: d.profile.rentAmount || 0,
          due: due,
          attendance: attStatus as 'Present' | 'Absent' | 'Late' | 'Unmarked',
          status: (statusStr || 'Active') as StudentStatus,
          building: 'Main',
          floor: 'N/A',
          profile: d.profile
        };
      });
      setStudents(mapped);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [ctxLoading, selectedPropertyId]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return { students, loading, fetchStudents };
}