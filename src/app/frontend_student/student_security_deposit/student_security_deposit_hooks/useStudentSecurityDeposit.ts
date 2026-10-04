import { useState, useEffect } from 'react';
import { studentOperationsApi } from '@/app/frontend_student/student_lib/student_api/StudentOperations';
import { useStudentContext } from '@/app/frontend_student/student_components/StudentContext';

export function useStudentSecurityDeposit() {
  const { profile } = useStudentContext();
  const [depositData, setDepositData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      const studentId = profile.userId || profile.id;
      const data = studentOperationsApi.getSecurityDeposit(studentId);
      setDepositData(data);
      setLoading(false);
    }
  }, [profile]);

  return {
    depositData,
    loading
  };
}
