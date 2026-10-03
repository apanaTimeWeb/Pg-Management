'use client';

import React, { useState } from 'react';
import { 
  CalendarCheck, CalendarDays, CheckCircle2, 
  XCircle, Clock, PlaneTakeoff, Download, 
  Edit3, Search, Filter, Calendar, Users
} from 'lucide-react';

const MOCK_ATTENDANCE = [
  { id: '101A', room: '101', student: 'Aman Singh', status: 'Present', time: '08:30 PM', remarks: 'Marked by Manager' },
  { id: '101B', room: '101', student: 'Rahul Sharma', status: 'Late', time: '10:45 PM', remarks: 'Curfew was 10:00 PM' },
  { id: '102A', room: '102', student: 'Vikram Patel', status: 'Absent', time: '-', remarks: 'Not in room at 10 PM check' },
  { id: '102B', room: '102', student: 'Sanjay Kumar', status: 'Leave', time: '-', remarks: 'On approved Diwali Leave' },
  { id: '103A', room: '103', student: 'Amit Verma', status: 'Present', time: '09:00 PM', remarks: 'Marked via Biometric' },
  { id: '103B', room: '103', student: 'Priya Das', status: 'Present', time: '09:15 PM', remarks: 'Marked by Manager' },
  { id: '104A', room: '104', student: 'Neha Das', status: 'Absent', time: '-', remarks: 'Uninformed absence' },
];

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly'>('daily');
  const [searchTerm, setSearchTerm] = useState('');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-700 border-green-200';
      case 'Absent': return 'bg-red-100 text-red-700 border-red-200';
      case 'Late': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Leave': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-[var(--bg-overlay)] text-secondary border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'Absent': return <XCircle className="w-3.5 h-3.5" />;
      case 'Late': return <Clock className="w-3.5 h-3.5" />;
      case 'Leave': return <PlaneTakeoff className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const filteredAttendance = MOCK_ATTENDANCE.filter(record => 
    record.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
    record.room.includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <CalendarCheck className="w-7 h-7 text-[#F5A623]" />
            Student Attendance
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Monitor daily roll-call, apply corrections, and generate reports.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card border border-border text-secondary hover:bg-page px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <button className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#e09612] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Users className="w-4 h-4" /> Bulk Mark Present
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Present</p>
            <h3 className="text-2xl font-black text-primary">185</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><XCircle className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Absent</p>
            <h3 className="text-2xl font-black text-red-600">8</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><PlaneTakeoff className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">On Leave</p>
            <h3 className="text-2xl font-black text-blue-600">12</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Clock className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Late Entry</p>
            <h3 className="text-2xl font-black text-orange-600">5</h3>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Top Bar: Tabs & Date Picker */}
        <div className="p-4 border-b border-border/50 bg-page/50 flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex bg-[var(--bg-overlay)] p-1 rounded-xl w-full md:w-max">
            <button 
              onClick={() => setActiveTab('daily')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'daily' ? 'bg-card text-[#F5A623] shadow-sm' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
            >
              <CalendarCheck className="w-4 h-4" /> Daily Register
            </button>
            <button 
              onClick={() => setActiveTab('monthly')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'monthly' ? 'bg-card text-[#F5A623] shadow-sm' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
            >
              <CalendarDays className="w-4 h-4" /> Monthly Report
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search room or student..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] bg-card"
              />
            </div>
            <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl w-full sm:w-auto cursor-pointer hover:bg-page">
              <Calendar className="w-4 h-4 text-[var(--text-disabled)]" />
              <span className="text-sm font-bold text-secondary">Oct 03, 2026</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        {activeTab === 'daily' ? (
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-page border-b border-border/50 text-[var(--text-disabled)] text-xs uppercase tracking-wider font-bold">
                  <th className="p-4 w-24 text-center">Room</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Marked Status</th>
                  <th className="p-4">Entry Time</th>
                  <th className="p-4">Remarks</th>
                  <th className="p-4 text-center">Admin Correction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAttendance.map((record) => (
                  <tr key={record.id} className="hover:bg-page/50 transition-colors">
                    <td className="p-4 text-center">
                      <span className="w-10 h-10 rounded-full bg-[var(--bg-overlay)] border border-border flex items-center justify-center font-black text-primary mx-auto">
                        {record.room}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-primary text-sm">{record.student}</span>
                    </td>
                    <td className="p-4">
                      <div className={`px-2.5 py-1.5 text-xs font-bold uppercase rounded-lg border flex items-center gap-1.5 w-max ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)} {record.status}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-semibold text-secondary">{record.time}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs text-[var(--text-disabled)]">{record.remarks}</span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center">
                        <select className="px-3 py-1.5 text-xs font-bold text-secondary bg-card border border-border rounded-lg focus:outline-none focus:border-[#F5A623] cursor-pointer hover:bg-page">
                          <option>Edit...</option>
                          <option>Mark Present</option>
                          <option>Mark Absent</option>
                          <option>Mark Late</option>
                          <option>Mark Leave</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredAttendance.length === 0 && (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <CalendarCheck className="w-12 h-12 text-gray-200 mb-4" />
                <h3 className="text-lg font-bold text-primary mb-1">No records found</h3>
                <p className="text-[var(--text-disabled)] text-sm">No students match your search criteria for this date.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-page/30">
            <CalendarDays className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">Monthly Grid View</h3>
            <p className="text-[var(--text-disabled)] max-w-md">The monthly attendance grid showing an interactive 30-day view for all students will be rendered here. You can hover over any date to apply bulk corrections.</p>
          </div>
        )}
      </div>
    </div>
  );
}
