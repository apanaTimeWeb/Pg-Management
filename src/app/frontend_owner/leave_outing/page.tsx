'use client';

import React, { useState } from 'react';
import { 
  PlaneTakeoff, Clock, CheckCircle2, XCircle, 
  MapPin, Calendar, FileText, ArrowRightCircle, 
  ArrowLeftCircle, AlertTriangle, User, ShieldAlert,
  Search, Filter
} from 'lucide-react';

const MOCK_REQUESTS = [
  { id: 'LV-205', student: 'Aman Singh', room: '101', type: 'Leave', destination: 'Home (Delhi)', reason: 'Diwali Holidays', from: '05 Oct, 09:00 AM', to: '10 Oct, 08:00 PM', status: 'Pending Approval', emergency: false },
  { id: 'OUT-204', student: 'Vikram Patel', room: '205', type: 'Outing', destination: 'Local Market', reason: 'Buying stationery', from: 'Today, 05:00 PM', to: 'Today, 08:00 PM', status: 'Pending Approval', emergency: false },
  { id: 'EMG-203', student: 'Rahul Kumar', room: '304', type: 'Emergency', destination: 'City Hospital', reason: 'Medical emergency', from: 'Today, 10:30 AM', to: 'Tomorrow, 10:00 AM', status: 'Active Outside', emergency: true },
  { id: 'LV-202', student: 'Suresh Das', room: '401', type: 'Leave', destination: 'Wedding (Jaipur)', reason: 'Cousin\'s Wedding', from: '01 Oct, 06:00 AM', to: '04 Oct, 09:00 PM', status: 'Active Outside', emergency: false },
  { id: 'OUT-201', student: 'Amit Verma', room: '105', type: 'Outing', destination: 'Cinema', reason: 'Movie', from: 'Yesterday, 04:00 PM', to: 'Yesterday, 09:00 PM', status: 'Returned', emergency: false },
];

export default function LeaveOutingPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'history'>('pending');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRequests = MOCK_REQUESTS.filter(req => {
    const matchesSearch = req.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.id.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'pending') return req.status === 'Pending Approval';
    if (activeTab === 'active') return req.status === 'Active Outside' || req.status === 'Approved (Waiting Exit)';
    return req.status === 'Returned' || req.status === 'Rejected';
  });

  const getTypeBadge = (type: string, emergency: boolean) => {
    if (emergency || type === 'Emergency') {
      return <span className="px-2.5 py-1 bg-red-100 text-red-700 border border-red-200 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 w-max"><AlertTriangle className="w-3 h-3"/> Emergency Leave</span>;
    }
    if (type === 'Leave') {
      return <span className="px-2.5 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 w-max"><PlaneTakeoff className="w-3 h-3"/> Full Leave</span>;
    }
    return <span className="px-2.5 py-1 bg-purple-100 text-purple-700 border border-purple-200 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 w-max"><Clock className="w-3 h-3"/> Short Outing</span>;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <PlaneTakeoff className="w-7 h-7 text-[#F5A623]" />
            Leave & Outing Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">Review student requests, track exits, and mark returns securely.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <FileText className="w-4 h-4" /> Export Reports
          </button>
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <ShieldAlert className="w-4 h-4" /> Log Emergency
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl"><Clock className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Pending Requests</p>
            <h3 className="text-2xl font-black text-gray-800">2</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><ArrowRightCircle className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Active Outside</p>
            <h3 className="text-2xl font-black text-gray-800">2</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><AlertTriangle className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Emergency</p>
            <h3 className="text-2xl font-black text-red-600">1</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Returned Today</p>
            <h3 className="text-2xl font-black text-gray-800">5</h3>
          </div>
        </div>
      </div>

      {/* Main Content Dashboard */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
        
        {/* Navigation Tabs */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between gap-4 shrink-0">
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-max">
            <button 
              onClick={() => setActiveTab('pending')}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'pending' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Pending Approvals <span className="bg-yellow-500 text-white px-1.5 py-0.5 rounded-full text-[10px]">2</span>
            </button>
            <button 
              onClick={() => setActiveTab('active')}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'active' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Active Outside <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px]">2</span>
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              History / Returned
            </button>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by student, ID, or destination..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] bg-white"
            />
          </div>
        </div>

        {/* Requests Grid */}
        <div className="p-5 flex-1 overflow-y-auto bg-gray-50/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredRequests.map(req => (
              <div key={req.id} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-[#F5A623] transition-colors shadow-sm flex flex-col relative">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm">{req.student}</h3>
                      <p className="text-xs text-gray-500">Room {req.room} • {req.id}</p>
                    </div>
                  </div>
                  {getTypeBadge(req.type, req.emergency)}
                </div>

                {/* Details */}
                <div className="space-y-3 mb-5 flex-1">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Destination & Reason</p>
                      <p className="text-sm font-semibold text-gray-700">{req.destination}</p>
                      <p className="text-xs text-gray-500">"{req.reason}"</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Requested Duration</p>
                      <p className="text-xs font-semibold text-gray-700">From: <span className="text-gray-500 font-normal">{req.from}</span></p>
                      <p className="text-xs font-semibold text-gray-700">Exp. Return: <span className="text-gray-500 font-normal">{req.to}</span></p>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="pt-4 border-t border-gray-100 mt-auto">
                  
                  {activeTab === 'pending' && (
                    <div className="flex gap-3">
                      <button className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex justify-center items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Approve
                      </button>
                      <button className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-sm font-bold transition-colors flex justify-center items-center gap-1.5">
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  )}

                  {activeTab === 'active' && (
                    <div className="flex gap-3">
                      <button className="flex-1 py-2.5 bg-[#1A3A5C] hover:bg-[#122a42] text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex justify-center items-center gap-1.5">
                        <ArrowLeftCircle className="w-4 h-4" /> Mark Return
                      </button>
                    </div>
                  )}

                  {activeTab === 'history' && (
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg ${req.status === 'Returned' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {req.status}
                      </span>
                      <button className="text-sm font-bold text-[#F5A623] hover:underline">View Log</button>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>

          {filteredRequests.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-12">
              <PlaneTakeoff className="w-16 h-16 text-gray-200 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-1">No requests found</h3>
              <p className="text-gray-500">There are no leave or outing records matching this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
