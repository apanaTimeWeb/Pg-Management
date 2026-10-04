// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { Search, Filter, Plus, FileText, Download, Eye, DoorOpen, ArrowRightLeft, UserCheck, UserMinus, X } from 'lucide-react';

const MOCK_RECORDS = [
  { id: 'REC-001', studentName: 'Aman Singh', type: 'Check-in', date: '01 Oct 2026', room: '101', bed: 'Bed A', status: 'Completed', remarks: 'All docs verified' },
  { id: 'REC-002', studentName: 'Neha Gupta', type: 'Check-out', date: '20 Sep 2026', room: '105', bed: 'Bed C', status: 'Completed', remarks: 'Deposit Refunded' },
  { id: 'REC-003', studentName: 'Rahul Sharma', type: 'Check-in', date: '15 Oct 2026', room: '304', bed: 'Bed B', status: 'Scheduled', remarks: 'Pending Deposit' },
];

export default function CheckinCheckoutPage() {
  const [records, setRecords] = useState(MOCK_RECORDS);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Check-in'); // 'Check-in' or 'Check-out'

  const filteredRecords = records.filter(rec => {
    if (activeTab !== 'All' && rec.type !== activeTab) return false;
    if (searchTerm && !rec.studentName.toLowerCase().includes(searchTerm.toLowerCase()) && !rec.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'Completed') return <span className="px-2.5 py-1 bg-green-100 text-green-700 border-green-200 border rounded-md text-[10px] font-bold uppercase tracking-wide">Completed</span>;
    if (status === 'Scheduled') return <span className="px-2.5 py-1 bg-blue-100 text-blue-700 border-blue-200 border rounded-md text-[10px] font-bold uppercase tracking-wide">Scheduled</span>;
    return <span className="px-2.5 py-1 bg-gray-100 text-gray-700 border-gray-200 border rounded-md text-[10px] font-bold uppercase tracking-wide">{status}</span>;
  };

  const handleSaveRecord = () => {
    const newRecord = {
      id: `REC-00${records.length + 1}`,
      studentName: 'New Student',
      type: modalType,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      room: 'TBD',
      bed: 'TBD',
      status: 'Scheduled',
      remarks: 'Newly added'
    };
    setRecords([newRecord, ...records]);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><DoorOpen className="w-6 h-6 text-purple-600"/> Check-in / Check-out</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage student on-boarding and exits smoothly.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => { setModalType('Check-in'); setIsModalOpen(true); }} className="flex items-center gap-2 bg-[#2D7D9A] hover:bg-[#236077] text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <UserCheck className="w-4 h-4" /> New Check-in
          </button>
          <button onClick={() => { setModalType('Check-out'); setIsModalOpen(true); }} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <UserMinus className="w-4 h-4" /> Initiate Check-out
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className={`p-5 border-b border-border/50 flex items-center justify-between text-white ${modalType === 'Check-in' ? 'bg-[#2D7D9A]' : 'bg-orange-500'}`}>
              <h2 className="text-xl font-bold flex items-center gap-2">
                {modalType === 'Check-in' ? <UserCheck className="w-5 h-5" /> : <UserMinus className="w-5 h-5" />} 
                {modalType === 'Check-in' ? 'New Check-in' : 'Initiate Check-out'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4 bg-page/50">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Student Name</label>
                <input type="text" placeholder="Enter name" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Date</label>
                  <input type="date" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Room / Bed</label>
                  <input type="text" placeholder="e.g. 101 A" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Remarks / Notes</label>
                <textarea rows={2} className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold" placeholder="Any special notes..."></textarea>
              </div>
            </div>
            <div className="p-5 border-t border-border/50 bg-card flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 bg-[var(--bg-overlay)] text-secondary rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={handleSaveRecord} className={`px-5 py-2 text-white rounded-xl font-bold ${modalType === 'Check-in' ? 'bg-[#2D7D9A]' : 'bg-orange-500'}`}>Save & Confirm</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden min-h-[500px] flex flex-col">
        
        <div className="p-4 border-b border-border/50 bg-page/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="flex bg-[var(--bg-overlay)] p-1 rounded-xl w-max overflow-hidden">
            {['All', 'Check-in', 'Check-out'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-sm font-bold transition-all rounded-lg ${activeTab === tab ? 'bg-card text-primary shadow-sm' : 'text-secondary hover:text-primary'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search by student or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] text-primary transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-border/50 bg-page/30 text-[10px] uppercase tracking-wider text-secondary">
                <th className="p-4 font-bold">Record ID</th>
                <th className="p-4 font-bold">Student</th>
                <th className="p-4 font-bold">Type</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">Room & Bed</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4 text-sm font-bold text-primary">{record.id}</td>
                  <td className="p-4 text-sm font-bold text-primary">{record.studentName}</td>
                  <td className="p-4">
                    <span className={`flex items-center gap-1 text-xs font-bold ${record.type === 'Check-in' ? 'text-blue-600' : 'text-orange-600'}`}>
                      {record.type === 'Check-in' ? <UserCheck className="w-3.5 h-3.5"/> : <UserMinus className="w-3.5 h-3.5"/>} {record.type}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-secondary font-medium">{record.date}</td>
                  <td className="p-4 text-sm text-secondary font-medium">Rm {record.room} ({record.bed})</td>
                  <td className="p-4">{getStatusBadge(record.status)}</td>
                  <td className="p-4 text-right">
                    <button className="px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-16 text-center text-secondary">
                    <DoorOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-primary">No Records Found</h3>
                    <p className="text-sm mt-1">There are no matching check-in/out records.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}