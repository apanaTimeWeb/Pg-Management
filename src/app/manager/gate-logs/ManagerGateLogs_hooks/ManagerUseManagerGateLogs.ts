// DATA FLOW: [AI_TODO: Document data flow direction for ManagerUseManagerGateLogs.ts]
import { ManagerUseManagerUrlPagination } from '@/app/manager/manager_components/manager_hooks/ManagerUseManagerUrlPagination';
// [DATA HOOK] ManagerUseManagerGateLogs
// Responsibility: Fetches gate log entries and manages the add-log form state for the selected property.
// Data Flow: ManagerPropertyContext → api.managerOperations.listGateLogs → local state → ManagerGateLogsPage

import { useState, useEffect } from 'react';
import { authApi as api } from '@/app/manager/manager_lib/manager_api/ManagerAuth';
import { useManagerPropertyContext } from '@/app/manager/manager_components/ManagerPropertyContext';
import { getSession } from '@/app/manager/manager_lib/manager_auth/ManagerSession';
import type { GateLog, UseManagerGateLogsReturn } from '@/app/manager/gate-logs/ManagerGateLogs_types/ManagerGateLogs.types';

export function ManagerUseManagerGateLogs(): UseManagerGateLogsReturn {
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  const [logs, setLogs] = useState<GateLog[]>([]);
  const { currentPage, setCurrentPage } = ManagerUseManagerUrlPagination(1);
  const itemsPerPage = 10;
  
  const user = typeof window !== 'undefined' ? getSession() : null;

  const loadData = () => {
    if (!ctxLoading && selectedPropertyId) {
      setLogs((api as any).managerOperations.listGateLogs(selectedPropertyId) as GateLog[]);
    }
  };

  // Re-fetch gate logs when property changes or context finishes loading.
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPropertyId, ctxLoading]);

  // Reset pagination to page 1 whenever the active property changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPropertyId]);

  const handleAdd = (studentId: string, type: 'entry' | 'exit', isLate: boolean) => {
    if (!user || !selectedPropertyId || !studentId) return;
    
    (api as any).managerOperations.addGateLog({
      propertyId: selectedPropertyId,
      studentId,
      type,
      isLate,
      managerId: user.id
    });
    
    loadData();
  };

  const sortedLogs = [...logs].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  const totalPages = Math.ceil(sortedLogs.length / itemsPerPage);
  const paginatedData = sortedLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return {
    logs,
    loading: ctxLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    handleAdd,
    selectedPropertyId,
    ctxLoading
  };
}
