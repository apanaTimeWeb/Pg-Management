'use client';

import React, { useState } from 'react';
import { 
  ChefHat, Plus, Clock, MapPin, CheckCircle2, 
  XCircle, UserPlus, Search, UtensilsCrossed,
  CalendarCheck, AlertTriangle, X
} from 'lucide-react';

const MOCK_COOKS = [
  { id: 'CK-101', name: 'Ramesh Yadav', phone: '+91 9876543210', pg: 'PG Varanasi Main', kitchen: 'Ground Floor Mess', shift: 'Morning (05:00 AM - 02:00 PM)', attendance: 'Present', workStatus: 'Cooking Lunch', avatar: 'RY' },
  { id: 'CK-102', name: 'Suresh Kumar', phone: '+91 9123456789', pg: 'PG Varanasi Main', kitchen: 'Ground Floor Mess', shift: 'Evening (02:00 PM - 10:00 PM)', attendance: 'Pending', workStatus: 'Idle', avatar: 'SK' },
  { id: 'CK-103', name: 'Dinesh Singh', phone: '+91 9988776655', pg: 'PG Lanka Branch', kitchen: 'Main Kitchen', shift: 'Morning (05:00 AM - 02:00 PM)', attendance: 'Absent', workStatus: 'Leave', avatar: 'DS' },
];

export default function CookManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredCooks = MOCK_COOKS.filter(cook => 
    cook.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cook.pg.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Add Cook Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-orange-50">
              <h2 className="text-xl font-bold text-orange-800 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-orange-600" /> Add New Kitchen Staff
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 text-gray-500 hover:bg-white rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Cook Name</label>
                <input type="text" placeholder="e.g. Ramesh Kumar" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Mobile Number</label>
                <input type="text" placeholder="+91 9876543210" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Assign Property (PG)</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm">
                  <option>PG Varanasi Main</option>
                  <option>PG Lanka Branch</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Assign Kitchen</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm">
                  <option>Ground Floor Mess</option>
                  <option>Main Kitchen</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Schedule / Shift</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm">
                  <option>Morning Shift (05:00 AM - 02:00 PM)</option>
                  <option>Evening Shift (02:00 PM - 10:00 PM)</option>
                  <option>Full Day (Split Shift)</option>
                </select>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-colors">Cancel</button>
              <button onClick={() => { alert('Cook Added Successfully!'); setIsAddModalOpen(false); }} className="px-6 py-2.5 bg-orange-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-colors shadow-sm">
                <ChefHat className="w-4 h-4" /> Save Cook
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ChefHat className="w-7 h-7 text-[#F5A623]" />
            Cook & Kitchen Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage kitchen staff assignments, schedules, and daily attendance.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#e09612] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New Cook
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><ChefHat className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total Kitchen Staff</p>
            <h3 className="text-2xl font-black text-gray-800">3</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Present Today</p>
            <h3 className="text-2xl font-black text-gray-800">1</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><XCircle className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">On Leave</p>
            <h3 className="text-2xl font-black text-red-600">1</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><UtensilsCrossed className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Active Kitchens</p>
            <h3 className="text-2xl font-black text-gray-800">2</h3>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
        
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search cook by name or PG..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] bg-white"
            />
          </div>
        </div>

        {/* Cook Grid */}
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCooks.map(cook => (
              <div key={cook.id} className="border border-gray-200 rounded-2xl p-5 hover:border-orange-300 transition-colors shadow-sm bg-white relative group">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-black text-lg flex items-center justify-center border border-orange-200">
                      {cook.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-base">{cook.name}</h3>
                      <p className="text-xs font-semibold text-gray-500">{cook.phone}</p>
                    </div>
                  </div>
                  
                  {cook.attendance === 'Present' && <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 border border-green-200"><CheckCircle2 className="w-3 h-3"/> Present</span>}
                  {cook.attendance === 'Absent' && <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 border border-red-200"><XCircle className="w-3 h-3"/> Absent</span>}
                  {cook.attendance === 'Pending' && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 border border-yellow-200"><Clock className="w-3 h-3"/> Pending</span>}
                </div>

                {/* Details */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Assignment</p>
                      <p className="text-sm font-semibold text-gray-800">{cook.pg}</p>
                      <p className="text-xs text-gray-600">{cook.kitchen}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Schedule</p>
                      <p className="text-sm font-semibold text-gray-800">{cook.shift}</p>
                    </div>
                  </div>
                </div>

                {/* Live Status */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-100 rounded-lg"><UtensilsCrossed className="w-3.5 h-3.5 text-gray-500" /></div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Work Status</p>
                      <p className={`text-xs font-bold ${cook.workStatus === 'Cooking Lunch' ? 'text-green-600' : 'text-gray-600'}`}>{cook.workStatus}</p>
                    </div>
                  </div>
                  
                  <button className="text-sm font-bold text-orange-600 hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-orange-200">
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCooks.length === 0 && (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <ChefHat className="w-16 h-16 text-gray-200 mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-1">No Cooks Found</h3>
              <p className="text-gray-500 text-sm">No kitchen staff match your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
