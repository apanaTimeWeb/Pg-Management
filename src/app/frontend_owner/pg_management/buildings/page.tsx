// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { Building2, Layers, Plus, Edit3, Trash2, MapPin, Users, UserCheck, MoreVertical, Wifi, Droplets, Flame, MonitorPlay, Shirt, ChevronDown, ChevronUp, X, CheckCircle2 } from 'lucide-react';

const AMENITY_ICONS: any = {
  'WiFi': Wifi,
  'RO Water': Droplets,
  'Kitchen': Flame,
  'TV/Lounge': MonitorPlay,
  'Laundry': Shirt
};

const MOCK_BUILDINGS = [
  { 
    id: 'BLD-01', 
    name: 'Block A (Boys Hostel)', 
    address: 'Main Campus Road, Varanasi', 
    capacity: 150, 
    occupied: 140,
    manager: 'Amit Verma',
    isExpanded: true,
    floors: [
      { id: 'FL-A0', name: 'Ground Floor', capacity: 30, occupied: 30, amenities: ['WiFi', 'RO Water', 'TV/Lounge'] },
      { id: 'FL-A1', name: 'First Floor', capacity: 40, occupied: 38, amenities: ['WiFi', 'RO Water'] },
      { id: 'FL-A2', name: 'Second Floor', capacity: 40, occupied: 35, amenities: ['WiFi', 'RO Water', 'Laundry'] },
      { id: 'FL-A3', name: 'Third Floor', capacity: 40, occupied: 37, amenities: ['WiFi', 'RO Water'] },
    ]
  },
  { 
    id: 'BLD-02', 
    name: 'Block B (Girls Hostel)', 
    address: 'Lanka Branch, Near Gate', 
    capacity: 100, 
    occupied: 70,
    manager: 'Sneha Pandey',
    isExpanded: false,
    floors: [
      { id: 'FL-B0', name: 'Ground Floor', capacity: 50, occupied: 45, amenities: ['WiFi', 'RO Water', 'Kitchen', 'Laundry'] },
      { id: 'FL-B1', name: 'First Floor', capacity: 50, occupied: 25, amenities: ['WiFi', 'RO Water', 'TV/Lounge'] },
    ]
  }
];

export default function BuildingFloorManagementPage() {
  const [buildings, setBuildings] = useState(MOCK_BUILDINGS);
  const [isAddBuildingModalOpen, setIsAddBuildingModalOpen] = useState(false);
  const [isAddFloorModalOpen, setIsAddFloorModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);

  const toggleBuilding = (id: string) => {
    setBuildings(buildings.map(b => b.id === id ? { ...b, isExpanded: !b.isExpanded } : b));
  };

  const openAddFloor = (building: any) => {
    setSelectedBuilding(building);
    setIsAddFloorModalOpen(true);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Add Building Modal */}
      {isAddBuildingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-[#1A3A5C] text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#F5A623]" /> Add New Building
              </h2>
              <button onClick={() => setIsAddBuildingModalOpen(false)} className="p-1.5 hover:bg-card/10 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-5 bg-page/50">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Building / Block Name</label>
                <input type="text" placeholder="e.g. Block C" className="w-full px-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm font-bold text-secondary" />
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Address / Location Details</label>
                <textarea rows={2} placeholder="Full address of the property..." className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm resize-none"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Assign Primary Manager</label>
                <select className="w-full px-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-secondary">
                  <option>Amit Verma</option>
                  <option>Sneha Pandey</option>
                </select>
              </div>
            </div>
            
            <div className="p-5 border-t border-border/50 bg-card flex justify-end gap-3">
              <button onClick={() => setIsAddBuildingModalOpen(false)} className="px-6 py-2.5 bg-[var(--bg-overlay)] text-secondary rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => { alert('Building Added Successfully!'); setIsAddBuildingModalOpen(false); }} className="px-6 py-2.5 bg-[#1A3A5C] hover:bg-[#122a42] text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm">
                <CheckCircle2 className="w-4 h-4" /> Save Building
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Floor Modal */}
      {isAddFloorModalOpen && selectedBuilding && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-blue-50 text-blue-800">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" /> Add Floor to {selectedBuilding.name}
              </h2>
              <button onClick={() => setIsAddFloorModalOpen(false)} className="p-1.5 hover:bg-card rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-5 bg-card">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Floor Name / Label</label>
                <input type="text" placeholder="e.g. Fourth Floor or Basement" className="w-full px-4 py-2.5 bg-page border border-border rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-bold text-secondary" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Available Floor Amenities</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(AMENITY_ICONS).map(amenity => (
                    <label key={amenity} className="flex items-center gap-2 p-3 bg-page border border-border rounded-xl cursor-pointer hover:bg-[var(--bg-overlay)] transition-colors">
                      <input type="checkbox" className="w-4 h-4 rounded border-border text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm font-semibold text-secondary">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-border/50 bg-page flex justify-end gap-3">
              <button onClick={() => setIsAddFloorModalOpen(false)} className="px-6 py-2.5 bg-card border border-border text-secondary rounded-xl font-bold hover:bg-[var(--bg-overlay)] transition-colors">Cancel</button>
              <button onClick={() => { alert('Floor created!'); setIsAddFloorModalOpen(false); }} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm">
                <Plus className="w-4 h-4" /> Create Floor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Building2 className="w-7 h-7 text-[#F5A623]" />
            Building & Floor Management
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Define the architectural hierarchy of your properties, floors, and amenities.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => setIsAddBuildingModalOpen(true)} className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Building
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4 border-l-4 border-blue-500">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Building2 className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total Buildings</p>
            <h3 className="text-2xl font-black text-primary">2</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Layers className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total Floors</p>
            <h3 className="text-2xl font-black text-primary">6</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-[var(--bg-overlay)] text-secondary rounded-xl"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total Capacity</p>
            <h3 className="text-2xl font-black text-primary">250</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4 border-l-4 border-green-500">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><UserCheck className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Overall Occupied</p>
            <h3 className="text-2xl font-black text-green-600">210</h3>
          </div>
        </div>
      </div>

      {/* Building List / Accordions */}
      <div className="space-y-6">
        {buildings.map((building) => (
          <div key={building.id} className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden transition-all">
            
            {/* Building Header (Click to expand) */}
            <div className="p-5 bg-gradient-to-r from-gray-50 to-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleBuilding(building.id)}
                  className="w-10 h-10 bg-card border border-border rounded-xl flex items-center justify-center text-[var(--text-disabled)] hover:bg-page transition-colors shadow-sm"
                >
                  {building.isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                <div>
                  <h2 className="text-lg font-black text-primary flex items-center gap-2">
                    {building.name}
                  </h2>
                  <p className="text-sm font-semibold text-[var(--text-disabled)] mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {building.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 pl-14 md:pl-0">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Occupancy</span>
                  <span className="text-sm font-black text-primary"><span className="text-green-600">{building.occupied}</span> / {building.capacity}</span>
                </div>
                
                <div className="w-px h-8 bg-gray-200"></div>
                
                <div className="relative group">
                  <button className="p-2 text-[var(--text-disabled)] hover:text-primary hover:bg-[var(--bg-overlay)] rounded-xl transition-colors border border-transparent group-hover:border-border">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border/50 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden">
                    <button className="w-full text-left px-4 py-3 text-sm font-bold text-secondary hover:bg-page flex items-center gap-2 border-b border-gray-50"><Edit3 className="w-4 h-4 text-blue-500" /> Edit Building</button>
                    <button className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2 className="w-4 h-4" /> Archive / Delete</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Floors List */}
            {building.isExpanded && (
              <div className="p-5 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-500" /> Floor Directory
                  </h3>
                  <button onClick={() => openAddFloor(building)} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Add Floor
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {building.floors.map(floor => (
                    <div key={floor.id} className="bg-page border border-border rounded-xl p-4 hover:border-blue-300 transition-colors shadow-sm group">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-primary">{floor.name}</h4>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-card rounded transition-colors"><Edit3 className="w-3.5 h-3.5"/></button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center bg-card p-2 rounded-lg border border-border/50 mb-3">
                        <span className="text-xs font-bold text-[var(--text-disabled)]">Floor Capacity:</span>
                        <span className="text-sm font-black text-primary"><span className="text-green-600">{floor.occupied}</span> / {floor.capacity}</span>
                      </div>
                      
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Available Amenities</span>
                        <div className="flex flex-wrap gap-2">
                          {floor.amenities.map(amenity => {
                            const Icon = AMENITY_ICONS[amenity] || CheckCircle2;
                            return (
                              <span key={amenity} className="flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                                <Icon className="w-3 h-3" /> {amenity}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        ))}
      </div>

    </div>
  );
}
