'use client';

import React, { useState } from 'react';
import { 
  UtensilsCrossed, CalendarDays, CheckCircle2, 
  XCircle, Plus, ChevronRight, User, Search, 
  Filter, AlertTriangle, MessageSquare, Flame, 
  Coffee, X, Edit3
} from 'lucide-react';

const MOCK_MENU = [
  { day: 'Monday (Today)', meals: {
      breakfast: 'Poha, Jalebi, Tea/Coffee',
      lunch: 'Dal Fry, Rice, Roti, Aloo Gobi, Salad',
      snacks: 'Samosa, Tea',
      dinner: 'Paneer Butter Masala, Roti, Rice, Gulab Jamun (Special Meal)'
    }
  },
  { day: 'Tuesday', meals: {
      breakfast: 'Aloo Paratha, Curd, Pickle',
      lunch: 'Rajma, Rice, Roti, Mix Veg',
      snacks: 'Biscuits, Tea',
      dinner: 'Egg Curry / Dal Makhani, Roti, Rice'
    }
  }
];

const MOCK_ATTENDANCE = [
  { id: '101A', room: '101', student: 'Aman Singh', breakfast: 'Eaten', lunch: 'Eaten', dinner: 'Pending', optOut: false },
  { id: '101B', room: '101', student: 'Rahul Sharma', breakfast: 'Opt-Out', lunch: 'Opt-Out', dinner: 'Opt-Out', optOut: true },
  { id: '102A', room: '102', student: 'Vikram Patel', breakfast: 'Eaten', lunch: 'Pending', dinner: 'Pending', optOut: false },
  { id: '103A', room: '103', student: 'Amit Verma', breakfast: 'Missed', lunch: 'Eaten', dinner: 'Pending', optOut: false },
];

export default function MessFoodPage() {
  const [activeTab, setActiveTab] = useState<'menu' | 'attendance' | 'complaints'>('menu');
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [menuForm, setMenuForm] = useState({ date: '', type: 'Breakfast', items: '' });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Create Menu Modal Overlay */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#1A3A5C] text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#F5A623]" /> Create / Edit Menu
              </h2>
              <button onClick={() => setIsMenuModalOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-5">
              {/* Step 1: Date */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">1. Select Date / Day</label>
                <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm font-bold text-gray-700" />
              </div>
              
              {/* Step 2: Meal Type */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">2. Meal Type</label>
                <div className="flex flex-wrap gap-3">
                  {['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Special Meal'].map(type => (
                    <label key={type} className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition-colors ${menuForm.type === type ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                      <input type="radio" name="mealType" className="hidden" checked={menuForm.type === type} onChange={() => setMenuForm({...menuForm, type})} />
                      <span className="text-sm font-bold">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Step 3: Items */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">3. Menu Items</label>
                <textarea 
                  rows={3} 
                  placeholder="e.g. Dal Makhani, Paneer Butter Masala, Rice, Roti, Sweet"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm resize-none"
                ></textarea>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsMenuModalOpen(false)} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-colors">Cancel</button>
              <button onClick={() => { alert('Menu Published to Student App!'); setIsMenuModalOpen(false); }} className="px-6 py-2.5 bg-green-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition-colors shadow-sm">
                <CheckCircle2 className="w-4 h-4" /> Publish Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <UtensilsCrossed className="w-7 h-7 text-[#F5A623]" />
            Mess & Food Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">Plan menus, track daily meal attendance, and handle food feedback.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMenuModalOpen(true)}
            className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#e09612] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Create Menu
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Flame className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Meals Planned</p>
            <h3 className="text-2xl font-black text-gray-800">4</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Avg Attendance</p>
            <h3 className="text-2xl font-black text-green-600">82%</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><XCircle className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Meal Opt-Outs</p>
            <h3 className="text-2xl font-black text-red-600">12</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><MessageSquare className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Food Complaints</p>
            <h3 className="text-2xl font-black text-gray-800">2</h3>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          <button 
            onClick={() => setActiveTab('menu')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold transition-colors ${activeTab === 'menu' ? 'bg-white text-[#F5A623] border-b-2 border-[#F5A623]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <CalendarDays className="w-4 h-4" /> Menu Planning
          </button>
          <button 
            onClick={() => setActiveTab('attendance')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold transition-colors ${activeTab === 'attendance' ? 'bg-white text-[#F5A623] border-b-2 border-[#F5A623]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <User className="w-4 h-4" /> Meal Attendance
          </button>
          <button 
            onClick={() => setActiveTab('complaints')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold transition-colors ${activeTab === 'complaints' ? 'bg-white text-[#F5A623] border-b-2 border-[#F5A623]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <AlertTriangle className="w-4 h-4" /> Opt-outs & Complaints
          </button>
        </div>

        {activeTab === 'menu' && (
          <div className="p-5 animate-in fade-in">
            <div className="flex gap-2 mb-6 border-b border-gray-100 pb-4 overflow-x-auto">
              <button className="px-5 py-2 rounded-xl bg-orange-50 text-orange-700 font-bold text-sm shrink-0 border border-orange-200">Daily Menu</button>
              <button className="px-5 py-2 rounded-xl bg-white hover:bg-gray-50 text-gray-600 font-bold text-sm shrink-0 border border-gray-200">Weekly Menu</button>
              <button className="px-5 py-2 rounded-xl bg-white hover:bg-gray-50 text-gray-600 font-bold text-sm shrink-0 border border-gray-200">Monthly Menu</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_MENU.map((dayPlan, idx) => (
                <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-[#1A3A5C] text-white p-4 flex justify-between items-center">
                    <h3 className="font-bold">{dayPlan.day}</h3>
                    <button className="p-1 hover:bg-white/20 rounded-md transition-colors"><Edit3 className="w-4 h-4" /></button>
                  </div>
                  <div className="p-0 divide-y divide-gray-100">
                    <div className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0"><Coffee className="w-5 h-5" /></div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Breakfast</h4>
                        <p className="text-sm font-semibold text-gray-800">{dayPlan.meals.breakfast}</p>
                      </div>
                    </div>
                    <div className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0"><UtensilsCrossed className="w-5 h-5" /></div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Lunch</h4>
                        <p className="text-sm font-semibold text-gray-800">{dayPlan.meals.lunch}</p>
                      </div>
                    </div>
                    <div className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Coffee className="w-5 h-5" /></div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Snacks</h4>
                        <p className="text-sm font-semibold text-gray-800">{dayPlan.meals.snacks}</p>
                      </div>
                    </div>
                    <div className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><UtensilsCrossed className="w-5 h-5" /></div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Dinner</h4>
                        <p className="text-sm font-semibold text-gray-800">{dayPlan.meals.dinner}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="p-5 animate-in fade-in">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search student or room..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] bg-gray-50" />
              </div>
              <div className="flex items-center gap-2 font-bold text-sm text-gray-600">
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Eaten</span>
                <span className="flex items-center gap-1 ml-3"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Missed / Opt-out</span>
                <span className="flex items-center gap-1 ml-3"><div className="w-3 h-3 bg-gray-300 rounded-full"></div> Pending</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-bold">
                    <th className="p-4 w-24 text-center">Room</th>
                    <th className="p-4">Student</th>
                    <th className="p-4 text-center">Breakfast</th>
                    <th className="p-4 text-center">Lunch</th>
                    <th className="p-4 text-center">Dinner</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MOCK_ATTENDANCE.map((record) => (
                    <tr key={record.id} className={`transition-colors ${record.optOut ? 'bg-red-50/30' : 'hover:bg-gray-50/50'}`}>
                      <td className="p-4 text-center">
                        <span className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-black text-gray-800 mx-auto">
                          {record.room}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800 text-sm">{record.student}</span>
                          {record.optOut && <span className="text-xs font-bold text-red-500">Opted out for the day</span>}
                        </div>
                      </td>
                      
                      {['breakfast', 'lunch', 'dinner'].map((meal) => {
                        const val = (record as any)[meal];
                        let color = 'bg-gray-100 text-gray-500';
                        if (val === 'Eaten') color = 'bg-green-100 text-green-700 border border-green-200';
                        if (val === 'Missed' || val === 'Opt-Out') color = 'bg-red-100 text-red-700 border border-red-200';
                        
                        return (
                          <td key={meal} className="p-4 text-center">
                            <span className={`px-3 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider ${color}`}>
                              {val}
                            </span>
                          </td>
                        );
                      })}
                      
                      <td className="p-4 text-center">
                        <button className="text-xs font-bold text-blue-600 hover:underline">Edit Counts</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'complaints' && (
          <div className="p-5 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Complaints Panel */}
              <div className="border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" /> Recent Food Complaints
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-bold text-gray-800">Suresh Das (401)</span>
                      <span className="text-xs font-bold text-gray-500">Yesterday</span>
                    </div>
                    <p className="text-sm text-gray-600">"The Dal served at lunch had too much salt."</p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-bold text-gray-800">Aman Singh (101)</span>
                      <span className="text-xs font-bold text-gray-500">2 Days Ago</span>
                    </div>
                    <p className="text-sm text-gray-600">"Breakfast tea was completely cold."</p>
                  </div>
                </div>
              </div>

              {/* Opt-out Panel */}
              <div className="border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" /> Today's Meal Opt-Outs
                </h3>
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-red-800">Action Required for Kitchen</h4>
                    <p className="text-xs text-red-600 mt-1">12 students have opted out of meals today. Please inform the kitchen staff to cook less food to minimize wastage.</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-bold text-gray-700">Rahul Sharma (101)</span>
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700 font-bold rounded-lg">Full Day</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-bold text-gray-700">Amit Verma (103)</span>
                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 font-bold rounded-lg">Dinner Only</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
