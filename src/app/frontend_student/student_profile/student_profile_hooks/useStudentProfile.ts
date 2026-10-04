// RESPONSIBILITY: Provides business logic and state management for the Student Profile.
// DATA FLOW: API -> useStudentProfile -> StudentProfileMain

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { studentOperationsApi } from '@/app/frontend_student/student_lib/student_api/StudentOperations';
import { useStudentContext } from '@/app/frontend_student/student_components/StudentContext';
import { getSession } from '@/app/frontend_student/student_lib/student_auth/StudentSession';

export function useStudentProfile() {
  const { profile: contextProfile } = useStudentContext();
  const session = typeof window !== 'undefined' ? getSession() : null;
  const [profile, setProfile] = useState<any>(null);

  // Initialize emergency contact state
  const [emergency, setEmergency] = useState({ name: '', relation: '', mobile: '', alternateMobile: '' });
  
  // Correction modal state
  const [correctionModal, setCorrectionModal] = useState(false);
  const [correctionField, setCorrectionField] = useState('');
  const [correctionValue, setCorrectionValue] = useState('');
  const [correctionSubmitted, setCorrectionSubmitted] = useState(false);

  useEffect(() => {
    if (contextProfile) {
      // Merge with default values if not present
      const fullProfile = {
        id: contextProfile.userId || contextProfile.id || 'STU-2024-1045',
        name: contextProfile.user?.name || contextProfile.name || 'Student Name',
        photo: null,
        dob: contextProfile.dob || '15 Mar 2003',
        gender: contextProfile.gender || 'Male',
        mobile: contextProfile.user?.phone || contextProfile.phone || '+91 98765 43210',
        email: contextProfile.user?.email || contextProfile.email || 'student@gmail.com',
        parent: { 
          name: contextProfile.parentName || 'Parent Name', 
          relation: 'Father', 
          mobile: contextProfile.parentPhone || '+91 91234 56789', 
          email: 'parent@gmail.com' 
        },
        emergency: contextProfile.emergency || { 
          name: 'Emergency Contact', relation: 'Mother', mobile: '+91 87654 32109', alternateMobile: '+91 76543 21098' 
        },
        address: contextProfile.address || { 
          address: '12, Rajiv Nagar, Near Bus Stand', city: 'Patna', state: 'Bihar', country: 'India', pincode: '800001' 
        },
      };
      setProfile(fullProfile);
      setEmergency(fullProfile.emergency);
    }
  }, [contextProfile]);

  const handleOpenCorrection = (field: string) => {
    setCorrectionField(field);
    setCorrectionModal(true);
  };

  const handleSubmitCorrection = () => {
    if (!correctionValue.trim()) { 
      toast.error('Please provide the correct value'); 
      return; 
    }
    if (session && contextProfile) {
       studentOperationsApi.submitCorrectionRequest(contextProfile.id, correctionField, correctionValue, session.id);
    }
    setCorrectionSubmitted(true);
    toast.success('Correction request submitted to manager!');
  };

  const handleSaveEmergency = () => {
    if (session && contextProfile) {
      const updatedProfile = { ...profile, emergency };
      studentOperationsApi.updateProfile(contextProfile.id, updatedProfile, session.id);
      setProfile(updatedProfile);
    }
    toast.success('Emergency contact updated!');
  };

  return {
    profile,
    emergency,
    setEmergency,
    correctionModal,
    setCorrectionModal,
    correctionField,
    correctionValue,
    setCorrectionValue,
    correctionSubmitted,
    setCorrectionSubmitted,
    handleOpenCorrection,
    handleSubmitCorrection,
    handleSaveEmergency
  };
}
