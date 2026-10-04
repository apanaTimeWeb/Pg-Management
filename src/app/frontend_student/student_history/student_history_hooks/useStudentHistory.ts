import { useState, useEffect } from 'react';
import { useStudentContext } from '@/app/frontend_student/student_components/StudentContext';
import { IndianRupee, Users, MessageSquareWarning, BedDouble, FileText, User, CalendarOff, LogIn } from 'lucide-react';

export interface ActivityItem {
  id: string;
  type: string;
  icon: any;
  title: string;
  description: string;
  date: string;
  time: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export function useStudentHistory() {
  const { profile, loading: contextLoading } = useStudentContext();
  const [historyData, setHistoryData] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = () => {
    if (profile) {
      // For now, generating a dynamic but mocked history array since there is no explicit history API 
      // yet. This can be tied to actual logs later.
      const formatted: ActivityItem[] = [
        {
          id: '1', type: 'payment', icon: IndianRupee, title: 'Fee Paid',
          description: 'Rent payment of ₹8,000 for October was successful.',
          date: '03 Oct 2026', time: '10:30 AM', color: 'text-success', bgColor: 'bg-success/10', borderColor: 'border-success/20'
        },
        {
          id: '2', type: 'visitor', icon: Users, title: 'Visitor Request Approved',
          description: 'Visitor pass for Rahul Sharma has been approved by the manager.',
          date: '02 Oct 2026', time: '04:15 PM', color: 'text-info', bgColor: 'bg-info/10', borderColor: 'border-info/20'
        },
        {
          id: '3', type: 'leave', icon: CalendarOff, title: 'Leave Request Submitted',
          description: 'Leave request from 10 Oct to 15 Oct submitted successfully.',
          date: '01 Oct 2026', time: '09:00 AM', color: 'text-warning', bgColor: 'bg-warning/10', borderColor: 'border-warning/20'
        },
        {
          id: '4', type: 'complaint', icon: MessageSquareWarning, title: 'Complaint Resolved',
          description: 'AC not cooling issue (Ticket #1024) has been resolved.',
          date: '30 Sep 2026', time: '02:45 PM', color: 'text-success', bgColor: 'bg-success/10', borderColor: 'border-success/20'
        },
        {
          id: '5', type: 'room', icon: BedDouble, title: 'Room Change Requested',
          description: 'Requested transfer from Room 102 to Room 205.',
          date: '28 Sep 2026', time: '11:20 AM', color: 'text-primary', bgColor: 'bg-primary/10', borderColor: 'border-primary/20'
        },
        {
          id: '6', type: 'document', icon: FileText, title: 'Document Uploaded',
          description: 'Aadhaar Card copy uploaded for verification.',
          date: '25 Sep 2026', time: '01:10 PM', color: 'text-primary', bgColor: 'bg-primary/10', borderColor: 'border-primary/20'
        },
        {
          id: '7', type: 'profile', icon: User, title: 'Profile Updated',
          description: 'Emergency contact details were updated.',
          date: '20 Sep 2026', time: '06:00 PM', color: 'text-info', bgColor: 'bg-info/10', borderColor: 'border-info/20'
        },
        {
          id: '8', type: 'login', icon: LogIn, title: 'New Device Login',
          description: 'Account accessed from a new device (Windows 11).',
          date: '15 Sep 2026', time: '10:05 PM', color: 'text-danger', bgColor: 'bg-danger/10', borderColor: 'border-danger/20'
        }
      ];
      setHistoryData(formatted);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [profile]);

  return {
    profile,
    loading: contextLoading || loading,
    historyData
  };
}
