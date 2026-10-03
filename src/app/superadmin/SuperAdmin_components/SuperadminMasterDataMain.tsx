'use client';

import React, { useState } from 'react';
import { Database, Plus, Search, Filter, Download, Edit, Trash2, Eye, Power, PowerOff, Building2, LayoutGrid, Bed, Wifi, GraduationCap, FileText, FileBadge, Receipt, CreditCard, AlertTriangle, Wrench, CalendarOff, UserPlus, Utensils, IndianRupee, Bell, MoreVertical } from 'lucide-react';

export function SuperadminMasterDataMain() {
  const [activeMaster, setActiveMaster] = useState('pgTypes');

  const masterList = [
    { id: 'pgTypes', label: 'PG Types', icon: Building2, color: 'text-info' },
    { id: 'roomTypes', label: 'Room Types', icon: LayoutGrid, color: 'text-success' },
    { id: 'bedTypes', label: 'Bed Types', icon: Bed, color: 'text-purple' },
    { id: 'facilities', label: 'Room Facilities', icon: Wifi, color: 'text-theme-primary' },
    { id: 'studentCat', label: 'Student Categories', icon: GraduationCap, color: 'text-warning' },
    { id: 'docTypes', label: 'Document Types', icon: FileText, color: 'text-danger' },
    { id: 'idProofTypes', label: 'ID Proof Types', icon: FileBadge, color: 'text-info' },
    { id: 'feeTypes', label: 'Fee Types', icon: Receipt, color: 'text-success' },
    { id: 'paymentModes', label: 'Payment Modes', icon: CreditCard, color: 'text-purple' },
    { id: 'complaints', label: 'Complaint Categories', icon: AlertTriangle, color: 'text-danger' },
    { id: 'maintenance', label: 'Maintenance Categories', icon: Wrench, color: 'text-warning' },
    { id: 'leaveTypes', label: 'Leave Types', icon: CalendarOff, color: 'text-info' },
    { id: 'visitorTypes', label: 'Visitor Types', icon: UserPlus, color: 'text-success' },
    { id: 'mealTypes', label: 'Meal Types', icon: Utensils, color: 'text-theme-primary' },
    { id: 'expenses', label: 'Expense Categories', icon: IndianRupee, color: 'text-danger' },
    { id: 'notifications', label: 'Notification Types', icon: Bell, color: 'text-warning' },
  ];

  // Dummy data based on selected master
  const getDummyData = (masterId: string) => {
    switch (masterId) {
      case 'pgTypes': return [ { name: 'Boys PG', code: 'BPG', status: 'Active' }, { name: 'Girls PG', code: 'GPG', status: 'Active' }, { name: 'Co-ed PG', code: 'CPG', status: 'Inactive' } ];
      case 'roomTypes': return [ { name: 'Single AC', code: 'SAC', status: 'Active' }, { name: 'Double Non-AC', code: 'DNAC', status: 'Active' } ];
      case 'facilities': return [ { name: 'WiFi', code: 'WFI', status: 'Active' }, { name: 'Laundry', code: 'LND', status: 'Active' }, { name: 'Gym', code: 'GYM', status: 'Inactive' } ];
      case 'paymentModes': return [ { name: 'UPI', code: 'UPI', status: 'Active' }, { name: 'Credit Card', code: 'CC', status: 'Active' }, { name: 'Cash', code: 'CASH', status: 'Active' } ];
      case 'complaints': return [ { name: 'Plumbing', code: 'PLM', status: 'Active' }, { name: 'Electrical', code: 'ELE', status: 'Active' }, { name: 'Internet', code: 'INT', status: 'Active' } ];
      default: return [ { name: 'General Item 1', code: 'GI1', status: 'Active' }, { name: 'General Item 2', code: 'GI2', status: 'Active' } ];
    }
  };

  const currentData = getDummyData(activeMaster);
  const activeMasterDetails = masterList.find(m => m.id === activeMaster);
  const ActiveIcon = activeMasterDetails?.icon || Database;

  return (
    <div className="w-full h-full space-y-6 pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <Database className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <Database className="w-8 h-8" /> Master Data Management
            </h1>
            <p className="text-white/80 font-medium max-w-xl">
              Global configurable settings and dropdown values across the entire SmartPG platform.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[700px]">
        
        {/* Sidebar List (Scrollable) */}
        <div className="w-full lg:w-72 shrink-0 bg-card border border-border/50 rounded-3xl p-4 shadow-sm flex flex-col h-full overflow-hidden">
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search masters..." className="w-full pl-9 pr-4 py-2 bg-bg-page border border-border/50 rounded-xl text-sm focus:ring-2 focus:ring-theme-primary font-medium" />
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 pr-2 scrollbar-hide">
            {masterList.map((master) => (
              <button
                key={master.id}
                onClick={() => setActiveMaster(master.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeMaster === master.id 
                    ? 'bg-theme-primary/10 text-theme-primary shadow-sm border border-theme-primary/20' 
                    : 'text-secondary hover:bg-bg-page hover:text-primary border border-transparent'
                }`}
              >
                <master.icon className={`w-4 h-4 ${activeMaster === master.id ? 'text-theme-primary' : master.color}`} />
                {master.label}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table Area */}
        <div className="flex-1 bg-card border border-border/50 rounded-3xl shadow-sm flex flex-col h-full overflow-hidden animate-in fade-in slide-in-from-right-8 duration-500 relative">
          <div className={`absolute -right-10 -bottom-10 w-48 h-48 bg-theme-primary/10 rounded-full blur-3xl`}></div>
          
          {/* Toolbar */}
          <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-bg-page/50 z-10">
            <div className="flex items-center gap-3">
               <div className={`p-2 rounded-xl bg-theme-primary/10 text-theme-primary`}><ActiveIcon className="w-6 h-6" /></div>
               <h2 className="text-xl font-black text-primary">{activeMasterDetails?.label}</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder={`Search ${activeMasterDetails?.label}...`} className="pl-9 pr-4 py-2 w-48 bg-card border border-border/50 rounded-xl text-sm focus:ring-2 focus:ring-theme-primary font-medium" />
              </div>
              <button className="p-2 border border-border/50 bg-card rounded-xl text-secondary hover:text-primary transition-colors" title="Filter"><Filter className="w-4 h-4" /></button>
              <button className="p-2 border border-border/50 bg-card rounded-xl text-secondary hover:text-primary transition-colors" title="Export CSV/Excel"><Download className="w-4 h-4" /></button>
              <button className="bg-theme-primary hover:bg-theme-primary-hover text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm shadow-sm">
                <Plus className="w-4 h-4" /> Add New
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto z-10 p-2">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="sticky top-0 bg-card shadow-sm">
                <tr>
                  <th className="py-3 px-6 text-xs font-bold text-secondary uppercase tracking-wider cursor-pointer hover:text-primary">Name <span className="ml-1 text-[10px]">▼</span></th>
                  <th className="py-3 px-6 text-xs font-bold text-secondary uppercase tracking-wider cursor-pointer hover:text-primary">Code <span className="ml-1 text-[10px]">▼</span></th>
                  <th className="py-3 px-6 text-xs font-bold text-secondary uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs font-bold text-secondary uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {currentData.map((row, i) => (
                  <tr key={i} className="hover:bg-bg-page/80 transition-colors group">
                    <td className="py-4 px-6 text-sm font-bold text-primary group-hover:text-theme-primary transition-colors">{row.name}</td>
                    <td className="py-4 px-6 text-sm font-mono text-secondary bg-bg-page/50 rounded px-2">{row.code}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${row.status === 'Active' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                        {row.status === 'Active' ? <Power className="w-3 h-3" /> : <PowerOff className="w-3 h-3" />}
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-info hover:bg-info/10 rounded-lg transition-colors tooltip" title="View Details"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 text-theme-primary hover:bg-theme-primary/10 rounded-lg transition-colors tooltip" title="Edit Record"><Edit className="w-4 h-4" /></button>
                        <button className={`p-1.5 ${row.status === 'Active' ? 'text-warning hover:bg-warning/10' : 'text-success hover:bg-success/10'} rounded-lg transition-colors tooltip`} title={row.status === 'Active' ? 'Deactivate' : 'Activate'}>
                           {row.status === 'Active' ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                        </button>
                        <button className="p-1.5 text-danger hover:bg-danger/10 rounded-lg transition-colors tooltip" title="Delete Permanently"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {currentData.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-secondary font-medium">No records found. Click "Add New" to create one.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-border/50 bg-bg-page/50 flex items-center justify-between text-sm z-10">
            <span className="text-secondary font-medium">Showing 1 to {currentData.length} of {currentData.length} entries</span>
            <div className="flex items-center gap-2">
               <button className="px-3 py-1 bg-card border border-border/50 rounded-lg text-secondary hover:text-primary disabled:opacity-50 font-bold" disabled>Prev</button>
               <button className="px-3 py-1 bg-theme-primary text-white rounded-lg font-bold">1</button>
               <button className="px-3 py-1 bg-card border border-border/50 rounded-lg text-secondary hover:text-primary disabled:opacity-50 font-bold" disabled>Next</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
