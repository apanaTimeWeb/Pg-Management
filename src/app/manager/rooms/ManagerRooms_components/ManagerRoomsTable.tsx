import { BedDouble, ChevronRight, User, Users } from 'lucide-react';
import Link from 'next/link';
import type { ManagerRoomData } from '@/app/manager/rooms/ManagerRooms_types/ManagerRooms.types';

interface Props {
  loading: boolean;
  filteredRooms: ManagerRoomData[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export function ManagerRoomsTable({ 
  loading, filteredRooms, currentPage, itemsPerPage, totalPages, setCurrentPage 
}: Props) {
  
  if (loading) {
    return <div className="animate-pulse h-64 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)]"></div>;
  }

  if (filteredRooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] text-center">
        <BedDouble className="w-12 h-12 text-[var(--text-secondary)] opacity-50 mb-4" />
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">No Rooms Found</h3>
        <p className="text-[var(--text-secondary)] text-sm max-w-sm">
          No rooms match your criteria. Wait for the owner to add some or adjust filters.
        </p>
      </div>
    );
  }

  const paginatedRooms = filteredRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-[rgba(99,102,241,0.03)] text-[11px] uppercase tracking-wider text-[var(--text-secondary)] border-b border-[var(--border)]">
            <tr>
              <th className="px-6 py-4 font-semibold">Room Identity</th>
              <th className="px-6 py-4 font-semibold">Configuration</th>
              <th className="px-6 py-4 font-semibold">Rent (Per Bed)</th>
              <th className="px-6 py-4 font-semibold">Vacancy Status</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {paginatedRooms.map((room) => {
              const safeSharing = room.sharing || 1;
              const occupiedBeds = safeSharing - room.vacantCount;
              const percent = Math.round((occupiedBeds / safeSharing) * 100);
              
              return (
                <tr key={room.id} className="hover:bg-[rgba(99,102,241,0.02)] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[var(--radius-md,8px)] bg-[var(--bg-input)] border border-[var(--border)] flex items-center justify-center shrink-0 shadow-sm">
                        <span className="font-bold text-[var(--primary)] text-lg">{room.number || '-'}</span>
                      </div>
                      <div>
                        <div className="font-bold text-[var(--text-primary)] text-base">
                          Room {room.number || 'Unnamed'}
                        </div>
                        <div className="text-[11px] text-[var(--text-secondary)] mt-0.5 flex flex-col gap-0.5">
                          <span>📍 Floor {room.floor}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[rgba(99,102,241,0.1)] text-[var(--primary)] flex items-center justify-center shrink-0">
                        {room.sharing === 1 ? <User className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                      </div>
                      <span className="text-[var(--text-primary)] font-medium text-sm">
                        {room.sharing === 1 ? 'Single Bed' : room.sharing === 2 ? 'Double Sharing' : room.sharing === 3 ? 'Triple Sharing' : `${room.sharing} Sharing`}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[var(--text-primary)] font-bold text-sm">
                      ₹{(room.rentPerBed || 0).toLocaleString()}
                    </div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">/ month</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2 w-36">
                      <div className="flex items-center justify-between">
                        {room.status === 'maintenance' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--danger-bg)] text-[var(--danger)] border border-[rgba(239,68,68,0.2)] uppercase tracking-wider">Maint.</span>
                        ) : room.vacantCount > 0 ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--success-bg)] text-[var(--success)] border border-[rgba(16,185,129,0.2)] uppercase tracking-wider">Available</span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--danger-bg)] text-[var(--danger)] border border-[rgba(239,68,68,0.2)] uppercase tracking-wider">Occupied</span>
                        )}
                        <span className="text-[10px] text-[var(--text-secondary)] font-medium">{occupiedBeds}/{safeSharing} beds</span>
                      </div>
                      <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5 overflow-hidden border border-[var(--border)]">
                        <div className={`h-full rounded-full transition-all duration-500 ${percent === 100 ? 'bg-[var(--danger)]' : 'bg-[var(--primary)]'}`} style={{ width: `${percent}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/manager/rooms/${room.id}`}
                      className="inline-flex items-center justify-center p-2 rounded-md hover:bg-[var(--primary-subtle)] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="p-4 border-t border-[var(--border)] bg-[rgba(99,102,241,0.01)] flex items-center justify-between">
          <span className="text-sm text-[var(--text-secondary)]">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredRooms.length)} of {filteredRooms.length}
          </span>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="px-3 py-1.5 text-sm font-medium border border-[var(--border)] rounded-md hover:bg-[var(--bg-input)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--text-primary)] transition-colors"
            >
              Previous
            </button>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="px-3 py-1.5 text-sm font-medium border border-[var(--border)] rounded-md hover:bg-[var(--bg-input)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--text-primary)] transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
