// RESPONSIBILITY: Provides business logic and state management for the Student Dashboard.
// DATA FLOW: API -> useStudentDashboard -> StudentDashboardMain

import { useState, useEffect } from 'react';

import { useStudentContext } from '@/app/frontend_student/student_components/StudentContext';
import { studentOperationsApi } from '@/app/frontend_student/student_lib/student_api/StudentOperations';

export function useStudentDashboard() {
  const { profile, loading } = useStudentContext();
  const [menu, setMenu] = useState<any>(null);
  const [notices, setNotices] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [leaves, setLeaves] = useState<any[]>([]);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [deposit, setDeposit] = useState<any>(null);

  useEffect(() => {
    if (profile) {
      const studentId = profile.userId || profile.id;
      setMenu(studentOperationsApi.getTodayMenu(profile.propertyId));
      setNotices(studentOperationsApi.getNotices(profile.propertyId));
      setInvoices(studentOperationsApi.getInvoices(studentId));
      setComplaints(studentOperationsApi.getComplaints(studentId));
      setLeaves(studentOperationsApi.getLeaves(studentId));
      setVisitors(studentOperationsApi.getVisitors(studentId));
      setDeposit(studentOperationsApi.getSecurityDeposit(studentId));
    }
  }, [profile]);

  const handleReferralSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile) return;
    
    const formData = new FormData(e.currentTarget);
    const name = (formData as any).get('name') as string;
    const phone = (formData as any).get('phone') as string;
    
    import('@/app/frontend_student/student_lib/student_api/StudentAuth' as any).then((mod: any) => {
      const api = mod.api || mod.authApi || mod;
      api.managerEnquiries.create({
        propertyId: profile.propertyId,
        name,
        phone,
        referredByStudentId: profile.userId,
        notes: `Referred by existing student: ${profile.user?.name || 'Friend'} (Room: ${profile.roomNumber})`
      });
      alert('Referral submitted successfully! You will get 20% off when they join.');
      (e.target as HTMLFormElement).reset();
    });
  };

  return {
    profile,
    loading,
    menu,
    notices,
    invoices,
    complaints,
    leaves,
    visitors,
    deposit,
    handleReferralSubmit
  };
}
