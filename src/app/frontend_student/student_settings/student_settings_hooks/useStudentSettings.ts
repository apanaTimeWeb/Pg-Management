import { useState, useEffect } from 'react';
import { useStudentContext } from '@/app/frontend_student/student_components/StudentContext';
import { studentOperationsApi } from '@/app/frontend_student/student_lib/student_api/StudentOperations';

export function useStudentSettings() {
  const { profile, loading: contextLoading } = useStudentContext();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    emailNotif: true,
    smsNotif: false,
    pushNotif: true,
    showProfileToRoommates: true,
    twoFactorAuth: false
  });

  const updateProfile = async (data: any) => {
    if (profile) {
      setLoading(true);
      try {
        const studentId = profile.userId || profile.id;
        studentOperationsApi.updateProfile(studentId, data, studentId);
      } catch (error) {
        console.error('Failed to update profile', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return {
    profile,
    loading: contextLoading || loading,
    settings,
    toggleSetting,
    updateProfile
  };
}
