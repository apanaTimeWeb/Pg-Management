// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { Building, MapPin, Users, Plus, MoreVertical, Settings, CheckCircle2, AlertTriangle, Building2, Bed, Phone, Mail, Globe, Map, FileText, X, ShieldCheck, UploadCloud } from 'lucide-react';

const MOCK_PROPERTIES = [
  {
    id: 'PG-001',
    code: 'PGVNS-MAIN',
    name: 'PG Varanasi Main Campus',
    type: 'Boys Hostel',
    address: '123 University Road, Lanka',
    city: 'Varanasi',
    state: 'UP',
    manager: 'Amit Verma',
    contact: '+91 9876543210',
    totalBeds: 150,
    occupied: 140,
    status: 'Active',
    buildings: 1
  },
  {
    id: 'PG-002',
    code: 'PGVNS-GIRLS',
    name: 'PG Lanka Branch (Girls)',
    type: 'Girls Hostel',
    address: '45 Assi Ghat Road',
    city: 'Varanasi',
    state: 'UP',
    manager: 'Sneha Pandey',
    contact: '+91 9123456789',
    totalBeds: 100,
    occupied: 70,
    status: 'Active',
    buildings: 1
  },
  {
    id: 'PG-003',
    code: 'PGALD-MAIN',
    name: 'PG Prayagraj Civil Lines',
    type: 'Co-living',
    address: 'Civil Lines, Near Station',
    city: 'Prayagraj',
    state: 'UP',
    manager: 'Rajesh Kumar',
    contact: '+91 9988776655',
    totalBeds: 200,
    occupied: 190,
    status: 'Maintenance',
    buildings: 2
  }
];

export default function PropertyManagementPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addStep, setAddStep] = useState(1);

  const getStatusBadge = (status: string) => {
    if (status === 'Active') return <span className="px-2.5 py-1 bg-green-100 text-green-700 border border-green-200 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max"><CheckCircle2 className="w-3 h-3"/> Active</span>;
    if (status === 'Maintenance') return <span className="px-2.5 py-1 bg-orange-100 text-orange-700 border border-orange-200 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max"><AlertTriangle className="w-3 h-3"/> Maintenance</span>;
    return <span className="px-2.5 py-1 bg-red-100 text-red-700 border border-red-200 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max">Suspended</span>;
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Add Property Multi-step Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-gradient-to-r from-[#1A3A5C] to-[#2a5a8c] text-white shrink-0">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Building className="w-5 h-5 text-[#F5A623]" /> Register New Property / PG
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 hover:bg-card/10 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            {/* Stepper Header */}
            <div className="bg-page border-b border-border/50 p-4 shrink-0">
              <div className="flex items-center max-w-2xl mx-auto">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${addStep >= 1 ? 'bg-[#1A3A5C] text-white' : 'bg-gray-200 text-[var(--text-disabled)]'}`}>1</div>
                  <span className={`text-[10px] font-bold uppercase mt-2 ${addStep >= 1 ? 'text-[#1A3A5C]' : 'text-gray-400'}`}>Basic Info</span>
                </div>
                <div className={`h-1 flex-1 ${addStep >= 2 ? 'bg-[#1A3A5C]' : 'bg-gray-200'}`}></div>
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${addStep >= 2 ? 'bg-[#1A3A5C] text-white' : 'bg-gray-200 text-[var(--text-disabled)]'}`}>2</div>
                  <span className={`text-[10px] font-bold uppercase mt-2 ${addStep >= 2 ? 'text-[#1A3A5C]' : 'text-gray-400'}`}>Location</span>
                </div>
                <div className={`h-1 flex-1 ${addStep >= 3 ? 'bg-[#1A3A5C]' : 'bg-gray-200'}`}></div>
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${addStep >= 3 ? 'bg-[#1A3A5C] text-white' : 'bg-gray-200 text-[var(--text-disabled)]'}`}>3</div>
                  <span className={`text-[10px] font-bold uppercase mt-2 ${addStep >= 3 ? 'text-[#1A3A5C]' : 'text-gray-400'}`}>Details & Infra</span>
                </div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto bg-card flex-1">
              
              {addStep === 1 && (
                <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-secondary uppercase mb-2">PG / Property Name</label>
                      <input type="text" placeholder="e.g. Sunrise Premium PG" className="w-full px-4 py-3 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] font-bold text-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase mb-2">Property Code (Unique)</label>
                      <input type="text" placeholder="e.g. SUN-01" className="w-full px-4 py-3 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] font-bold text-primary uppercase" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase mb-2">Property Type</label>
                      <select className="w-full px-4 py-3 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] font-bold text-primary">
                        <option>Boys Hostel</option>
                        <option>Girls Hostel</option>
                        <option>Co-living</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase mb-2">Official Email</label>
                      <input type="email" placeholder="contact@sunrisepg.com" className="w-full px-4 py-3 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] font-bold text-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase mb-2">Support Contact</label>
                      <input type="tel" placeholder="+91 0000000000" className="w-full px-4 py-3 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] font-bold text-primary" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-secondary uppercase mb-2">Property Logo (Optional)</label>
                      <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-[var(--text-disabled)] hover:bg-page hover:border-blue-400 cursor-pointer transition-colors">
                        <UploadCloud className="w-8 h-8 mb-2 text-blue-500" />
                        <span className="text-sm font-bold">Click to upload logo</span>
                        <span className="text-xs">PNG, JPG up to 2MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {addStep === 2 && (
                <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in right-to-left">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-secondary uppercase mb-2">Complete Address</label>
                      <textarea rows={3} placeholder="Street, landmark, etc..." className="w-full px-4 py-3 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] font-bold text-primary resize-none"></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase mb-2">City</label>
                      <input type="text" placeholder="e.g. Varanasi" className="w-full px-4 py-3 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] font-bold text-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase mb-2">State</label>
                      <input type="text" placeholder="e.g. Uttar Pradesh" className="w-full px-4 py-3 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] font-bold text-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase mb-2">Pincode</label>
                      <input type="text" placeholder="e.g. 221005" className="w-full px-4 py-3 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] font-bold text-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase mb-2">Website / Maps Link</label>
                      <input type="url" placeholder="https://" className="w-full px-4 py-3 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] font-bold text-primary" />
                    </div>
                  </div>
                </div>
              )}

              {addStep === 3 && (
                <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in right-to-left">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2 bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-blue-800">Infrastructure Setup</h4>
                        <p className="text-xs text-blue-600 mt-1">This will initialize the property. You can add specific rooms and beds later from the Room Management module.</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase mb-2">Number of Buildings/Blocks</label>
                      <input type="number" defaultValue={1} min={1} className="w-full px-4 py-3 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] font-bold text-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase mb-2">Estimated Total Beds</label>
                      <input type="number" placeholder="e.g. 150" className="w-full px-4 py-3 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] font-bold text-primary" />
                    </div>
                    
                    <div className="col-span-2 mt-2">
                      <label className="block text-xs font-bold text-secondary uppercase mb-2">Property Amenities (Select all that apply)</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {['High-Speed WiFi', 'RO Water', 'In-house Kitchen', 'Laundry Service', 'AC Rooms', 'Power Backup', 'CCTV Security', 'Parking'].map(item => (
                          <label key={item} className="flex items-center gap-2 p-2 bg-page border border-border rounded-lg cursor-pointer hover:bg-[var(--bg-overlay)]">
                            <input type="checkbox" className="w-4 h-4 rounded border-border text-[#1A3A5C] focus:ring-[#1A3A5C]" />
                            <span className="text-xs font-bold text-secondary">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
            
            <div className="p-5 border-t border-border/50 bg-page flex justify-between shrink-0">
              <button 
                onClick={() => addStep > 1 ? setAddStep(addStep - 1) : setIsAddModalOpen(false)} 
                className="px-6 py-2.5 bg-card border border-border text-secondary rounded-xl font-bold hover:bg-[var(--bg-overlay)] transition-colors"
              >
                {addStep > 1 ? 'Back' : 'Cancel'}
              </button>
              
              {addStep < 3 ? (
                <button 
                  onClick={() => setAddStep(addStep + 1)} 
                  className="px-6 py-2.5 bg-[#1A3A5C] hover:bg-[#122a42] text-white rounded-xl font-bold transition-colors shadow-sm"
                >
                  Next Step
                </button>
              ) : (
                <button 
                  onClick={() => { alert('New Property Created! Switch to this property from the top-left dropdown to manage it.'); setIsAddModalOpen(false); setAddStep(1); }} 
                  className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" /> Finalize Registration
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Building className="w-7 h-7 text-[#F5A623]" />
            Property Portfolio Management
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage multiple branches, add new PGs, and monitor global occupancy.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#e09612] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Register New Property
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4 border-l-4 border-[#1A3A5C]">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Building className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total Properties</p>
            <h3 className="text-2xl font-black text-primary">3</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Bed className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total Beds (Global)</p>
            <h3 className="text-2xl font-black text-primary">450</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4 border-l-4 border-green-500">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Overall Occupancy</p>
            <h3 className="text-2xl font-black text-green-600">400</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-[var(--bg-overlay)] text-secondary rounded-xl"><Building2 className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total Buildings</p>
            <h3 className="text-2xl font-black text-primary">4</h3>
          </div>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {MOCK_PROPERTIES.map(property => (
          <div key={property.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:border-[#1A3A5C]/30 transition-colors flex flex-col">
            
            {/* Header */}
            <div className="p-5 border-b border-border/50 bg-page flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1A3A5C] to-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-inner border border-blue-800">
                  {property.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-black text-primary flex items-center gap-2">
                    {property.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">{property.code}</span>
                    <span className="text-xs font-semibold text-[var(--text-disabled)] flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {property.city}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {getStatusBadge(property.status)}
                
                <div className="relative group mt-1">
                  <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-200 rounded-xl transition-colors border border-transparent group-hover:border-border">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-40 bg-card border border-border/50 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden">
                    <button className="w-full text-left px-4 py-2 text-sm font-bold text-secondary hover:bg-page border-b border-gray-50">Edit Details</button>
                    <button className="w-full text-left px-4 py-2 text-sm font-bold text-orange-600 hover:bg-orange-50 border-b border-orange-50">Suspend</button>
                    <button className="w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50">Archive</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 flex-1 grid grid-cols-2 gap-4">
              
              <div className="space-y-4 border-r border-border/50 pr-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Property Info</p>
                  <p className="text-sm font-bold text-primary">{property.type}</p>
                  <p className="text-xs text-[var(--text-disabled)] mt-0.5">{property.buildings} Building(s)</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Assigned Manager</p>
                  <p className="text-sm font-bold text-[#F5A623]">{property.manager}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Contact</p>
                  <p className="text-sm font-semibold text-secondary">{property.contact}</p>
                </div>
              </div>

              <div className="pl-2 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Occupancy</p>
                    <p className="text-sm font-black text-primary"><span className="text-green-600">{property.occupied}</span> / {property.totalBeds}</p>
                  </div>
                  <div className="w-full h-2.5 bg-[var(--bg-overlay)] rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${property.occupied / property.totalBeds > 0.9 ? 'bg-green-500' : 'bg-blue-500'}`} 
                      style={{ width: `${(property.occupied / property.totalBeds) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] font-bold text-[var(--text-disabled)] mt-2 text-right">{property.totalBeds - property.occupied} Vacant Beds</p>
                </div>
                
                <button className="w-full py-2.5 bg-card border border-border text-[#1A3A5C] hover:bg-page hover:border-[#1A3A5C] rounded-xl text-sm font-bold transition-colors">
                  Switch to Property
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
