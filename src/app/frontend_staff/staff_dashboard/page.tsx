'use client';

import React from 'react';
import { 
  Bell, Home, User, CheckSquare, Wrench, Package, Utensils
} from 'lucide-react';

export default function StaffDashboardPage() {
  
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-xl text-slate-100">
              <Home className="w-6 h-6"/>
            </div>
            Staff Dashboard
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage staff dashboard at Smart PG.</p>
        </div>
      </div>

      {/* Content View */}
      <div className="bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden p-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center">
             <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <CheckSquare className="w-8 h-8 text-blue-600" />
             </div>
             <h3 className="font-bold text-primary text-lg">3 Tasks</h3>
             <p className="text-sm text-secondary mt-1">Pending today</p>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center">
             <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <User className="w-8 h-8 text-green-600" />
             </div>
             <h3 className="font-bold text-primary text-lg">Present</h3>
             <p className="text-sm text-green-600 font-bold mt-1">Checked in at 07:00 AM</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
