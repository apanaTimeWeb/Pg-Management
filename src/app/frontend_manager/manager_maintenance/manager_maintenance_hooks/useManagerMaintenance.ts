import { useState, useEffect } from 'react';
import { useManagerPropertyContext } from '@/app/frontend_manager/manager_components/ManagerPropertyContext';

export type TaskStatus = 'Pending' | 'Assigned' | 'In Progress' | 'Completed';

export interface MaintenanceTask {
  id: string;
  complaintId: string;
  room: string;
  student: string;
  issue: string;
  status: TaskStatus;
  isEmergency: boolean;
  assignedTo?: string;
  vendor?: string;
  cost?: number;
  partsUsed?: string;
  dateCreated: string;
}

export function useManagerMaintenance() {
  const { selectedPropertyId } = useManagerPropertyContext();
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedPropertyId) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Mock Data
    setTimeout(() => {
      setTasks([
        {
          id: 'MT-1001',
          complaintId: 'C-089',
          room: '102',
          student: 'Rahul Sharma',
          issue: 'Fan is making loud noise and rotating slowly.',
          status: 'In Progress',
          isEmergency: false,
          assignedTo: 'Ramesh (Electrician)',
          dateCreated: '03 Oct 2026'
        },
        {
          id: 'MT-1002',
          complaintId: 'C-090',
          room: '205',
          student: 'Amit Kumar',
          issue: 'Water leaking from bathroom tap.',
          status: 'Pending',
          isEmergency: true,
          dateCreated: '03 Oct 2026'
        },
        {
          id: 'MT-0995',
          complaintId: 'C-075',
          room: '304',
          student: 'Vikas Singh',
          issue: 'AC not cooling properly.',
          status: 'Completed',
          isEmergency: false,
          assignedTo: 'CoolTech Services',
          vendor: 'CoolTech AC Repair',
          cost: 1500,
          partsUsed: 'Gas refill, Filter change',
          dateCreated: '01 Oct 2026'
        }
      ]);
      setLoading(false);
    }, 400);
  }, [selectedPropertyId]);

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const recordTaskCost = (taskId: string, vendor: string, partsUsed: string, cost: number) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, vendor, partsUsed, cost, status: 'Completed' } : t));
  };

  const assignTask = (taskId: string, assignedTo: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, assignedTo, status: 'Assigned' } : t));
  };

  return {
    loading,
    tasks,
    updateTaskStatus,
    recordTaskCost,
    assignTask
  };
}
