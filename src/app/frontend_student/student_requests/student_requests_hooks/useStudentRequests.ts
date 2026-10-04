import { useState, useEffect } from 'react';
import { useStudentContext } from '@/app/frontend_student/student_components/StudentContext';
import { studentOperationsApi } from '@/app/frontend_student/student_lib/student_api/StudentOperations';

export type RequestStatus = 'Pending' | 'Approved' | 'Rejected' | 'In Progress' | 'Completed' | 'Cancelled';
export type RequestType = 'Room Change' | 'Bed Change' | 'Leave' | 'Outing' | 'Visitor' | 'Document Correction' | 'Profile Correction' | 'Maintenance' | 'Complaint Reopen' | 'Check-out Request';

export interface RequestItem {
  id: string;
  type: RequestType;
  title: string;
  date: string;
  status: RequestStatus;
  lastUpdate: string;
  description: string;
}

export function useStudentRequests() {
  const { profile, loading: contextLoading } = useStudentContext();
  const [requestsData, setRequestsData] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = () => {
    if (profile) {
      const studentId = profile.userId || profile.id;
      const apiRequests = studentOperationsApi.getRequests(studentId);
      
      const formatted: RequestItem[] = apiRequests.map(r => ({
        id: r.id,
        type: r.type as RequestType,
        title: r.type,
        date: r.date,
        status: (r.status === 'Open' ? 'Pending' : r.status) as RequestStatus,
        lastUpdate: r.date,
        description: r.description || `Request for ${r.type}`,
      }));

      // Add dummy data for richer UI
      formatted.push(
        {
          id: 'REQ-1045', type: 'Room Change', title: 'Move to AC Room', date: '02 Oct 2026',
          status: 'Pending', lastUpdate: '2 hours ago', description: 'Requested to move from Room 102 (Non-AC) to any available AC room on the first floor.'
        },
        {
          id: 'REQ-1042', type: 'Maintenance', title: 'AC Service Required', date: '30 Sep 2026',
          status: 'In Progress', lastUpdate: '1 day ago', description: 'AC is making a loud noise and cooling is very low.'
        },
        {
          id: 'REQ-1038', type: 'Leave', title: 'Diwali Holidays', date: '28 Sep 2026',
          status: 'Approved', lastUpdate: '2 days ago', description: 'Going home for Diwali from 20 Oct to 26 Oct.'
        }
      );

      setRequestsData(formatted);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [profile]);

  return {
    profile,
    loading: contextLoading || loading,
    requestsData
  };
}
