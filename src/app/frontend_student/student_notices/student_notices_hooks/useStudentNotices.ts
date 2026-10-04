import { useState, useEffect } from 'react';
import { useStudentContext } from '@/app/frontend_student/student_components/StudentContext';
import { studentOperationsApi } from '@/app/frontend_student/student_lib/student_api/StudentOperations';

export type NoticeCategory = 'General' | 'Fees' | 'Mess' | 'Maintenance' | 'Holiday' | 'Room Inspection' | 'Emergency' | 'Rules';

export interface NoticeItem {
  id: string;
  category: NoticeCategory;
  title: string;
  description: string;
  date: string;
  isImportant: boolean;
  isRead: boolean;
  attachments?: { name: string; size: string; type: string }[];
}

export function useStudentNotices() {
  const { profile, loading: contextLoading } = useStudentContext();
  const [noticesData, setNoticesData] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotices = () => {
    if (profile) {
      const studentId = profile.userId || profile.id;
      const apiNotices = studentOperationsApi.getNotices(studentId);
      
      const formatted: NoticeItem[] = apiNotices.map(n => ({
        id: n.id,
        category: n.category as NoticeCategory,
        title: n.title,
        description: n.description,
        date: n.date,
        isImportant: n.isImportant || false,
        isRead: false, // Initially treating new ones from API as unread
      }));

      // Add dummy data for a richer UI
      formatted.push(
        {
          id: 'not-001', category: 'Emergency', title: 'Water Supply Interruption',
          description: 'There will be no water supply on 5th Oct from 10 AM to 2 PM due to municipal pipeline maintenance.',
          date: 'Today, 08:30 AM', isImportant: true, isRead: false
        },
        {
          id: 'not-002', category: 'Fees', title: 'October Rent Due Reminder',
          description: 'This is a gentle reminder to clear your October rent dues by 7th Oct.',
          date: 'Yesterday, 04:15 PM', isImportant: true, isRead: false,
          attachments: [{ name: 'fee_structure_update.pdf', size: '1.2 MB', type: 'pdf' }]
        },
        {
          id: 'not-004', category: 'Mess', title: 'Menu Change for Weekend',
          description: 'Sunday dinner will now feature special Paneer Butter Masala and Naan.',
          date: '30 Sep 2026, 09:20 AM', isImportant: false, isRead: true
        }
      );

      setNoticesData(formatted);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [profile]);

  const markAsRead = (id: string) => {
    setNoticesData(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return {
    profile,
    loading: contextLoading || loading,
    noticesData,
    markAsRead
  };
}
