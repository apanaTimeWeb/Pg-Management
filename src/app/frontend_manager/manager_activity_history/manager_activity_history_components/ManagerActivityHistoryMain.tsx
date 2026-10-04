// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  History, Search, Filter, Calendar, Clock, 
  CheckCircle2, AlertCircle, XCircle, FileText, 
  Users, UserCheck, MessageSquare, DoorOpen, BedDouble, Download
} from 'lucide-react';

// Mock Data
const auditLogs = [
  {
    id: 'AL-1001',
    dateTime: '2026-10-03T10:45:00',
    action: 'Approved Student Leave',
    module: 'Leave / Outing',
    moduleIcon: <DoorOpen className="w-4 h-4" />,
    target: 'Rahul Verma (Room 101)',
    status: 'Success',
    details: 'Approved weekend leave for family visit.'
  },
  {
    id: 'AL-1002',
    dateTime: '2026-10-03T09:30:00',
    action: 'Marked Staff Attendance',
    module: 'Attendance',
    moduleIcon: <UserCheck className="w-4 h-4" />,
    target: 'Morning Shift Staff (5)',
    status: 'Success',
    details: 'Bulk attendance marked via dashboard.'
  },
  {
    id: 'AL-1003',
    dateTime: '2026-10-02T16:15:00',
    action: 'Closed Complaint',
    module: 'Complaints',
    moduleIcon: <MessageSquare className="w-4 h-4" />,
    target: 'C-984 (Plumbing Issue)',
    status: 'Success',
    details: 'Resolved by maintenance team.'
  },
  {
    id: 'AL-1004',
    dateTime: '2026-10-02T14:20:00',
    action: 'Recorded Visitor Entry',
    module: 'Visitors',
    moduleIcon: <Users className="w-4 h-4" />,
    target: 'Mr. Sharma (Visitor for Room 204)',
    status: 'Success',
    details: 'ID proof verified and gate pass issued.'
  },
  {
    id: 'AL-1005',
    dateTime: '2026-10-01T11:10:00',
    action: 'Transferred Student',
    module: 'Check-in / Check-out',
    moduleIcon: <BedDouble className="w-4 h-4" />,
    target: 'Amit Kumar (101 → 105)',
    status: 'Success',
    details: 'Transferred based on request for AC room.'
  },
  {
    id: 'AL-1006',
    dateTime: '2026-10-01T09:05:00',
    action: 'Failed Check-in Attempt',
    module: 'Check-in / Check-out',
    moduleIcon: <FileText className="w-4 h-4" />,
    target: 'Suresh Das',
    status: 'Failed',
    details: 'Document verification failed.'
  },
];

export default function ManagerActivityHistoryMain() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState('All');

  // Formatting date
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return {
      date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = filterModule === 'All' || log.module === filterModule;
    return matchesSearch && matchesModule;
  });

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 w-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <History className="w-6 h-6"/>
            </div>
            Activity History (Audit Log)
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Immutable record of all actions performed by you.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-border/50 text-secondary hover:text-primary hover:bg-page px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all">
            <Download className="w-4 h-4" /> Export Log
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/30">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search by action, target or details..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="px-4 py-2.5 bg-input border border-border rounded-xl text-sm font-bold text-secondary hover:text-primary focus:outline-none transition-colors appearance-none pr-8 cursor-pointer relative"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
            >
              <option value="All">All Modules</option>
              <option value="Leave / Outing">Leave / Outing</option>
              <option value="Attendance">Attendance</option>
              <option value="Complaints">Complaints</option>
              <option value="Visitors">Visitors</option>
              <option value="Check-in / Check-out">Check-in / Check-out</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-input border border-border rounded-xl text-sm font-bold text-secondary hover:text-primary hover:bg-page transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-page/50 border-b border-border/50">
                <th className="py-4 px-6 text-xs font-black text-secondary uppercase tracking-wider">Date & Time</th>
                <th className="py-4 px-6 text-xs font-black text-secondary uppercase tracking-wider">Action & Details</th>
                <th className="py-4 px-6 text-xs font-black text-secondary uppercase tracking-wider">Module</th>
                <th className="py-4 px-6 text-xs font-black text-secondary uppercase tracking-wider">Target (Student/Room)</th>
                <th className="py-4 px-6 text-xs font-black text-secondary uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b border-border/30 hover:bg-page/40 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-primary font-bold">
                        <Calendar className="w-3.5 h-3.5 text-secondary" /> {formatDate(log.dateTime).date}
                      </div>
                      <div className="flex items-center gap-2 text-secondary text-xs mt-1">
                        <Clock className="w-3.5 h-3.5" /> {formatDate(log.dateTime).time}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-primary">{log.action}</div>
                      <div className="text-secondary text-xs mt-1 max-w-xs truncate" title={log.details}>
                        {log.details}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-bold">
                        {log.moduleIcon}
                        {log.module}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-primary">
                      {log.target}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {log.status === 'Success' ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 border border-green-200 rounded-md text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Success
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-700 border border-red-200 rounded-md text-xs font-bold">
                          <XCircle className="w-3.5 h-3.5" />
                          Failed
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="w-16 h-16 bg-page rounded-full flex items-center justify-center mx-auto mb-4 border border-border shadow-sm">
                      <Search className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary">No Logs Found</h3>
                    <p className="text-secondary text-sm mt-1">Adjust your search or filters to see more results.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-border/50 bg-page/30 flex items-center justify-between text-sm text-secondary font-medium">
          <div>Showing 1 to {filteredLogs.length} of {filteredLogs.length} entries</div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-card border border-border rounded-lg hover:bg-page transition-colors disabled:opacity-50">Previous</button>
            <button className="px-3 py-1.5 bg-card border border-border rounded-lg hover:bg-page transition-colors disabled:opacity-50">Next</button>
          </div>
        </div>

      </div>
      
    </div>
  );
}
