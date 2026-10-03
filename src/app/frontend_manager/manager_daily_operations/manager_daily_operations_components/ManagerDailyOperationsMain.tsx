// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  ClipboardList, CheckCircle2, Circle, Clock, LogIn, LogOut, 
  UserPlus, UserCheck, DoorOpen, Users, MessageSquare, Wrench, 
  Utensils, Package, IndianRupee, FileText, ChevronRight, Check
} from 'lucide-react';

const todayTasks = [
  { label: 'Check-ins', value: '3', icon: <LogIn className="w-5 h-5 text-green-600" />, bg: 'bg-green-100', link: '/manager_check_in' },
  { label: 'Check-outs', value: '1', icon: <LogOut className="w-5 h-5 text-red-600" />, bg: 'bg-red-100', link: '/manager_check_in' },
  { label: 'Admissions', value: '2', icon: <UserPlus className="w-5 h-5 text-indigo-600" />, bg: 'bg-indigo-100', link: '/manager_students' },
  { label: 'Attendance', value: 'Pending', icon: <UserCheck className="w-5 h-5 text-orange-600" />, bg: 'bg-orange-100', link: '/manager_attendance' },
  { label: 'Leave Req', value: '4', icon: <DoorOpen className="w-5 h-5 text-purple-600" />, bg: 'bg-purple-100', link: '/manager_leaves' },
  { label: 'Visitors', value: '5', icon: <Users className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-100', link: '/manager_visitors' },
  { label: 'Complaints', value: '6', icon: <MessageSquare className="w-5 h-5 text-pink-600" />, bg: 'bg-pink-100', link: '/manager_complaints' },
  { label: 'Maintenance', value: '2', icon: <Wrench className="w-5 h-5 text-gray-600" />, bg: 'bg-gray-200', link: '/manager_housekeeping' },
  { label: 'Meals Count', value: 'Done', icon: <Utensils className="w-5 h-5 text-yellow-600" />, bg: 'bg-yellow-100', link: '/manager_food' },
  { label: 'Low Stock', value: '3', icon: <Package className="w-5 h-5 text-red-500" />, bg: 'bg-red-50', link: '/manager_inventory' },
  { label: 'Payments', value: '₹45K', icon: <IndianRupee className="w-5 h-5 text-emerald-600" />, bg: 'bg-emerald-100', link: '/manager_finance' },
  { label: 'Notices', value: '0', icon: <FileText className="w-5 h-5 text-sky-600" />, bg: 'bg-sky-100', link: '/manager_broadcasts' },
];

const initialChecklist = [
  { id: 'c1', label: 'Morning attendance', completed: true, time: '08:00 AM' },
  { id: 'c2', label: 'Breakfast count', completed: true, time: '09:00 AM' },
  { id: 'c3', label: 'Room inspection (Floor 1)', completed: false, time: '11:00 AM' },
  { id: 'c4', label: 'Verify New admissions', completed: false, time: '12:00 PM' },
  { id: 'c5', label: 'Process Check-ins', completed: false, time: '01:00 PM' },
  { id: 'c6', label: 'Process Check-outs', completed: false, time: '01:30 PM' },
  { id: 'c7', label: 'Lunch count', completed: false, time: '02:00 PM' },
  { id: 'c8', label: 'Review open Complaints', completed: false, time: '04:00 PM' },
  { id: 'c9', label: 'Follow up Maintenance', completed: false, time: '04:30 PM' },
  { id: 'c10', label: 'Verify Visitor records', completed: false, time: '06:00 PM' },
  { id: 'c11', label: 'Dinner count', completed: false, time: '08:30 PM' },
  { id: 'c12', label: 'Generate End-of-day report', completed: false, time: '10:00 PM' },
];

export default function ManagerDailyOperationsMain() {
  const [checklist, setChecklist] = useState(initialChecklist);
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  const toggleChecklist = (id: string) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const progress = Math.round((checklist.filter(c => c.completed).length / checklist.length) * 100);

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <ClipboardList className="w-6 h-6"/>
            </div>
            Daily Operations
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">{currentDate}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-page px-4 py-2 rounded-xl border border-border flex items-center gap-3">
            <div className="text-sm font-bold text-secondary">Daily Progress</div>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${progress === 100 ? 'bg-green-500' : 'bg-indigo-600'}`} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-sm font-black text-primary">{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Tasks Overview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-primary flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" /> Today's Action Items
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {todayTasks.map((task, idx) => (
              <div key={idx} className="bg-card border border-border/60 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${task.bg}`}>
                  {task.icon}
                </div>
                <h3 className="text-xl font-black text-primary">{task.value}</h3>
                <p className="text-xs font-bold text-secondary uppercase tracking-wider mt-1">{task.label}</p>
                
                <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
              <LogOut className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-black text-primary mb-1">End of Day Operation</h3>
              <p className="text-sm text-secondary">Make sure all checklist items are completed before generating the EOD report. This report is sent directly to the Owner.</p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md transition-all whitespace-nowrap shrink-0 disabled:opacity-50 disabled:cursor-not-allowed">
              Generate EOD Report
            </button>
          </div>
        </div>

        {/* Daily Checklist */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col h-[calc(100vh-12rem)] min-h-[500px]">
            <div className="p-4 border-b border-border/50 bg-page/30">
              <h2 className="text-lg font-black text-primary">Daily Checklist</h2>
              <p className="text-sm text-secondary mt-1">Check off tasks as you complete them.</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {checklist.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    item.completed 
                      ? 'bg-green-50/30 border-green-100 hover:bg-green-50' 
                      : 'bg-white border-border/60 hover:border-indigo-300 shadow-sm'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold transition-colors ${item.completed ? 'text-secondary line-through' : 'text-primary'}`}>
                      {item.label}
                    </p>
                    <p className={`text-xs mt-0.5 font-medium ${item.completed ? 'text-secondary/60' : 'text-indigo-600/80'}`}>
                      Scheduled: {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-border/50 bg-page/30 flex justify-between items-center">
              <span className="text-sm font-bold text-secondary">
                {checklist.filter(c => c.completed).length} of {checklist.length} completed
              </span>
              {progress === 100 && (
                <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-md text-xs font-black flex items-center gap-1">
                  <Check className="w-3 h-3" /> All Done!
                </span>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
