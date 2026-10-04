// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { Search, Filter, Plus, CheckCircle, XCircle, Clock, PlaneTakeoff, ShieldCheck, MapPin } from 'lucide-react';

const MOCK_REQUESTS = [
  { id: 'REQ-001', name: 'Rahul Sharma', room: '101A', type: 'Leave', from: '10 Oct', to: '15 Oct', reason: 'Going Home', status: 'Pending' },
  { id: 'REQ-002', name: 'Amit Kumar', room: '102B', type: 'Outing', from: '05 Oct 06:00 PM', to: '05 Oct 09:30 PM', reason: 'Shopping', status: 'Approved' },
  { id: 'REQ-003', name: 'Sneha Singh', room: '103A', type: 'Leave', from: '12 Oct', to: '14 Oct', reason: 'Medical Exam', status: 'Pending' },
  { id: 'REQ-004', name: 'Priya Verma', room: '104C', type: 'Outing', from: '05 Oct 04:00 PM', to: '05 Oct 08:00 PM', reason: 'Dinner', status: 'Rejected' },
];

export default function LeaveOutingPage() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All'); // All, Leave, Outing

  const filteredData = requests.filter(req => {
    if (activeTab !== 'All' && req.type !== activeTab) return false;
    if (searchTerm && !req.name.toLowerCase().includes(searchTerm.toLowerCase()) && !req.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const pendingCount = requests.filter(d => d.status === 'Pending').length;
  const approvedLeaves = requests.filter(d => d.status === 'Approved' && d.type === 'Leave').length;
  const approvedOutings = requests.filter(d => d.status === 'Approved' && d.type === 'Outing').length;

  const updateStatus = (id, newStatus) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><PlaneTakeoff className="w-6 h-6 text-[#1A3A5C]"/> Leave & Outing</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Approve or reject student leave and outing requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Log Request
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-secondary uppercase">Pending Approvals</p>
            <h3 className="text-xl font-black text-primary">{pendingCount}</h3>
          </div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
            <PlaneTakeoff className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-secondary uppercase">Active Leaves</p>
            <h3 className="text-xl font-black text-primary">{approvedLeaves}</h3>
          </div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-100 text-green-600">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-secondary uppercase">Outings Today</p>
            <h3 className="text-xl font-black text-primary">{approvedOutings}</h3>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Tabs & Search */}
        <div className="p-4 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-page/50">
          <div className="flex gap-2 p-1 bg-input rounded-xl w-fit">
            {['All', 'Leave', 'Outing'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab ? 'bg-card text-primary shadow-sm' : 'text-secondary hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search student..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] text-primary transition-colors"
            />
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-page/30 text-[10px] uppercase tracking-wider text-secondary">
                <th className="p-4 font-bold">Student</th>
                <th className="p-4 font-bold">Type</th>
                <th className="p-4 font-bold">Duration</th>
                <th className="p-4 font-bold">Reason</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredData.map((req, idx) => (
                <tr key={idx} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary">{req.name}</p>
                    <p className="text-[10px] text-secondary mt-0.5">Room: {req.room} | ID: <span className="font-mono">{req.id}</span></p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${
                      req.type === 'Leave' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {req.type}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-secondary font-medium">
                    <span className="text-primary font-bold">{req.from}</span> to <span className="text-primary font-bold">{req.to}</span>
                  </td>
                  <td className="p-4 text-sm font-medium text-secondary truncate max-w-[150px]">{req.reason}</td>
                  <td className="p-4">
                    <span className={`flex items-center gap-1.5 text-xs font-bold ${
                      req.status === 'Approved' ? 'text-green-600' : 
                      req.status === 'Rejected' ? 'text-red-500' : 'text-yellow-600'
                    }`}>
                      {req.status === 'Approved' && <CheckCircle className="w-3.5 h-3.5"/>}
                      {req.status === 'Rejected' && <XCircle className="w-3.5 h-3.5"/>}
                      {req.status === 'Pending' && <Clock className="w-3.5 h-3.5"/>}
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {req.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => updateStatus(req.id, 'Approved')} className="px-3 py-1.5 text-xs font-bold bg-green-50 text-green-700 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">Approve</button>
                        <button onClick={() => updateStatus(req.id, 'Rejected')} className="px-3 py-1.5 text-xs font-bold bg-red-50 text-red-700 hover:bg-red-100 rounded-lg border border-red-200 transition-colors">Reject</button>
                      </div>
                    ) : (
                      <span className="text-xs text-secondary font-medium mr-2">Actioned</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr><td colSpan="6" className="p-8 text-center text-secondary font-medium">No requests found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Log Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-[#1A3A5C] text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-400" /> Log Request
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">X</button>
            </div>
            <div className="p-6 space-y-4 bg-page/50">
               <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Student Name</label>
                <input type="text" placeholder="e.g. Rahul" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Type</label>
                  <select className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-primary">
                    <option>Leave</option>
                    <option>Outing</option>
                  </select>
                </div>
                <div>
                   <label className="block text-xs font-bold text-secondary uppercase mb-2">Room</label>
                   <input type="text" placeholder="e.g. 101A" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-primary" />
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-border/50 bg-card flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 bg-[var(--bg-overlay)] text-secondary rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => {
                setRequests([{
                  id: `REQ-00${requests.length + 1}`, name: 'New Student', room: '101A', type: 'Leave', from: 'Today', to: 'Tomorrow', reason: 'Manual Log', status: 'Approved'
                }, ...requests]);
                setIsModalOpen(false);
              }} className="px-5 py-2 bg-[#1A3A5C] text-white rounded-xl font-bold">Save & Approve</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}