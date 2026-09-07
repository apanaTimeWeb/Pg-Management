// RESPONSIBILITY: Renders the ManagerEnquiriesMain component.
'use client';

import { Search, Plus, Lock, AlertTriangle } from 'lucide-react';
import { useManagerPropertyContext } from '@/app/manager/manager_components/ManagerPropertyContext';
import { getSession } from '@/app/manager/manager_lib/manager_auth/ManagerSession';
import { useManagerEnquiries } from '@/app/manager/enquiries/ManagerEnquiries_hooks/ManagerUseManagerEnquiries';
import { EnquiryStatus } from '@/app/manager/manager_lib/manager_api/managerEnquiries';
import { ManagerEnquiriesKanban } from '@/app/manager/enquiries/ManagerEnquiries_components/ManagerEnquiriesKanban';
import { ManagerEnquiriesLost } from '@/app/manager/enquiries/ManagerEnquiries_components/ManagerEnquiriesLost';
import { ManagerEnquiriesModals } from '@/app/manager/enquiries/ManagerEnquiries_components/ManagerEnquiriesModals';

export function ManagerEnquiriesMain() {
  const user = typeof window !== 'undefined' ? getSession() : null;
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  
  const {
    loading, showAddModal, setShowAddModal, searchQuery, setSearchQuery,
    activeTab, setActiveTab, waMenuEnquiry, setWaMenuEnquiry, formData, setFormData,
    currentPage, setCurrentPage, itemsPerPage,
    activeEnquiries, lostEnquiries,
    handleAdd, handleStatusChange, handleConvertToCheckin, handleRoomAvailable, handleRentOffer
  } = useManagerEnquiries(selectedPropertyId, ctxLoading, user?.id);

  if (ctxLoading || loading) return <div className="p-6 animate-pulse text-[var(--text-secondary)]">Loading...</div>;

  if (!selectedPropertyId) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-[var(--bg-card)] flex items-center justify-center mb-6 border border-[var(--border)]">
          <Lock className="w-10 h-10 text-[var(--text-secondary)]" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Select a Property</h2>
        <p className="text-[var(--text-secondary)]">You need an assigned property to manage enquiries.</p>
      </div>
    );
  }

  const columns: { id: EnquiryStatus, label: string }[] = [
    { id: 'new', label: 'New Lead' },
    { id: 'contacted', label: 'Contacted' },
    { id: 'visited', label: 'Visited' },
    { id: 'interested', label: 'Interested' },
    { id: 'booked', label: 'Booked' }
  ];

  const totalPages = Math.ceil(lostEnquiries.length / itemsPerPage);
  const paginatedLostEnquiries = lostEnquiries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6 pb-20 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-[24px] font-bold text-[var(--text-primary)]">Enquiries Pipeline</h1>
          <p className="text-sm text-[var(--text-secondary)]">Manage leads and follow-ups.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--text-secondary)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-4 py-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-md,8px)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[var(--primary)] text-white rounded-[var(--radius-md,8px)] text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            New Lead
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--border)] shrink-0">
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === 'pipeline' 
              ? 'border-[var(--primary)] text-[var(--primary)]' 
              : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          Active Pipeline
        </button>
        <button
          onClick={() => setActiveTab('lost')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === 'lost' 
              ? 'border-[var(--danger)] text-[var(--danger)]' 
              : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          Lost Leads & Follow-ups
          {lostEnquiries.length > 0 && (
            <span className="bg-[var(--danger)] text-white text-[10px] px-2 py-0.5 rounded-full ml-1">{lostEnquiries.length}</span>
          )}
        </button>
      </div>

      {activeTab === 'pipeline' ? (
        <ManagerEnquiriesKanban 
          activeEnquiries={activeEnquiries}
          columns={columns}
          setWaMenuEnquiry={setWaMenuEnquiry}
          handleStatusChange={handleStatusChange}
          handleConvertToCheckin={handleConvertToCheckin}
        />
      ) : (
        <ManagerEnquiriesLost 
          paginatedLostEnquiries={paginatedLostEnquiries}
          lostEnquiries={lostEnquiries}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          setWaMenuEnquiry={setWaMenuEnquiry}
          handleStatusChange={handleStatusChange}
        />
      )}

      <ManagerEnquiriesModals 
        waMenuEnquiry={waMenuEnquiry}
        setWaMenuEnquiry={setWaMenuEnquiry}
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        formData={formData}
        setFormData={setFormData}
        handleAdd={handleAdd}
        handleRoomAvailable={handleRoomAvailable}
        handleRentOffer={handleRentOffer}
      />
    </div>
  );
}
