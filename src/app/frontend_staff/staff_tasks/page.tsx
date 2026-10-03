'use client';

import React from 'react';
import { 
  Bell, Home, User, CheckSquare, Wrench, Package, Utensils
} from 'lucide-react';

export default function DailyTasksPage() {
  
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-xl text-slate-100">
              <CheckSquare className="w-6 h-6"/>
            </div>
            Daily Tasks
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage daily tasks at Smart PG.</p>
        </div>
      </div>

      {/* Content View */}
      <div className="bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden p-6">
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-primary">Pending Maintenance</h3>
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">2 Tasks Left</span>
          </div>
          {[
            { room: 'Room 102', issue: 'Clean bathroom', status: 'Pending', time: '10:00 AM' },
            { room: 'Room 304', issue: 'Fix AC leaking', status: 'Pending', time: '11:30 AM' }
          ].map((task, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-page rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-card rounded-lg border border-border"><Wrench className="w-5 h-5 text-orange-500"/></div>
                <div>
                  <p className="font-bold text-primary text-sm">{task.issue}</p>
                  <p className="text-xs text-secondary mt-0.5">{task.room} • {task.time}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-bold shadow-sm transition-colors">
                Mark Done
              </button>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
