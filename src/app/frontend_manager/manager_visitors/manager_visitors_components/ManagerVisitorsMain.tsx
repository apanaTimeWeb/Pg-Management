// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  Users, Search, Plus, CheckCircle2, UserPlus, LogIn, LogOut, 
  X, MapPin, Phone, User, Clock, ShieldAlert, ArrowRight, FileText 
} from 'lucide-react';

type VisitorStatus = 'Request' | 'Approved' | 'Inside' | 'Exit';

interface Visitor {
  id: string;
  visitorName: string;
  mobile: string;
  student: string;
  room: string;
  relation: string;
  purpose: string;
  idProof: string;
  expectedTime: string;
  entryTime?: string;
  exitTime?: string;
  status: VisitorStatus;
}

const INITIAL_VISITORS: Visitor[] = [
  {
    id: 'V-1001',
    visitorName: 'Rajesh Sharma',
    mobile: '+91 9876543210',
    student: 'Rahul Sharma',
    room: '102',
    relation: 'Father',
    purpose: 'Casual Visit',
    idProof: 'Aadhar (Verified)',
    expectedTime: '10:00 AM',
    status: 'Request'
  },
  {
    id: 'V-1002',
    visitorName: 'Sneha Patel',
    mobile: '+91 8765432109',
    student: 'Suresh Patel',
    room: '205',
    relation: 'Sister',
    purpose: 'Delivering luggage',
    idProof: 'Pending',
    expectedTime: '11:30 AM',
    status: 'Approved'
  },
  {
    id: 'V-1003',
    visitorName: 'Ramesh Singh',
    mobile: '+91 7654321098',
    student: 'Vikas Singh',
    room: '304',
    relation: 'Uncle',
    purpose: 'Family Emergency',
    idProof: 'Driving License',
    expectedTime: '09:00 AM',
    entryTime: '09:15 AM',
    status: 'Inside'
  },
  {
    id: 'V-1004',
    visitorName: 'Priya Kumar',
    mobile: '+91 6543210987',
    student: 'Amit Kumar',
    room: '105',
    relation: 'Mother',
    purpose: 'Meeting',
    idProof: 'Aadhar',
    expectedTime: '08:00 AM',
    entryTime: '08:10 AM',
    exitTime: '10:30 AM',
    status: 'Exit'
  }
];

export default function ManagerVisitorsMain() {
  const [visitors, setVisitors] = useState<Visitor[]>(INITIAL_VISITORS);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor>(INITIAL_VISITORS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | VisitorStatus>('All');
  const [activeTab, setActiveTab] = useState<'today' | 'history'>('today');
  const [addModalOpen, setAddModalOpen] = useState(false);

  const filteredVisitors = visitors.filter(v => {
    const matchesSearch = v.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) || v.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || v.status === filterStatus;
    // For today tab, show all except maybe past days (mocked as all being today here)
    // For history, show all (in a real app, history would fetch past records)
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: VisitorStatus) => {
    switch (status) {
      case 'Request': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Approved': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Inside': return 'bg-green-100 text-green-700 border-green-200';
      case 'Exit': return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleUpdateStatus = (newStatus: VisitorStatus) => {
    const timeNow = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    setVisitors(prev => prev.map(v => {
      if (v.id === selectedVisitor.id) {
        return {
          ...v,
          status: newStatus,
          entryTime: newStatus === 'Inside' && !v.entryTime ? timeNow : v.entryTime,
          exitTime: newStatus === 'Exit' && !v.exitTime ? timeNow : v.exitTime,
        };
      }
      return v;
    }));
    
    setSelectedVisitor(prev => ({
      ...prev,
      status: newStatus,
      entryTime: newStatus === 'Inside' && !prev.entryTime ? timeNow : prev.entryTime,
      exitTime: newStatus === 'Exit' && !prev.exitTime ? timeNow : prev.exitTime,
    }));
  };

  const handleAddVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    setAddModalOpen(false);
    alert('Visitor added successfully (Mock)');
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <Users className="w-6 h-6"/>
            </div>
            Visitor Management
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Approve requests and track visitor entries and exits.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setAddModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all"
          >
            <UserPlus className="w-4 h-4" /> Add Visitor
          </button>
        </div>
      </div>

      <div className="bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-2 border-b border-border/50 bg-page/30 shrink-0">
          <button 
            onClick={() => setActiveTab('today')}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'today' ? 'bg-white text-indigo-600 shadow-sm border border-border/50' : 'text-secondary hover:bg-page hover:text-primary'}`}
          >
            Today's Visitors
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'history' ? 'bg-white text-indigo-600 shadow-sm border border-border/50' : 'text-secondary hover:bg-page hover:text-primary'}`}
          >
            Student-wise History
          </button>
        </div>

        {activeTab === 'today' && (
          <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
            
            {/* Left Side: List */}
            <div className="lg:w-1/3 border-r border-border/50 flex flex-col min-h-0">
              <div className="p-4 border-b border-border/50 bg-page/10 shrink-0 space-y-3">
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                  {['All', 'Request', 'Approved', 'Inside', 'Exit'].map(status => (
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
                    placeholder="Search visitor or student..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {filteredVisitors.map(v => (
                  <div 
                    key={v.id}
                    onClick={() => setSelectedVisitor(v)}
                    className={`p-3 rounded-xl cursor-pointer transition-all ${
                      selectedVisitor.id === v.id 
                        ? 'bg-indigo-50 border border-indigo-200 shadow-sm' 
                        : 'bg-transparent border border-transparent hover:bg-page/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-primary truncate">{v.visitorName}</h4>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${getStatusColor(v.status)}`}>
                        {v.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-secondary truncate">To meet: {v.student} (Rm {v.room})</p>
                    <p className="text-[10px] text-secondary mt-1 flex items-center gap-1"><Clock className="w-3 h-3"/> {v.expectedTime}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Details & Flow */}
            <div className="flex-1 flex flex-col min-h-0 bg-gray-50/30 overflow-y-auto">
              
              {/* Header Info */}
              <div className="p-6 border-b border-border/50 bg-white shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getStatusColor(selectedVisitor.status)}`}>
                    Current Status: {selectedVisitor.status}
                  </span>
                  <span className="text-sm font-bold text-secondary">ID: {selectedVisitor.id}</span>
                </div>
                
                <h2 className="text-2xl font-black text-primary leading-tight">{selectedVisitor.visitorName}</h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm font-bold text-secondary flex items-center gap-1"><Phone className="w-4 h-4"/> {selectedVisitor.mobile}</span>
                  <span className="text-sm font-bold text-secondary flex items-center gap-1"><User className="w-4 h-4"/> {selectedVisitor.relation}</span>
                </div>
              </div>

              <div className="p-6 flex-1 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
                    <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Visiting</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-primary">{selectedVisitor.student}</p>
                        <p className="text-xs text-secondary flex items-center gap-1"><MapPin className="w-3 h-3"/> Room {selectedVisitor.room}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
                    <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Details</p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-primary"><span className="text-secondary">Purpose:</span> {selectedVisitor.purpose}</p>
                      <p className="text-sm font-medium text-primary"><span className="text-secondary">ID Proof:</span> {selectedVisitor.idProof}</p>
                      <p className="text-sm font-medium text-primary"><span className="text-secondary">Expected:</span> {selectedVisitor.expectedTime}</p>
                    </div>
                  </div>
                </div>

                {/* Visitor Flow Pipeline */}
                <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                  <h3 className="font-bold text-primary mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-600" /> Visitor Flow Actions
                  </h3>
                  
                  <div className="flex flex-col md:flex-row items-center gap-2 w-full justify-between mb-8 overflow-x-auto hide-scrollbar">
                    
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-primary text-center">Request<br/>Submitted</span>
                    </div>
                    
                    <div className={`h-1 w-8 md:flex-1 md:w-auto ${selectedVisitor.status !== 'Request' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                    
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        selectedVisitor.status !== 'Request' ? 'bg-green-500 text-white' : 'bg-indigo-100 text-indigo-600 border-2 border-indigo-200'
                      }`}>
                        {selectedVisitor.status !== 'Request' ? <CheckCircle2 className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                      </div>
                      <span className={`text-xs font-bold text-center ${selectedVisitor.status !== 'Request' ? 'text-primary' : 'text-secondary'}`}>Approval</span>
                    </div>
                    
                    <div className={`h-1 w-8 md:flex-1 md:w-auto ${selectedVisitor.status === 'Inside' || selectedVisitor.status === 'Exit' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                    
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        selectedVisitor.status === 'Inside' || selectedVisitor.status === 'Exit' ? 'bg-green-500 text-white' : 
                        selectedVisitor.status === 'Approved' ? 'bg-indigo-100 text-indigo-600 border-2 border-indigo-200' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                      }`}>
                        {selectedVisitor.status === 'Inside' || selectedVisitor.status === 'Exit' ? <CheckCircle2 className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                      </div>
                      <span className={`text-xs font-bold text-center ${selectedVisitor.status === 'Inside' || selectedVisitor.status === 'Exit' ? 'text-primary' : 'text-secondary'}`}>Visitor<br/>Entry</span>
                      {selectedVisitor.entryTime && <span className="text-[10px] text-green-600 font-bold">{selectedVisitor.entryTime}</span>}
                    </div>
                    
                    <div className={`h-1 w-8 md:flex-1 md:w-auto ${selectedVisitor.status === 'Exit' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                    
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        selectedVisitor.status === 'Exit' ? 'bg-green-500 text-white' : 
                        selectedVisitor.status === 'Inside' ? 'bg-indigo-100 text-indigo-600 border-2 border-indigo-200' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                      }`}>
                        {selectedVisitor.status === 'Exit' ? <CheckCircle2 className="w-5 h-5" /> : <LogOut className="w-5 h-5" />}
                      </div>
                      <span className={`text-xs font-bold text-center ${selectedVisitor.status === 'Exit' ? 'text-primary' : 'text-secondary'}`}>Visitor<br/>Exit</span>
                      {selectedVisitor.exitTime && <span className="text-[10px] text-green-600 font-bold">{selectedVisitor.exitTime}</span>}
                    </div>

                  </div>

                  {/* Operational Buttons */}
                  <div className="bg-page/50 p-4 rounded-xl border border-border flex justify-center gap-4">
                    {selectedVisitor.status === 'Request' && (
                      <button 
                        onClick={() => handleUpdateStatus('Approved')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" /> Approve Visitor
                      </button>
                    )}
                    {selectedVisitor.status === 'Approved' && (
                      <button 
                        onClick={() => handleUpdateStatus('Inside')}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all flex items-center gap-2"
                      >
                        <LogIn className="w-5 h-5" /> Record Entry Now
                      </button>
                    )}
                    {selectedVisitor.status === 'Inside' && (
                      <button 
                        onClick={() => handleUpdateStatus('Exit')}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all flex items-center gap-2"
                      >
                        <LogOut className="w-5 h-5" /> Record Exit
                      </button>
                    )}
                    {selectedVisitor.status === 'Exit' && (
                      <div className="text-green-600 font-bold flex items-center gap-2 p-2">
                        <CheckCircle2 className="w-5 h-5" /> Visit Completed Successfully
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white flex-1">
            <div className="w-16 h-16 bg-page rounded-full flex items-center justify-center border border-border shadow-sm mb-4">
              <FileText className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-lg font-bold text-primary">Student-wise History</h3>
            <p className="text-sm text-secondary mt-1 max-w-sm">
              Tabular view of all past visitors, searchable by Student Name, Room, or Date.
            </p>
          </div>
        )}
      </div>

      {/* Add Visitor Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border/50 bg-page/80 flex items-center justify-between">
              <h3 className="font-black text-primary flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-600" /> Add New Visitor
              </h3>
              <button onClick={() => setAddModalOpen(false)} className="text-secondary hover:text-red-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddVisitor} className="p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-secondary">Visitor Name</label>
                  <input required type="text" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-sm font-bold text-secondary">Mobile No.</label>
                  <input required type="text" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-secondary">Student Name</label>
                  <input required type="text" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-sm font-bold text-secondary">Relation</label>
                  <input required type="text" placeholder="e.g. Father, Friend" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-secondary">Purpose of Visit</label>
                <input required type="text" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-secondary">ID Proof (Verified)</label>
                  <input required type="text" placeholder="e.g. Aadhar Card" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-sm font-bold text-secondary">Expected Entry Time</label>
                  <input required type="time" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div className="p-4 border-t border-border/50 bg-gray-50 flex items-center justify-end gap-3 mt-4 -mx-6 -mb-6">
                <button type="button" onClick={() => setAddModalOpen(false)} className="px-4 py-2 font-bold text-secondary hover:text-primary transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all">
                  Register Visitor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}