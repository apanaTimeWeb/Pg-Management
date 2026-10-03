'use client';

import React, { useState } from 'react';
import { 
  History, Search, Filter, Calendar, 
  CheckCircle2, XCircle, AlertCircle, ShieldAlert,
  UserCheck, Banknote, LogOut, FileEdit, Coffee,
  UserX, Download, RefreshCcw, Wrench
} from 'lucide-react';

// Mock Data representing different types of audit logs
const MOCK_ACTIVITIES = [
  { id: 1, who: 'Rahul (Manager)', role: 'Manager', action: 'Approved Leave', module: 'Leave / Outing', record: 'Aman Singh (Room 101)', date: 'Oct 03, 2026 - 10:30 AM', status: 'Success', icon: UserCheck, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' },
  { id: 2, who: 'Rajesh (Owner)', role: 'Owner', action: 'Payment Collected', module: 'Fees & Payments', record: '₹5,000 from Ravi Kumar', date: 'Oct 03, 2026 - 09:15 AM', status: 'Success', icon: Banknote, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { id: 3, who: 'Vikram (Manager)', role: 'Manager', action: 'Student Checked Out', module: 'Check-in / Check-out', record: 'Mohit (Room 205, Bed A)', date: 'Oct 02, 2026 - 06:00 PM', status: 'Important', icon: UserX, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
  { id: 4, who: 'Ramesh (Cook)', role: 'Cook', action: 'Updated Menu', module: 'Mess / Food', record: 'Dinner Menu changed to Paneer', date: 'Oct 02, 2026 - 04:30 PM', status: 'Success', icon: Coffee, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
  { id: 5, who: 'Rahul (Manager)', role: 'Manager', action: 'Fee Edited', module: 'Fees & Payments', record: 'Invoice #INV-2024 reduced by ₹500', date: 'Oct 01, 2026 - 11:20 AM', status: 'Warning', icon: FileEdit, color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  { id: 6, who: 'Unknown Device', role: 'System', action: 'Failed Login', module: 'Security', record: 'Invalid password attempt', date: 'Oct 01, 2026 - 02:15 AM', status: 'Failed', icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
  { id: 7, who: 'Amit (Maintenance)', role: 'Staff', action: 'Complaint Closed', module: 'Complaints', record: 'Ticket #402 - Fan Fixed', date: 'Sep 30, 2026 - 02:00 PM', status: 'Success', icon: Wrench, color: 'text-teal-500', bg: 'bg-teal-50', border: 'border-teal-200' },
  { id: 8, who: 'Rajesh (Owner)', role: 'Owner', action: 'Password Change', module: 'Security', record: 'Account Password updated', date: 'Sep 30, 2026 - 09:00 PM', status: 'Important', icon: ShieldAlert, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
  { id: 9, who: 'Rajesh (Owner)', role: 'Owner', action: 'Logout', module: 'Security', record: 'MacBook Safari', date: 'Sep 30, 2026 - 08:30 PM', status: 'Success', icon: LogOut, color: 'text-[var(--text-disabled)]', bg: 'bg-[var(--bg-overlay)]', border: 'border-border' },
  { id: 10, who: 'System', role: 'System', action: 'Active Session', module: 'Security', record: 'New login from iPhone 13', date: 'Sep 29, 2026 - 10:00 AM', status: 'Important', icon: History, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
];

export default function ActivityAuditPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState('All');

  const filteredActivities = MOCK_ACTIVITIES.filter(activity => {
    const matchesSearch = activity.who.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          activity.record.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = filterModule === 'All' || activity.module === filterModule;
    return matchesSearch && matchesModule;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Success':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700 border border-green-200 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Success</span>;
      case 'Failed':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700 border border-red-200 flex items-center gap-1"><XCircle className="w-3 h-3"/> Failed</span>;
      case 'Warning':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Warning</span>;
      case 'Important':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-purple-100 text-purple-700 border border-purple-200 flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Important</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-[var(--bg-overlay)] text-secondary border border-border">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <History className="w-7 h-7 text-[#F5A623]" />
            Activity & Audit Logs
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Track all system activities, module updates, and security events in real-time.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card border border-border hover:bg-page text-secondary px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <RefreshCcw className="w-4 h-4" /> Refresh
          </button>
          <button className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-card p-4 rounded-2xl shadow-sm border border-border/50 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, action, or record..."
            className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-xl leading-5 bg-page text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623] sm:text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select 
              className="pl-9 pr-8 py-2.5 border border-border rounded-xl bg-page text-secondary text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623] cursor-pointer appearance-none transition-all"
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
            >
              <option value="All">All Modules</option>
              <option value="Security">Security</option>
              <option value="Leave / Outing">Leave / Outing</option>
              <option value="Fees & Payments">Fees & Payments</option>
              <option value="Check-in / Check-out">Check-in / Check-out</option>
              <option value="Mess / Food">Mess / Food</option>
              <option value="Complaints">Complaints</option>
            </select>
          </div>
          <button className="flex items-center gap-2 bg-page border border-border hover:bg-[var(--bg-overlay)] text-secondary px-4 py-2.5 rounded-xl text-sm font-bold transition-colors">
            <Calendar className="w-4 h-4" /> Date Range
          </button>
        </div>
      </div>

      {/* Desktop Table View (Hidden on mobile) */}
      <div className="hidden lg:block bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-page border-b border-border/50 text-[var(--text-disabled)] text-xs uppercase tracking-wider font-bold">
                <th className="p-4">Action</th>
                <th className="p-4">Who (User)</th>
                <th className="p-4">Module</th>
                <th className="p-4">Record Details</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-page/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${activity.bg} ${activity.color} border ${activity.border}`}>
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-primary text-sm">{activity.action}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-secondary text-sm">{activity.who}</span>
                      <span className="text-xs text-gray-400 font-semibold">{activity.role}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-semibold text-secondary bg-[var(--bg-overlay)] px-2.5 py-1 rounded-lg">
                      {activity.module}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-secondary font-medium">{activity.record}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-semibold text-[var(--text-disabled)]">{activity.date}</span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center">
                      {getStatusBadge(activity.status)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredActivities.length === 0 && (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <History className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-primary mb-1">No activities found</h3>
            <p className="text-[var(--text-disabled)]">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>

      {/* Mobile/Tablet Card View (Hidden on large desktop) */}
      <div className="lg:hidden space-y-4">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="bg-card p-4 rounded-2xl shadow-sm border border-border/50 flex flex-col gap-3 relative overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${activity.bg.replace('bg-', 'bg-').replace('-50', '-400')}`} />
            
            <div className="flex justify-between items-start pl-2">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${activity.bg} ${activity.color} border ${activity.border}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-primary text-sm">{activity.action}</h3>
                  <p className="text-xs font-semibold text-[#F5A623]">{activity.module}</p>
                </div>
              </div>
              <div>
                {getStatusBadge(activity.status)}
              </div>
            </div>

            <div className="pl-2 pt-2 border-t border-gray-50">
              <p className="text-sm text-secondary font-medium mb-1"><span className="text-gray-400">Record:</span> {activity.record}</p>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-secondary">
                    {activity.who.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-secondary">{activity.who}</span>
                </div>
                <span className="text-xs font-semibold text-gray-400">{activity.date}</span>
              </div>
            </div>
          </div>
        ))}
        
        {filteredActivities.length === 0 && (
          <div className="bg-card p-8 rounded-2xl border border-border/50 flex flex-col items-center text-center">
            <History className="w-10 h-10 text-gray-300 mb-3" />
            <h3 className="text-md font-bold text-primary">No activities found</h3>
          </div>
        )}
      </div>
      
      {/* Pagination Placeholder */}
      <div className="flex items-center justify-between bg-card px-4 py-3 border border-border/50 rounded-xl shadow-sm">
        <span className="text-sm text-[var(--text-disabled)] font-medium">Showing <span className="font-bold text-primary">1</span> to <span className="font-bold text-primary">{filteredActivities.length}</span> of <span className="font-bold text-primary">100+</span> entries</span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-border rounded-lg text-sm font-semibold text-secondary hover:bg-page disabled:opacity-50" disabled>Prev</button>
          <button className="px-3 py-1.5 bg-[#F5A623] text-white rounded-lg text-sm font-semibold">1</button>
          <button className="px-3 py-1.5 border border-border rounded-lg text-sm font-semibold text-secondary hover:bg-page">2</button>
          <button className="px-3 py-1.5 border border-border rounded-lg text-sm font-semibold text-secondary hover:bg-page">Next</button>
        </div>
      </div>
    </div>
  );
}
