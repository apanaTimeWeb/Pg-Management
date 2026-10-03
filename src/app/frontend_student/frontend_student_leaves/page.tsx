'use client';

import React from 'react';
import { 
  CalendarOff, Download, Edit3, Plus, Search, Info, MessageSquareWarning, CalendarOff, Utensils, AlertCircle, CheckCircle2
} from 'lucide-react';

export default function StudentLeavesOutingPage() {
  
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-2xl shadow-sm border border-border/50">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600">
              <CalendarOff className="w-6 h-6"/>
            </div>
            Leaves & Outing
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-2 font-medium">Apply for leaves and night outs.</p>
        </div>
        
        <div className="flex items-center gap-3">
          
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              <Plus className="w-4 h-4" /> Apply Leave
            </button>
    
        </div>
      </div>

      {/* Dynamic Content Based on Page */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Main Info Card */}
        <div className="md:col-span-8 bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
          <div className="p-6 border-b border-border/50 bg-page/30 flex items-center justify-between">
            <h3 className="font-bold text-primary flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500"/>
              Leaves & Outing Overview
            </h3>
          </div>
          <div className="p-6">
            
              <div className="space-y-4">
                {[
                  { reason: 'Going Home', date: '10 Oct 2026 - 15 Oct 2026', status: 'Approved' },
                  { reason: 'Night Out with friends', date: '04 Oct 2026', status: 'Pending' }
                ].map((leave, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-page rounded-xl border border-border">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-card rounded-lg border border-border"><CalendarOff className="w-5 h-5 text-secondary"/></div>
                      <div>
                        <p className="font-bold text-primary text-sm">{leave.reason}</p>
                        <p className="text-xs text-secondary mt-0.5">{leave.date}</p>
                      </div>
                    </div>
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded inline-block uppercase ${leave.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>{leave.status}</span>
                    </div>
                  </div>
                ))}
              </div>
    
          </div>
        </div>

        {/* Sidebar Card */}
        <div className="md:col-span-4 bg-gradient-to-br from-[#1A3A5C] to-[#122a42] rounded-2xl shadow-lg border border-blue-800 p-6 text-white h-max">
          <h3 className="font-bold mb-4 flex items-center gap-2 opacity-90"><AlertCircle className="w-5 h-5"/> Notice Board</h3>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
              <p className="text-xs uppercase font-bold text-blue-200 mb-1">Upcoming Event</p>
              <h3 className="text-sm font-bold">Diwali Celebration</h3>
              <p className="text-xs text-blue-200 mt-1">Check the mess menu for special dinner details.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
              <p className="text-xs uppercase font-bold text-blue-200 mb-1">Rules Reminder</p>
              <p className="text-xs text-blue-200">Main gate closes at 10:30 PM. Please apply for a night out if you will be late.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
