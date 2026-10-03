'use client';

import React, { useState } from 'react';
import { 
  Users, UserPlus, LogIn, LogOut, Clock, 
  CheckCircle2, XCircle, Search, Filter, 
  FileText, ShieldCheck, UserCheck, Calendar,
  MoreVertical, X
} from 'lucide-react';

const MOCK_VISITORS = [
  { id: 'VIS-101', name: 'Rahul Sharma', mobile: '+91 9876543210', student: 'Aman Singh (Room 101)', relation: 'Brother', purpose: 'Personal Visit', idProof: 'Aadhar - 1234', entry: '10:30 AM', exit: '-', status: 'Inside', date: 'Today' },
  { id: 'VIS-102', name: 'Sanjay Kumar', mobile: '+91 9123456789', student: 'Vikram Patel (Room 205)', relation: 'Father', purpose: 'Local Guardian', idProof: 'PAN - ABCDE', entry: '-', exit: '-', status: 'Pending', date: 'Today' },
  { id: 'VIS-103', name: 'Priya Das', mobile: '+91 9988776655', student: 'Neha Das (Room 302)', relation: 'Sister', purpose: 'Dropping luggage', idProof: 'Aadhar - 5678', entry: '09:00 AM', exit: '11:00 AM', status: 'Completed', date: 'Today' },
  { id: 'VIS-104', name: 'Amit Verma', mobile: '+91 9000111222', student: 'Rohan Verma (Room 105)', relation: 'Friend', purpose: 'Notes exchange', idProof: 'College ID', entry: '-', exit: '-', status: 'Approved', date: 'Today (Expected 4 PM)' },
  { id: 'VIS-105', name: 'Ramesh Gupta', mobile: '+91 9998887776', student: 'Suresh (Room 401)', relation: 'Uncle', purpose: 'Meeting', idProof: 'Driving License', entry: 'Yesterday, 5 PM', exit: 'Yesterday, 7 PM', status: 'Completed', date: '02 Oct 2026' },
];

export default function VisitorManagementPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'inside'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredVisitors = MOCK_VISITORS.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.mobile.includes(searchTerm);
    if (!matchesSearch) return false;
    if (activeTab === 'pending') return v.status === 'Pending' || v.status === 'Approved';
    if (activeTab === 'inside') return v.status === 'Inside';
    return true; // 'all' History
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Inside': return <span className="px-2.5 py-1 bg-green-100 text-green-700 border border-green-200 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 w-max"><LogIn className="w-3 h-3" /> Active Inside</span>;
      case 'Pending': return <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 border border-yellow-200 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 w-max"><Clock className="w-3 h-3" /> Pending Approval</span>;
      case 'Approved': return <span className="px-2.5 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 w-max"><UserCheck className="w-3 h-3" /> Approved (Expected)</span>;
      case 'Completed': return <span className="px-2.5 py-1 bg-gray-100 text-gray-600 border border-gray-200 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 w-max"><LogOut className="w-3 h-3" /> Checked Out</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Registration Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#F5A623]" /> New Visitor Entry
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-800 bg-gray-200 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Visitor Name</label>
                <input type="text" placeholder="e.g. Ramesh Kumar" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Mobile Number</label>
                <input type="text" placeholder="+91 9876543210" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Visiting Student & Room</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm">
                  <option>Select Student...</option>
                  <option>Aman Singh (Room 101)</option>
                  <option>Vikram Patel (Room 205)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Relation</label>
                <input type="text" placeholder="e.g. Father, Friend" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Purpose of Visit</label>
                <input type="text" placeholder="e.g. Dropping luggage" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">ID Proof Details</label>
                <div className="flex gap-2">
                  <select className="w-1/3 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm">
                    <option>Aadhar</option>
                    <option>PAN</option>
                    <option>College ID</option>
                  </select>
                  <input type="text" placeholder="ID Number" className="w-2/3 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm" />
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-colors">Cancel</button>
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 bg-green-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition-colors shadow-sm">
                <LogIn className="w-4 h-4" /> Record Entry Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="w-7 h-7 text-[#F5A623]" />
            Visitor Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">Track guest entries, approvals, and maintain a secure daily visitor log.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <FileText className="w-4 h-4" /> Daily Report
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#e09612] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <UserPlus className="w-4 h-4" /> Visitor Entry
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><LogIn className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Active Inside</p>
            <h3 className="text-2xl font-black text-gray-800">1</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl"><Clock className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Pending Approvals</p>
            <h3 className="text-2xl font-black text-gray-800">1</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><UserCheck className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Expected Visitors</p>
            <h3 className="text-2xl font-black text-gray-800">1</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-gray-50 text-gray-600 rounded-xl"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total Today</p>
            <h3 className="text-2xl font-black text-gray-800">4</h3>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
        {/* Tabs & Search */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-max">
            <button 
              onClick={() => setActiveTab('all')}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'all' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Visit History
            </button>
            <button 
              onClick={() => setActiveTab('pending')}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'pending' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Approvals <span className="bg-yellow-500 text-white px-1.5 py-0.5 rounded-full text-[10px]">2</span>
            </button>
            <button 
              onClick={() => setActiveTab('inside')}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'inside' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Active Inside
            </button>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search visitor, student, or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] bg-white"
            />
          </div>
        </div>

        {/* Visitor Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-bold">
                <th className="p-4">Visitor Info</th>
                <th className="p-4">Host Student</th>
                <th className="p-4">Relation / Purpose</th>
                <th className="p-4">ID Details</th>
                <th className="p-4">Timings (Date)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVisitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-sm">{visitor.name}</span>
                      <span className="text-xs font-semibold text-gray-500">{visitor.mobile}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] text-[10px] font-black">
                        {visitor.student.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-700 text-sm">{visitor.student}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-700">{visitor.relation}</span>
                      <span className="text-xs text-gray-500">{visitor.purpose}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md w-max">
                      <ShieldCheck className="w-3.5 h-3.5 text-gray-400" /> {visitor.idProof}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col text-xs font-semibold text-gray-600">
                      <span><span className="text-gray-400">In:</span> {visitor.entry}</span>
                      <span><span className="text-gray-400">Out:</span> {visitor.exit}</span>
                      <span className="text-gray-400 mt-0.5">{visitor.date}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(visitor.status)}
                  </td>
                  <td className="p-4 text-center">
                    {visitor.status === 'Pending' && (
                      <div className="flex justify-center gap-1">
                        <button className="p-1.5 text-green-600 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg tooltip-trigger" title="Approve Entry">
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg tooltip-trigger" title="Reject Entry">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {(visitor.status === 'Approved' || visitor.status === 'Inside') && (
                      <div className="flex justify-center">
                        <button className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors shadow-sm ${visitor.status === 'Inside' ? 'bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100' : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'}`}>
                          {visitor.status === 'Inside' ? <><LogOut className="w-3.5 h-3.5"/> Check Out</> : <><LogIn className="w-3.5 h-3.5"/> Mark Entry</>}
                        </button>
                      </div>
                    )}
                    {visitor.status === 'Completed' && (
                      <button className="p-1.5 text-gray-400 hover:text-gray-800 rounded-lg">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredVisitors.length === 0 && (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <Users className="w-12 h-12 text-gray-200 mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-1">No visitors found</h3>
              <p className="text-gray-500 text-sm">No visitors match your current search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
