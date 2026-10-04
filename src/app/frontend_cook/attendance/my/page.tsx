'use client';

import React, { useState } from 'react';
import { 
  CalendarDays, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  CalendarX2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';

type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Leave';

interface AttendanceRecord {
  date: string;
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  note?: string;
}

const MOCK_ATTENDANCE: Record<string, AttendanceRecord> = {
  '2026-10-04': { date: '2026-10-04', status: 'Present', checkIn: '06:05 AM' }, // Today
  '2026-10-03': { date: '2026-10-03', status: 'Present', checkIn: '05:50 AM', checkOut: '09:10 PM' },
  '2026-10-02': { date: '2026-10-02', status: 'Late', checkIn: '07:15 AM', checkOut: '09:00 PM', note: 'Bus delayed' },
  '2026-10-01': { date: '2026-10-01', status: 'Present', checkIn: '05:55 AM', checkOut: '09:05 PM' },
  '2026-09-30': { date: '2026-09-30', status: 'Leave', note: 'Medical leave approved' },
  '2026-09-29': { date: '2026-09-29', status: 'Present', checkIn: '06:00 AM', checkOut: '09:00 PM' },
  '2026-09-28': { date: '2026-09-28', status: 'Absent' },
};

const getStatusConfig = (status: AttendanceStatus) => {
  switch (status) {
    case 'Present': return { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200' };
    case 'Absent': return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200' };
    case 'Late': return { icon: Clock, color: 'text-orange-500', bg: 'bg-orange-100', border: 'border-orange-200' };
    case 'Leave': return { icon: CalendarX2, color: 'text-blue-500', bg: 'bg-blue-100', border: 'border-blue-200' };
  }
};

export default function MyAttendancePage() {
  // Stats calculation
  const totalDays = Object.keys(MOCK_ATTENDANCE).length;
  const present = Object.values(MOCK_ATTENDANCE).filter(r => r.status === 'Present').length;
  const absent = Object.values(MOCK_ATTENDANCE).filter(r => r.status === 'Absent').length;
  const late = Object.values(MOCK_ATTENDANCE).filter(r => r.status === 'Late').length;
  const leave = Object.values(MOCK_ATTENDANCE).filter(r => r.status === 'Leave').length;

  const todayStr = '2026-10-04'; // Mock today date
  const todayRecord = MOCK_ATTENDANCE[todayStr];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <CalendarDays className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">My Attendance</h1>
            <p className="text-sm text-secondary">View your daily attendance records (Marked by Manager)</p>
          </div>
        </div>

        {/* Read-only restriction badge */}
        <div className="flex items-center gap-2 bg-page border border-border px-3 py-1.5 rounded-full shadow-sm">
          <Info className="w-4 h-4 text-secondary" />
          <span className="text-xs font-medium text-secondary">Read-Only Access</span>
        </div>
      </div>

      {/* Today's Status Banner */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${todayRecord ? getStatusConfig(todayRecord.status).bg : 'bg-secondary/10'}`}>
            {todayRecord ? (
              React.createElement(getStatusConfig(todayRecord.status).icon, { className: `w-8 h-8 ${getStatusConfig(todayRecord.status).color}` })
            ) : (
              <Calendar className="w-8 h-8 text-secondary" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary">Today, 04 Oct 2026</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-medium text-secondary">Status:</span>
              {todayRecord ? (
                <span className={`text-sm font-bold ${getStatusConfig(todayRecord.status).color}`}>
                  {todayRecord.status}
                </span>
              ) : (
                <span className="text-sm font-semibold text-warning">Pending Manager Approval</span>
              )}
            </div>
          </div>
        </div>

        {todayRecord && todayRecord.checkIn && (
          <div className="flex gap-6 border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto">
            <div>
              <span className="block text-xs font-medium text-secondary mb-1">Check In</span>
              <span className="block text-sm font-bold text-primary">{todayRecord.checkIn}</span>
            </div>
            {todayRecord.checkOut ? (
              <div>
                <span className="block text-xs font-medium text-secondary mb-1">Check Out</span>
                <span className="block text-sm font-bold text-primary">{todayRecord.checkOut}</span>
              </div>
            ) : (
              <div>
                <span className="block text-xs font-medium text-secondary mb-1">Check Out</span>
                <span className="block text-sm font-semibold text-secondary">--:-- --</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm text-center">
          <div className="mx-auto w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-2xl font-black text-primary">{present}</h3>
          <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Present</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm text-center">
          <div className="mx-auto w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-2">
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="text-2xl font-black text-primary">{late}</h3>
          <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Late</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 shadow-sm text-center">
          <div className="mx-auto w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
            <CalendarX2 className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-2xl font-black text-primary">{leave}</h3>
          <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Leave</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 shadow-sm text-center">
          <div className="mx-auto w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-2xl font-black text-primary">{absent}</h3>
          <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Absent</p>
        </div>
      </div>

      {/* Attendance History List */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-page/30 flex items-center justify-between">
          <h2 className="text-base font-bold text-primary">Attendance History (Oct 2026)</h2>
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-page rounded-md text-secondary transition-colors border border-transparent hover:border-border">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold px-2">Oct 2026</span>
            <button className="p-1.5 hover:bg-page rounded-md text-secondary transition-colors border border-transparent hover:border-border">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-border">
          {Object.values(MOCK_ATTENDANCE).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((record) => {
            const { icon: Icon, color, bg, border } = getStatusConfig(record.status);
            
            return (
              <div key={record.date} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-page/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${bg} ${border}`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary">
                      {new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(record.date))}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs font-bold ${color}`}>{record.status}</span>
                      {record.note && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-border"></span>
                          <span className="text-xs text-secondary truncate max-w-[200px]">{record.note}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pl-14 sm:pl-0">
                  <div className="text-center sm:text-right">
                    <span className="block text-[10px] font-bold text-secondary uppercase tracking-wider">Check In</span>
                    <span className="text-sm font-medium text-primary">{record.checkIn || '--:--'}</span>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div className="text-center sm:text-left">
                    <span className="block text-[10px] font-bold text-secondary uppercase tracking-wider">Check Out</span>
                    <span className="text-sm font-medium text-primary">{record.checkOut || '--:--'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
