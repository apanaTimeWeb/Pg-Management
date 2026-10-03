'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CalendarCheck, CheckCircle2, XCircle, Clock, AlertCircle, 
  TrendingUp, ChevronLeft, ChevronRight, AlertTriangle, Send, X
} from 'lucide-react';
import { toast } from 'sonner';

type AttStatus = 'P' | 'A' | 'L' | 'LT';

const ATT_CALENDAR: { date: number; status: AttStatus }[] = [
  { date: 1, status: 'P' }, { date: 2, status: 'P' }, { date: 3, status: 'L' },
  { date: 4, status: 'P' }, { date: 5, status: 'LT' }, { date: 6, status: 'P' },
  { date: 7, status: 'P' }, { date: 8, status: 'P' }, { date: 9, status: 'A' },
  { date: 10, status: 'P' }, { date: 11, status: 'P' }, { date: 12, status: 'P' },
  { date: 13, status: 'P' }, { date: 14, status: 'LT' }, { date: 15, status: 'P' },
  { date: 16, status: 'P' }, { date: 17, status: 'P' }, { date: 18, status: 'P' },
  { date: 19, status: 'P' }, { date: 20, status: 'P' }, { date: 21, status: 'L' },
  { date: 22, status: 'L' }, { date: 23, status: 'P' }, { date: 24, status: 'P' },
  { date: 25, status: 'P' }, { date: 26, status: 'P' }, { date: 27, status: 'A' },
  { date: 28, status: 'P' }, { date: 29, status: 'P' }, { date: 30, status: 'P' },
];

const getStatusStyle = (status: AttStatus) => {
  switch (status) {
    case 'P': return 'bg-success text-white border-success';
    case 'A': return 'bg-danger text-white border-danger';
    case 'L': return 'bg-info text-white border-info';
    case 'LT': return 'bg-warning text-white border-warning';
    default: return 'bg-input text-secondary border-border';
  }
};

const present = ATT_CALENDAR.filter(d => d.status === 'P').length;
const absent = ATT_CALENDAR.filter(d => d.status === 'A').length;
const leave = ATT_CALENDAR.filter(d => d.status === 'L').length;
const late = ATT_CALENDAR.filter(d => d.status === 'LT').length;
const percentage = Math.round((present / ATT_CALENDAR.length) * 100);

export function StudentAttendanceMain() {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get('view');
  const initialTab = viewParam === 'correction' ? 'correction' : 'monthly';
  const [activeTab, setActiveTab] = useState<'monthly' | 'correction'>(initialTab);
  const [correctionDate, setCorrectionDate] = useState('');
  const [correctionReason, setCorrectionReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!correctionDate || !correctionReason.trim()) {
      toast.error('Please fill all fields'); return;
    }
    setSubmitted(true);
    toast.success('Correction request submitted to manager!');
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6 text-info" />
          </div>
          My Attendance
        </h1>
        <p className="text-sm text-secondary mt-2 font-medium">Track your daily attendance and apply for corrections.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Total Days', value: ATT_CALENDAR.length, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Present', value: present, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Absent', value: absent, color: 'text-danger', bg: 'bg-danger/10' },
          { label: 'Leave', value: leave, color: 'text-info', bg: 'bg-info/10' },
          { label: 'Late', value: late, color: 'text-warning', bg: 'bg-warning/10' },
        ].map(card => (
          <div key={card.label} className="bg-card border border-border rounded-2xl p-4 shadow-sm text-center">
            <p className={`text-2xl md:text-3xl font-black ${card.color}`}>{card.value}</p>
            <p className="text-xs font-bold text-secondary mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Attendance % */}
      <div className="bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20 rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="font-black text-primary">Attendance Rate</span>
          </div>
          <span className={`text-2xl font-black ${percentage >= 75 ? 'text-success' : 'text-danger'}`}>{percentage}%</span>
        </div>
        <div className="w-full h-3 bg-input rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${percentage >= 75 ? 'bg-success' : 'bg-danger'}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-xs font-medium text-secondary mt-2">{percentage >= 75 ? 'Good! Keep it up.' : 'Warning: Below 75% attendance threshold.'}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-card border border-border rounded-xl p-1.5 w-fit">
        <button onClick={() => setActiveTab('monthly')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'monthly' ? 'bg-primary text-white shadow-md' : 'text-secondary hover:text-primary'}`}>
          Monthly Calendar
        </button>
        <button onClick={() => setActiveTab('correction')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'correction' ? 'bg-primary text-white shadow-md' : 'text-secondary hover:text-primary'}`}>
          Request Correction
        </button>
      </div>

      {activeTab === 'monthly' && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-primary">October 2026</h3>
            <div className="flex items-center gap-4 text-xs font-bold flex-wrap gap-y-2">
              <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-success inline-block"></span>P = Present</span>
              <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-danger inline-block"></span>A = Absent</span>
              <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-info inline-block"></span>L = Leave</span>
              <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-warning inline-block"></span>LT = Late</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-center text-xs font-black text-secondary py-2">{d}</div>
            ))}
            {/* Offset for October 2026 (starts on Thursday = 4) */}
            {Array.from({ length: 3 }).map((_, i) => <div key={`empty-${i}`}></div>)}
            {ATT_CALENDAR.map(({ date, status }) => (
              <div key={date} className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-center ${getStatusStyle(status)}`}>
                <span className="text-xs font-black">{date}</span>
                <span className="text-[9px] font-black opacity-90">{status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'correction' && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-10">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-black text-primary mb-2">Request Submitted!</h3>
              <p className="text-sm text-secondary mb-6">Manager will review your correction request and respond shortly.</p>
              <button onClick={() => { setSubmitted(false); setCorrectionDate(''); setCorrectionReason(''); }} className="bg-primary text-white font-bold text-sm px-6 py-2 rounded-xl">New Request</button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="bg-warning/5 border border-warning/20 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-warning/90">You cannot directly edit your attendance. Submit a correction request and Manager will review it.</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Date of Wrong Attendance *</label>
                <input type="date" value={correctionDate} onChange={(e) => setCorrectionDate(e.target.value)} className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Current Marked Status</label>
                <select className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm appearance-none">
                  <option>Absent (A)</option>
                  <option>Late (LT)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Reason for Correction *</label>
                <textarea rows={3} placeholder="Explain why the attendance is incorrect..." value={correctionReason} onChange={(e) => setCorrectionReason(e.target.value)} className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm resize-none"></textarea>
              </div>
              <button onClick={handleSubmit} className="w-full bg-primary text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Submit Correction Request
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
