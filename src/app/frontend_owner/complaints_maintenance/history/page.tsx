// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit3, Wrench, AlertTriangle, User, MapPin } from 'lucide-react';

const MOCK_COMPLAINTS = [
  { id: 'TKT-901', title: 'AC Not Cooling', category: 'Electrical', room: '101', reportedBy: 'Aman Singh', date: '02 Oct 2026', status: 'Pending', priority: 'High' },
  { id: 'TKT-902', title: 'Tap Leaking', category: 'Plumbing', room: '304', reportedBy: 'Rahul Sharma', date: '05 Oct 2026', status: 'Assigned', priority: 'Medium' },
  { id: 'TKT-903', title: 'WiFi Very Slow', category: 'IT/Network', room: '205', reportedBy: 'Vikram Patel', date: '10 Oct 2026', status: 'Resolved', priority: 'Medium' },
];

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = MOCK_COMPLAINTS.filter(tkt => {
    if (searchTerm && !tkt.title.toLowerCase().includes(searchTerm.toLowerCase()) && !tkt.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'Resolved') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'Assigned') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (status === 'Pending') return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><Wrench className="w-6 h-6 text-red-500"/> Complaints: History</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage maintenance tasks and student complaints.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Raise Ticket
          </button>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search tickets..." 
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
                <th className="p-4 font-bold">Ticket Details</th>
                <th className="p-4 font-bold">Reported By</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredTickets.map((tkt, idx) => (
                <tr key={idx} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary">{tkt.title}</p>
                    <p className="text-[10px] text-[var(--text-disabled)] mt-0.5 font-mono">{tkt.id}</p>
                  </td>
                  <td className="p-4 text-sm text-secondary font-medium">
                    <p className="text-primary font-bold flex items-center gap-1"><User className="w-3.5 h-3.5"/> {tkt.reportedBy}</p>
                    <p className="flex items-center gap-1 mt-0.5 text-xs"><MapPin className="w-3 h-3 text-[#F5A623]"/> Room {tkt.room}</p>
                  </td>
                  <td className="p-4 text-sm font-medium text-secondary">{tkt.category}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 border rounded-md text-[10px] font-bold uppercase tracking-wide ${getStatusBadge(tkt.status)}`}>
                      {tkt.status}
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
              {filteredTickets.length === 0 && (
                <tr><td colSpan="5" className="p-8 text-center text-secondary font-medium">No tickets found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
