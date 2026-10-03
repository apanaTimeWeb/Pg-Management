'use client';

import React from 'react';
import { 
  IndianRupee, Bell, Home, User, CheckCircle2, Download
} from 'lucide-react';

export default function ParentDashboardPage() {
  
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <Home className="w-6 h-6"/>
            </div>
            Parent Dashboard
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Monitor your ward's parent dashboard at Smart PG.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card border border-border text-primary hover:bg-page px-5 py-2.5 rounded-xl text-sm font-bold transition-all">
            <Download className="w-4 h-4" /> Download Report
          </button>
        </div>
      </div>

      {/* Content View */}
      <div className="bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden p-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center flex flex-col items-center justify-center min-h-[200px]">
             <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
               <User className="w-8 h-8 text-blue-600" />
             </div>
             <h3 className="font-bold text-primary text-lg">Ward Profile</h3>
             <p className="text-sm text-secondary mt-1">Room 304, Alpha Building</p>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center flex flex-col items-center justify-center min-h-[200px]">
             <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
               <CheckCircle2 className="w-8 h-8 text-green-600" />
             </div>
             <h3 className="font-bold text-primary text-lg">Today's Attendance</h3>
             <p className="text-sm text-green-600 font-bold mt-1">Present (Checked in at 8:15 AM)</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
