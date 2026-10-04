import { useState, useEffect } from 'react';
import { useManagerPropertyContext } from '@/app/frontend_manager/manager_components/ManagerPropertyContext';

export interface BroadcastMessage {
  id: string;
  type: 'alert' | 'event' | 'maintenance' | 'general';
  title: string;
  message: string;
  target: 'All Students' | 'Building A' | 'Building B' | 'Floor 1';
  date: string;
  time: string;
  author: string;
  status: 'active' | 'scheduled' | 'completed';
}

export function useManagerBroadcasts() {
  const { selectedPropertyId } = useManagerPropertyContext();
  const [broadcasts, setBroadcasts] = useState<BroadcastMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedPropertyId) {
      setBroadcasts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Mock Data
    setTimeout(() => {
      setBroadcasts([
        {
          id: 'B-001',
          type: 'alert',
          title: 'Water Supply Interruption',
          message: 'Water supply will be interrupted on 3rd floor for 2 hours due to urgent plumbing work.',
          target: 'Floor 1', // mapping to mock
          date: '2023-11-15',
          time: '14:00 - 16:00',
          author: 'Manager',
          status: 'active'
        },
        {
          id: 'B-002',
          type: 'event',
          title: 'Diwali Celebration & Dinner',
          message: 'Join us for special Diwali dinner at the mess hall. Special menu and decorations.',
          target: 'All Students',
          date: '2023-11-12',
          time: '19:30 onwards',
          author: 'Admin',
          status: 'completed'
        },
        {
          id: 'B-003',
          type: 'maintenance',
          title: 'AC Servicing Schedule',
          message: 'Quarterly AC servicing will begin tomorrow. Please coordinate with maintenance staff.',
          target: 'Building A',
          date: '2023-11-16',
          time: '10:00 - 18:00',
          author: 'Manager',
          status: 'scheduled'
        }
      ]);
      setLoading(false);
    }, 400);
  }, [selectedPropertyId]);

  const addBroadcast = (newBroadcast: BroadcastMessage) => {
    setBroadcasts(prev => [newBroadcast, ...prev]);
  };

  const updateBroadcastStatus = (id: string, status: 'active' | 'scheduled' | 'completed') => {
    setBroadcasts(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteBroadcast = (id: string) => {
    setBroadcasts(prev => prev.filter(b => b.id !== id));
  };

  return {
    loading,
    broadcasts,
    addBroadcast,
    updateBroadcastStatus,
    deleteBroadcast
  };
}
