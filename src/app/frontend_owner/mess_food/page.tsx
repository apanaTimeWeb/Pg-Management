// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { UtensilsCrossed, CalendarDays, CheckCircle2, XCircle, Plus, ChevronRight, User, Search, Filter, AlertTriangle, MessageSquare, Flame, Coffee, X, Edit3 } from 'lucide-react';

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
    <div className="w-full space-y-6">
      
      {/* Create Menu Modal Overlay */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-[#1A3A5C] text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#F5A623]" /> Create / Edit Menu
              </h2>
              <button onClick={() => setIsMenuModalOpen(false)} className="p-1.5 hover:bg-card/10 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-5">
              {/* Step 1: Date */}
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">1. Select Date / Day</label>
                <input type="date" className="w-full px-4 py-2.5 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm font-bold text-secondary" />
              </div>
              
              {/* Step 2: Meal Type */}
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">2. Meal Type</label>
                <div className="flex flex-wrap gap-3">
                  {['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Special Meal'].map(type => (
                    <label key={type} className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition-colors ${menuForm.type === type ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-card border-border hover:bg-page'}`}>
                      <input type="radio" name="mealType" className="hidden" checked={menuForm.type === type} onChange={() => setMenuForm({...menuForm, type})} />
                      <span className="text-sm font-bold">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Step 3: Items */}
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">3. Menu Items</label>
                <textarea 
                  rows={3} 
                  placeholder="e.g. Dal Makhani, Paneer Butter Masala, Rice, Roti, Sweet"
                  className="w-full px-4 py-3 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm resize-none"
                ></textarea>
              </div>
            </div>
            
            <div className="p-5 border-t border-border/50 bg-page flex justify-end gap-3">
              <button onClick={() => setIsMenuModalOpen(false)} className="px-6 py-2.5 bg-card border border-border text-secondary rounded-xl font-bold hover:bg-[var(--bg-overlay)] transition-colors">Cancel</button>
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
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <UtensilsCrossed className="w-7 h-7 text-[#F5A623]" />
            Mess & Food Management
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Plan menus, track daily meal attendance, and handle food feedback.</p>
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
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Flame className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Meals Planned</p>
            <h3 className="text-2xl font-black text-primary">4</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Avg Attendance</p>
            <h3 className="text-2xl font-black text-green-600">82%</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><XCircle className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Meal Opt-Outs</p>
            <h3 className="text-2xl font-black text-red-600">12</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><MessageSquare className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Food Complaints</p>
            <h3 className="text-2xl font-black text-primary">2</h3>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden min-h-[500px]">
        {/* Tabs */}
        <div className="flex border-b border-border/50 bg-page/50">
          <button 
            onClick={() => setActiveTab('menu')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold transition-colors ${activeTab === 'menu' ? 'bg-card text-[#F5A623] border-b-2 border-[#F5A623]' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
          >
            <CalendarDays className="w-4 h-4" /> Menu Planning
          </button>
          <button 
            onClick={() => setActiveTab('attendance')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold transition-colors ${activeTab === 'attendance' ? 'bg-card text-[#F5A623] border-b-2 border-[#F5A623]' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
          >
            <User className="w-4 h-4" /> Meal Attendance
          </button>
          <button 
            onClick={() => setActiveTab('complaints')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold transition-colors ${activeTab === 'complaints' ? 'bg-card text-[#F5A623] border-b-2 border-[#F5A623]' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
          >
            <AlertTriangle className="w-4 h-4" /> Opt-outs & Complaints
          </button>
        </div>

        {activeTab === 'menu' && (
          <div className="p-5 animate-in fade-in">
            <div className="flex gap-2 mb-6 border-b border-border/50 pb-4 overflow-x-auto">
              <button className="px-5 py-2 rounded-xl bg-orange-50 text-orange-700 font-bold text-sm shrink-0 border border-orange-200">Daily Menu</button>
              <button className="px-5 py-2 rounded-xl bg-card hover:bg-page text-secondary font-bold text-sm shrink-0 border border-border">Weekly Menu</button>
              <button className="px-5 py-2 rounded-xl bg-card hover:bg-page text-secondary font-bold text-sm shrink-0 border border-border">Monthly Menu</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_MENU.map((dayPlan, idx) => (
                <div key={idx} className="border border-border rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-[#1A3A5C] text-white p-4 flex justify-between items-center">
                    <h3 className="font-bold">{dayPlan.day}</h3>
                    <button className="p-1 hover:bg-card/20 rounded-md transition-colors"><Edit3 className="w-4 h-4" /></button>
                  </div>
                  <div className="p-0 divide-y divide-gray-100">
                    <div className="p-4 flex gap-4 hover:bg-page transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0"><Coffee className="w-5 h-5" /></div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Breakfast</h4>
                        <p className="text-sm font-semibold text-primary">{dayPlan.meals.breakfast}</p>
                      </div>
                    </div>
                    <div className="p-4 flex gap-4 hover:bg-page transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0"><UtensilsCrossed className="w-5 h-5" /></div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Lunch</h4>
                        <p className="text-sm font-semibold text-primary">{dayPlan.meals.lunch}</p>
                      </div>
                    </div>
                    <div className="p-4 flex gap-4 hover:bg-page transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Coffee className="w-5 h-5" /></div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Snacks</h4>
                        <p className="text-sm font-semibold text-primary">{dayPlan.meals.snacks}</p>
                      </div>
                    </div>
                    <div className="p-4 flex gap-4 hover:bg-page transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><UtensilsCrossed className="w-5 h-5" /></div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Dinner</h4>
                        <p className="text-sm font-semibold text-primary">{dayPlan.meals.dinner}</p>
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
                <input type="text" placeholder="Search student or room..." className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] bg-page" />
              </div>
              <div className="flex items-center gap-2 font-bold text-sm text-secondary">
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Eaten</span>
                <span className="flex items-center gap-1 ml-3"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Missed / Opt-out</span>
                <span className="flex items-center gap-1 ml-3"><div className="w-3 h-3 bg-gray-300 rounded-full"></div> Pending</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-page border-y border-border/50 text-[var(--text-disabled)] text-xs uppercase tracking-wider font-bold">
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
                    <tr key={record.id} className={`transition-colors ${record.optOut ? 'bg-red-50/30' : 'hover:bg-page/50'}`}>
                      <td className="p-4 text-center">
                        <span className="w-10 h-10 rounded-full bg-[var(--bg-overlay)] border border-border flex items-center justify-center font-black text-primary mx-auto">
                          {record.room}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-primary text-sm">{record.student}</span>
                          {record.optOut && <span className="text-xs font-bold text-red-500">Opted out for the day</span>}
                        </div>
                      </td>
                      
                      {['breakfast', 'lunch', 'dinner'].map((meal) => {
                        const val = (record as any)[meal];
                        let color = 'bg-[var(--bg-overlay)] text-[var(--text-disabled)]';
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
              <div className="border border-border rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" /> Recent Food Complaints
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-page border border-border/50 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-bold text-primary">Suresh Das (401)</span>
                      <span className="text-xs font-bold text-[var(--text-disabled)]">Yesterday</span>
                    </div>
                    <p className="text-sm text-secondary">"The Dal served at lunch had too much salt."</p>
                  </div>
                  <div className="p-4 bg-page border border-border/50 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-bold text-primary">Aman Singh (101)</span>
                      <span className="text-xs font-bold text-[var(--text-disabled)]">2 Days Ago</span>
                    </div>
                    <p className="text-sm text-secondary">"Breakfast tea was completely cold."</p>
                  </div>
                </div>
              </div>

              {/* Opt-out Panel */}
              <div className="border border-border rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
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
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm font-bold text-secondary">Rahul Sharma (101)</span>
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700 font-bold rounded-lg">Full Day</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm font-bold text-secondary">Amit Verma (103)</span>
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
