import { useState, useEffect, useCallback } from 'react';

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected' | 'Active Outing' | 'Returned' | 'Overdue Return';

export interface LeaveRequest {
  id: string;
  student: string;
  room: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  destination: string;
  contact: string;
  expectedReturn: string;
  status: LeaveStatus;
  isEmergency?: boolean;
  auditNote?: string;
}

const INITIAL_LEAVES: LeaveRequest[] = [
  {
    id: 'LR-105',
    student: 'Rahul Sharma',
    room: '102',
    leaveType: 'Home Visit',
    startDate: '04 Oct 2026',
    endDate: '07 Oct 2026',
    reason: 'Diwali Holidays',
    destination: 'Jaipur, Rajasthan',
    contact: '+91 9876543210 (Father)',
    expectedReturn: '07 Oct 2026, 05:00 PM',
    status: 'Pending'
  },
  {
    id: 'LR-104',
    student: 'Amit Kumar',
    room: '205',
    leaveType: 'Night Out',
    startDate: '03 Oct 2026',
    endDate: '04 Oct 2026',
    reason: 'Friend\'s Birthday Party',
    destination: 'Sector 29, Gurgaon',
    contact: '+91 8765432109 (Self)',
    expectedReturn: '04 Oct 2026, 09:00 AM',
    status: 'Approved'
  },
  {
    id: 'LR-102',
    student: 'Suresh Patel',
    room: '304',
    leaveType: 'Emergency Leave',
    startDate: '02 Oct 2026',
    endDate: '05 Oct 2026',
    reason: 'Medical Emergency at home',
    destination: 'Ahmedabad, Gujarat',
    contact: '+91 7654321098 (Brother)',
    expectedReturn: '05 Oct 2026, 10:00 AM',
    status: 'Active Outing',
    isEmergency: true
  },
  {
    id: 'LR-101',
    student: 'Vikas Singh',
    room: '105',
    leaveType: 'Weekend Outing',
    startDate: '01 Oct 2026',
    endDate: '02 Oct 2026',
    reason: 'Local Shopping',
    destination: 'City Mall',
    contact: '+91 6543210987',
    expectedReturn: '02 Oct 2026, 08:00 PM',
    status: 'Overdue Return'
  }
];

export function useManagerLeaves(selectedPropertyId: string | null, ctxLoading: boolean, managerId: string = 'manager-1') {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = useCallback(() => {
    if (ctxLoading) return;
    if (!selectedPropertyId) {
      setLeaves([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    
    // In a real application, you would fetch from DB:
    // const fetched = db.getAll('spg_leaves').filter(...)
    // For now we use the mock array and pretend it came from DB
    
    setTimeout(() => {
      setLeaves(INITIAL_LEAVES);
      setLoading(false);
    }, 500); // simulate API delay
    
  }, [ctxLoading, selectedPropertyId]);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const updateLeaveStatus = (id: string, newStatus: LeaveStatus, reason?: string) => {
    setLeaves(prev => prev.map(l => {
      if (l.id === id) {
        return { 
          ...l, 
          status: newStatus,
          auditNote: reason ? `Updated to ${newStatus}: ${reason}` : undefined
        };
      }
      return l;
    }));
  };

  return { leaves, loading, updateLeaveStatus };
}
