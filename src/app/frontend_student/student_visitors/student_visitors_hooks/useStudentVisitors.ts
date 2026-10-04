import { useState, useEffect } from 'react';
import { useStudentContext } from '@/app/frontend_student/student_components/StudentContext';
import { studentOperationsApi } from '@/app/frontend_student/student_lib/student_api/StudentOperations';

export type VisitorStatus = 'Pending' | 'Approved' | 'Rejected' | 'Visited' | 'Cancelled';

export interface Visitor {
  id: string;
  name: string;
  mobile: string;
  relation: string;
  purpose: string;
  date: string;
  expectedArrival: string;
  expectedDeparture: string;
  status: VisitorStatus;
  entryTime?: string;
  exitTime?: string;
}

export function useStudentVisitors() {
  const { profile, loading: contextLoading } = useStudentContext();
  const [visitorsData, setVisitorsData] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      const studentId = profile.userId || profile.id;
      const apiVisitors = studentOperationsApi.getVisitors(studentId);
      
      const formatted: Visitor[] = apiVisitors.map(v => ({
        id: v.id,
        name: v.name,
        mobile: v.contact,
        relation: 'Relative/Friend', // Defaulting as backend doesn't store relation yet
        purpose: v.purpose,
        date: v.date,
        expectedArrival: v.expectedTime,
        expectedDeparture: 'N/A', // Update logic if backend provides expected departure
        status: v.status,
        entryTime: v.status === 'Visited' ? v.expectedTime : undefined,
        exitTime: v.status === 'Visited' ? '02:00 PM' : undefined // Mock data for visited
      }));

      // Add dummy past visitors to populate the UI
      formatted.push(
        {
          id: 'VIS-098', name: 'Priya Singh', mobile: '87654-XXXXX', relation: 'Sister',
          purpose: 'Deliver Items', date: 'Today', expectedArrival: '12:00 PM',
          expectedDeparture: '01:00 PM', status: 'Visited', entryTime: '12:15 PM', exitTime: '01:05 PM'
        },
        {
          id: 'VIS-092', name: 'Ankit Joshi', mobile: '76543-XXXXX', relation: 'Friend',
          purpose: 'Casual Visit', date: '28 Sep 2026', expectedArrival: '06:00 PM',
          expectedDeparture: '08:00 PM', status: 'Rejected'
        }
      );

      setVisitorsData(formatted);
      setLoading(false);
    }
  }, [profile]);

  return {
    profile,
    loading: contextLoading || loading,
    visitorsData
  };
}
