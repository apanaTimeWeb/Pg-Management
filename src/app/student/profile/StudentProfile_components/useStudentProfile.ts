// RESPONSIBILITY: Provides business logic and state management for the Student Profile.
// DATA FLOW: API -> useStudentProfile -> StudentProfileMain

import { useState, useEffect } from 'react';
import { studentOperationsApi } from '@/app/student/lib/api/studentOperations';
import { useStudentContext } from '@/app/student/components/StudentContext';
import { getSession } from '@/lib/auth/session';

export function useStudentProfile() {
  const { profile } = useStudentContext();
  const session = typeof window !== 'undefined' ? getSession() : null;
  const [formData, setFormData] = useState({ phone: '', parentName: '', parentPhone: '' });

  useEffect(() => {
    if (profile) {
      setFormData({
        phone: profile.user?.phone || '',
        parentName: profile.parentName || '',
        parentPhone: profile.parentPhone || ''
      });
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !session) return;
    studentOperationsApi.updateProfile(profile.id, formData, session.id);
    alert('Profile updated successfully.');
    window.location.reload();
  };

  return {
    profile,
    session,
    formData,
    setFormData,
    handleSubmit
  };
}
