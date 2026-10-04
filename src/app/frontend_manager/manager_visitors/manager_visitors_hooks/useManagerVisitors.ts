import { useState, useEffect } from 'react';
import { useManagerPropertyContext } from '@/app/frontend_manager/manager_components/ManagerPropertyContext';

export type VisitorStatus = 'Request' | 'Approved' | 'Inside' | 'Exit';

export interface Visitor {
  id: string;
  visitorName: string;
  mobile: string;
  student: string;
  room: string;
  relation: string;
  purpose: string;
  idProof: string;
  expectedTime: string;
  entryTime?: string;
  exitTime?: string;
  status: VisitorStatus;
}

export function useManagerVisitors() {
  const { selectedPropertyId } = useManagerPropertyContext();
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedPropertyId) {
      setVisitors([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Mock Data
    setTimeout(() => {
      setVisitors([
        {
          id: 'V-1001',
          visitorName: 'Rajesh Sharma',
          mobile: '+91 9876543210',
          student: 'Rahul Sharma',
          room: '102',
          relation: 'Father',
          purpose: 'Casual Visit',
          idProof: 'Aadhar (Verified)',
          expectedTime: '10:00 AM',
          status: 'Request'
        },
        {
          id: 'V-1002',
          visitorName: 'Sneha Patel',
          mobile: '+91 8765432109',
          student: 'Suresh Patel',
          room: '205',
          relation: 'Sister',
          purpose: 'Delivering luggage',
          idProof: 'Pending',
          expectedTime: '11:30 AM',
          status: 'Approved'
        },
        {
          id: 'V-1003',
          visitorName: 'Ramesh Singh',
          mobile: '+91 7654321098',
          student: 'Vikas Singh',
          room: '304',
          relation: 'Uncle',
          purpose: 'Family Emergency',
          idProof: 'Driving License',
          expectedTime: '09:00 AM',
          entryTime: '09:15 AM',
          status: 'Inside'
        },
        {
          id: 'V-1004',
          visitorName: 'Priya Kumar',
          mobile: '+91 6543210987',
          student: 'Amit Kumar',
          room: '105',
          relation: 'Mother',
          purpose: 'Meeting',
          idProof: 'Aadhar',
          expectedTime: '08:00 AM',
          entryTime: '08:10 AM',
          exitTime: '10:30 AM',
          status: 'Exit'
        }
      ]);
      setLoading(false);
    }, 400);
  }, [selectedPropertyId]);

  const updateVisitorStatus = (id: string, status: VisitorStatus) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setVisitors(prev => prev.map(v => {
      if (v.id === id) {
        if (status === 'Inside' && !v.entryTime) {
          return { ...v, status, entryTime: timeNow };
        }
        if (status === 'Exit' && !v.exitTime) {
          return { ...v, status, exitTime: timeNow };
        }
        return { ...v, status };
      }
      return v;
    }));
  };

  return {
    loading,
    visitors,
    updateVisitorStatus
  };
}