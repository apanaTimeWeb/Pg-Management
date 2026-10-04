// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  CalendarDays, Search, CheckCircle2, XCircle, Clock, 
  CalendarOff, Users, UserCheck, Calendar, Filter, FileText, Lock
} from 'lucide-react';

import { useManagerPropertyContext } from '@/app/frontend_manager/manager_components/ManagerPropertyContext';
import { useManagerAttendance } from '../manager_attendance_hooks/useManagerAttendance';
import type { AttendanceStatus, AttendanceRecord } from '../manager_attendance_hooks/useManagerAttendance';

type TabType = 'students' | 'staff';

export default function ManagerAttendanceMain() {
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  const { students, staff, loading, markStudentAttendance, markStaffAttendance, markAllStudentsPresent } = useManagerAttendance(selectedPropertyId, ctxLoading, 'manager-1');

  const [activeTab, setActiveTab] = useState<TabType>('students');
  const [dateFilter, setDateFilter] = useState('Today');
  const [searchTerm, setSearchTerm] = useState('');

  const handleStudentStatusChange = (id: string, status: AttendanceStatus) => {
    markStudentAttendance(id, status);
  };

  const handleStaffStatusChange = (id: string, status: AttendanceStatus) => {
    markStaffAttendance(id, status);
  };

  const handleBulkMarkPresent = () => {
    markAllStudentsPresent();
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (s.room && s.room.includes(searchTerm))
  );

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (s.role && s.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading || ctxLoading) {
    return <div className="p-8 flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 w-full h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <UserCheck className="w-6 h-6"/>
            </div>
            Attendance System
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Record daily presence, absences, and leaves.</p>
        </div>
      </div>

      <div className="bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-2 border-b border-border/50 bg-page/30 shrink-0">
          <button 
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'students' ? 'bg-card text-indigo-600 shadow-sm border border-border/50' : 'text-secondary hover:bg-page hover:text-primary'}`}
          >
            <Users className="w-4 h-4" /> Student Attendance
          </button>
          <button 
            onClick={() => setActiveTab('staff')}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'staff' ? 'bg-card text-indigo-600 shadow-sm border border-border/50' : 'text-secondary hover:bg-page hover:text-primary'}`}
          >
            <UserCheck className="w-4 h-4" /> Staff Attendance
          </button>
        </div>

        {/* Filters & Search */}
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card shrink-0">
          
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
            {['Today', 'Yesterday', 'This Week', 'This Month'].map(date => (
              <button 
                key={date}
                onClick={() => setDateFilter(date)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  dateFilter === date 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : 'bg-page text-secondary border-border/60 hover:border-indigo-300'
                }`}
              >
                {date}
              </button>
            ))}
            <button className="px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-page text-secondary border border-border/60 hover:border-indigo-300 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Custom Date
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            {activeTab === 'students' && (
              <button className="px-3 py-2 bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 rounded-lg text-xs font-bold flex items-center gap-1.5 whitespace-nowrap">
                <FileText className="w-4 h-4" /> Reports
              </button>
            )}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50/30">
          
          {/* STUDENT ATTENDANCE */}
          {activeTab === 'students' && (
            <div className="animate-in fade-in duration-300">
              
              <div className="p-4 bg-card border-b border-border/50 flex items-center justify-between sticky top-0 z-10">
                <div>
                  <h3 className="font-bold text-primary">Marking Attendance for: {dateFilter}</h3>
                  <p className="text-xs text-secondary mt-0.5">Total: {students.length} | Unmarked: {students.filter(s => s.status === 'Unmarked').length}</p>
                </div>
                <button 
                  onClick={handleBulkMarkPresent}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all"
                >
                  Mark Remaining Present
                </button>
              </div>

              <div className="p-4 space-y-3">
                {filteredStudents.map(student => (
                  <div key={student.id} className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-primary truncate">{student.name}</h4>
                        <span className="text-xs font-bold text-secondary bg-page px-2 py-0.5 rounded border border-border">Rm {student.room}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {student.time && <span className="text-xs font-medium text-secondary">Marked at: {student.time}</span>}
                        {student.note && <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{student.note}</span>}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      <button 
                        onClick={() => handleStudentStatusChange(student.id, 'Present')}
                        className={`flex flex-col items-center justify-center w-16 py-1.5 rounded-lg border-2 transition-all ${student.status === 'Present' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-page border-transparent text-secondary hover:border-green-200 hover:bg-green-50/50'}`}
                      >
                        <CheckCircle2 className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Present</span>
                      </button>
                      <button 
                        onClick={() => handleStudentStatusChange(student.id, 'Absent')}
                        className={`flex flex-col items-center justify-center w-16 py-1.5 rounded-lg border-2 transition-all ${student.status === 'Absent' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-page border-transparent text-secondary hover:border-red-200 hover:bg-red-50/50'}`}
                      >
                        <XCircle className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Absent</span>
                      </button>
                      <button 
                        onClick={() => handleStudentStatusChange(student.id, 'Late')}
                        className={`flex flex-col items-center justify-center w-16 py-1.5 rounded-lg border-2 transition-all ${student.status === 'Late' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-page border-transparent text-secondary hover:border-orange-200 hover:bg-orange-50/50'}`}
                      >
                        <Clock className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Late</span>
                      </button>
                      <button 
                        onClick={() => handleStudentStatusChange(student.id, 'Leave')}
                        className={`flex flex-col items-center justify-center w-16 py-1.5 rounded-lg border-2 transition-all ${student.status === 'Leave' ? 'bg-purple-50 border-purple-500 text-purple-700' : 'bg-page border-transparent text-secondary hover:border-purple-200 hover:bg-purple-50/50'}`}
                      >
                        <CalendarOff className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Leave</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* STAFF ATTENDANCE */}
          {activeTab === 'staff' && (
            <div className="animate-in fade-in duration-300">
              
              <div className="p-4 bg-gray-900 text-white flex items-start gap-3 sticky top-0 z-10">
                <Lock className="w-5 h-5 shrink-0 mt-0.5 text-indigo-300" />
                <div>
                  <h4 className="font-bold text-sm">Owner Restricted Area</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">As a manager, you can mark daily attendance (Present/Absent/Late) for operational staff. However, <b className="text-white">salary calculations, deductions, and payouts</b> remain restricted and are managed directly by the Owner.</p>
                </div>
              </div>

              <div className="p-4 space-y-3 mt-2">
                {filteredStaff.map(emp => (
                  <div key={emp.id} className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-primary truncate">{emp.name}</h4>
                        <span className="text-xs font-bold text-secondary bg-page px-2 py-0.5 rounded border border-border">{emp.role}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {emp.time && <span className="text-xs font-medium text-secondary">Marked at: {emp.time}</span>}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      <button 
                        onClick={() => handleStaffStatusChange(emp.id, 'Present')}
                        className={`flex flex-col items-center justify-center w-16 py-1.5 rounded-lg border-2 transition-all ${emp.status === 'Present' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-page border-transparent text-secondary hover:border-green-200 hover:bg-green-50/50'}`}
                      >
                        <CheckCircle2 className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Present</span>
                      </button>
                      <button 
                        onClick={() => handleStaffStatusChange(emp.id, 'Absent')}
                        className={`flex flex-col items-center justify-center w-16 py-1.5 rounded-lg border-2 transition-all ${emp.status === 'Absent' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-page border-transparent text-secondary hover:border-red-200 hover:bg-red-50/50'}`}
                      >
                        <XCircle className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Absent</span>
                      </button>
                      <button 
                        onClick={() => handleStaffStatusChange(emp.id, 'Late')}
                        className={`flex flex-col items-center justify-center w-16 py-1.5 rounded-lg border-2 transition-all ${emp.status === 'Late' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-page border-transparent text-secondary hover:border-orange-200 hover:bg-orange-50/50'}`}
                      >
                        <Clock className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Late</span>
                      </button>
                      <button 
                        onClick={() => handleStaffStatusChange(emp.id, 'Leave')}
                        className={`flex flex-col items-center justify-center w-16 py-1.5 rounded-lg border-2 transition-all ${emp.status === 'Leave' ? 'bg-purple-50 border-purple-500 text-purple-700' : 'bg-page border-transparent text-secondary hover:border-purple-200 hover:bg-purple-50/50'}`}
                      >
                        <CalendarOff className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Leave</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}