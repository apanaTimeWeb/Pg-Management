import { useState, useEffect } from 'react';
import { useStudentContext } from '@/app/frontend_student/student_components/StudentContext';
import { studentOperationsApi } from '@/app/frontend_student/student_lib/student_api/StudentOperations';

export type NotificationType = 'fee' | 'payment_success' | 'payment_failed' | 'leave_approved' | 'leave_rejected' | 'visitor' | 'complaint' | 'maintenance' | 'notice' | 'menu' | 'document' | 'checkout' | 'emergency';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionUrl?: string;
  isUrgent?: boolean;
}

export function useStudentNotifications() {
  const { profile, loading: contextLoading } = useStudentContext();
  const [notificationsData, setNotificationsData] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = () => {
    if (profile) {
      const studentId = profile.userId || profile.id;
      const apiNotifications = studentOperationsApi.getNotifications(studentId);
      
      const formatted: NotificationItem[] = apiNotifications.map(n => ({
        id: n.id,
        type: n.type as NotificationType,
        title: n.title,
        message: n.message,
        time: n.time,
        isRead: n.isRead,
        actionUrl: n.actionUrl,
        isUrgent: n.isUrgent
      }));

      // Add dummy data for a richer UI
      formatted.push(
        {
          id: 'n1', type: 'emergency', title: 'Emergency Alert: Fire Drill',
          message: 'Mandatory fire drill in 15 minutes. Please assemble in the ground floor parking area.',
          time: 'Just now', isRead: false, isUrgent: true
        },
        {
          id: 'n2', type: 'fee', title: 'Rent Overdue Warning',
          message: 'Your rent for October is overdue. Please pay immediately to avoid late fees of ₹200/day.',
          time: '2 hours ago', isRead: false, actionUrl: '/frontend_student/student_rent?action=pay', isUrgent: true
        },
        {
          id: 'n6', type: 'leave_approved', title: 'Leave Approved',
          message: 'Your leave request from 10 Oct to 15 Oct has been approved by the manager.',
          time: '02 Oct 2026', isRead: true
        }
      );

      setNotificationsData(formatted);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [profile]);

  const markAsRead = (id: string) => {
    setNotificationsData(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotificationsData(prev => prev.map(n => ({ ...n, isRead: true })));
  };
  
  const removeNotification = (id: string) => {
    setNotificationsData(prev => prev.filter(n => n.id !== id));
  };

  return {
    profile,
    loading: contextLoading || loading,
    notificationsData,
    markAsRead,
    markAllAsRead,
    removeNotification
  };
}
