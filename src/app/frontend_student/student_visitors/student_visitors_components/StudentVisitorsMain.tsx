'use client';

import React, { useState } from 'react';
import {
  Users, Plus, Clock, CheckCircle2, UserCheck, X, Send, AlertCircle,
  Phone, User, FileText, Calendar, Hourglass, ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

type VisitorStatus = 'Pending' | 'Approved' | 'Rejected' | 'Visited' | 'Cancelled';

interface Visitor {
  id: string;
  name: string;
  mobile: string;
  relation: string;
  purpose: string;
  date: string;
  expectedArrival: string;
  expectedDeparture: string;
  status: VisitorStatus;
  entryTime?: string;
  exitTime?: string;
}

const DUMMY_VISITORS: Visitor[] = [
  {
    id: 'VIS-101', name: 'Ramesh Sharma', mobile: '98765-XXXXX', relation: 'Father',
    purpose: 'Family Visit', date: 'Tomorrow', expectedArrival: '04:00 PM',
    expectedDeparture: '07:00 PM', status: 'Approved'
  },
  {
    id: 'VIS-098', name: 'Priya Singh', mobile: '87654-XXXXX', relation: 'Sister',
    purpose: 'Deliver Items', date: 'Today', expectedArrival: '12:00 PM',
    expectedDeparture: '01:00 PM', status: 'Visited', entryTime: '12:15 PM', exitTime: '01:05 PM'
  },
  {
    id: 'VIS-092', name: 'Ankit Joshi', mobile: '76543-XXXXX', relation: 'Friend',
    purpose: 'Casual Visit', date: '28 Sep', expectedArrival: '06:00 PM',
    expectedDeparture: '08:00 PM', status: 'Rejected'
  },
  {
    id: 'VIS-085', name: 'Sunita Devi', mobile: '65432-XXXXX', relation: 'Mother',
    purpose: 'Family Meet', date: '20 Sep', expectedArrival: '11:00 AM',
    expectedDeparture: '02:00 PM', status: 'Visited', entryTime: '11:10 AM', exitTime: '02:20 PM'
  },
];

const getStatusConfig = (status: VisitorStatus) => {
  switch (status) {
    case 'Pending': return { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', icon: Hourglass };
    case 'Approved': return { color: 'text-success', bg: 'bg-success/10', border: 'border-success/20', icon: CheckCircle2 };
    case 'Rejected': return { color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20', icon: X };
    case 'Visited': return { color: 'text-info', bg: 'bg-info/10', border: 'border-info/20', icon: UserCheck };
    case 'Cancelled': return { color: 'text-secondary', bg: 'bg-input', border: 'border-border', icon: X };
    default: return { color: 'text-secondary', bg: 'bg-input', border: 'border-border', icon: Clock };
  }
};

export function StudentVisitorsMain() {
  const [visitors] = useState<Visitor[]>(DUMMY_VISITORS);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'past'>('all');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', mobile: '', relation: '', purpose: '', date: '', arrival: '', departure: '' });
  const [submitted, setSubmitted] = useState(false);

  const tabs = [
    { id: 'all', label: 'All Visitors' },
    { id: 'pending', label: `Pending (${visitors.filter(v => v.status === 'Pending').length})` },
    { id: 'approved', label: 'Approved' },
    { id: 'past', label: 'Past Visits' },
  ];

  const filtered = visitors.filter(v => {
    if (activeTab === 'pending') return v.status === 'Pending';
    if (activeTab === 'approved') return v.status === 'Approved';
    if (activeTab === 'past') return v.status === 'Visited' || v.status === 'Rejected' || v.status === 'Cancelled';
    return true;
  });

  const handleSubmit = () => {
    if (!form.name || !form.mobile || !form.relation || !form.date) {
      toast.error('Please fill all required fields'); return;
    }
    setSubmitted(true);
    toast.success('Visitor request sent to manager for approval!');
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-info" />
            </div>
            Visitor Management
          </h1>
          <p className="text-sm text-secondary mt-2 font-medium">Request visitor passes and track entry/exit records.</p>
        </div>
        <button onClick={() => setIsNewModalOpen(true)} className="bg-primary text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md hover:bg-primary/90 transition-colors whitespace-nowrap flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Visitor
        </button>
      </div>

      <div className="bg-info/5 border border-info/20 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-info shrink-0 mt-0.5" />
        <p className="text-sm font-medium text-info/90">Visitor entry is controlled by Manager. You cannot directly approve visitors. After approval, entry and exit are recorded by security.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${activeTab === tab.id ? 'bg-primary text-white border-primary shadow-md' : 'bg-card text-secondary border-border hover:border-primary/40'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Visitors List */}
      <div className="space-y-4">
        {filtered.length > 0 ? filtered.map(visitor => {
          const config = getStatusConfig(visitor.status);
          const StatusIcon = config.icon;
          return (
            <div key={visitor.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-input flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-black text-primary">{visitor.name}</h3>
                      <span className="text-xs font-bold text-secondary bg-input px-2 py-0.5 rounded">{visitor.relation}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-secondary">
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {visitor.mobile}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {visitor.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {visitor.expectedArrival} – {visitor.expectedDeparture}</span>
                    </div>
                    {visitor.status === 'Visited' && (
                      <div className="flex gap-4 mt-2 text-xs font-bold text-success">
                        <span>Entry: {visitor.entryTime}</span>
                        <span>Exit: {visitor.exitTime}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-black self-start ${config.bg} ${config.color} ${config.border}`}>
                  <StatusIcon className="w-3.5 h-3.5" /> {visitor.status}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs font-bold text-secondary">{visitor.id} • {visitor.purpose}</span>
              </div>
            </div>
          );
        }) : (
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-input flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-secondary opacity-50" />
            </div>
            <p className="font-bold text-primary mb-2">No visitors in this category</p>
            <p className="text-sm text-secondary">Request a new visitor pass using the button above.</p>
          </div>
        )}
      </div>

      {/* New Visitor Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-border flex items-center justify-between bg-input/30">
              <h2 className="text-lg font-black text-primary flex items-center gap-2"><Users className="w-5 h-5" /> Request Visitor Pass</h2>
              <button onClick={() => { setIsNewModalOpen(false); setSubmitted(false); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-input text-secondary hover:text-danger transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            {submitted ? (
              <div className="p-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-lg font-black text-primary mb-2">Request Sent!</h3>
                <p className="text-sm text-secondary mb-6">Manager will review and approve your visitor request.</p>
                <button onClick={() => { setIsNewModalOpen(false); setSubmitted(false); setForm({ name: '', mobile: '', relation: '', purpose: '', date: '', arrival: '', departure: '' }); }} className="bg-primary text-white font-bold text-sm px-6 py-2 rounded-xl">Close</button>
              </div>
            ) : (
              <div className="p-6 overflow-y-auto space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Visitor Name *</label>
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full Name" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Mobile *</label>
                    <input value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} placeholder="Phone number" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Relation *</label>
                    <select value={form.relation} onChange={e => setForm({...form, relation: e.target.value})} className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm appearance-none">
                      <option value="">Select</option>
                      <option>Father</option><option>Mother</option><option>Sibling</option>
                      <option>Relative</option><option>Friend</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Purpose</label>
                    <input value={form.purpose} onChange={e => setForm({...form, purpose: e.target.value})} placeholder="Purpose of visit" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Visit Date *</label>
                  <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Expected Arrival</label>
                    <input type="time" value={form.arrival} onChange={e => setForm({...form, arrival: e.target.value})} className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Expected Departure</label>
                    <input type="time" value={form.departure} onChange={e => setForm({...form, departure: e.target.value})} className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setIsNewModalOpen(false)} className="flex-1 bg-card border border-border text-secondary font-bold text-sm py-2.5 rounded-xl hover:bg-input transition-colors">Cancel</button>
                  <button onClick={handleSubmit} className="flex-1 bg-primary text-white font-bold text-sm py-2.5 rounded-xl shadow-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Submit Request
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
