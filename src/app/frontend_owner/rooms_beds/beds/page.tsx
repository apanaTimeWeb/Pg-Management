// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, FileText, Download, Eye, Edit3, Trash2, Bed, MapPin, User } from 'lucide-react';

const MOCK_BEDS = [
  { id: '101-A', room: '101', building: 'PG Varanasi Main', type: 'Double', rent: 8000, occupant: 'Aman Singh', status: 'Occupied' },
  { id: '101-B', room: '101', building: 'PG Varanasi Main', type: 'Double', rent: 8000, occupant: '-', status: 'Available' },
  { id: '201-A', room: '201', building: 'PG Lanka Branch', type: 'Single', rent: 12000, occupant: '-', status: 'Maintenance' },
  { id: '202-A', room: '202', building: 'PG Lanka Branch', type: 'Double', rent: 9000, occupant: 'Neha Gupta', status: 'Reserved' },
  { id: '304-B', room: '304', building: 'PG Varanasi Main', type: 'Triple', rent: 7000, occupant: 'Rahul Sharma', status: 'Occupied' },
];

export default function BedsPage() {
  const [beds, setBeds] = useState(MOCK_BEDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredBeds = beds.filter(bed => {
    if (statusFilter !== 'All' && bed.status !== statusFilter) return false;
    if (searchTerm && !bed.id.toLowerCase().includes(searchTerm.toLowerCase()) && !bed.room.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'Available') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'Occupied') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (status === 'Maintenance') return 'bg-orange-100 text-orange-700 border-orange-200';
    if (status === 'Reserved') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><Bed className="w-6 h-6 text-[#F5A623]"/> Beds</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage and track bed allocation and availability.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card hover:bg-page border border-border text-primary px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Bed
          </button>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-[#1A3A5C] text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#F5A623]" /> Add New Bed
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">X</button>
            </div>
            <div className="p-6 space-y-4 bg-page/50">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Room Number</label>
                <input type="text" placeholder="e.g. 102" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Bed Label</label>
                <input type="text" placeholder="e.g. 102-C" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold" />
              </div>
            </div>
            <div className="p-5 border-t border-border/50 bg-card flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-5 py-2 bg-[var(--bg-overlay)] text-secondary rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => { 
                setBeds([...beds, {
                  id: 'NEW-BED', room: '100', building: 'Main', type: 'Single', rent: 8000, occupant: '-', status: 'Available'
                }]);
                setIsAddModalOpen(false); 
              }} className="px-5 py-2 bg-[#1A3A5C] text-white rounded-xl font-bold">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Card */}
      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search beds or rooms..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] text-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-input border border-border rounded-xl text-sm font-semibold text-secondary focus:outline-none focus:border-[#F5A623]"
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Reserved">Reserved</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-page/30 text-[10px] uppercase tracking-wider text-secondary">
                <th className="p-4 font-bold">Bed ID / Room</th>
                <th className="p-4 font-bold">Location</th>
                <th className="p-4 font-bold">Occupant</th>
                <th className="p-4 font-bold">Monthly Rent</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredBeds.map((bed, idx) => (
                <tr key={idx} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary">{bed.id}</p>
                    <p className="text-xs font-semibold text-secondary flex items-center gap-1 mt-0.5"><Bed className="w-3 h-3"/> Room {bed.room} ({bed.type})</p>
                  </td>
                  <td className="p-4 text-sm text-secondary font-medium">
                    <p className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#F5A623]"/> {bed.building}</p>
                  </td>
                  <td className="p-4 text-sm font-bold text-primary">
                    {bed.occupant !== '-' ? <p className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-blue-500"/> {bed.occupant}</p> : <span className="text-secondary font-medium">--</span>}
                  </td>
                  <td className="p-4 text-sm font-bold text-primary">₹{bed.rent}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 border rounded-md text-[10px] font-bold uppercase tracking-wide ${getStatusBadge(bed.status)}`}>
                      {bed.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-secondary hover:text-blue-600 bg-page rounded-lg border border-border"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-secondary hover:text-orange-600 bg-page rounded-lg border border-border"><Edit3 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBeds.length === 0 && (
                <tr><td colSpan="6" className="p-8 text-center text-secondary font-medium">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}
