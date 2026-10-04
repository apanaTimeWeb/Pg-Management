// @ts-nocheck
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, Plus, Edit3, Trash2, Search, Building2, MapPin, Users, CheckCircle2, ChevronDown, ChevronRight, LayoutGrid, Wifi, Droplets, Flame, MonitorPlay, Thermometer, Box, X } from 'lucide-react';

const MOCK_BUILDINGS = [
  { id: 'BLD-01', name: 'Block A (Boys Hostel)' },
  { id: 'BLD-02', name: 'Block B (Girls Hostel)' }
];

const MOCK_FLOORS = [
  {
    id: 'FL-A0',
    building: 'Block A (Boys Hostel)',
    name: 'Ground Floor',
    type: 'Standard',
    totalRooms: 12,
    capacity: 30,
    occupied: 30,
    amenities: ['WiFi', 'RO Water', 'TV Lounge'],
    manager: 'Ramesh Singh',
    status: 'Full'
  },
  {
    id: 'FL-A1',
    building: 'Block A (Boys Hostel)',
    name: 'First Floor',
    type: 'Premium',
    totalRooms: 15,
    capacity: 40,
    occupied: 38,
    amenities: ['WiFi', 'AC', 'RO Water'],
    manager: 'Ramesh Singh',
    status: 'Available'
  },
  {
    id: 'FL-A2',
    building: 'Block A (Boys Hostel)',
    name: 'Second Floor',
    type: 'Standard',
    totalRooms: 15,
    capacity: 40,
    occupied: 35,
    amenities: ['WiFi', 'RO Water', 'Laundry'],
    manager: 'Ramesh Singh',
    status: 'Available'
  },
  {
    id: 'FL-B0',
    building: 'Block B (Girls Hostel)',
    name: 'Ground Floor',
    type: 'Premium',
    totalRooms: 20,
    capacity: 50,
    occupied: 45,
    amenities: ['WiFi', 'AC', 'RO Water', 'Kitchen'],
    manager: 'Sneha Pandey',
    status: 'Available'
  }
];

export default function FloorManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredFloors = MOCK_FLOORS.filter(f => 
    (selectedBuilding === 'All' || f.building === selectedBuilding) &&
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-6">
      
      {/* Add Floor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-[#1A3A5C] text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#F5A623]" /> Add New Floor
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-5 bg-page/50">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Select Building</label>
                <select className="w-full px-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-secondary">
                  {MOCK_BUILDINGS.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Floor Name</label>
                <input type="text" placeholder="e.g. Third Floor" className="w-full px-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm font-bold text-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Total Rooms</label>
                  <input type="number" placeholder="10" className="w-full px-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Floor Type</label>
                  <select className="w-full px-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-secondary">
                    <option>Standard</option>
                    <option>Premium</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-border/50 bg-card flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 bg-[var(--bg-overlay)] text-secondary rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => { alert('Floor Added Successfully!'); setIsAddModalOpen(false); }} className="px-6 py-2.5 bg-[#1A3A5C] hover:bg-[#122a42] text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm">
                <CheckCircle2 className="w-4 h-4" /> Save Floor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Layers className="w-7 h-7 text-[#F5A623]" />
            Floor Management
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage floors, rooms capacity, and amenities across buildings.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Add New Floor
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl"><Layers className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-[var(--text-disabled)] uppercase">Total Floors</p>
            <h3 className="text-2xl font-black text-primary">12</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 text-purple-600 rounded-xl"><LayoutGrid className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-[var(--text-disabled)] uppercase">Total Rooms</p>
            <h3 className="text-2xl font-black text-primary">154</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 text-orange-600 rounded-xl"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-[var(--text-disabled)] uppercase">Total Capacity</p>
            <h3 className="text-2xl font-black text-primary">380</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4 border-l-4 border-green-500">
          <div className="p-3 bg-green-500/10 text-green-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-[var(--text-disabled)] uppercase">Available Beds</p>
            <h3 className="text-2xl font-black text-green-600">32</h3>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-2xl border border-border/50 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 items-center w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-disabled)]" />
            <input 
              type="text" 
              placeholder="Search floors..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-page border border-border/50 rounded-xl text-sm focus:outline-none focus:border-[#F5A623] text-primary"
            />
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <select 
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
            className="px-4 py-2 bg-page border border-border/50 rounded-xl text-sm font-semibold text-primary focus:outline-none focus:border-[#F5A623] flex-1 md:w-48"
          >
            <option value="All">All Buildings</option>
            {MOCK_BUILDINGS.map(b => (
              <option key={b.id} value={b.name}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFloors.map((floor) => (
          <div key={floor.id} className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden group hover:border-[#1A3A5C]/30 transition-all duration-300">
            <div className="p-5 border-b border-border/50 bg-gradient-to-r from-page to-transparent flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-primary">{floor.name}</h3>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${floor.status === 'Full' ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-600'}`}>
                    {floor.status}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary">
                  <Building2 className="w-3.5 h-3.5" />
                  {floor.building}
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-secondary hover:text-blue-600 hover:bg-blue-500/10 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                <button className="p-1.5 text-secondary hover:text-red-600 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary font-medium">Floor Type</span>
                <span className="font-bold text-primary">{floor.type}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
                <div className="bg-page p-3 rounded-xl border border-border/50">
                  <p className="text-[10px] font-bold text-[var(--text-disabled)] uppercase mb-1">Rooms</p>
                  <p className="font-black text-lg text-primary">{floor.totalRooms}</p>
                </div>
                <div className="bg-page p-3 rounded-xl border border-border/50">
                  <p className="text-[10px] font-bold text-[var(--text-disabled)] uppercase mb-1">Occupancy</p>
                  <p className="font-black text-lg text-primary">{floor.occupied} <span className="text-xs text-secondary font-medium">/ {floor.capacity}</span></p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-[var(--text-disabled)] uppercase mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {floor.amenities.map(amenity => (
                    <span key={amenity} className="px-2.5 py-1 bg-page border border-border/50 rounded-lg text-xs font-medium text-secondary flex items-center gap-1.5">
                      {amenity === 'WiFi' && <Wifi className="w-3 h-3" />}
                      {amenity === 'AC' && <Thermometer className="w-3 h-3" />}
                      {amenity === 'RO Water' && <Droplets className="w-3 h-3" />}
                      {amenity === 'Kitchen' && <Flame className="w-3 h-3" />}
                      {amenity === 'Laundry' && <Box className="w-3 h-3" />}
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-border/50 bg-page flex items-center justify-between">
               <div className="flex items-center gap-2 text-xs font-semibold text-secondary">
                 <Users className="w-4 h-4" />
                 Warden: <span className="text-primary">{floor.manager}</span>
               </div>
               <Link href="/frontend_owner/rooms_beds/rooms" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">View Rooms <ChevronRight className="w-3 h-3" /></Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
