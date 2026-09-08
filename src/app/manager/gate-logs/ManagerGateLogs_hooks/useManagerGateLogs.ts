// DATA FLOW: [AI_TODO: Document data flow direction for useManagerGateLogs.ts]
import { useState, useEffect } from 'react';

import { useManagerUrlPagination } from '@/app/manager/manager_components/manager_hooks/useManagerUrlPagination';
// [DATA HOOK] useManagerGateLogs
// Responsibility: Fetches gate log entries and manages the add-log form state for the selected property.
// Data Flow: ManagerPropertyContext â†’ api.managerOperations.listGateLogs â†’ local state â†’ ManagerGateLogsPage
import { api } from '@/app/manager/manager_lib/manager_api/ManagerApi';
import { useManagerPropertyContext } from '@/app/manager/manager_components/ManagerPropertyContext';
import { useManagerSession } from '@/app/manager/manager_components/manager_hooks/useManagerSession';

import type { GateLog, UseManagerGateLogsReturn } from '@/app/manager/gate-logs/ManagerGateLogs_types/ManagerGateLogs.types';
export function useManagerGateLogs(): UseManagerGateLogsReturn {
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  const [logs, setLogs] = useState<GateLog[]>([]);
  const { currentPage, setCurrentPage } = useManagerUrlPagination(1);
  const itemsPerPage = 10;
  const user = useManagerSession();
  const loadData = () => {
    if (!ctxLoading && selectedPropertyId) {
      setLogs(api.managerOperations.listGateLogs(selectedPropertyId) as unknown as GateLog[]);
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
    api.managerOperations.addGateLog({
      propertyId: selectedPropertyId,
      studentId,
      type,
      isLate,
      managerId: user.id
    });
    loadData();
  };

  const sortedLogs = [...logs].sort((a,b) => new Date((b as Record<string, unknown>).timestamp).getTime() - new Date(a.timestamp).getTime());
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