'use client';

import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Eye, Edit3, CheckCircle2, User, Users,
  MessageCircle, DoorOpen, IndianRupee, CreditCard, Droplet, Package, 
  CalendarOff, BarChart3, Bed, Settings, UserCog, UserCheck, Wrench, UserPlus, ClipboardCheck, FileText, Utensils
} from 'lucide-react';

export default function ManagerSettingsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 w-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <Settings className="w-6 h-6"/>
            </div>
            Settings
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage settings and daily PG operations.</p>
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
        
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-page rounded-full flex items-center justify-center mx-auto mb-4 border border-border shadow-sm">
            <Settings className="w-8 h-8 text-secondary" />
          </div>
          <h3 className="text-lg font-bold text-primary">No Records Found</h3>
          <p className="text-secondary text-sm mt-1 max-w-sm mx-auto">There are currently no active records here. Click the button above to add a new record.</p>
        </div>
        
        
      </div>
    </div>
  );
}
