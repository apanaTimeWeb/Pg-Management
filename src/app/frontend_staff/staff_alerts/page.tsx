'use client';

import React from 'react';
import { 
  Bell, Home, User, CheckSquare, Wrench, Package, Utensils
} from 'lucide-react';

export default function AlertsPage() {
  
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-xl text-slate-100">
              <Bell className="w-6 h-6"/>
            </div>
            Alerts
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage alerts at Smart PG.</p>
        </div>
      </div>

      {/* Content View */}
      <div className="bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden p-6">
        
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-5 bg-page border border-border rounded-xl">
             <div className="p-2 bg-blue-100 rounded-full shrink-0"><Bell className="w-5 h-5 text-blue-600" /></div>
             <div>
                <h4 className="font-bold text-primary text-sm">Manager Meeting</h4>
                <p className="text-xs text-secondary mt-1">All staff members are required to gather at the reception at 5:00 PM today.</p>
                <p className="text-[10px] text-blue-500 font-bold mt-2">1 hour ago</p>
             </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
