import { useState, useEffect } from 'react';
import { useStudentContext } from '@/app/frontend_student/student_components/StudentContext';
import { studentOperationsApi } from '@/app/frontend_student/student_lib/student_api/StudentOperations';

export type DocStatus = 'Pending' | 'Uploaded' | 'Under Review' | 'Verified' | 'Rejected' | 'Expired';
export type DocCategory = 'ID Proof' | 'Address Proof' | 'Photo' | 'Admission Form' | 'Agreement' | 'Guardian Document' | 'Other';

export interface DocumentItem {
  id: string;
  category: DocCategory;
  name: string;
  status: DocStatus;
  uploadedDate?: string;
  verificationDate?: string;
  expiryDate?: string;
  remarks?: string;
}

export function useStudentDocuments() {
  const { profile, loading: contextLoading } = useStudentContext();
  const [documentsData, setDocumentsData] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = () => {
    if (profile) {
      const studentId = profile.userId || profile.id;
      const apiDocs = studentOperationsApi.getDocuments(studentId);
      
      const formatted: DocumentItem[] = apiDocs.map(d => ({
        id: d.id,
        category: (d.type === 'Aadhaar' || d.type === 'PAN' ? 'ID Proof' : d.type) as DocCategory,
        name: d.name,
        status: (d.status === 'Approved' ? 'Verified' : d.status) as DocStatus,
        uploadedDate: d.uploadDate,
        verificationDate: d.status === 'Approved' ? d.uploadDate : undefined,
      }));

      // Merge with some standard required documents if they are missing
      const requiredDocs = ['Aadhaar Card', 'Voter ID', 'Passport Size Photo', 'Signed Application', 'Rent Agreement', 'Guardian ID Proof'];
      const currentNames = formatted.map(d => d.name);

      if (!currentNames.includes('Rent Agreement')) {
        formatted.push({ id: 'doc-req-1', category: 'Agreement', name: 'Rent Agreement', status: 'Pending' });
      }
      if (!currentNames.includes('Guardian ID Proof')) {
        formatted.push({ id: 'doc-req-2', category: 'Guardian Document', name: 'Guardian ID Proof', status: 'Expired', uploadedDate: '15 Jan 2025', expiryDate: '15 Jan 2026', remarks: 'Document validity expired. Please provide latest.' });
      }
      if (!currentNames.includes('Signed Application')) {
         formatted.push({ id: 'doc-req-3', category: 'Admission Form', name: 'Signed Application', status: 'Rejected', uploadedDate: '28 Sep 2026', remarks: 'Signature missing on page 2. Please re-sign and upload.' });
      }

      setDocumentsData(formatted);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [profile]);

  return {
    profile,
    loading: contextLoading || loading,
    documentsData
  };
}
