// RESPONSIBILITY: Renders the ManagerRoomsMain component.
'use client';

import { useManagerPropertyContext } from '@/app/manager/manager_components/ManagerPropertyContext';
import { getSession } from '@/app/manager/manager_lib/manager_auth/ManagerSession';
import { useManagerRooms } from '@/app/manager/rooms/ManagerRooms_hooks/ManagerUseManagerRooms';
import { ManagerRoomsKPIs } from '@/app/manager/rooms/ManagerRooms_components/ManagerRoomsKPIs';
import { ManagerRoomsFilters } from '@/app/manager/rooms/ManagerRooms_components/ManagerRoomsFilters';
import { ManagerRoomsTable } from '@/app/manager/rooms/ManagerRooms_components/ManagerRoomsTable';
import { useState } from 'react';

export function ManagerRoomsMain() {
  const user = typeof window !== 'undefined' ? getSession() : null;
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 10;
  
  const { 
    rooms, loading, filteredRooms,
    searchQuery, setSearchQuery,
    filterSharing, setFilterSharing,
    filterStatus, setFilterStatus,
    currentPage, setCurrentPage
  } = useManagerRooms(selectedPropertyId, ctxLoading, user?.id);

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  if (ctxLoading) {
    return <div className="p-6 animate-pulse">Loading rooms...</div>;
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[var(--text-primary)]">Rooms Directory</h1>
          <p className="text-sm text-[var(--text-secondary)]">View and manage rooms for your assigned property.</p>
        </div>
      </div>

      <ManagerRoomsKPIs rooms={rooms} />

      <ManagerRoomsFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filterSharing={filterSharing}
        setFilterSharing={setFilterSharing}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <ManagerRoomsTable 
        loading={loading}
        filteredRooms={filteredRooms}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
