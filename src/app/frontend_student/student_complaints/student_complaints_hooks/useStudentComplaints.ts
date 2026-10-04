import { useState, useEffect } from 'react';
import { useStudentContext } from '@/app/frontend_student/student_components/StudentContext';
import { studentOperationsApi } from '@/app/frontend_student/student_lib/student_api/StudentOperations';

export type ComplaintStatus = 'Submitted' | 'Received' | 'Under Review' | 'Assigned' | 'In Progress' | 'Resolved' | 'Closed';
export type ComplaintCategory = 'Room' | 'Electrical' | 'Plumbing' | 'Water' | 'Furniture' | 'Cleaning' | 'Internet' | 'Food' | 'Laundry' | 'Common Area' | 'Other';
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type RequestMode = 'Complaint' | 'Maintenance';

export interface Complaint {
  id: string;
  category: ComplaintCategory;
  room: string;
  description: string;
  priority: Priority;
  status: ComplaintStatus;
  date: string;
  lastUpdated: string;
  technician?: string;
  resolutionNotes?: string;
  attachments?: number;
  mode?: RequestMode;
}

export function useStudentComplaints() {
  const { profile, loading: contextLoading } = useStudentContext();
  const [complaintsData, setComplaintsData] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = () => {
    if (profile) {
      const studentId = profile.userId || profile.id;
      const apiComplaints = studentOperationsApi.getComplaints(studentId);
      
      const formatted: Complaint[] = apiComplaints.map(c => ({
        id: c.id,
        category: c.category as ComplaintCategory,
        room: profile.roomNo || 'Room N/A',
        description: c.description,
        priority: c.priority as Priority,
        status: (c.status === 'Open' ? 'Submitted' : c.status) as ComplaintStatus,
        date: c.date,
        lastUpdated: c.date,
        technician: 'Unassigned',
        mode: 'Complaint'
      }));

      // Add dummy data for richer UI
      formatted.push(
        {
          id: 'CMP-2041', category: 'Electrical', room: profile.roomNo || 'Room',
          description: 'Ceiling fan is making a loud noise and spinning very slowly. It is getting very hot in the room.',
          priority: 'Urgent', status: 'Assigned', date: 'Today, 09:30 AM', lastUpdated: '2 hours ago',
          technician: 'Ramesh (Electrician)', attachments: 1, mode: 'Maintenance'
        },
        {
          id: 'CMP-2035', category: 'Plumbing', room: profile.roomNo || 'Room',
          description: 'Bathroom tap is leaking continuously. Wasting a lot of water.',
          priority: 'Medium', status: 'Resolved', date: 'Yesterday, 02:15 PM', lastUpdated: 'Today, 10:00 AM',
          technician: 'Suresh (Plumber)', resolutionNotes: 'Changed the tap washer and sealed the pipe joint.',
          attachments: 2, mode: 'Maintenance'
        },
        {
          id: 'CMP-1988', category: 'Internet', room: profile.roomNo || 'Room',
          description: 'Wi-Fi keeps disconnecting every 5 minutes. Cannot attend online classes.',
          priority: 'Urgent', status: 'Closed', date: '25 Sep 2026, 11:00 AM', lastUpdated: '26 Sep 2026, 09:00 AM',
          technician: 'IT Support Team', mode: 'Complaint'
        }
      );

      setComplaintsData(formatted);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [profile]);

  const updateComplaintStatus = (id: string, newStatus: ComplaintStatus) => {
    setComplaintsData(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  return {
    profile,
    loading: contextLoading || loading,
    complaintsData,
    updateComplaintStatus
  };
}
