// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { Bed, Users, MapPin, Search, Plus, Building2, Settings, CheckCircle2, AlertTriangle, Lock, Clock, ArrowRightLeft, Wallet, UserCheck, LayoutGrid, List, X, ShieldCheck } from 'lucide-react';

const MOCK_ROOMS = [
  { id: 'RM-101', number: '101', building: 'PG Varanasi Main', floor: '1st Floor', type: 'Double', capacity: 2, occupied: 1, baseRent: 8000, status: 'Active', 
    beds: [
      { id: '101-A', status: 'Occupied', student: 'Aman Singh', joinDate: '01 Jan 2026', rent: 8000 },
      { id: '101-B', status: 'Available', student: null, joinDate: null, rent: 8000 }
    ]
  },
  { id: 'RM-102', number: '102', building: 'PG Varanasi Main', floor: '1st Floor', type: 'Triple', capacity: 3, occupied: 3, baseRent: 7000, status: 'Active',
    beds: [
      { id: '102-A', status: 'Occupied', student: 'Rahul Sharma', joinDate: '15 Mar 2026', rent: 7000 },
      { id: '102-B', status: 'Occupied', student: 'Amit Verma', joinDate: '10 Feb 2026', rent: 7000 },
      { id: '102-C', status: 'Occupied', student: 'Suresh Kumar', joinDate: '20 Jan 2026', rent: 7000 }
    ]
  },
  { id: 'RM-201', number: '201', building: 'PG Lanka Branch', floor: '2nd Floor', type: 'Single', capacity: 1, occupied: 0, baseRent: 12000, status: 'Active',
    beds: [
      { id: '201-A', status: 'Maintenance', student: null, joinDate: null, rent: 12000 }
    ]
  },
  { id: 'RM-202', number: '202', building: 'PG Lanka Branch', floor: '2nd Floor', type: 'Double', capacity: 2, occupied: 0, baseRent: 9000, status: 'Active',
    beds: [
      { id: '202-A', status: 'Reserved', student: 'Neha Gupta', joinDate: '05 Nov 2026', rent: 9000 },
      { id: '202-B', status: 'Blocked', student: null, joinDate: null, rent: 9000 }
    ]
  },
];

export default function RoomsBedsPage() {
  const [rooms, setRooms] = useState(MOCK_ROOMS);
  const [viewMode, setViewMode] = useState<'matrix' | 'list'>('matrix');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState<any>(null);

  const openAllocateModal = (bed: any, room: any) => {
    if (bed.status === 'Available' || bed.status === 'Reserved') {
      setSelectedBed({ ...bed, roomNo: room.number, type: room.type, building: room.building });
      setIsAllocateModalOpen(true);
    }
  };

  const getBedStatusStyle = (status: string) => {
    switch(status) {
      case 'Available': return 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 shadow-[0_4px_0_0_rgb(187,247,208)] hover:shadow-[0_2px_0_0_rgb(187,247,208)] hover:translate-y-[2px]';
      case 'Occupied': return 'bg-blue-50 border-blue-200 text-blue-700 shadow-[0_4px_0_0_rgb(191,219,254)] cursor-default';
      case 'Reserved': return 'bg-yellow-50 border-yellow-200 text-yellow-700 shadow-[0_4px_0_0_rgb(254,240,138)] hover:bg-yellow-100 hover:translate-y-[2px] hover:shadow-[0_2px_0_0_rgb(254,240,138)]';
      case 'Maintenance': return 'bg-orange-50 border-orange-200 text-orange-700 shadow-[0_4px_0_0_rgb(254,215,170)] cursor-not-allowed opacity-80';
      case 'Blocked': return 'bg-red-50 border-red-200 text-red-700 shadow-[0_4px_0_0_rgb(254,202,202)] cursor-not-allowed opacity-80';
      default: return 'bg-page border-border text-secondary';
    }
  };

  const getBedIcon = (status: string) => {
    switch(status) {
      case 'Available': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'Occupied': return <UserCheck className="w-4 h-4 text-blue-600" />;
      case 'Reserved': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Maintenance': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'Blocked': return <Lock className="w-4 h-4 text-red-600" />;
      default: return <Bed className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Allocation / Action Modal */}
      {isAllocateModalOpen && selectedBed && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-[#1A3A5C] text-white shrink-0">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Bed className="w-5 h-5 text-[#F5A623]" /> Bed Allocation Flow
              </h2>
              <button onClick={() => setIsAllocateModalOpen(false)} className="p-1.5 hover:bg-card/10 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto bg-page/50">
              
              {/* Context Header */}
              <div className="bg-card p-4 border border-border rounded-xl shadow-sm flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-primary text-lg flex items-center gap-2">
                    Room {selectedBed.roomNo} <span className="bg-[var(--bg-overlay)] text-[var(--text-disabled)] text-xs px-2 py-0.5 rounded font-bold border border-border">{selectedBed.id}</span>
                  </h3>
                  <p className="text-sm font-semibold text-[var(--text-disabled)] mt-1 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5"/> {selectedBed.building} <span className="text-gray-300">•</span> {selectedBed.type} Type
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Base Rent</p>
                  <h3 className="text-2xl font-black text-primary">₹{selectedBed.rent}</h3>
                </div>
              </div>

              {/* Step Flow Engine */}
              <div className="space-y-5 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-200 before:to-gray-200">
                
                {/* Step 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-500 text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"><UserCheck className="w-4 h-4"/></div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-4 rounded-xl border border-blue-200 shadow-sm ml-4 md:ml-0">
                    <label className="block text-xs font-bold text-secondary uppercase mb-2">1. Select Student</label>
                    <select className="w-full px-3 py-2 bg-page border border-border rounded-lg text-sm font-bold focus:outline-none focus:border-blue-500">
                      <option>-- Select from Admitted Students --</option>
                      <option>Suresh Kumar (App ID: 1001)</option>
                    </select>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-green-500 text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"><Wallet className="w-4 h-4"/></div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-4 rounded-xl border border-border shadow-sm ml-4 md:ml-0">
                    <label className="block text-xs font-bold text-secondary uppercase mb-2">2. Negotiated Rent & Deposit</label>
                    <div className="space-y-2">
                      <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-disabled)] text-xs font-bold">Rent ₹</span><input type="number" defaultValue={selectedBed.rent} className="w-full pl-12 pr-2 py-1.5 bg-page border border-border rounded-lg text-sm font-bold outline-none focus:border-green-500" /></div>
                      <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-disabled)] text-xs font-bold">Dep. ₹</span><input type="number" defaultValue={10000} className="w-full pl-12 pr-2 py-1.5 bg-page border border-border rounded-lg text-sm font-bold outline-none focus:border-green-500" /></div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#F5A623] text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"><ShieldCheck className="w-4 h-4"/></div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-4 rounded-xl border border-border shadow-sm ml-4 md:ml-0 text-center">
                    <p className="text-sm font-bold text-primary">3. Final Allocation</p>
                    <p className="text-xs text-[var(--text-disabled)] mt-1 mb-3">Locks the bed and generates the master ledger.</p>
                    <button onClick={() => { 
                      setRooms(prevRooms => prevRooms.map(room => {
                        if (room.number === selectedBed.roomNo) {
                          return {
                            ...room,
                            occupied: room.occupied + 1,
                            beds: room.beds.map(bed => {
                              if (bed.id === selectedBed.id) {
                                return { ...bed, status: 'Occupied', student: 'New Student' };
                              }
                              return bed;
                            })
                          };
                        }
                        return room;
                      }));
                      setIsAllocateModalOpen(false); 
                    }} className="w-full py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-lg text-sm font-bold transition-colors">Confirm Allocation</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Room Modal */}
      {isAddRoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-[#1A3A5C] text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#F5A623]" /> Add New Room
              </h2>
              <button onClick={() => setIsAddRoomModalOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-5 bg-page/50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Room Number</label>
                  <input type="text" placeholder="e.g. 301" className="w-full px-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm font-bold text-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Room Type</label>
                  <select className="w-full px-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-secondary">
                    <option>Single</option>
                    <option>Double</option>
                    <option>Triple</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Building</label>
                  <select className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-secondary">
                    <option>PG Varanasi Main</option>
                    <option>PG Lanka Branch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Base Rent (₹)</label>
                  <input type="number" placeholder="8000" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-primary" />
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-border/50 bg-card flex justify-end gap-3">
              <button onClick={() => setIsAddRoomModalOpen(false)} className="px-6 py-2.5 bg-[var(--bg-overlay)] text-secondary rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => { 
                setRooms([...rooms, {
                  id: `RM-301`,
                  number: '301',
                  building: 'PG Varanasi Main',
                  floor: '3rd Floor',
                  type: 'Double',
                  capacity: 2,
                  occupied: 0,
                  baseRent: 8000,
                  status: 'Active',
                  beds: [
                    { id: '301-A', status: 'Available', student: null, joinDate: null, rent: 8000 },
                    { id: '301-B', status: 'Available', student: null, joinDate: null, rent: 8000 }
                  ]
                }]);
                setIsAddRoomModalOpen(false); 
              }} className="px-6 py-2.5 bg-[#1A3A5C] hover:bg-[#122a42] text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm">
                <CheckCircle2 className="w-4 h-4" /> Save Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Bed className="w-7 h-7 text-[#F5A623]" />
            Room & Bed Management
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Core real-estate matrix. Allocate beds, manage room capacities, and track maintenance.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => setIsAddRoomModalOpen(true)} className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#e09612] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Room / Beds
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Building2 className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total Bed Capacity</p>
            <h3 className="text-2xl font-black text-primary">250</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4 border-l-4 border-green-500">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><UserCheck className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Occupied Beds</p>
            <h3 className="text-2xl font-black text-green-600">210</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Available Beds</p>
            <h3 className="text-2xl font-black text-primary">35</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4 border-l-4 border-orange-400">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><AlertTriangle className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Under Maintenance</p>
            <h3 className="text-xl font-black text-orange-600">5</h3>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Top Bar: View Modes & Filters */}
        <div className="p-4 border-b border-border/50 bg-page/50 flex flex-col lg:flex-row justify-between gap-4 shrink-0">
          <div className="flex bg-[var(--bg-overlay)] p-1 rounded-xl w-full md:w-max">
            <button 
              onClick={() => setViewMode('matrix')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'matrix' ? 'bg-card text-[#F5A623] shadow-sm' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
            >
              <LayoutGrid className="w-4 h-4" /> Bed Matrix View
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-card text-[#F5A623] shadow-sm' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
            >
              <List className="w-4 h-4" /> Room Directory
            </button>
          </div>
          
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search room or building..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] bg-card"
            />
          </div>
        </div>

        {/* Legend for Matrix */}
        {viewMode === 'matrix' && (
          <div className="px-6 py-3 border-b border-border/50 flex flex-wrap gap-4 text-xs font-bold text-secondary bg-page/30">
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-green-200 rounded border border-green-300"></div> Available</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-blue-200 rounded border border-blue-300"></div> Occupied</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-yellow-200 rounded border border-yellow-300"></div> Reserved</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-orange-200 rounded border border-orange-300"></div> Maintenance</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-red-200 rounded border border-red-300"></div> Blocked</span>
          </div>
        )}

        <div className="flex-1 p-6 overflow-y-auto bg-page/30">
          
          {/* BED MATRIX VIEW */}
          {viewMode === 'matrix' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {rooms.filter(r => r.number.includes(searchTerm) || r.building.toLowerCase().includes(searchTerm.toLowerCase())).map((room) => (
                <div key={room.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:border-[#F5A623]/30 transition-colors">
                  
                  {/* Room Header */}
                  <div className="p-4 border-b border-border/50 flex justify-between items-center bg-page">
                    <div>
                      <h3 className="font-black text-primary text-lg flex items-center gap-2">Room {room.number}</h3>
                      <p className="text-xs font-semibold text-[var(--text-disabled)] flex items-center gap-1 mt-0.5"><Building2 className="w-3.5 h-3.5"/> {room.building} ({room.floor})</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold px-2 py-1 rounded-md mb-1 inline-block">{room.type}</span>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">{room.occupied}/{room.capacity} Occupied</p>
                    </div>
                  </div>
                  
                  {/* Beds Container */}
                  <div className="p-4 grid grid-cols-2 gap-4">
                    {room.beds.map((bed) => (
                      <div 
                        key={bed.id}
                        onClick={() => openAllocateModal(bed, room)}
                        className={`border rounded-xl p-3 flex flex-col items-center justify-center gap-2 transition-all relative ${getBedStatusStyle(bed.status)} ${bed.status === 'Available' || bed.status === 'Reserved' ? 'cursor-pointer' : ''}`}
                      >
                        <span className="absolute top-2 left-2 text-[10px] font-black opacity-50">{bed.id.split('-')[1]}</span>
                        <div className="p-2 bg-card/50 rounded-full mt-2">
                          {getBedIcon(bed.status)}
                        </div>
                        <div className="text-center w-full">
                          <p className="text-[10px] font-black uppercase tracking-wider">{bed.status}</p>
                          {bed.student && <p className="text-xs font-bold mt-1 truncate px-1" title={bed.student}>{bed.student}</p>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Room Actions Footer */}
                  <div className="bg-page p-3 border-t border-border/50 flex justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip-trigger" title="Transfer Beds"><ArrowRightLeft className="w-4 h-4"/></button>
                    <button className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors tooltip-trigger" title="Mark Maintenance"><AlertTriangle className="w-4 h-4"/></button>
                    <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-200 rounded-lg transition-colors tooltip-trigger" title="Room Settings"><Settings className="w-4 h-4"/></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ROOM DIRECTORY LIST VIEW */}
          {viewMode === 'list' && (
            <div className="bg-card border border-border rounded-xl overflow-x-auto shadow-sm">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-page border-b border-border/50 text-[var(--text-disabled)] text-xs uppercase tracking-wider font-bold">
                    <th className="p-4 w-24 text-center">Room</th>
                    <th className="p-4">Property & Floor</th>
                    <th className="p-4">Type & Capacity</th>
                    <th className="p-4">Base Rent</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rooms.filter(r => r.number.includes(searchTerm) || r.building.toLowerCase().includes(searchTerm.toLowerCase())).map((room) => (
                    <tr key={room.id} className="hover:bg-page/50 transition-colors">
                      <td className="p-4 text-center"><span className="w-12 h-12 rounded-xl bg-[var(--bg-overlay)] border border-border flex items-center justify-center font-black text-primary mx-auto text-lg">{room.number}</span></td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-primary text-sm flex items-center gap-1.5"><Building2 className="w-4 h-4 text-blue-500"/> {room.building}</span>
                          <span className="text-xs font-semibold text-[var(--text-disabled)]">{room.floor}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1.5">
                          <span className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold px-2 py-0.5 rounded-md w-max">{room.type}</span>
                          <span className="text-xs font-bold text-secondary">Occupied: {room.occupied} / {room.capacity}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-black text-primary text-base">₹{room.baseRent}/mo</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="px-2.5 py-1 bg-green-100 text-green-700 border border-green-200 rounded-lg text-[10px] font-bold uppercase tracking-wider mx-auto w-max flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Active</span>
                      </td>
                      <td className="p-4 text-center">
                        <button className="text-xs font-bold text-[#F5A623] hover:underline flex items-center gap-1 justify-center mx-auto"><Settings className="w-3.5 h-3.5"/> Manage Room</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
