'use client';

import React, { useState } from 'react';
import { 
  Search, Filter, Plus, FileText, Download, Eye, Edit3, UserPlus, Phone, MapPin
} from 'lucide-react';

const MOCK_ADMISSIONS = [
  { id: 'APP-1021', name: 'Sanjay Kumar', phone: '+91 9988776655', property: 'PG Varanasi Main', roomPref: 'Single / AC', date: '01 Oct 2026', status: 'Pending' },
  { id: 'APP-1022', name: 'Vishal Singh', phone: '+91 8877665544', property: 'PG Lanka Branch', roomPref: 'Double / Non-AC', date: '02 Oct 2026', status: 'Approved' },
  { id: 'APP-1023', name: 'Rohan Sharma', phone: '+91 7766554433', property: 'PG Varanasi Main', roomPref: 'Triple / AC', date: '03 Oct 2026', status: 'Verification' },
  { id: 'APP-1024', name: 'Karan Patel', phone: '+91 6655443322', property: 'PG Lanka Branch', roomPref: 'Single / AC', date: '03 Oct 2026', status: 'Rejected' },
];

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filterByTitle = title === 'Enquiries' ? 'Pending' : title;
  
  const filteredApps = MOCK_ADMISSIONS.filter(app => {
    // For specific pages, simulate filtering by status. 
    // Usually, the page title matches the status, but "Applications" means all.
    if (title !== 'Applications' && app.status !== filterByTitle) return false;
    if (searchTerm && !app.name.toLowerCase().includes(searchTerm.toLowerCase()) && !app.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'Approved') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (status === 'Verification') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (status === 'Rejected') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><UserPlus className="w-6 h-6 text-purple-500"/> Admissions: Applications</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Review and process student admission applications.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> New Application
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search by Applicant Name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] text-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-input border border-border rounded-xl text-sm font-semibold text-secondary hover:text-primary transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-page/30 text-[10px] uppercase tracking-wider text-secondary">
                <th className="p-4 font-bold">Applicant Details</th>
                <th className="p-4 font-bold">Preferences</th>
                <th className="p-4 font-bold">Date Applied</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredApps.map((app, idx) => (
                <tr key={idx} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary">{app.name}</p>
                    <p className="text-xs font-semibold text-secondary flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3"/> {app.phone}</p>
                    <p className="text-[10px] text-[var(--text-disabled)] mt-1 font-mono">{app.id}</p>
                  </td>
                  <td className="p-4 text-sm text-secondary font-medium">
                    <p className="flex items-center gap-1 text-primary"><MapPin className="w-3 h-3 text-[#F5A623]"/> {app.property}</p>
                    <p className="mt-0.5 text-xs">{app.roomPref}</p>
                  </td>
                  <td className="p-4 text-sm font-medium text-secondary">{app.date}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 border rounded-md text-[10px] font-bold uppercase tracking-wide ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200" title="Review Application"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200" title="Approve"><FileText className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredApps.length === 0 && (
                <tr><td colSpan="5" className="p-8 text-center text-secondary font-medium">No applications found in this status.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}
