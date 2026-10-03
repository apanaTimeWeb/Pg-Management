// RESPONSIBILITY: Renders the ManagerComplaintsMain component.
'use client';
import { useManagerPropertyContext } from '@/app/manager/manager_components/ManagerPropertyContext';
import { Pagination } from '@/components/ui/Pagination';
import { AlertCircle } from 'lucide-react';
import { useManagerComplaints } from '@/app/manager/complaints/ManagerComplaints_hooks/useManagerComplaints';
import { ManagerComplaintsKPIs } from '@/app/manager/complaints/ManagerComplaints_components/ManagerComplaintsKPIs';
import { ManagerComplaintsActive } from '@/app/manager/complaints/ManagerComplaints_components/ManagerComplaintsActive';
import { ManagerComplaintsLog } from '@/app/manager/complaints/ManagerComplaints_components/ManagerComplaintsLog';
import { ManagerComplaintsResolveModal } from '@/app/manager/complaints/ManagerComplaints_components/ManagerComplaintsResolveModal';
export function ManagerComplaintsMain() {
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  const {
    activeTab, setActiveTab,
    resolvingComplaint,
    onOpenResolveModal, onCloseResolveModal,
    resolveForm,
    currentPage, setCurrentPage,
    totalPages, paginatedData,
    activeComplaintsCount, resolvedComplaintsCount,
    handleResolveSubmit, handleStartWork
  } = useManagerComplaints(selectedPropertyId, ctxLoading);
  if (ctxLoading) return <div className="p-6 text-secondary">Loading...</div>;
  if (!selectedPropertyId) return <div className="p-6 text-secondary text-center">Property Required</div>;
  return (
    <div className="space-y-6 pb-20 manager-theme animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-danger to-rose-600 text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group mb-6">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <AlertCircle className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <AlertCircle className="w-8 h-8" /> Maintenance & Complaints
            </h1>
            <p className="text-white/80 font-medium max-w-xl">
              Manage student issues, track repair costs, and assign maintenance staff.
            </p>
          </div>
        </div>
      </div>
      
      <ManagerComplaintsKPIs activeCount={activeComplaintsCount} resolvedCount={resolvedComplaintsCount} />

      <div className="flex border-b border gap-6">
        <button 
          onClick={() => setActiveTab('active')} 
          className={`pb-3 font-bold motion-safe:transition-colors ${activeTab === 'active' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'}`}
        >
          Active Requests ({activeComplaintsCount})
        </button>
        <button 
          onClick={() => setActiveTab('log')} 
          className={`pb-3 font-bold motion-safe:transition-colors ${activeTab === 'log' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'}`}
        >
          Maintenance Log
        </button>
      </div>
      {activeTab === 'active' && (
        <ManagerComplaintsActive 
          paginatedData={paginatedData}
          activeComplaintsCount={activeComplaintsCount}
          handleStartWork={handleStartWork}
          setResolvingComplaint={onOpenResolveModal}
        />
      )}
      {activeTab === 'log' && (
        <ManagerComplaintsLog 
          paginatedData={paginatedData}
          resolvedComplaintsCount={resolvedComplaintsCount}
        />
      )}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
      {resolvingComplaint && (
        <ManagerComplaintsResolveModal 
          resolvingComplaint={resolvingComplaint}
          onClose={onCloseResolveModal}

          resolveForm={resolveForm as any}
          handleResolveSubmit={handleResolveSubmit as any}
        />
      )}
    </div>
  );
}