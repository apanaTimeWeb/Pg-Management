'use client';

import React, { useState, useEffect, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Database, Plus, Search, Filter, Download, Edit, Trash2, Eye, Power, PowerOff, Building2, LayoutGrid, Bed, Wifi, GraduationCap, FileText, FileBadge, Receipt, CreditCard, AlertTriangle, Wrench, CalendarOff, UserPlus, Utensils, IndianRupee, Bell } from 'lucide-react';
import { SuperadminMasterDataFormModal } from './SuperadminMasterDataFormModal';
import { SuperadminMasterDataDeleteModal } from './SuperadminMasterDataDeleteModal';

export function SuperadminMasterDataMain() {
  const [activeMaster, setActiveMaster] = useState('pgTypes');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [deleteRecord, setDeleteRecord] = useState<any>(null);

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

  // Global in-memory state for demonstration
  const [masterDataState, setMasterDataState] = useState<Record<string, any[]>>({
    pgTypes: [ { id: 1, name: 'Boys PG', code: 'BPG', status: 'Active' }, { id: 2, name: 'Girls PG', code: 'GPG', status: 'Active' }, { id: 3, name: 'Co-ed PG', code: 'CPG', status: 'Inactive' } ],
    roomTypes: [ { id: 1, name: 'Single AC', code: 'SAC', status: 'Active' }, { id: 2, name: 'Double Non-AC', code: 'DNAC', status: 'Active' } ],
    facilities: [ { id: 1, name: 'WiFi', code: 'WFI', status: 'Active' }, { id: 2, name: 'Laundry', code: 'LND', status: 'Active' }, { id: 3, name: 'Gym', code: 'GYM', status: 'Inactive' } ],
    paymentModes: [ { id: 1, name: 'UPI', code: 'UPI', status: 'Active' }, { id: 2, name: 'Credit Card', code: 'CC', status: 'Active' }, { id: 3, name: 'Cash', code: 'CASH', status: 'Active' } ],
    complaints: [ { id: 1, name: 'Plumbing', code: 'PLM', status: 'Active' }, { id: 2, name: 'Electrical', code: 'ELE', status: 'Active' } ]
  });

  const activeMasterDetails = masterList.find(m => m.id === activeMaster);
  const ActiveIcon = activeMasterDetails?.icon || Database;

  const currentData = (masterDataState[activeMaster] || []).filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (formData: any) => {
    const list = [...(masterDataState[activeMaster] || [])];
    if (editRecord) {
      const idx = list.findIndex(i => i.id === editRecord.id);
      if (idx >= 0) list[idx] = { ...editRecord, ...formData };
    } else {
      list.push({ id: Date.now(), ...formData });
    }
    setMasterDataState({ ...masterDataState, [activeMaster]: list });
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    const list = [...(masterDataState[activeMaster] || [])];
    const filtered = list.filter(i => i.id !== deleteRecord.id);
    setMasterDataState({ ...masterDataState, [activeMaster]: filtered });
    setIsDeleteOpen(false);
  };

  const toggleStatus = (record: any) => {
    const list = [...(masterDataState[activeMaster] || [])];
    const idx = list.findIndex(i => i.id === record.id);
    if (idx >= 0) {
      list[idx].status = list[idx].status === 'Active' ? 'Inactive' : 'Active';
      setMasterDataState({ ...masterDataState, [activeMaster]: list });
    }
  };

  return (
    <div className="w-full h-full space-y-6 pb-20">
      <SuperadminMasterDataFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSave={handleSave} 
        editData={editRecord} 
        activeMasterLabel={activeMasterDetails?.label || ''} 
      />
      <SuperadminMasterDataDeleteModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={handleDelete} 
        recordName={deleteRecord?.name || ''} 
      />

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
        {/* Sidebar */}
        <div className="w-full lg:w-72 shrink-0 bg-card border border-border/50 rounded-3xl p-4 shadow-sm flex flex-col h-full overflow-hidden">
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search masters..." className="w-full pl-9 pr-4 py-2 bg-bg-page border border-border/50 rounded-xl text-sm focus:ring-2 focus:ring-theme-primary font-medium" />
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 pr-2 scrollbar-hide">
            {masterList.map((master) => (
              <button
                key={master.id}
                onClick={() => { setActiveMaster(master.id); setSearchTerm(''); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeMaster === master.id 
                    ? 'bg-primary-subtle text-theme-primary shadow-sm border border-theme-primary/20' 
                    : 'text-secondary hover:bg-bg-page hover:text-primary border border-transparent'
                }`}
              >
                <master.icon className={`w-4 h-4 ${activeMaster === master.id ? 'text-theme-primary' : master.color}`} />
                {master.label}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 bg-card border border-border/50 rounded-3xl shadow-sm flex flex-col h-full overflow-hidden relative">
          <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-bg-page/50 z-10">
            <div className="flex items-center gap-3">
               <div className="p-2 rounded-xl bg-primary-subtle text-theme-primary"><ActiveIcon className="w-6 h-6" /></div>
               <h2 className="text-xl font-black text-primary">{activeMasterDetails?.label}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder={`Search ${activeMasterDetails?.label}...`} 
                  className="pl-9 pr-4 py-2 w-48 bg-card border border-border/50 rounded-xl text-sm focus:ring-2 focus:ring-theme-primary font-medium" 
                />
              </div>
              <button onClick={() => { setEditRecord(null); setIsFormOpen(true); }} className="bg-theme-primary hover:bg-theme-primary-hover text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm shadow-sm">
                <Plus className="w-4 h-4" /> Add New
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-2">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="sticky top-0 bg-card shadow-sm">
                <tr>
                  <th className="py-3 px-6 text-xs font-bold text-secondary uppercase tracking-wider">Name</th>
                  <th className="py-3 px-6 text-xs font-bold text-secondary uppercase tracking-wider">Code</th>
                  <th className="py-3 px-6 text-xs font-bold text-secondary uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs font-bold text-secondary uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {currentData.map((row) => (
                  <tr key={row.id} className="hover:bg-bg-page/80 transition-colors group">
                    <td className="py-4 px-6 text-sm font-bold text-primary group-hover:text-theme-primary transition-colors">{row.name}</td>
                    <td className="py-4 px-6 text-sm font-mono text-secondary"><span className="bg-bg-page/50 rounded px-2">{row.code}</span></td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${row.status === 'Active' ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'}`}>
                        {row.status === 'Active' ? <Power className="w-3 h-3" /> : <PowerOff className="w-3 h-3" />}
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => { setEditRecord(row); setIsFormOpen(true); }} className="p-1.5 text-theme-primary hover:bg-primary-subtle rounded-lg transition-colors tooltip" title="Edit Record"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => toggleStatus(row)} className={`p-1.5 ${row.status === 'Active' ? 'text-warning hover:bg-warning-bg' : 'text-success hover:bg-success-bg'} rounded-lg transition-colors tooltip`} title={row.status === 'Active' ? 'Deactivate' : 'Activate'}>
                           {row.status === 'Active' ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                        </button>
                        <button onClick={() => { setDeleteRecord(row); setIsDeleteOpen(true); }} className="p-1.5 text-danger hover:bg-danger-bg rounded-lg transition-colors tooltip" title="Delete Permanently"><Trash2 className="w-4 h-4" /></button>
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
        </div>
      </div>
    </div>
  );
}
