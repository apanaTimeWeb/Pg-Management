// RESPONSIBILITY: Provides business logic and state management for the Student Admission module.
// DATA FLOW: API -> useStudentAdmission -> StudentAdmissionMain

import { useState, useEffect } from 'react';
import { useStudentContext } from '@/app/frontend_student/student_components/StudentContext';
import { studentOperationsApi } from '@/app/frontend_student/student_lib/student_api/StudentOperations';

export type AdmissionStatus = 'Application Submitted' | 'Under Verification' | 'Approved' | 'Rejected' | 'Check-in Pending' | 'Active' | 'Notice Period' | 'Checked Out';

export interface AdmissionData {
  id: string;
  applicationDate: string;
  admissionDate: string;
  joiningDate: string;
  status: AdmissionStatus;
  pgName: string;
  property: string;
  building: string;
  floor: string;
  room: string;
  bed: string;
  roomType: string;
  monthlyRent: string;
  securityDeposit: string;
  admissionFee: string;
  expectedCheckout: string;
  agreementStatus: string;
  agreementFileName: string;
}

export function useStudentAdmission() {
  const { profile, loading } = useStudentContext();
  const [admissionData, setAdmissionData] = useState<AdmissionData | null>(null);

  useEffect(() => {
    if (profile) {
      // Formulate dynamic admission data based on profile
      const today = new Date();
      const applicationDateObj = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000); // 3 months ago
      const admissionDateObj = new Date(today.getTime() - 85 * 24 * 60 * 60 * 1000);
      const joiningDateObj = new Date(today.getTime() - 80 * 24 * 60 * 60 * 1000);
      const expectedCheckoutObj = new Date(joiningDateObj.getTime() + 180 * 24 * 60 * 60 * 1000); // 6 months lease

      const depositData = studentOperationsApi.getSecurityDeposit(profile.userId || profile.id);

      const statusMap: Record<string, AdmissionStatus> = {
        'active': 'Active',
        'on_notice': 'Notice Period',
        'checked_out': 'Checked Out'
      };

      const mappedStatus = statusMap[profile.status] || 'Active';

      setAdmissionData({
        id: `ADM-2026-${profile.userId?.slice(-4) || '1045'}`,
        applicationDate: applicationDateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        admissionDate: admissionDateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        joiningDate: joiningDateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: mappedStatus,
        pgName: profile.propertyName || 'Green Valley PG',
        property: 'Main Building',
        building: 'Block A',
        floor: '2nd Floor',
        room: `Room ${profile.roomNumber}`,
        bed: `Bed ${profile.bedCode}`,
        roomType: 'Triple Sharing',
        monthlyRent: '₹8,500',
        securityDeposit: depositData ? `₹${depositData.amount.toLocaleString()}` : '₹10,000',
        admissionFee: '₹500',
        expectedCheckout: expectedCheckoutObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        agreementStatus: 'Signed',
        agreementFileName: `Agreement_${profile.propertyName?.replace(/ /g, '_')}_${profile.name?.replace(/ /g, '_')}.pdf`
      });
    }
  }, [profile]);

  const handleViewAgreement = () => {
    alert('Opening agreement PDF viewer...');
  };

  const handleDownloadAgreement = () => {
    alert('Downloading agreement PDF...');
  };

  return {
    profile,
    loading,
    admissionData,
    handleViewAgreement,
    handleDownloadAgreement
  };
}
