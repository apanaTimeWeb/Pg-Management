'use client';

import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Eye, Edit3, CheckCircle2, User, Users,
  MessageCircle, DoorOpen, IndianRupee, CreditCard, Droplet, Package, 
  CalendarOff, BarChart3, Bed, Settings, UserCog, UserCheck, Wrench, UserPlus, ClipboardCheck, FileText, Utensils
} from 'lucide-react';

export default function ManagerMessFoodLogPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <Utensils className="w-6 h-6"/>
            </div>
            Mess & Food Log
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage mess & food log and daily PG operations.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-gradient-to-r from-[#1A3A5C] to-[#122a42] hover:from-[#152e4a] hover:to-[#0f2338] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all">
            <Plus className="w-4 h-4" /> Add Record
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/30">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search records..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-input border border-border rounded-xl text-sm font-bold text-secondary hover:text-primary hover:bg-page transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {/* Content View */}
        
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-page rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg"><Utensils className="w-6 h-6 text-blue-600"/></div>
                <div>
                  <p className="font-bold text-primary text-sm">Action Item {item}</p>
                  <p className="text-xs text-secondary mt-0.5">Updated on 0{item} Oct 2026</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                Manage
              </button>
            </div>
          ))}
        </div>
        
        
      </div>
    </div>
  );
}
