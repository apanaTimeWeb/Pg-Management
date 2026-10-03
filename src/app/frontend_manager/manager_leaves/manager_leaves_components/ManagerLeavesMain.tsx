// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  CalendarOff, Search, Filter, AlertTriangle, CheckCircle2, 
  XCircle, LogOut, LogIn, Clock, MapPin, Phone, User, 
  ChevronRight, ShieldAlert, FileText, Send, X
} from 'lucide-react';

type LeaveStatus = 'Pending' | 'Approved' | 'Rejected' | 'Active Outing' | 'Returned' | 'Overdue Return';

interface LeaveRequest {
  id: string;
  student: string;
  room: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  destination: string;
  contact: string;
  expectedReturn: string;
  status: LeaveStatus;
  isEmergency?: boolean;
  auditNote?: string;
}

const INITIAL_LEAVES: LeaveRequest[] = [
  {
    id: 'LR-105',
    student: 'Rahul Sharma',
    room: '102',
    leaveType: 'Home Visit',
    startDate: '04 Oct 2026',
    endDate: '07 Oct 2026',
    reason: 'Diwali Holidays',
    destination: 'Jaipur, Rajasthan',
    contact: '+91 9876543210 (Father)',
    expectedReturn: '07 Oct 2026, 05:00 PM',
    status: 'Pending'
  },
  {
    id: 'LR-104',
    student: 'Amit Kumar',
    room: '205',
    leaveType: 'Night Out',
    startDate: '03 Oct 2026',
    endDate: '04 Oct 2026',
    reason: 'Friend\'s Birthday Party',
    destination: 'Sector 29, Gurgaon',
    contact: '+91 8765432109 (Self)',
    expectedReturn: '04 Oct 2026, 09:00 AM',
    status: 'Approved'
  },
  {
    id: 'LR-102',
    student: 'Suresh Patel',
    room: '304',
    leaveType: 'Emergency Leave',
    startDate: '02 Oct 2026',
    endDate: '05 Oct 2026',
    reason: 'Medical Emergency at home',
    destination: 'Ahmedabad, Gujarat',
    contact: '+91 7654321098 (Brother)',
    expectedReturn: '05 Oct 2026, 10:00 AM',
    status: 'Active Outing',
    isEmergency: true
  },
  {
    id: 'LR-101',
    student: 'Vikas Singh',
    room: '105',
    leaveType: 'Weekend Outing',
    startDate: '01 Oct 2026',
    endDate: '02 Oct 2026',
    reason: 'Local Shopping',
    destination: 'City Mall',
    contact: '+91 6543210987',
    expectedReturn: '02 Oct 2026, 08:00 PM',
    status: 'Overdue Return'
  }
];

export default function ManagerLeavesMain() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>(INITIAL_LEAVES);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest>(INITIAL_LEAVES[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | LeaveStatus>('All');
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  const filteredLeaves = leaves.filter(l => {
    const matchesSearch = l.student.toLowerCase().includes(searchTerm.toLowerCase()) || l.room.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || l.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: LeaveStatus) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Approved': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'Active Outing': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Returned': return 'bg-green-100 text-green-700 border-green-200';
      case 'Overdue Return': return 'bg-red-100 text-red-700 border-red-200 animate-pulse';
    }
  };

  const handleUpdateStatus = (newStatus: LeaveStatus) => {
    setLeaves(prev => prev.map(l => l.id === selectedLeave.id ? { ...l, status: newStatus } : l));
    setSelectedLeave(prev => ({ ...prev, status: newStatus }));
  };

  const handleReject = () => {
    const reason = window.prompt("Enter reason for rejection (sent to student):");
    if (reason !== null) {
      handleUpdateStatus('Rejected');
    }
  };

  const handleEmergencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmergencyModalOpen(false);
    alert('Emergency leave recorded with audit note.');
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <CalendarOff className="w-6 h-6"/>
            </div>
            Leave & Outing Management
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Review requests and track student exits/returns.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setEmergencyModalOpen(true)}
            className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all"
          >
            <ShieldAlert className="w-4 h-4" /> Log Emergency Leave
          </button>
        </div>
      </div>

      <div className="bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
        
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
          
          {/* Left Side: List */}
          <div className="lg:w-1/3 border-r border-border/50 flex flex-col min-h-0">
            <div className="p-4 border-b border-border/50 bg-page/10 shrink-0 space-y-3">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                {['All', 'Pending', 'Approved', 'Active Outing', 'Overdue Return', 'Returned', 'Rejected'].map(status => (
                  <button 
                    key={status}
                    onClick={() => setFilterStatus(status as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                      filterStatus === status 
                        ? 'bg-indigo-600 text-white border-indigo-600' 
                        : 'bg-white text-secondary border-border/60 hover:border-indigo-300'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                <input 
                  type="text" 
                  placeholder="Search student or room..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredLeaves.map(l => (
                <div 
                  key={l.id}
                  onClick={() => setSelectedLeave(l)}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    selectedLeave.id === l.id 
                      ? 'bg-indigo-50 border border-indigo-200 shadow-sm' 
                      : 'bg-transparent border border-transparent hover:bg-page/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-primary truncate flex items-center gap-1">
                      {l.isEmergency && <AlertTriangle className="w-3 h-3 text-red-500" />}
                      {l.student}
                    </h4>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${getStatusColor(l.status)}`}>
                      {l.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-secondary truncate">Rm {l.room} • {l.leaveType}</p>
                  <p className="text-[10px] text-secondary mt-1 flex items-center gap-1"><Clock className="w-3 h-3"/> {l.startDate.split(',')[0]} - {l.endDate.split(',')[0]}</p>
                </div>
              ))}
              {filteredLeaves.length === 0 && (
                <div className="text-center p-8 text-secondary text-sm">No leave requests found.</div>
              )}
            </div>
          </div>

          {/* Right Side: Details & Flow */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-50/30 overflow-y-auto">
            
            {/* Header Info */}
            <div className="p-6 border-b border-border/50 bg-white shrink-0 relative overflow-hidden">
              {selectedLeave.isEmergency && (
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <AlertTriangle className="w-24 h-24 text-red-500" />
                </div>
              )}
              
              <div className="flex items-center justify-between mb-3 relative z-10">
                <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getStatusColor(selectedLeave.status)}`}>
                  Status: {selectedLeave.status}
                </span>
                <span className="text-sm font-bold text-secondary">Request ID: {selectedLeave.id}</span>
              </div>
              
              <h2 className="text-2xl font-black text-primary leading-tight relative z-10">{selectedLeave.student}</h2>
              <div className="flex items-center gap-4 mt-2 relative z-10">
                <span className="text-sm font-bold text-secondary flex items-center gap-1 bg-page px-2 py-1 rounded border border-border">Room {selectedLeave.room}</span>
                <span className="text-sm font-bold text-secondary flex items-center gap-1"><Phone className="w-4 h-4"/> {selectedLeave.contact}</span>
              </div>
            </div>

            <div className="p-6 flex-1 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-border shadow-sm">
                  <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4 border-b border-border/50 pb-2">Leave Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-secondary">Leave Type</p>
                      <p className="font-bold text-primary">{selectedLeave.leaveType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-secondary">Reason</p>
                      <p className="font-bold text-primary">{selectedLeave.reason}</p>
                    </div>
                    <div>
                      <p className="text-xs text-secondary">Destination</p>
                      <p className="font-bold text-primary flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-indigo-500"/> {selectedLeave.destination}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-border shadow-sm">
                  <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4 border-b border-border/50 pb-2">Schedule & Timing</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-secondary">Start Date</p>
                      <p className="font-bold text-primary">{selectedLeave.startDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-secondary">End Date</p>
                      <p className="font-bold text-primary">{selectedLeave.endDate}</p>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-secondary">Expected Return</p>
                      <p className="font-bold text-indigo-600 flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {selectedLeave.expectedReturn}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedLeave.status === 'Overdue Return' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-900">Student is Overdue!</h4>
                    <p className="text-sm text-red-800 mt-1">The student was expected to return by <b>{selectedLeave.expectedReturn}</b>. Please contact the student or their registered emergency contact immediately.</p>
                  </div>
                </div>
              )}

              {/* Leave Lifecycle Pipeline */}
              <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                <h3 className="font-bold text-primary mb-6 flex items-center gap-2">
                  <CalendarOff className="w-5 h-5 text-indigo-600" /> Action Flow
                </h3>
                
                <div className="flex flex-col md:flex-row items-center gap-2 w-full justify-between mb-8 overflow-x-auto hide-scrollbar">
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-primary text-center">Request</span>
                  </div>
                  
                  <div className={`h-1 w-8 md:flex-1 md:w-auto ${selectedLeave.status !== 'Pending' ? (selectedLeave.status === 'Rejected' ? 'bg-red-500' : 'bg-green-500') : 'bg-gray-200'}`}></div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      selectedLeave.status === 'Rejected' ? 'bg-red-500 text-white' :
                      selectedLeave.status !== 'Pending' ? 'bg-green-500 text-white' : 'bg-indigo-100 text-indigo-600 border-2 border-indigo-200'
                    }`}>
                      {selectedLeave.status === 'Rejected' ? <XCircle className="w-5 h-5" /> : selectedLeave.status !== 'Pending' ? <CheckCircle2 className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                    </div>
                    <span className={`text-xs font-bold text-center ${selectedLeave.status !== 'Pending' ? (selectedLeave.status === 'Rejected' ? 'text-red-600' : 'text-primary') : 'text-secondary'}`}>
                      {selectedLeave.status === 'Rejected' ? 'Rejected' : 'Approval'}
                    </span>
                  </div>
                  
                  <div className={`h-1 w-8 md:flex-1 md:w-auto ${selectedLeave.status === 'Active Outing' || selectedLeave.status === 'Returned' || selectedLeave.status === 'Overdue Return' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      selectedLeave.status === 'Active Outing' || selectedLeave.status === 'Returned' || selectedLeave.status === 'Overdue Return' ? 'bg-green-500 text-white' : 
                      selectedLeave.status === 'Approved' ? 'bg-indigo-100 text-indigo-600 border-2 border-indigo-200' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                    }`}>
                      {selectedLeave.status === 'Active Outing' || selectedLeave.status === 'Returned' || selectedLeave.status === 'Overdue Return' ? <CheckCircle2 className="w-5 h-5" /> : <LogOut className="w-5 h-5" />}
                    </div>
                    <span className={`text-xs font-bold text-center ${selectedLeave.status === 'Active Outing' || selectedLeave.status === 'Returned' || selectedLeave.status === 'Overdue Return' ? 'text-primary' : 'text-secondary'}`}>Exit Marked</span>
                  </div>
                  
                  <div className={`h-1 w-8 md:flex-1 md:w-auto ${selectedLeave.status === 'Returned' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      selectedLeave.status === 'Returned' ? 'bg-green-500 text-white' : 
                      selectedLeave.status === 'Active Outing' || selectedLeave.status === 'Overdue Return' ? 'bg-indigo-100 text-indigo-600 border-2 border-indigo-200' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                    }`}>
                      {selectedLeave.status === 'Returned' ? <CheckCircle2 className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                    </div>
                    <span className={`text-xs font-bold text-center ${selectedLeave.status === 'Returned' ? 'text-primary' : 'text-secondary'}`}>Return<br/>Marked</span>
                  </div>

                </div>

                {/* Operational Buttons */}
                <div className="bg-page/50 p-4 rounded-xl border border-border flex justify-center gap-4">
                  {selectedLeave.status === 'Pending' && (
                    <>
                      <button 
                        onClick={handleReject}
                        className="bg-white border border-border text-red-600 hover:bg-red-50 hover:border-red-200 px-6 py-3 rounded-xl font-bold shadow-sm transition-all flex items-center gap-2"
                      >
                        <XCircle className="w-5 h-5" /> Reject
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus('Approved')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" /> Approve Leave
                      </button>
                    </>
                  )}
                  
                  {selectedLeave.status === 'Approved' && (
                    <button 
                      onClick={() => handleUpdateStatus('Active Outing')}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all flex items-center gap-2"
                    >
                      <LogOut className="w-5 h-5" /> Mark Exit (Student Left)
                    </button>
                  )}
                  
                  {(selectedLeave.status === 'Active Outing' || selectedLeave.status === 'Overdue Return') && (
                    <button 
                      onClick={() => handleUpdateStatus('Returned')}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all flex items-center gap-2"
                    >
                      <LogIn className="w-5 h-5" /> Mark Returned
                    </button>
                  )}
                  
                  {selectedLeave.status === 'Returned' && (
                    <div className="text-green-600 font-bold flex items-center gap-2 p-2">
                      <CheckCircle2 className="w-5 h-5" /> Cycle Completed
                    </div>
                  )}
                  {selectedLeave.status === 'Rejected' && (
                    <div className="text-red-600 font-bold flex items-center gap-2 p-2">
                      <XCircle className="w-5 h-5" /> Request was Rejected
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Emergency Leave Modal */}
      {emergencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border/50 bg-red-50 flex items-center justify-between">
              <h3 className="font-black text-red-700 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> Log Emergency Leave
              </h3>
              <button onClick={() => setEmergencyModalOpen(false)} className="text-red-700 hover:text-red-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleEmergencySubmit} className="p-6 space-y-4">
              
              <div className="p-3 bg-red-100 border border-red-200 rounded-lg text-sm text-red-800 font-medium mb-2">
                Use this only when a student has to leave immediately due to an emergency and cannot raise a request themselves.
              </div>

              <div>
                <label className="text-sm font-bold text-secondary">Select Student</label>
                <select required className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-red-500">
                  <option value="">-- Choose Student --</option>
                  <option value="1">Rahul Sharma (102)</option>
                  <option value="2">Amit Kumar (205)</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-secondary">Reason / Destination</label>
                <input required type="text" placeholder="Where are they going and why?" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-red-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-secondary">Emergency Contact</label>
                  <input required type="text" placeholder="Mobile / Relation" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-red-500" />
                </div>
                <div>
                  <label className="text-sm font-bold text-secondary">Expected Return</label>
                  <input required type="datetime-local" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-red-500" />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-secondary text-red-600">Audit Note (Mandatory)</label>
                <textarea required rows={2} placeholder="Explain why manager approval was given instantly..." className="w-full px-4 py-2 mt-1 border border-red-200 bg-red-50 rounded-lg focus:outline-none focus:border-red-500 resize-none"></textarea>
              </div>

              <div className="p-4 border-t border-border/50 bg-gray-50 flex items-center justify-end gap-3 mt-4 -mx-6 -mb-6">
                <button type="button" onClick={() => setEmergencyModalOpen(false)} className="px-4 py-2 font-bold text-secondary hover:text-primary transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Approve & Mark Exit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
