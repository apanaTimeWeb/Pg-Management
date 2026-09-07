// [DATA HOOK] useManagerVisitors
// Responsibility: Fetches visitor list and handles approval/rejection/check-in/check-out status updates.
// Data Flow: ManagerPropertyContext → api.managerOperations.listVisitors → local state → ManagerVisitorsPage

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useManagerPropertyContext } from '@/app/manager/manager_shared/ManagerPropertyContext';
import { getSession } from '@/lib/auth/session';
import type { Visitor, UseManagerVisitorsReturn } from '@/app/manager/visitors/ManagerVisitors_types/ManagerVisitors.types';

export function useManagerVisitors(): UseManagerVisitorsReturn {
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  
  const user = typeof window !== 'undefined' ? getSession() : null;

  const loadData = () => {
    if (!ctxLoading && selectedPropertyId) {
      setLoading(true);
      setVisitors(api.managerOperations.listVisitors(selectedPropertyId) as Visitor[]);
      setLoading(false);
    }
  };

  // Re-fetch visitors when property selection changes or context finishes loading.
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPropertyId, ctxLoading]);

  const handleStatus = (id: string, status: string) => {
    if (!user) return;
    api.managerOperations.updateVisitorStatus(id, status as 'approved' | 'rejected' | 'checked_in' | 'checked_out', user.id);
    loadData();
  };

  return {
    visitors,
    loading,
    handleStatus,
    selectedPropertyId,
    ctxLoading
  };
}
