import { useState, useEffect } from 'react';
import { useManagerPropertyContext } from '@/app/frontend_manager/manager_components/ManagerPropertyContext';

export type NotificationType = 'Emergency' | 'Admission' | 'Leave' | 'Visitor' | 'Complaint' | 'Maintenance' | 'Payment' | 'CheckIn' | 'CheckOut' | 'Inventory' | 'Food' | 'Notice';

export interface ManagerNotification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export function useManagerNotifications() {
  const { selectedPropertyId } = useManagerPropertyContext();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<ManagerNotification[]>([]);

  useEffect(() => {
    if (!selectedPropertyId) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Mock Fetching Data
    setTimeout(() => {
      setNotifications([
        {
          id: 'n1',
          type: 'Emergency',
          title: 'Emergency: Fire Alarm Triggered',
          description: 'Fire alarm triggered in Block B, Floor 2. Please check immediately.',
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          isRead: false,
          priority: 'critical'
        },
        {
          id: 'n2',
          type: 'Admission',
          title: 'New Admission Application',
          description: 'Rahul Sharma has submitted a new admission request for a Double Sharing AC Room.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          isRead: false,
          priority: 'medium'
        },
        {
          id: 'n3',
          type: 'Leave',
          title: 'Pending Leave Request',
          description: 'Amit Kumar (Room 105) requested leave from 5 Oct to 8 Oct. Approval required.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          isRead: true,
          priority: 'medium'
        },
        {
          id: 'n4',
          type: 'Visitor',
          title: 'New Visitor Request',
          description: 'Visitor request pending for Suresh (Room 201) at the front gate.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
          isRead: false,
          priority: 'low'
        },
        {
          id: 'n5',
          type: 'Complaint',
          title: 'New Complaint Registered',
          description: 'AC not working in Room 304. Raised by Vikas Singh.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
          isRead: true,
          priority: 'high'
        },
      ]);
      setLoading(false);
    }, 400);
  }, [selectedPropertyId]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    loading,
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications
  };
}
