// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  Utensils, CalendarDays, ClipboardList, MessageSquareWarning, 
  ChefHat, Coffee, Sun, Moon, Pizza, Plus, Edit3, XCircle, 
  CheckCircle2, AlertTriangle, ArrowRight, X
} from 'lucide-react';

type TabType = 'daily' | 'menu' | 'complaints';
type MealType = 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner';

const TODAY_MENU = {
  Breakfast: 'Aloo Paratha, Curd, Tea',
  Lunch: 'Rajma Chawal, Roti, Salad',
  Snacks: 'Samosa, Tea',
  Dinner: 'Paneer Butter Masala, Roti, Rice, Gulab Jamun'
};

const COMPLAINTS = [
  { id: 'C-101', student: 'Rahul Sharma', room: '102', issue: 'Rice was undercooked yesterday during lunch.', status: 'Review Pending', date: '03 Oct 2026' },
  { id: 'C-102', student: 'Amit Kumar', room: '205', issue: 'Too much oil in paneer sabzi.', status: 'Sent to Cook', date: '02 Oct 2026' },
];

export default function ManagerFoodMain() {
  const [activeTab, setActiveTab] = useState<TabType>('daily');
  const [activeMeal, setActiveMeal] = useState<MealType>('Lunch');
  
  // Complaints State
  const [complaints, setComplaints] = useState(COMPLAINTS);
  const [complaintModalOpen, setComplaintModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);

  const getMealIcon = (meal: MealType) => {
    switch (meal) {
      case 'Breakfast': return <Coffee className="w-5 h-5" />;
      case 'Lunch': return <Sun className="w-5 h-5" />;
      case 'Snacks': return <Pizza className="w-5 h-5" />;
      case 'Dinner': return <Moon className="w-5 h-5" />;
    }
  };

  const handleReviewComplaint = (complaint: any) => {
    setSelectedComplaint(complaint);
    setComplaintModalOpen(true);
  };

  const handleForwardToCook = () => {
    setComplaints(prev => prev.map(c => c.id === selectedComplaint.id ? { ...c, status: 'Sent to Cook' } : c));
    setComplaintModalOpen(false);
  };

  const handleMarkResolved = () => {
    setComplaints(prev => prev.map(c => c.id === selectedComplaint.id ? { ...c, status: 'Resolved' } : c));
    setComplaintModalOpen(false);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <Utensils className="w-6 h-6"/>
            </div>
            Mess & Food Operations
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage daily meal counts, menu schedules, and food complaints.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all">
            <ChefHat className="w-4 h-4" /> Message Cook
          </button>
        </div>
      </div>

      <div className="bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
        
        {/* Top Navigation Tabs */}
        <div className="flex items-center gap-1 p-2 border-b border-border/50 bg-page/30 shrink-0 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'daily' ? 'bg-white text-indigo-600 shadow-sm border border-border/50' : 'text-secondary hover:bg-page hover:text-primary'}`}
          >
            <ClipboardList className="w-4 h-4" /> Daily Execution (Counts)
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'menu' ? 'bg-white text-indigo-600 shadow-sm border border-border/50' : 'text-secondary hover:bg-page hover:text-primary'}`}
          >
            <CalendarDays className="w-4 h-4" /> Menu Management
          </button>
          <button 
            onClick={() => setActiveTab('complaints')}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'complaints' ? 'bg-white text-indigo-600 shadow-sm border border-border/50' : 'text-secondary hover:bg-page hover:text-primary'}`}
          >
            <MessageSquareWarning className="w-4 h-4" /> Food Complaints
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50/30 p-6">
          
          {/* DAILY EXECUTION TAB */}
          {activeTab === 'daily' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Select Meal */}
                <div className="w-full md:w-64 space-y-2 shrink-0">
                  <h3 className="font-bold text-primary mb-3">Select Meal</h3>
                  {['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map((meal) => (
                    <button
                      key={meal}
                      onClick={() => setActiveMeal(meal as MealType)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        activeMeal === meal 
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700' 
                          : 'border-border/60 bg-white text-secondary hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 font-bold">
                        {getMealIcon(meal as MealType)} {meal}
                      </div>
                      {activeMeal === meal && <CheckCircle2 className="w-5 h-5" />}
                    </button>
                  ))}
                </div>

                {/* Right: Meal Stats & Actions */}
                <div className="flex-1 space-y-6">
                  
                  <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-xl font-black text-primary flex items-center gap-2">
                          {getMealIcon(activeMeal)} {activeMeal} Count
                        </h2>
                        <p className="text-sm text-secondary font-medium mt-1">Menu: <b>{TODAY_MENU[activeMeal]}</b></p>
                      </div>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all">
                        Mark Attendance (Scanner)
                      </button>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-page/50 border border-border p-4 rounded-xl text-center">
                        <p className="text-xs font-bold text-secondary uppercase tracking-wider">Total Expecting</p>
                        <h3 className="text-2xl font-black text-primary mt-1">125</h3>
                      </div>
                      <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center">
                        <p className="text-xs font-bold text-red-600 uppercase tracking-wider">Opted-Out</p>
                        <h3 className="text-2xl font-black text-red-700 mt-1">15</h3>
                        <p className="text-[10px] text-red-600/80 mt-1">Will not eat</p>
                      </div>
                      <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl text-center">
                        <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">Extra/Special</p>
                        <h3 className="text-2xl font-black text-orange-700 mt-1">5</h3>
                        <p className="text-[10px] text-orange-600/80 mt-1">Guests / Sick</p>
                      </div>
                      <div className="bg-green-50 border border-green-100 p-4 rounded-xl text-center">
                        <p className="text-xs font-bold text-green-600 uppercase tracking-wider">Actual Kitchen Target</p>
                        <h3 className="text-2xl font-black text-green-700 mt-1">115</h3>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-start gap-3">
                    <ChefHat className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-900 text-sm">Cook Execution</h4>
                      <p className="text-xs text-blue-800 mt-1">The kitchen staff uses the <b>Actual Kitchen Target</b> (115 plates) to prepare the food. As a manager, you track the attendance at the counter.</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* MENU MANAGEMENT TAB */}
          {activeTab === 'menu' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-sm">Today's Menu</button>
                  <button className="px-4 py-2 bg-white border border-border text-secondary hover:text-primary rounded-lg text-sm font-bold shadow-sm">Weekly View</button>
                  <button className="px-4 py-2 bg-white border border-border text-secondary hover:text-primary rounded-lg text-sm font-bold shadow-sm">Menu History</button>
                </div>
                
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-border text-indigo-600 hover:bg-indigo-50 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Special Meal
                  </button>
                  <button className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> Cancel a Meal
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {Object.entries(TODAY_MENU).map(([meal, menu]) => (
                  <div key={meal} className="bg-white p-5 rounded-2xl border border-border shadow-sm flex flex-col h-full relative group">
                    <div className="flex items-center gap-2 mb-4 text-indigo-600">
                      {getMealIcon(meal as MealType)}
                      <h3 className="font-black">{meal}</h3>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-sm font-bold text-primary leading-relaxed">{menu}</p>
                    </div>
                    
                    <button className="mt-6 w-full py-2 bg-page text-secondary border border-border hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2">
                      <Edit3 className="w-3.5 h-3.5" /> Edit/Change Menu
                    </button>
                    
                    {/* Tooltip on Edit */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 p-2 bg-gray-800 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none text-center">
                      Requires Owner approval if configured.
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* COMPLAINTS TAB */}
          {activeTab === 'complaints' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-page/50 border-b border-border/50">
                      <th className="py-3 px-6 text-xs font-black text-secondary uppercase tracking-wider">Date</th>
                      <th className="py-3 px-6 text-xs font-black text-secondary uppercase tracking-wider">Student (Room)</th>
                      <th className="py-3 px-6 text-xs font-black text-secondary uppercase tracking-wider">Complaint</th>
                      <th className="py-3 px-6 text-xs font-black text-secondary uppercase tracking-wider">Status</th>
                      <th className="py-3 px-6 text-xs font-black text-secondary uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {complaints.map(comp => (
                      <tr key={comp.id} className="border-b border-border/30 hover:bg-page/40 transition-colors">
                        <td className="py-4 px-6 text-secondary">{comp.date}</td>
                        <td className="py-4 px-6 font-bold text-primary">{comp.student} <span className="text-xs text-secondary font-medium ml-1">(Rm {comp.room})</span></td>
                        <td className="py-4 px-6 text-primary max-w-xs truncate">{comp.issue}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                            comp.status === 'Review Pending' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                            comp.status === 'Sent to Cook' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                            'bg-green-100 text-green-700 border-green-200'
                          }`}>
                            {comp.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button 
                            onClick={() => handleReviewComplaint(comp)}
                            className="px-3 py-1.5 bg-white border border-border text-secondary hover:text-indigo-600 hover:border-indigo-200 rounded-lg text-xs font-bold transition-all shadow-sm"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Complaint Review Modal */}
      {complaintModalOpen && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border/50 bg-page/80 flex items-center justify-between">
              <h3 className="font-black text-primary flex items-center gap-2">
                <MessageSquareWarning className="w-5 h-5 text-orange-500" /> Review Food Complaint
              </h3>
              <button onClick={() => setComplaintModalOpen(false)} className="text-secondary hover:text-red-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              
              <div className="bg-orange-50/50 border border-orange-100 p-4 rounded-xl">
                <p className="text-sm text-orange-800 leading-relaxed font-medium">"{selectedComplaint.issue}"</p>
                <div className="flex items-center justify-between mt-3 text-xs text-orange-600/80 font-bold">
                  <span>From: {selectedComplaint.student} (Room {selectedComplaint.room})</span>
                  <span>{selectedComplaint.date}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-border rounded-xl">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <span className="font-black text-xs">MGR</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">Manager Action Flow</h4>
                  <p className="text-xs text-secondary mt-1">Review the complaint. If it's valid regarding food quality, forward it to the Kitchen Staff/Cook for resolution.</p>
                </div>
              </div>

              <textarea 
                placeholder="Add manager's internal note (optional)..." 
                rows={2}
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              ></textarea>
            </div>

            <div className="p-4 border-t border-border/50 bg-gray-50 flex items-center justify-end gap-3 shrink-0">
              {selectedComplaint.status !== 'Resolved' && (
                <button 
                  onClick={handleForwardToCook}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <ChefHat className="w-4 h-4" /> Forward to Cook
                </button>
              )}
              <button 
                onClick={handleMarkResolved}
                className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}