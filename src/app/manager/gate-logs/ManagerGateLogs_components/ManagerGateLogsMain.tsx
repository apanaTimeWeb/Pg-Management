// RESPONSIBILITY: Renders the ManagerGateLogsMain component.
'use client';
import { Pagination } from '@/components/ui/Pagination';
import { useManagerGateLogs } from '@/app/manager/gate-logs/ManagerGateLogs_hooks/useManagerGateLogs';
import { ManagerGateLogsTable } from '@/app/manager/gate-logs/ManagerGateLogs_components/ManagerGateLogsTable';
import { ManagerGateLogsForm } from '@/app/manager/gate-logs/ManagerGateLogs_components/ManagerGateLogsForm';
export function ManagerGateLogsMain() {
  const {
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    handleAdd,
    selectedPropertyId,
    ctxLoading
  } = useManagerGateLogs();
  if (ctxLoading || loading) return <div className="p-6 text-secondary">Loading...</div>;
  if (!selectedPropertyId) return <div className="p-6 text-center text-secondary">Property Required</div>;
  return (
    <div className="space-y-6 pb-20 flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-[24px] font-bold text-primary">Gate Logs</h1>
          <p className="text-sm text-secondary">Monitor student entries and exits.</p>
        </div>
        <ManagerGateLogsTable paginatedData={paginatedData} />
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </div>
      <div className="w-full lg:w-80 shrink-0">
        <ManagerGateLogsForm handleAdd={handleAdd} />
      </div>
    </div>
  );
}