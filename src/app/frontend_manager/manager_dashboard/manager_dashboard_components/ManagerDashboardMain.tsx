// @ts-nocheck
'use client';

import React from 'react';
import { 
  Users, Bed, LogIn, LogOut, CheckCircle2, UserCheck, 
  Coffee, IndianRupee, MessageSquare, Wrench, CalendarOff, 
  ShieldAlert, Bell, Plus, FileText, ArrowRight, UserPlus
} from 'lucide-react';
import Link from 'next/link';

export default function ManagerDashboardMain() {
  
  // Mock Data
  const alerts = [
    { id: 1, type: 'critical', text: '3 Students are overdue for Rent (Total ₹14,500)' },
    { id: 2, type: 'warning', text: '2 Check-outs scheduled for today' },
    { id: 3, type: 'info', text: '5 New Admissions pending document verification' },
    { id: 4, type: 'info', text: '4 Leave requests waiting for approval' },
    { id: 5, type: 'critical', text: 'Low stock in Kitchen (Rice, Oil)' },
    { id: 6, type: 'warning', text: '2 Open complaints (1 Plumbing, 1 Electrical)' },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-[1600px] mx-auto h-[calc(100vh-4rem)] flex flex-col overflow-y-auto hide-scrollbar">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <span className="text-xl">👋</span>
            </div>
            Good Morning, Manager
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Here's your operational overview for today.</p>
        </div>
        <p className="text-sm font-bold text-secondary bg-white px-4 py-2 rounded-xl border border-border shadow-sm">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Content Area (Left 3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            
            {/* Students */}
            <div className="bg-white p-4 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><Users className="w-5 h-5"/></div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Students</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-primary">145</h3>
                <p className="text-xs text-secondary mt-1"><b className="text-green-600">142 Active</b> • 3 Pending</p>
              </div>
            </div>

            {/* Beds */}
            <div className="bg-white p-4 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center"><Bed className="w-5 h-5"/></div>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">Beds</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-primary">150</h3>
                <p className="text-xs text-secondary mt-1"><b className="text-purple-600">142 Occ.</b> • 7 Vacant • 1 Maint.</p>
              </div>
            </div>

            {/* Movements */}
            <div className="bg-white p-4 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><ArrowRight className="w-5 h-5"/></div>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">Movements</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-primary">3</h3>
                <p className="text-xs text-secondary mt-1"><b className="text-green-600">1 In</b> • <b className="text-orange-600">2 Out</b> Today</p>
              </div>
            </div>

            {/* Finance */}
            <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-bl-full -mr-4 -mt-4"></div>
              <div className="flex justify-between items-start mb-2 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center"><IndianRupee className="w-5 h-5"/></div>
                <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">Pending Dues</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-red-700">₹ 42.5k</h3>
                <p className="text-xs text-red-600 mt-1">From 8 Overdue Students</p>
              </div>
            </div>

          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Today's Overview Box */}
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-4 bg-page/30 border-b border-border/50 flex items-center justify-between">
                <h3 className="font-bold text-primary flex items-center gap-2"><CalendarOff className="w-4 h-4 text-indigo-600"/> Today's Log</h3>
                <span className="text-xs font-bold text-secondary">Operational Data</span>
              </div>
              <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                
                <div className="text-center">
                  <p className="text-xs font-bold text-secondary mb-1">Attendance</p>
                  <p className="font-black text-lg text-primary">138</p>
                  <p className="text-[10px] text-green-600 font-bold">Present</p>
                </div>
                <div className="text-center border-l border-border/50">
                  <p className="text-xs font-bold text-secondary mb-1">Leaves</p>
                  <p className="font-black text-lg text-primary">4</p>
                  <p className="text-[10px] text-purple-600 font-bold">On Leave</p>
                </div>
                <div className="text-center border-l border-border/50">
                  <p className="text-xs font-bold text-secondary mb-1">Visitors</p>
                  <p className="font-black text-lg text-primary">6</p>
                  <p className="text-[10px] text-indigo-600 font-bold">Expected</p>
                </div>
                <div className="text-center border-l border-border/50">
                  <p className="text-xs font-bold text-secondary mb-1">Issues</p>
                  <p className="font-black text-lg text-red-600">3</p>
                  <p className="text-[10px] text-red-500 font-bold">Open Tasks</p>
                </div>

              </div>
            </div>

            {/* Mess Overview */}
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-4 bg-page/30 border-b border-border/50 flex items-center justify-between">
                <h3 className="font-bold text-primary flex items-center gap-2"><Coffee className="w-4 h-4 text-indigo-600"/> Today's Mess Headcount</h3>
              </div>
              <div className="p-4 grid grid-cols-3 gap-2">
                <div className="bg-orange-50 p-3 rounded-xl border border-orange-100 text-center">
                  <p className="text-xs font-bold text-orange-700">Breakfast</p>
                  <p className="font-black text-xl text-orange-900 mt-1">130</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100 text-center">
                  <p className="text-xs font-bold text-yellow-700">Lunch</p>
                  <p className="font-black text-xl text-yellow-900 mt-1">115</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-center">
                  <p className="text-xs font-bold text-blue-700">Dinner</p>
                  <p className="font-black text-xl text-blue-900 mt-1">135</p>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Actions (Manager's Playground) */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-4 bg-page/30 border-b border-border/50">
              <h3 className="font-bold text-primary flex items-center gap-2">⚡ Quick Actions</h3>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[1px] bg-border/50">
              
              <Link href="/frontend_manager/manager_admissions" className="bg-white p-4 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors"><UserPlus className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">New Admission</span>
              </Link>
              
              <Link href="/frontend_manager/manager_check_in" className="bg-white p-4 flex flex-col items-center justify-center gap-2 hover:bg-green-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-green-100 group-hover:text-green-600 transition-colors"><LogIn className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Check-In</span>
              </Link>

              <Link href="/frontend_manager/manager_check_in" className="bg-white p-4 flex flex-col items-center justify-center gap-2 hover:bg-orange-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors"><LogOut className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Check-Out</span>
              </Link>

              <Link href="/frontend_manager/manager_rooms" className="bg-white p-4 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors"><Bed className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Allocate Bed</span>
              </Link>

              <Link href="/frontend_manager/manager_attendance" className="bg-white p-4 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors"><UserCheck className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Mark Attendance</span>
              </Link>

              <Link href="/frontend_manager/manager_finance" className="bg-white p-4 flex flex-col items-center justify-center gap-2 hover:bg-green-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-green-100 group-hover:text-green-600 transition-colors"><IndianRupee className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Collect Payment</span>
              </Link>

              <Link href="/frontend_manager/manager_leaves" className="bg-white p-4 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors"><CalendarOff className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Approve Leave</span>
              </Link>

              <Link href="/frontend_manager/manager_visitors" className="bg-white p-4 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors"><Users className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Add Visitor</span>
              </Link>

              <Link href="/frontend_manager/manager_complaints" className="bg-white p-4 flex flex-col items-center justify-center gap-2 hover:bg-red-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-red-100 group-hover:text-red-600 transition-colors"><MessageSquare className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Log Complaint</span>
              </Link>

              <Link href="/frontend_manager/manager_maintenance" className="bg-white p-4 flex flex-col items-center justify-center gap-2 hover:bg-orange-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors"><Wrench className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Maintenance</span>
              </Link>

              <Link href="/frontend_manager/manager_broadcasts" className="bg-white p-4 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors"><Bell className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Add Notice</span>
              </Link>

              <Link href="/frontend_manager/manager_students" className="bg-white p-4 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors"><Users className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">All Students</span>
              </Link>

            </div>
          </div>

        </div>

        {/* Right Sidebar - Active Alerts */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-border shadow-sm h-full flex flex-col">
            
            <div className="p-4 border-b border-border/50 bg-red-50/50 rounded-t-2xl flex items-center justify-between">
              <h3 className="font-black text-red-700 flex items-center gap-2"><Bell className="w-4 h-4"/> Actionable Alerts</h3>
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{alerts.length} New</span>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-3">
              {alerts.map(alert => (
                <div 
                  key={alert.id}
                  className={`p-3 rounded-xl border flex gap-3 ${
                    alert.type === 'critical' ? 'bg-red-50 border-red-200 text-red-900' :
                    alert.type === 'warning' ? 'bg-orange-50 border-orange-200 text-orange-900' :
                    'bg-blue-50 border-blue-200 text-blue-900'
                  }`}
                >
                  <ShieldAlert className={`w-5 h-5 shrink-0 mt-0.5 ${
                    alert.type === 'critical' ? 'text-red-500' :
                    alert.type === 'warning' ? 'text-orange-500' :
                    'text-blue-500'
                  }`} />
                  <div>
                    <p className="text-sm font-bold leading-snug">{alert.text}</p>
                    <button className="text-[10px] font-bold mt-2 uppercase tracking-wider hover:underline opacity-70">Take Action &rarr;</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border/50 bg-page/30">
              <button className="w-full py-2 bg-white border border-border text-xs font-bold text-secondary hover:text-primary rounded-lg transition-colors">
                View All Notifications
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}