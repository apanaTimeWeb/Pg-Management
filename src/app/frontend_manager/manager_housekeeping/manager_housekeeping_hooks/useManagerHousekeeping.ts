import { useState, useEffect } from 'react';
import { useManagerPropertyContext } from '@/app/frontend_manager/manager_components/ManagerPropertyContext';

export interface HousekeepingTask {
  id: string;
  room: string;
  status: 'pending' | 'completed';
  assignedTo: string;
}

export function useManagerHousekeeping() {
  const { selectedPropertyId } = useManagerPropertyContext();
  const [tasks, setTasks] = useState<HousekeepingTask[]>([]);
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
        { id: '1', room: '101', status: 'pending', assignedTo: 'Ramesh (Cleaner)' },
        { id: '2', room: '102', status: 'completed', assignedTo: 'Suresh (Cleaner)' },
        { id: '3', room: '201', status: 'pending', assignedTo: 'Ramesh (Cleaner)' },
        { id: '4', room: '202', status: 'completed', assignedTo: 'Suresh (Cleaner)' },
        { id: '5', room: 'Common Area', status: 'pending', assignedTo: 'Ramesh (Cleaner)' },
      ]);
      setLoading(false);
    }, 400);
  }, [selectedPropertyId]);

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id 
        ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } 
        : t
    ));
  };

  return {
    loading,
    tasks,
    toggleTaskStatus
  };
}
