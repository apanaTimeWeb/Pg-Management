// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { Search, Filter, Plus, CheckCircle, XCircle, Clock, CalendarCheck, FileText, CheckSquare } from 'lucide-react';

const MOCK_ATTENDANCE = [
  { id: 'STU-101', name: 'Rahul Sharma', room: '101A', status: 'Present', time: '08:30 AM', date: '05 Oct 2026' },
  { id: 'STU-102', name: 'Amit Kumar', room: '102B', status: 'Absent', time: '-', date: '05 Oct 2026' },
  { id: 'STU-103', name: 'Sneha Singh', room: '103A', status: 'On Leave', time: '-', date: '05 Oct 2026' },
  { id: 'STU-104', name: 'Priya Verma', room: '104C', status: 'Present', time: '08:45 AM', date: '05 Oct 2026' },
];

export default function StudentAttendancePage() {
  const [attendance, setAttendance] = useState(MOCK_ATTENDANCE);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredData = attendance.filter(record => {
    if (searchTerm && !record.name.toLowerCase().includes(searchTerm.toLowerCase()) && !record.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const presentCount = filteredData.filter(d => d.status === 'Present').length;
  const absentCount = filteredData.filter(d => d.status === 'Absent').length;
  const leaveCount = filteredData.filter(d => d.status === 'On Leave').length;

  const markStatus = (id, newStatus) => {
    setAttendance(prev => prev.map(record => {
      if(record.id === id) {
        return { ...record, status: newStatus, time: newStatus === 'Present' ? new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '-' };
      }
      return record;
    }));
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><CalendarCheck className="w-6 h-6 text-[#1A3A5C]"/> Student Attendance</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Mark and view daily student attendance.</p>
        </div>
        <div className="flex items-center gap-3">
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-card border border-border text-primary px-4 py-2 rounded-xl text-sm font-bold shadow-sm focus:outline-none focus:border-[#F5A623]"
          />
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <CheckSquare className="w-4 h-4" /> Bulk Mark
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-100 text-green-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-secondary uppercase">Present Today</p>
            <h3 className="text-xl font-black text-primary">{presentCount}</h3>
          </div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-red-100 text-red-600">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-secondary uppercase">Absent</p>
            <h3 className="text-xl font-black text-primary">{absentCount}</h3>
          </div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-secondary uppercase">On Leave</p>
            <h3 className="text-xl font-black text-primary">{leaveCount}</h3>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search by student name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] text-primary transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-input border border-border rounded-xl text-sm font-semibold text-secondary hover:text-primary transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-page/30 text-[10px] uppercase tracking-wider text-secondary">
                <th className="p-4 font-bold">Student</th>
                <th className="p-4 font-bold">Room</th>
                <th className="p-4 font-bold">Date & Time</th>
                <th className="p-4 font-bold">Current Status</th>
                <th className="p-4 font-bold text-right">Quick Mark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredData.map((record, idx) => (
                <tr key={idx} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary">{record.name}</p>
                    <p className="text-[10px] text-[var(--text-disabled)] mt-0.5 font-mono">{record.id}</p>
                  </td>
                  <td className="p-4 text-sm font-semibold text-secondary">{record.room}</td>
                  <td className="p-4 text-sm text-secondary font-medium">
                    {record.date} <br/>
                    <span className="text-[10px] text-[var(--text-disabled)]">{record.time}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 border rounded-md text-[10px] font-bold uppercase tracking-wide 
                      ${record.status === 'Present' ? 'bg-green-100 text-green-700 border-green-200' : 
                        record.status === 'Absent' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => markStatus(record.id, 'Present')} className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg border border-transparent hover:border-green-200 transition-all" title="Mark Present"><CheckCircle className="w-4 h-4" /></button>
                      <button onClick={() => markStatus(record.id, 'Absent')} className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-200 transition-all" title="Mark Absent"><XCircle className="w-4 h-4" /></button>
                      <button onClick={() => markStatus(record.id, 'On Leave')} className="p-1.5 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg border border-transparent hover:border-yellow-200 transition-all" title="Mark On Leave"><Clock className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr><td colSpan="5" className="p-8 text-center text-secondary font-medium">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Bulk Mark Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-[#1A3A5C] text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-blue-400" /> Bulk Mark
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">X</button>
            </div>
            <div className="p-6 space-y-4 bg-page/50 text-center">
              <p className="text-sm font-semibold text-primary">Mark all unmarked students as Present for today?</p>
              <p className="text-xs text-secondary">This action will update all students who are currently not marked.</p>
            </div>
            <div className="p-5 border-t border-border/50 bg-card flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 bg-[var(--bg-overlay)] text-secondary rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => {
                setAttendance(prev => prev.map(r => r.status === 'Absent' ? { ...r, status: 'Present', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) } : r));
                setIsModalOpen(false);
              }} className="px-5 py-2 bg-[#1A3A5C] text-white rounded-xl font-bold">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}