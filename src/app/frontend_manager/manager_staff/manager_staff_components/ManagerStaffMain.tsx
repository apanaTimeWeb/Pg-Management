// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  Users, Search, Filter, ShieldAlert, UserCheck, UserX, 
  Clock, CalendarClock, Briefcase, MapPin, ClipboardList, 
  MessageSquarePlus, CheckCircle2, AlertTriangle, Phone, 
  MoreVertical, CalendarDays, Lock, Wrench, Sparkles, ChefHat
} from 'lucide-react';

type StaffRole = 'Cleaner' | 'Cook' | 'Maintenance' | 'Guard';
type AttendanceStatus = 'Present' | 'Absent' | 'On Leave' | 'Not Marked';

interface Staff {
  id: string;
  name: string;
  role: StaffRole;
  mobile: string;
  assignedArea: string;
  attendance: AttendanceStatus;
  shift: string;
  status: 'Active' | 'Inactive';
}

import { useManagerStaff } from '../manager_staff_hooks/useManagerStaff';

export default function ManagerStaffMain() {
  const { loading, staff, attendance, markAttendance } = useManagerStaff();
  
  // Transform the hook data into UI structure
  const uiStaff: Staff[] = staff.map(s => {
    const todayStr = new Date().toISOString().split('T')[0];
    const todayAtt = attendance.find(a => a.staffId === s.id && a.date === todayStr);
    
    return {
      id: s.id,
      name: s.name,
      role: (s.role === 'Housekeeping' ? 'Cleaner' : s.role === 'Security' ? 'Guard' : s.role === 'Kitchen' ? 'Cook' : 'Maintenance') as StaffRole,
      mobile: s.phone,
      assignedArea: 'Property Area', // Default area
      attendance: (todayAtt?.status || 'Not Marked') as AttendanceStatus,
      shift: s.shift,
      status: s.status
    };
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'duties' | 'tasks'>('overview');

  React.useEffect(() => {
    if (uiStaff.length > 0 && !selectedStaff) {
      setSelectedStaff(uiStaff[0]);
    }
  }, [uiStaff, selectedStaff]);

  const getRoleIcon = (role: StaffRole) => {
    switch (role) {
      case 'Cleaner': return <Sparkles className="w-4 h-4 text-teal-600" />;
      case 'Cook': return <ChefHat className="w-4 h-4 text-orange-600" />;
      case 'Maintenance': return <Wrench className="w-4 h-4 text-gray-600" />;
      case 'Guard': return <ShieldAlert className="w-4 h-4 text-indigo-600" />;
    }
  };

  const getAttendanceBadge = (status: AttendanceStatus) => {
    switch (status) {
      case 'Present': return <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-black uppercase">Present</span>;
      case 'Absent': return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-[10px] font-black uppercase">Absent</span>;
      case 'On Leave': return <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-[10px] font-black uppercase">On Leave</span>;
      case 'Not Marked': return <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-black uppercase">Not Marked</span>;
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 w-full h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <Users className="w-6 h-6"/>
            </div>
            Staff Operations
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage daily duties, tasks, and attendance for operational staff.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Left Side: Staff List */}
        <div className="lg:col-span-1 bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col min-h-0">
          <div className="p-4 border-b border-border/50 bg-page/30 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input 
                type="text" 
                placeholder="Search staff by name or role..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {loading ? (
              <div className="flex justify-center p-4">
                <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              uiStaff.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.role.toLowerCase().includes(searchTerm.toLowerCase())).map(staff => (
                <div 
                  key={staff.id}
                  onClick={() => setSelectedStaff(staff)}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    selectedStaff?.id === staff.id 
                      ? 'bg-indigo-50 border border-indigo-200 shadow-sm' 
                      : 'bg-transparent border border-transparent hover:bg-page/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-page border border-border flex items-center justify-center shrink-0">
                      {getRoleIcon(staff.role)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-primary truncate pr-2">{staff.name}</h4>
                        {getAttendanceBadge(staff.attendance)}
                      </div>
                      <p className="text-xs text-secondary mt-0.5">{staff.role} • {staff.shift.split(' ')[0]}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Details & Management */}
        <div className="lg:col-span-2 bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col min-h-0 overflow-hidden">
          {!selectedStaff ? (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-secondary">
              Select a staff member to view details
            </div>
          ) : (
            <>
              {/* Top Profile Header */}
          <div className="p-6 border-b border-border/50 bg-page/30 shrink-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-bl-full -mr-10 -mt-10"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-card rounded-2xl border-2 border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center shadow-sm text-indigo-600 dark:text-indigo-400">
                  {getRoleIcon(selectedStaff.role)}
                </div>
                <div>
                  <h2 className="text-xl font-black text-primary flex items-center gap-2">
                    {selectedStaff.name} 
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-md text-xs font-bold border border-green-200">{selectedStaff.status}</span>
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm font-medium text-secondary">
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {selectedStaff.mobile}</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {selectedStaff.role}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => {
                    const status = window.prompt("Enter status (Present, Absent, On Leave):", "Present");
                    if (status && ['Present', 'Absent', 'On Leave'].includes(status)) {
                      markAttendance(selectedStaff.id, status as any);
                    }
                  }}
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all"
                >
                  <UserCheck className="w-4 h-4" /> Mark Attendance
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center px-6 border-b border-border/50 bg-card shrink-0">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-secondary hover:text-primary'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('duties')}
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'duties' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-secondary hover:text-primary'}`}
            >
              Duty Schedule
            </button>
            <button 
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'tasks' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-secondary hover:text-primary'}`}
            >
              Daily Tasks
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg"><MapPin className="w-5 h-5" /></div>
                    <div>
                      <p className="text-xs font-bold text-secondary uppercase tracking-wider">Assigned Area</p>
                      <p className="text-sm font-bold text-primary mt-0.5">{selectedStaff.assignedArea}</p>
                    </div>
                  </div>
                  <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-lg"><Clock className="w-5 h-5" /></div>
                    <div>
                      <p className="text-xs font-bold text-secondary uppercase tracking-wider">Shift Timing</p>
                      <p className="text-sm font-bold text-primary mt-0.5">{selectedStaff.shift}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-border/50 flex justify-between items-center">
                    <h3 className="font-bold text-primary flex items-center gap-2"><CalendarDays className="w-4 h-4 text-indigo-600" /> Recent Leave & Attendance</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-secondary">Currently <b>{selectedStaff.attendance}</b> today.</p>
                    <p className="text-sm text-secondary mt-1">Leaves taken this month: <b>2</b></p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-card border border-border hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 px-4 py-3 rounded-xl text-sm font-bold shadow-sm transition-all flex justify-center items-center gap-2">
                    <MessageSquarePlus className="w-4 h-4" /> Add Performance Note
                  </button>
                </div>

                {/* Restricted Area Notice */}
                <div className="mt-8 p-4 bg-page border border-border rounded-xl flex items-start gap-3">
                  <div className="p-1.5 bg-card border border-border rounded-md shrink-0">
                    <Lock className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm">Owner Restricted Area</h4>
                    <p className="text-xs text-secondary mt-1">Salary structure, bonuses, and termination/sensitive HR decisions are restricted to the PG Owner. As a manager, you handle operational duties and daily tracking.</p>
                  </div>
                </div>
              </div>
            )}

            {/* DUTIES TAB */}
            {activeTab === 'duties' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-primary">Current Duty Assignment</h3>
                  <button className="text-indigo-600 text-sm font-bold hover:underline">Edit Schedule</button>
                </div>

                <div className="bg-card rounded-xl border border-border shadow-sm p-5 space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-border/50">
                    <div>
                      <p className="font-bold text-primary">Primary Responsibility</p>
                      <p className="text-sm text-secondary mt-1">{selectedStaff.role} duties for {selectedStaff.assignedArea}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-border/50">
                    <div>
                      <p className="font-bold text-primary">Reporting Time</p>
                      <p className="text-sm text-secondary mt-1">07:00 AM</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-primary">Weekly Off</p>
                      <p className="text-sm text-secondary mt-1">Tuesday</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-card border-2 border-dashed border-indigo-200 dark:border-indigo-800/50 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 px-4 py-4 rounded-xl text-sm font-bold transition-all flex justify-center items-center gap-2">
                  <PlusIcon /> Assign Temporary Duty / Shift Override
                </button>
              </div>
            )}

            {/* TASKS TAB */}
            {activeTab === 'tasks' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-primary flex items-center gap-2"><ClipboardList className="w-5 h-5 text-indigo-600" /> Today's Assigned Tasks</h3>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1">
                    <PlusIcon size="14" /> Add Task
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Task 1 */}
                  <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-start gap-3 group">
                    <div className="mt-0.5"><CheckCircle2 className="w-5 h-5 text-gray-300 cursor-pointer hover:text-green-500" /></div>
                    <div className="flex-1">
                      <p className="font-bold text-primary">Deep clean 1st Floor common area</p>
                      <p className="text-xs text-secondary mt-1">Focus on the lounge seating and dust the windows.</p>
                    </div>
                    <span className="text-[10px] font-black uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded">High Priority</span>
                  </div>

                  {/* Task 2 */}
                  <div className="bg-green-50/50 p-4 rounded-xl border border-green-100 shadow-sm flex items-start gap-3">
                    <div className="mt-0.5"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
                    <div className="flex-1">
                      <p className="font-bold text-secondary line-through">Empty all dustbins in Floor 2</p>
                    </div>
                    <span className="text-[10px] font-black uppercase text-green-600 px-2 py-0.5">Completed</span>
                  </div>
                </div>
                
                <p className="text-xs text-secondary text-center mt-4">Tasks are reset daily at midnight.</p>
              </div>
            )}

          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Inline component for Plus Icon since it wasn't imported from lucide-react above
function PlusIcon({ size = '16' }: { size?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  );
}
