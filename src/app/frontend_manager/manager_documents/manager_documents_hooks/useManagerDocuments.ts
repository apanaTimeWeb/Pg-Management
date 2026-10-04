import { useState, useEffect } from 'react';
import { useManagerPropertyContext } from '@/app/frontend_manager/manager_components/ManagerPropertyContext';

export type DocStatus = 'Verified' | 'Pending' | 'Missing' | 'Correction Requested';

export interface StudentDoc {
  type: string;
  name: string;
  status: DocStatus;
  date?: string;
  note?: string;
}

export interface StudentWithDocs {
  id: string;
  name: string;
  room: string;
  status: string;
  docsCount: string;
}

export function useManagerDocuments() {
  const { selectedPropertyId } = useManagerPropertyContext();
  const [students, setStudents] = useState<StudentWithDocs[]>([]);
  const [documents, setDocuments] = useState<StudentDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedPropertyId) {
      setStudents([]);
      setDocuments([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Mock Data Fetching
    setTimeout(() => {
      setStudents([
        { id: 'S001', name: 'Rahul Sharma', room: '101', status: 'Pending Verification', docsCount: '3/6 Verified' },
        { id: 'S002', name: 'Amit Kumar', room: '105', status: 'All Verified', docsCount: '6/6 Verified' },
        { id: 'S003', name: 'Vikas Singh', room: '204', status: 'Action Required', docsCount: '4/6 Verified (1 Missing)' },
        { id: 'S004', name: 'Suresh Patel', room: '302', status: 'Pending Verification', docsCount: '2/6 Verified' },
      ]);
      setDocuments([
        { type: 'Photo', name: 'Passport Size Photo', status: 'Verified', date: '01 Oct 2026' },
        { type: 'ID Proof', name: 'Aadhar Card Front & Back', status: 'Pending', date: '02 Oct 2026' },
        { type: 'Address Proof', name: 'Electricity Bill', status: 'Correction Requested', date: '02 Oct 2026', note: 'Image is too blurry, please upload a clear scanned copy.' },
        { type: 'Admission Form', name: 'Signed Admission Form', status: 'Verified', date: '01 Oct 2026' },
        { type: 'Agreement', name: 'Rent Agreement', status: 'Missing' },
        { type: 'Guardian Details', name: 'Guardian ID Proof', status: 'Pending', date: '03 Oct 2026' },
      ]);
      setLoading(false);
    }, 400);
  }, [selectedPropertyId]);

  const verifyDocument = (docName: string) => {
    setDocuments(docs => docs.map(d => d.name === docName ? { ...d, status: 'Verified' } : d));
  };

  const requestCorrection = (docName: string, note: string) => {
    setDocuments(docs => docs.map(d => d.name === docName ? { ...d, status: 'Correction Requested', note } : d));
  };

  const addNote = (docName: string, note: string) => {
    setDocuments(docs => docs.map(d => d.name === docName ? { ...d, note } : d));
  };

  return {
    loading,
    students,
    documents,
    verifyDocument,
    requestCorrection,
    addNote
  };
}
