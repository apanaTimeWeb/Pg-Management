'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  ListTodo, Search, Filter, Clock, CheckCircle2, XCircle, 
  Settings2, ArrowRight, Home, CalendarOff, Users, 
  FileText, User, Wrench, AlertCircle, LogOut, ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

type RequestStatus = 'Pending' | 'Approved' | 'Rejected' | 'In Progress' | 'Completed' | 'Cancelled';
type RequestType = 'Room Change' | 'Bed Change' | 'Leave' | 'Outing' | 'Visitor' | 'Document Correction' | 'Profile Correction' | 'Maintenance' | 'Complaint Reopen' | 'Check-out Request';

interface RequestItem {
  id: string;
  type: RequestType;
  title: string;
  date: string;
  status: RequestStatus;
  lastUpdate: string;
  description: string;
}

const DUMMY_REQUESTS: RequestItem[] = [
  {
    id: 'REQ-1045',
    type: 'Room Change',
    title: 'Move to AC Room',
    date: '02 Oct 2026',
    status: 'Pending',
    lastUpdate: '2 hours ago',
    description: 'Requested to move from Room 102 (Non-AC) to any available AC room on the first floor.'
  },
  {
    id: 'REQ-1042',
    type: 'Maintenance',
    title: 'AC Service Required',
    date: '30 Sep 2026',
    status: 'In Progress',
    lastUpdate: '1 day ago',
    description: 'AC is making a loud noise and cooling is very low.'
  },
  {
    id: 'REQ-1038',
    type: 'Leave',
    title: 'Diwali Holidays',
    date: '28 Sep 2026',
    status: 'Approved',
    lastUpdate: '2 days ago',
    description: 'Going home for Diwali from 20 Oct to 26 Oct.'
  },
  {
    id: 'REQ-1031',
    type: 'Document Correction',
    title: 'Update Aadhaar',
    date: '25 Sep 2026',
    status: 'Rejected',
    lastUpdate: '3 days ago',
    description: 'Uploaded new Aadhaar copy but it was blurry.'
  },
  {
    id: 'REQ-1025',
    type: 'Visitor',
    title: 'Parents Visit',
    date: '20 Sep 2026',
    status: 'Completed',
    lastUpdate: '1 week ago',
    description: 'Parents visited for weekend stay.'
  },
  {
    id: 'REQ-1018',
    type: 'Check-out Request',
    title: 'End of Semester Checkout',
    date: '15 Sep 2026',
    status: 'Cancelled',
    lastUpdate: '2 weeks ago',
    description: 'Decided to extend stay for summer internship.'
  }
];

const getStatusConfig = (status: RequestStatus) => {
  switch (status) {
    case 'Pending': return { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', icon: Clock };
    case 'Approved': return { color: 'text-success', bg: 'bg-success/10', border: 'border-success/20', icon: CheckCircle2 };
    case 'Rejected': return { color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20', icon: XCircle };
    case 'In Progress': return { color: 'text-info', bg: 'bg-info/10', border: 'border-info/20', icon: Settings2 };
    case 'Completed': return { color: 'text-success', bg: 'bg-success/10', border: 'border-success/20', icon: CheckCircle2 };
    case 'Cancelled': return { color: 'text-secondary', bg: 'bg-input', border: 'border-border', icon: XCircle };
    default: return { color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', icon: Clock };
  }
};

const getTypeIcon = (type: RequestType) => {
  switch (type) {
    case 'Room Change':
    case 'Bed Change': return Home;
    case 'Leave':
    case 'Outing': return CalendarOff;
    case 'Visitor': return Users;
    case 'Document Correction': return FileText;
    case 'Profile Correction': return User;
    case 'Maintenance': return Wrench;
    case 'Complaint Reopen': return AlertCircle;
    case 'Check-out Request': return LogOut;
    default: return ListTodo;
  }
};

export function StudentRequestsMain() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<RequestType | 'All'>('All');

  // Sync tab with URL parameter on load
  useEffect(() => {
    const view = searchParams?.get('view') || searchParams?.get('action');
    if (view) {
      const matchingTab = ['all', 'pending', 'approved', 'rejected', 'completed'].find(id => id.includes(view) || view.includes(id));
      if (matchingTab) setActiveTab(matchingTab);
    }
  }, [searchParams]);

  const filteredRequests = DUMMY_REQUESTS.filter(req => {
    // Tab filtering
    if (activeTab === 'pending' && req.status !== 'Pending' && req.status !== 'In Progress') return false;
    if (activeTab === 'approved' && req.status !== 'Approved') return false;
    if (activeTab === 'rejected' && req.status !== 'Rejected' && req.status !== 'Cancelled') return false;
    if (activeTab === 'completed' && req.status !== 'Completed') return false;
    
    // Type filtering
    if (selectedType !== 'All' && req.type !== selectedType) return false;
    
    // Search filtering
    if (searchQuery && !req.title.toLowerCase().includes(searchQuery.toLowerCase()) && !req.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  const allTypes: (RequestType | 'All')[] = ['All', 'Room Change', 'Bed Change', 'Leave', 'Outing', 'Visitor', 'Document Correction', 'Profile Correction', 'Maintenance', 'Complaint Reopen', 'Check-out Request'];

  return (
    <div className="w-full max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <ListTodo className="w-6 h-6 text-primary" />
            </div>
            Central Requests
          </h1>
          <p className="text-sm text-secondary mt-2 font-medium">
            Track and manage all your pending requests, complaints, and changes in one place.
          </p>
        </div>
        <button className="bg-primary text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md hover:bg-primary/90 transition-colors whitespace-nowrap flex items-center gap-2">
          New Request <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* Colorful Sidebar / Tabs */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <div className="bg-card border border-border rounded-2xl p-3 shadow-sm flex flex-row md:flex-col overflow-x-auto hide-scrollbar gap-2">
            {[
              { id: 'all', label: 'All Requests' },
              { id: 'pending', label: 'Pending / In Progress' },
              { id: 'approved', label: 'Approved' },
              { id: 'rejected', label: 'Rejected / Cancelled' },
              { id: 'completed', label: 'Completed' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 md:w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white shadow-md scale-[1.02]' 
                    : 'text-secondary hover:bg-input hover:text-primary'
                }`}
              >
                <div className="flex items-center gap-3">
                  {tab.label}
                </div>
                {activeTab === tab.id && <ChevronRight className="w-4 h-4 hidden md:block" />}
              </button>
            ))}
          </div>
          
          {/* Quick Stats */}
          <div className="hidden md:block bg-card border border-border rounded-2xl p-5 shadow-sm mt-4">
            <h3 className="font-bold text-primary text-sm mb-4">Request Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary font-medium">Pending Action</span>
                <span className="font-bold text-warning bg-warning/10 px-2 py-0.5 rounded-md">2</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary font-medium">Approved</span>
                <span className="font-bold text-success bg-success/10 px-2 py-0.5 rounded-md">1</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary font-medium">Total Requests</span>
                <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">6</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm min-h-[500px] flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Top Filters */}
          <div className="p-4 border-b border-border bg-input/30 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <input 
                type="text" 
                placeholder="Search by ID or Title..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary shadow-sm"
              />
            </div>
            <div className="relative min-w-[180px]">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary shadow-sm appearance-none"
              >
                {allTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table / List View */}
          <div className="flex-1 overflow-x-auto">
            {filteredRequests.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-input/20">
                    <th className="py-4 px-6 text-xs font-bold text-secondary uppercase tracking-wider">Request Details</th>
                    <th className="py-4 px-6 text-xs font-bold text-secondary uppercase tracking-wider hidden md:table-cell">Type</th>
                    <th className="py-4 px-6 text-xs font-bold text-secondary uppercase tracking-wider hidden lg:table-cell">Date</th>
                    <th className="py-4 px-6 text-xs font-bold text-secondary uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 text-xs font-bold text-secondary uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredRequests.map((req) => {
                    const statusConfig = getStatusConfig(req.status);
                    const StatusIcon = statusConfig.icon;
                    const TypeIcon = getTypeIcon(req.type);

                    return (
                      <tr key={req.id} className="hover:bg-input/50 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-input flex items-center justify-center shrink-0 mt-1 md:hidden">
                              <TypeIcon className="w-5 h-5 text-secondary" />
                            </div>
                            <div>
                              <p className="font-bold text-primary text-sm md:text-base mb-1">{req.title}</p>
                              <div className="flex items-center gap-2 text-xs font-medium text-secondary">
                                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                                  {req.id}
                                </span>
                                <span className="md:hidden">• {req.type}</span>
                              </div>
                              <p className="text-xs text-secondary mt-2 line-clamp-1 max-w-sm hidden sm:block">
                                {req.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 hidden md:table-cell">
                          <div className="flex items-center gap-2 text-sm font-bold text-secondary">
                            <TypeIcon className="w-4 h-4" /> {req.type}
                          </div>
                        </td>
                        <td className="py-4 px-6 hidden lg:table-cell">
                          <div className="text-sm font-medium text-secondary">
                            <p className="text-primary font-bold">{req.date}</p>
                            <p className="text-xs">Upd: {req.lastUpdate}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {req.status}
                          </div>
                          <p className="text-[10px] font-medium text-secondary mt-1 lg:hidden">
                            Upd: {req.lastUpdate}
                          </p>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="text-xs font-bold text-primary hover:bg-primary/10 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-primary/20">
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                <div className="w-20 h-20 rounded-full bg-input flex items-center justify-center mb-4">
                  <ListTodo className="w-10 h-10 text-secondary opacity-50" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">No requests found</h3>
                <p className="text-sm text-secondary max-w-sm">
                  {searchQuery || selectedType !== 'All' 
                    ? 'Try adjusting your search or filters.' 
                    : 'You haven\'t made any requests in this category yet.'}
                </p>
                {(searchQuery || selectedType !== 'All') && (
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedType('All'); }}
                    className="mt-6 bg-primary/10 text-primary font-bold text-sm px-6 py-2 rounded-xl hover:bg-primary/20 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
