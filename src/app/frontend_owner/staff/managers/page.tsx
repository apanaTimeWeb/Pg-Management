// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { Search, Filter, Plus, FileText, Download, Eye, Edit3, Trash2, UserCog, Phone, Briefcase } from 'lucide-react';

const MOCK_STAFF = [
  { id: 'EMP-101', name: 'Ramesh Singh', role: 'Property Manager', phone: '+91 9876543210', property: 'PG Varanasi Main', salary: 25000, status: 'Active' },
  { id: 'EMP-102', name: 'Sneha Pandey', role: 'Property Manager', phone: '+91 9123456789', property: 'PG Lanka Branch', salary: 22000, status: 'Active' },
  { id: 'EMP-201', name: 'Raju Chacha', role: 'Head Cook', phone: '+91 9988776655', property: 'PG Varanasi Main', salary: 18000, status: 'Active' },
  { id: 'EMP-202', name: 'Bheem Kumar', role: 'Cook', phone: '+91 8877665544', property: 'PG Lanka Branch', salary: 15000, status: 'On Leave' },
];

export default function ManagersPage() {
  const [staffList, setStaffList] = useState(MOCK_STAFF);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredStaff = staffList.filter(staff => {
    if (staff.role !== 'Property Manager') return false;
    if (searchTerm && !staff.name.toLowerCase().includes(searchTerm.toLowerCase()) && !staff.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><UserCog className="w-6 h-6 text-[#F5A623]"/> Staff: Managers</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage employee records and roles.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Manager
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-[#1A3A5C] text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Plus className="w-5 h-5 text-green-500" /> New Manager
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">X</button>
            </div>
            <div className="p-6 space-y-4 bg-page/50">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Name</label>
                <input type="text" placeholder="e.g. Shyam Lal" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-primary" />
              </div>
            </div>
            <div className="p-5 border-t border-border/50 bg-card flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 bg-[var(--bg-overlay)] text-secondary rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => { 
                setStaffList([{
                  id: `EMP-${Math.floor(Math.random() * 1000)}`, name: 'New Manager', role: 'Property Manager', phone: '+91 0000000000', property: 'PG Branch', salary: 20000, status: 'Active'
                }, ...staffList]);
                setIsModalOpen(false); 
              }} className="px-5 py-2 bg-[#1A3A5C] text-white rounded-xl font-bold">Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search staff..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] text-primary transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-page/30 text-[10px] uppercase tracking-wider text-secondary">
                <th className="p-4 font-bold">Employee</th>
                <th className="p-4 font-bold">Role & Property</th>
                <th className="p-4 font-bold">Salary</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredStaff.map((staff, idx) => (
                <tr key={idx} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary">{staff.name}</p>
                    <p className="text-xs font-semibold text-secondary flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3"/> {staff.phone}</p>
                    <p className="text-[10px] text-[var(--text-disabled)] mt-1 font-mono">{staff.id}</p>
                  </td>
                  <td className="p-4 text-sm text-secondary font-medium">
                    <p className="text-primary font-bold flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-[#F5A623]"/> {staff.role}</p>
                    <p className="mt-0.5 text-xs">{staff.property}</p>
                  </td>
                  <td className="p-4 text-sm font-medium text-secondary">₹{staff.salary}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 border rounded-md text-[10px] font-bold uppercase tracking-wide ${staff.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200"><Edit3 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStaff.length === 0 && (
                <tr><td colSpan="5" className="p-8 text-center text-secondary font-medium">No staff members found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
