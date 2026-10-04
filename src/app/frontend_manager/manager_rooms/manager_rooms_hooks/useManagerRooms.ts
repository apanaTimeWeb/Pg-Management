// DATA FLOW: [AI_TODO: Document data flow direction for useManagerRooms.ts]
import { useState, useEffect, useCallback } from 'react';

import { useManagerUrlPagination } from '@/app/frontend_manager/manager_components/manager_hooks/useManagerUrlPagination';
// [DATA HOOK] useManagerRooms
// Responsibility: Fetches enriched room data (occupancy, beds, tenants) for the selected property.
// Data Flow: ManagerPropertyContext â†’ api â†’ local state â†’ ManagerRoomsMain
import { api } from '@/app/frontend_manager/manager_lib/manager_api/ManagerApi';

import type { ManagerRoomData } from '@/app/frontend_manager/manager_rooms/manager_rooms_types/ManagerRooms.types';
export type BedStatus = 'Available' | 'Reserved' | 'Occupied' | 'Maintenance' | 'Blocked';

export interface BedData {
  id: string;
  bedName: string;
  status: BedStatus;
  student?: string;
  studentId?: string;
  rent: number;
}

export interface RoomData {
  id: string;
  roomNumber: string;
  floor: string;
  building: string;
  roomType: string;
  capacity: number;
  beds: BedData[];
}

export function useManagerRooms(selectedPropertyId: string | null, ctxLoading: boolean, userId: string | undefined) {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFloor, setFilterFloor] = useState('All');
  const { currentPage, setCurrentPage } = useManagerUrlPagination(1);

  const loadData = useCallback(() => {
    if (!selectedPropertyId) return;
    setLoading(true);
    
    try {
      const allRooms = api.rooms.listByProperty(selectedPropertyId);
      const allStudents = api.managerOperations.listStudents(selectedPropertyId);
      
      const enhanced: RoomData[] = allRooms.map((r) => {
        const beds = api.beds.listByRoom(r.id);
        const mappedBeds: BedData[] = beds.map(b => {
          let statusStr: BedStatus = 'Available';
          if (b.status === 'occupied') statusStr = 'Occupied';
          else if (b.status === 'reserved') statusStr = 'Reserved';
          else if (b.status === 'maintenance') statusStr = 'Maintenance';
          else if (b.status === 'blocked') statusStr = 'Blocked';
          else if (b.status === 'available') statusStr = 'Available';

          let studentName = undefined;
          if (b.studentId) {
            const stu = allStudents.find(s => (s as any).profile.id === b.studentId);
            if (stu) {
              studentName = (stu as any).user?.name;
            }
          }

          return {
            id: b.id,
            bedName: `${r.number}-${b.code}`,
            status: statusStr,
            student: studentName,
            studentId: b.studentId,
            rent: r.rentPerBed || 0
          };
        });

        return {
          id: r.id,
          roomNumber: r.number,
          floor: `Floor ${r.floor || 0}`,
          building: 'Main Block', // Or fetch building info if available
          roomType: `${r.sharing} Sharing`,
          capacity: r.sharing,
          beds: mappedBeds
        };
      });
      setRooms(enhanced);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [selectedPropertyId]);

  useEffect(() => {
    if (!ctxLoading && selectedPropertyId) {
      loadData();
    }
  }, [selectedPropertyId, ctxLoading, loadData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterFloor, selectedPropertyId, setCurrentPage]);

  const filteredRooms = rooms.filter(r => {
    const matchesSearch = r.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.floor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFloor = filterFloor === 'All' || r.floor === filterFloor;
    return matchesSearch && matchesFloor;
  });

  return {
    rooms, loading, filteredRooms,
    searchQuery, setSearchQuery,
    filterFloor, setFilterFloor,
    currentPage, setCurrentPage,
    loadData
  };
}