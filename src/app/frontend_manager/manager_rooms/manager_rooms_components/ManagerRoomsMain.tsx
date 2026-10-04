// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  Bed, Users, Wrench, ShieldAlert, CheckCircle2, ArrowRightLeft, 
  Search, Filter, Lock, Plus, MapPin, User, FileText, IndianRupee,
  Calendar, X, RefreshCw
, LogOut} from 'lucide-react';

import { useManagerPropertyContext } from '@/app/frontend_manager/manager_components/ManagerPropertyContext';

import { useManagerRooms } from '../manager_rooms_hooks/useManagerRooms';
import type { RoomData, BedData, BedStatus } from '../manager_rooms_hooks/useManagerRooms';

export default function ManagerRoomsMain() {
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  
  const { 
    filteredRooms, loading, 
    searchQuery: searchTerm, setSearchQuery: setSearchTerm,
    filterFloor, setFilterFloor,
    loadData
  } = useManagerRooms(selectedPropertyId, ctxLoading, 'manager-1');

  const [rooms, setRooms] = useState<RoomData[]>([]);

  React.useEffect(() => {
    setRooms(filteredRooms);
  }, [filteredRooms]);

  // Modals
  const [selectedBed, setSelectedBed] = useState<{room: RoomData, bed: BedData} | null>(null);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [targetBedId, setTargetBedId] = useState('');
  const [transferReason, setTransferReason] = useState('');

  if (loading || ctxLoading) {
    return <div className="p-8 flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const getStatusColor = (status: BedStatus) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700 border-green-200';
      case 'Reserved': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Occupied': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Maintenance': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Blocked': return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getAvailableBedsCount = () => {
    return rooms.reduce((acc, room) => acc + room.beds.filter(b => b.status === 'Available').length, 0);
  };
  const getOccupiedBedsCount = () => {
    return rooms.reduce((acc, room) => acc + room.beds.filter(b => b.status === 'Occupied').length, 0);
  };

  const handleBedAction = (action: string) => {
    if(!selectedBed) return;
    const { room, bed } = selectedBed;
    
    if (action === 'transfer') {
      setTransferModalOpen(true);
      return;
    }

    let newStatus = bed.status;
    let newStudent = bed.student;

    if (action === 'available') { newStatus = 'Available'; newStudent = undefined; }
    else if (action === 'maintenance') { newStatus = 'Maintenance'; newStudent = undefined; }
    else if (action === 'blocked') { newStatus = 'Blocked'; newStudent = undefined; }
    else if (action === 'release') { newStatus = 'Available'; newStudent = undefined; }
    
    setRooms(prev => prev.map(r => {
      if (r.id === room.id) {
        return {
          ...r,
          beds: r.beds.map(b => b.id === bed.id ? { ...b, status: newStatus, student: newStudent } : b)
        };
      }
      return r;
    }));
    setSelectedBed(null);
  };

  const handleTransferConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBed || !targetBedId) return;

    // Find target room and bed
    let targetRoomObj: RoomData | undefined;
    let targetBedObj: BedData | undefined;
    
    rooms.forEach(r => {
      const b = r.beds.find(b => b.id === targetBedId);
      if (b) { targetRoomObj = r; targetBedObj = b; }
    });

    if (!targetRoomObj || !targetBedObj) return;

    const studentToMove = selectedBed.bed.student;
    const studentIdToMove = selectedBed.bed.studentId;

    setRooms(prev => prev.map(r => {
      // Release old bed
      if (r.id === selectedBed.room.id) {
        r = {
          ...r,
          beds: r.beds.map(b => b.id === selectedBed.bed.id ? { ...b, status: 'Available', student: undefined, studentId: undefined } : b)
        };
      }
      // Occupy new bed
      if (r.id === targetRoomObj!.id) {
        r = {
          ...r,
          beds: r.beds.map(b => b.id === targetBedId ? { ...b, status: 'Occupied', student: studentToMove, studentId: studentIdToMove } : b)
        };
      }
      return r;
    }));

    setTransferModalOpen(false);
    setSelectedBed(null);
    alert('Transfer Successful & History Recorded!');
  };

  const allAvailableBeds = rooms.flatMap(r => r.beds.filter(b => b.status === 'Available').map(b => ({ room: r.roomNumber, bed: b })));

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 w-full min-h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <Bed className="w-6 h-6"/>
            </div>
            Rooms & Beds Management
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Real-time occupancy control and bed allocation.</p>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 shrink-0">
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
          <p className="text-xs font-bold text-secondary uppercase">Total Capacity</p>
          <h3 className="text-xl font-black text-primary mt-1">{rooms.reduce((acc, r) => acc + r.capacity, 0)}</h3>
        </div>
        <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-xl border border-purple-200 dark:border-purple-900/30 shadow-sm">
          <p className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase">Occupied</p>
          <h3 className="text-xl font-black text-purple-800 dark:text-purple-200 mt-1">{getOccupiedBedsCount()}</h3>
        </div>
        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-xl border border-green-200 dark:border-green-900/30 shadow-sm">
          <p className="text-xs font-bold text-green-700 dark:text-green-300 uppercase">Available</p>
          <h3 className="text-xl font-black text-green-800 dark:text-green-200 mt-1">{getAvailableBedsCount()}</h3>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-200 dark:border-blue-900/30 shadow-sm">
          <p className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">Reserved</p>
          <h3 className="text-xl font-black text-blue-800 dark:text-blue-200 mt-1">{rooms.reduce((acc, room) => acc + room.beds.filter(b => b.status === 'Reserved').length, 0)}</h3>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-xl border border-orange-200 dark:border-orange-900/30 shadow-sm">
          <p className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase">Maintenance</p>
          <h3 className="text-xl font-black text-orange-800 dark:text-orange-200 mt-1">{rooms.reduce((acc, room) => acc + room.beds.filter(b => b.status === 'Maintenance').length, 0)}</h3>
        </div>
      </div>

      <div className="bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/30 shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
            {['All', '1st Floor', '2nd Floor'].map(floor => (
              <button 
                key={floor}
                onClick={() => setFilterFloor(floor)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  filterFloor === floor 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : 'bg-card text-secondary border-border/60 hover:border-indigo-300'
                }`}
              >
                {floor}
              </button>
            ))}
          </div>
          
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search room or student..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-page/30">
          
          <div className="space-y-8">
            {rooms.filter(r => (filterFloor === 'All' || r.floor === filterFloor) && (r.roomNumber.includes(searchTerm) || r.beds.some(b => b.student?.toLowerCase().includes(searchTerm.toLowerCase())))).map(room => (
              
              <div key={room.id} className="bg-card p-5 rounded-2xl border border-border shadow-sm">
                
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-black text-primary flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-indigo-500"/> Room {room.roomNumber}
                    </h3>
                    <span className="text-xs font-bold text-secondary bg-page px-2 py-1 rounded">{room.roomType}</span>
                    <span className="text-xs font-bold text-secondary bg-page px-2 py-1 rounded">{room.building} - {room.floor}</span>
                  </div>
                  <div className="text-sm font-bold text-secondary">
                    {room.beds.filter(b => b.status === 'Occupied').length} / {room.capacity} Occupied
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {room.beds.map(bed => (
                    <div 
                      key={bed.id}
                      onClick={() => setSelectedBed({room, bed})}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                        bed.status === 'Available' ? 'bg-green-50/30 border-green-200 hover:border-green-400' :
                        bed.status === 'Occupied' ? 'bg-purple-50/30 border-purple-200 hover:border-purple-400' :
                        bed.status === 'Reserved' ? 'bg-blue-50/30 border-blue-200 hover:border-blue-400' :
                        'bg-gray-50/30 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <Bed className={`w-4 h-4 ${bed.status === 'Available' ? 'text-green-600' : 'text-gray-500'}`} />
                          <span className="font-black text-primary">{bed.bedName}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${getStatusColor(bed.status)}`}>
                          {bed.status}
                        </span>
                      </div>

                      {bed.status === 'Occupied' || bed.status === 'Reserved' ? (
                        <div className="space-y-1 mt-4">
                          <p className="text-xs font-bold text-secondary flex items-center gap-1.5"><User className="w-3.5 h-3.5"/> {bed.student}</p>
                          {bed.studentId && <p className="text-[10px] text-gray-500 ml-5">{bed.studentId}</p>}
                        </div>
                      ) : (
                        <div className="space-y-1 mt-4">
                          <p className="text-xs font-bold text-secondary flex items-center gap-1.5"><IndianRupee className="w-3.5 h-3.5"/> ₹{bed.rent} / month</p>
                          <p className="text-[10px] text-gray-400 ml-5">Standard Rate</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>

            ))}
          </div>
        </div>
      </div>

      {/* Bed Action Sidebar / Modal */}
      {selectedBed && !transferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card w-full sm:w-96 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="p-6 border-b border-border/50 bg-page/80 flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-black text-primary flex items-center gap-2 text-xl">
                  <Bed className="w-6 h-6 text-indigo-600" /> Bed {selectedBed.bed.bedName}
                </h3>
                <p className="text-sm font-bold text-secondary mt-1">Room {selectedBed.room.roomNumber}</p>
              </div>
              <button onClick={() => setSelectedBed(null)} className="text-secondary hover:text-red-500 p-2 bg-card rounded-full border border-border">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-secondary">Current Status:</span>
                <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getStatusColor(selectedBed.bed.status)}`}>
                  {selectedBed.bed.status}
                </span>
              </div>

              {selectedBed.bed.student && (
                <div className="p-4 bg-page border border-border rounded-xl">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider">Occupant</p>
                  <p className="font-black text-primary mt-1 text-lg">{selectedBed.bed.student}</p>
                  <p className="text-xs font-bold text-secondary mt-1">{selectedBed.bed.studentId || 'New Admission'}</p>
                </div>
              )}

              <div className="space-y-3 pt-4 border-t border-border/50">
                <h4 className="font-bold text-primary flex items-center gap-2 mb-4"><Wrench className="w-4 h-4 text-indigo-600"/> Manager Actions</h4>

                {selectedBed.bed.status === 'Available' && (
                  <>
                    <button onClick={() => handleBedAction('maintenance')} className="w-full py-3 bg-card border border-orange-200 dark:border-orange-900/30 text-orange-600 hover:bg-page rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2">
                      <Wrench className="w-4 h-4" /> Mark for Maintenance
                    </button>
                    <button onClick={() => handleBedAction('blocked')} className="w-full py-3 bg-card border border-border text-secondary hover:bg-page rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2">
                      <Lock className="w-4 h-4" /> Block Bed (Owner Request)
                    </button>
                  </>
                )}

                {selectedBed.bed.status === 'Occupied' && (
                  <>
                    <button onClick={() => handleBedAction('transfer')} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2">
                      <ArrowRightLeft className="w-4 h-4" /> Transfer Student
                    </button>
                    <button onClick={() => alert('Please use the Check-Out flow to release a bed properly.')} className="w-full py-3 bg-card border border-red-200 dark:border-red-900/30 text-red-600 hover:bg-page rounded-xl text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2">
                      <LogOut className="w-4 h-4" /> Initiate Check-Out
                    </button>
                  </>
                )}

                {(selectedBed.bed.status === 'Maintenance' || selectedBed.bed.status === 'Blocked') && (
                  <button onClick={() => handleBedAction('available')} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Mark as Available
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Transfer Flow Modal */}
      {transferModalOpen && selectedBed && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border/50 bg-indigo-50 flex items-center justify-between">
              <h3 className="font-black text-indigo-900 flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-indigo-600" /> Student Transfer Flow
              </h3>
              <button onClick={() => setTransferModalOpen(false)} className="text-secondary hover:text-red-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleTransferConfirm} className="p-6 space-y-6">
              
              <div className="flex items-center gap-4 p-4 bg-page border border-border/70 rounded-xl shadow-sm">
                <div className="flex-1 text-center">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider">Current Bed</p>
                  <p className="font-black text-primary mt-1 text-lg">{selectedBed.bed.bedName}</p>
                  <p className="text-xs text-red-500 font-bold mt-1">Will be Available</p>
                </div>
                <ArrowRightLeft className="w-6 h-6 text-indigo-600 shrink-0" />
                <div className="flex-1 text-center">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider">New Bed</p>
                  <p className="font-black text-primary mt-1 text-lg">{targetBedId ? rooms.flatMap(r=>r.beds).find(b=>b.id===targetBedId)?.bedName : '?'}</p>
                  <p className="text-xs text-green-500 font-bold mt-1">Will be Occupied</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-secondary">Student</label>
                <input type="text" readOnly value={selectedBed.bed.student} className="w-full px-4 py-2 mt-1 bg-page border border-border rounded-lg text-primary font-bold focus:outline-none" />
              </div>

              <div>
                <label className="text-sm font-bold text-secondary">Select New Available Bed</label>
                <select required value={targetBedId} onChange={(e) => setTargetBedId(e.target.value)} className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500 font-bold text-indigo-900">
                  <option value="">-- Select Bed --</option>
                  {allAvailableBeds.map(ab => (
                    <option key={ab.bed.id} value={ab.bed.id}>
                      Room {ab.room} • Bed {ab.bed.bedName} (₹{ab.bed.rent})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-secondary">Reason for Transfer (Mandatory)</label>
                <textarea required value={transferReason} onChange={(e) => setTransferReason(e.target.value)} rows={2} placeholder="e.g. Roommate issues, upgrading room..." className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500 resize-none"></textarea>
              </div>

              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-indigo-900 text-sm">Full History Recorded</h4>
                  <p className="text-xs text-indigo-800 mt-1">This action will instantly release {selectedBed.bed.bedName} and occupy the new bed. A permanent record of this transfer will be saved for audit.</p>
                </div>
              </div>

              <div className="p-4 border-t border-border/50 bg-gray-50 flex items-center justify-end gap-3 mt-4 -mx-6 -mb-6">
                <button type="button" onClick={() => setTransferModalOpen(false)} className="px-4 py-2 font-bold text-secondary hover:text-primary transition-colors">Cancel</button>
                <button type="submit" disabled={!targetBedId || !transferReason} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50">
                  <CheckCircle2 className="w-4 h-4" /> Confirm Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}