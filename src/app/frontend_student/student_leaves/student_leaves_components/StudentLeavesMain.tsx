'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  CalendarOff, Plus, Clock, CheckCircle2, XCircle, AlertCircle,
  MapPin, Phone, Send, X, ArrowRight, LogOut, LogIn, Check
} from 'lucide-react';
import { toast } from 'sonner';

type LeaveStatus = 'Pending' | 'Approved' | 'Rejected' | 'Active' | 'Returned' | 'Overdue';
type RequestType = 'Leave' | 'Outing';

interface LeaveOuting {
  id: string;
  type: RequestType;
  fromDate: string;
  toDate?: string;
  exitTime?: string;
  returnTime?: string;
  reason: string;
  destination: string;
  status: LeaveStatus;
  submittedOn: string;
}

const DUMMY_DATA: LeaveOuting[] = [
  {
    id: 'LV-201', type: 'Leave', fromDate: '10 Oct 2026', toDate: '15 Oct 2026',
    reason: 'Diwali festival at home', destination: 'Patna, Bihar',
    status: 'Approved', submittedOn: '28 Sep 2026'
  },
  {
    id: 'OT-198', type: 'Outing', fromDate: 'Today', exitTime: '06:00 PM', returnTime: '09:00 PM',
    reason: 'Movie with friends', destination: 'PVR Cinemas, Koramangala',
    status: 'Active', submittedOn: 'Today'
  },
  {
    id: 'LV-185', type: 'Leave', fromDate: '20 Sep 2026', toDate: '22 Sep 2026',
    reason: 'Medical appointment', destination: 'Mysore, Karnataka',
    status: 'Returned', submittedOn: '18 Sep 2026'
  },
  {
    id: 'OT-172', type: 'Outing', fromDate: '15 Sep 2026', exitTime: '02:00 PM', returnTime: '05:00 PM',
    reason: 'Market errands', destination: 'Commercial Street',
    status: 'Returned', submittedOn: '15 Sep 2026'
  },
];

const getStatusConfig = (status: LeaveStatus) => {
  switch (status) {
    case 'Pending': return { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', icon: Clock };
    case 'Approved': return { color: 'text-success', bg: 'bg-success/10', border: 'border-success/20', icon: CheckCircle2 };
    case 'Rejected': return { color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20', icon: XCircle };
    case 'Active': return { color: 'text-info', bg: 'bg-info/10', border: 'border-info/20', icon: LogOut };
    case 'Returned': return { color: 'text-success', bg: 'bg-success/10', border: 'border-success/20', icon: Check };
    case 'Overdue': return { color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20', icon: AlertCircle };
    default: return { color: 'text-secondary', bg: 'bg-input', border: 'border-border', icon: Clock };
  }
};

export function StudentLeavesMain() {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get('view');
  const actionParam = searchParams.get('action');
  const initialTab = viewParam === 'pending' ? 'pending' : viewParam === 'approved' ? 'approved' : viewParam === 'active' ? 'active' : viewParam === 'history' ? 'history' : 'all';
  const [data] = useState<LeaveOuting[]>(DUMMY_DATA);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'active' | 'history'>(initialTab);
  const [isNewModal, setIsNewModal] = useState(actionParam === 'new');
  const [requestType, setRequestType] = useState<RequestType>('Leave');
  const [submitted, setSubmitted] = useState(false);

  const filtered = data.filter(item => {
    if (activeTab === 'pending') return item.status === 'Pending';
    if (activeTab === 'approved') return item.status === 'Approved';
    if (activeTab === 'active') return item.status === 'Active';
    if (activeTab === 'history') return item.status === 'Returned' || item.status === 'Rejected' || item.status === 'Overdue';
    return true;
  });

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success(`${requestType} request submitted! Manager will review it.`);
  };

  return (
    <div className="w-full pb-12 animate-in fade-in duration-300">

      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <CalendarOff className="w-6 h-6 text-warning" />
            </div>
            Leave & Outing
          </h1>
          <p className="text-sm text-secondary mt-2 font-medium">Request leaves and outings, track approvals and return status.</p>
        </div>
        <button onClick={() => setIsNewModal(true)} className="bg-primary text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md hover:bg-primary/90 transition-colors whitespace-nowrap flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Request
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Pending', count: data.filter(d => d.status === 'Pending').length, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Approved', count: data.filter(d => d.status === 'Approved').length, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Rejected', count: data.filter(d => d.status === 'Rejected').length, color: 'text-danger', bg: 'bg-danger/10' },
          { label: 'Active', count: data.filter(d => d.status === 'Active').length, color: 'text-info', bg: 'bg-info/10' },
          { label: 'Returned', count: data.filter(d => d.status === 'Returned').length, color: 'text-success', bg: 'bg-success/10' },
        ].map(card => (
          <div key={card.label} className="bg-card border border-border rounded-2xl p-4 shadow-sm text-center">
            <p className={`text-2xl font-black ${card.color}`}>{card.count}</p>
            <p className="text-xs font-bold text-secondary mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6">
        {[
          { id: 'all', label: 'All' },
          { id: 'pending', label: 'Pending' },
          { id: 'approved', label: 'Approved' },
          { id: 'active', label: 'Currently Active' },
          { id: 'history', label: 'History' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${activeTab === tab.id ? 'bg-primary text-white border-primary shadow-md' : 'bg-card text-secondary border-border hover:border-primary/40'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? filtered.map(item => {
          const config = getStatusConfig(item.status);
          const StatusIcon = config.icon;
          return (
            <div key={item.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider ${item.type === 'Leave' ? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning'}`}>{item.type}</span>
                    <span className="font-bold text-secondary text-xs">{item.id}</span>
                  </div>
                  <p className="font-black text-primary mb-2">{item.reason}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-secondary">
                    {item.type === 'Leave' ? (
                      <span className="flex items-center gap-1"><CalendarOff className="w-3.5 h-3.5" /> {item.fromDate} – {item.toDate}</span>
                    ) : (
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.fromDate} • {item.exitTime} – {item.returnTime}</span>
                    )}
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {item.destination}</span>
                  </div>
                </div>
                <div className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-black self-start ${config.bg} ${config.color} ${config.border}`}>
                  <StatusIcon className="w-3.5 h-3.5" /> {item.status}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs font-medium text-secondary">Submitted: {item.submittedOn}</p>
              </div>
            </div>
          );
        }) : (
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-input flex items-center justify-center mx-auto mb-4">
              <CalendarOff className="w-8 h-8 text-secondary opacity-50" />
            </div>
            <p className="font-bold text-primary mb-2">No records found</p>
          </div>
        )}
      </div>

      {/* New Request Modal */}
      {isNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-border flex items-center justify-between bg-input/30">
              <h2 className="text-lg font-black text-primary">New Leave / Outing Request</h2>
              <button onClick={() => { setIsNewModal(false); setSubmitted(false); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-input text-secondary hover:text-danger transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            {submitted ? (
              <div className="p-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-lg font-black text-primary mb-2">Request Submitted!</h3>
                <p className="text-sm text-secondary mb-6">Manager will review and you will be notified of the decision.</p>
                <button onClick={() => { setIsNewModal(false); setSubmitted(false); }} className="bg-primary text-white font-bold text-sm px-6 py-2 rounded-xl">Close</button>
              </div>
            ) : (
              <div className="p-6 overflow-y-auto space-y-4">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Request Type</label>
                  <div className="flex gap-3">
                    {(['Leave', 'Outing'] as RequestType[]).map(type => (
                      <button key={type} onClick={() => setRequestType(type)} className={`flex-1 py-3 rounded-xl font-bold text-sm border transition-all ${requestType === type ? 'bg-primary text-white border-primary shadow-md' : 'bg-card text-secondary border-border hover:border-primary/40'}`}>{type}</button>
                    ))}
                  </div>
                </div>
                {requestType === 'Leave' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">From Date</label>
                      <input type="date" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">To Date</label>
                      <input type="date" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm" />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Exit Time</label>
                      <input type="time" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Expected Return</label>
                      <input type="time" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm" />
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Destination</label>
                  <input placeholder="Where are you going?" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Reason / Purpose</label>
                  <textarea rows={3} placeholder="Reason for leave/outing..." className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm resize-none"></textarea>
                </div>
                {requestType === 'Leave' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Emergency Contact</label>
                      <input placeholder="Name" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Contact Number</label>
                      <input placeholder="Mobile" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm" />
                    </div>
                  </div>
                )}
                <p className="text-xs text-info/90 bg-info/5 border border-info/20 rounded-lg p-3">Return verification will be done by Manager. You cannot bypass the return confirmation.</p>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setIsNewModal(false)} className="flex-1 bg-card border border-border text-secondary font-bold text-sm py-2.5 rounded-xl hover:bg-input transition-colors">Cancel</button>
                  <button onClick={handleSubmit} className="flex-1 bg-primary text-white font-bold text-sm py-2.5 rounded-xl shadow-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
