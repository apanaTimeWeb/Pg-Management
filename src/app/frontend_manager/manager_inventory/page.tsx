'use client';

import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Eye, Edit3, CheckCircle2, User, Users,
  MessageCircle, DoorOpen, IndianRupee, CreditCard, Droplet, Package, 
  CalendarOff, BarChart3, Bed, Settings, UserCog, UserCheck, Wrench, UserPlus, ClipboardCheck, FileText, Utensils
} from 'lucide-react';

export default function ManagerStockInventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <Package className="w-6 h-6"/>
            </div>
            Stock & Inventory
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage stock & inventory and daily PG operations.</p>
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
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-page/30 text-[11px] uppercase tracking-wider text-secondary">
                <th className="p-4 font-bold">Record ID</th>
                <th className="p-4 font-bold">Details</th>
                <th className="p-4 font-bold">Timestamp</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {[1, 2, 3].map((item, idx) => (
                <tr key={idx} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary">REC-00{item}</p>
                  </td>
                  <td className="p-4 text-sm text-secondary font-medium">
                    <p className="text-primary font-bold">Sample Entry Data {item}</p>
                    <p className="mt-0.5 text-xs text-secondary flex items-center gap-1">Related info for row</p>
                  </td>
                  <td className="p-4 text-sm font-medium text-secondary">0{item} Oct 2026</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-md text-[10px] font-bold uppercase tracking-wide">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-600 hover:text-blue-700 bg-blue-50 rounded-lg border border-blue-200" title="View"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-green-600 hover:text-green-700 bg-green-50 rounded-lg border border-green-200" title="Approve"><CheckCircle2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        
      </div>
    </div>
  );
}
