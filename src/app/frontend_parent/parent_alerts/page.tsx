'use client';

import React from 'react';
import { 
  IndianRupee, Bell, Home, User, CheckCircle2, Download
} from 'lucide-react';

export default function SafetyAlertsPage() {
  
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <Bell className="w-6 h-6"/>
            </div>
            Safety Alerts
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Monitor your ward's safety alerts at Smart PG.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card border border-border text-primary hover:bg-page px-5 py-2.5 rounded-xl text-sm font-bold transition-all">
            <Download className="w-4 h-4" /> Download Report
          </button>
        </div>
      </div>

      {/* Content View */}
      <div className="bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden p-6">
        
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-5 bg-red-50 border border-red-100 rounded-xl">
             <div className="p-2 bg-red-100 rounded-full shrink-0"><Bell className="w-5 h-5 text-red-600" /></div>
             <div>
                <h4 className="font-bold text-red-900 text-sm">Gate Pass Alert</h4>
                <p className="text-xs text-red-700 mt-1">Your ward requested a night-out pass for 15 Oct 2026. Please approve via the SMS link sent to your registered mobile number.</p>
                <p className="text-[10px] text-red-500 font-bold mt-2">2 hours ago</p>
             </div>
          </div>
          
          <div className="flex items-start gap-4 p-5 bg-blue-50 border border-blue-100 rounded-xl">
             <div className="p-2 bg-blue-100 rounded-full shrink-0"><Bell className="w-5 h-5 text-blue-600" /></div>
             <div>
                <h4 className="font-bold text-blue-900 text-sm">Monthly Attendance Report</h4>
                <p className="text-xs text-blue-700 mt-1">Your ward's attendance for September was 92%. They were marked absent on 3 days.</p>
                <p className="text-[10px] text-blue-500 font-bold mt-2">01 Oct 2026</p>
             </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
