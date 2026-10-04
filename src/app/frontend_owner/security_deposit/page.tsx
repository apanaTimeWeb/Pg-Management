// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, CheckCircle2, AlertCircle, ArrowDownRight, RefreshCw, HandCoins } from 'lucide-react';

const MOCK_DEPOSITS = [
  { id: 'DEP-101', studentName: 'Aman Singh', room: '101A', amount: 5000, date: '01 Jan 2026', status: 'Active', deductions: 0 },
  { id: 'DEP-102', studentName: 'Rahul Kumar', room: '304B', amount: 6000, date: '15 Mar 2026', status: 'Active', deductions: 500 },
  { id: 'DEP-103', studentName: 'Vikram Patel', room: '205C', amount: 5000, date: '10 Feb 2025', status: 'Refunded', deductions: 0 },
  { id: 'DEP-104', studentName: 'Suresh', room: '401A', amount: 5500, date: '05 Sep 2026', status: 'Pending Refund', deductions: 1000 },
];

export default function SecurityDepositPage() {
  const [deposits, setDeposits] = useState(MOCK_DEPOSITS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All'); // All, Active, Pending Refund, Refunded

  const filteredData = deposits.filter(dep => {
    if (activeTab !== 'All' && dep.status !== activeTab) return false;
    if (searchTerm && !dep.studentName.toLowerCase().includes(searchTerm.toLowerCase()) && !dep.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const totalHeld = deposits.filter(d => d.status === 'Active' || d.status === 'Pending Refund').reduce((acc, curr) => acc + curr.amount - curr.deductions, 0);
  const totalDeducted = deposits.reduce((acc, curr) => acc + curr.deductions, 0);
  const totalRefunded = deposits.filter(d => d.status === 'Refunded').reduce((acc, curr) => acc + curr.amount - curr.deductions, 0);

  const processRefund = (id) => {
    setDeposits(prev => prev.map(dep => dep.id === id ? { ...dep, status: 'Refunded' } : dep));
  };

  const getStatusBadge = (status) => {
    if (status === 'Active') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'Pending Refund') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (status === 'Refunded') return 'bg-gray-100 text-gray-700 border-gray-200';
    return 'bg-blue-100 text-blue-700 border-blue-200';
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-[#1A3A5C]"/> Security Deposits</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage student security deposits, deductions, and refunds.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <HandCoins className="w-4 h-4" /> Add Deposit
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-secondary uppercase">Total Active Held</p>
            <h3 className="text-xl font-black text-primary">₹{totalHeld}</h3>
          </div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-red-100 text-red-600">
            <ArrowDownRight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-secondary uppercase">Total Deductions</p>
            <h3 className="text-xl font-black text-primary">₹{totalDeducted}</h3>
          </div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-100 text-green-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-secondary uppercase">Total Refunded</p>
            <h3 className="text-xl font-black text-primary">₹{totalRefunded}</h3>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
        {/* Tabs & Search */}
        <div className="p-4 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-page/50">
          <div className="flex gap-2 p-1 bg-input rounded-xl w-fit">
            {['All', 'Active', 'Pending Refund', 'Refunded'].map(tab => (
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
              placeholder="Search student or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] text-primary transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-page/30 text-[10px] uppercase tracking-wider text-secondary">
                <th className="p-4 font-bold">Student Details</th>
                <th className="p-4 font-bold">Base Deposit</th>
                <th className="p-4 font-bold">Deductions</th>
                <th className="p-4 font-bold">Net Refundable</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredData.map((dep, idx) => (
                <tr key={idx} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary">{dep.studentName}</p>
                    <p className="text-[10px] text-secondary mt-0.5">Room: {dep.room} | <span className="font-mono">{dep.id}</span></p>
                  </td>
                  <td className="p-4 text-sm font-bold text-primary">₹{dep.amount}</td>
                  <td className="p-4 text-sm font-bold text-red-500">- ₹{dep.deductions}</td>
                  <td className="p-4 text-sm font-black text-green-600">₹{dep.amount - dep.deductions}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${getStatusBadge(dep.status)}`}>
                      {dep.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {dep.status === 'Pending Refund' ? (
                      <button onClick={() => processRefund(dep.id)} className="px-3 py-1.5 text-xs font-bold bg-green-50 text-green-700 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
                        Process Refund
                      </button>
                    ) : dep.status === 'Active' ? (
                      <button className="px-3 py-1.5 text-xs font-bold bg-orange-50 text-orange-700 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors">
                        Add Deduction
                      </button>
                    ) : (
                      <span className="text-xs text-secondary font-medium mr-2">Settled</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr><td colSpan="6" className="p-8 text-center text-secondary font-medium">No deposits found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add Deposit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-[#1A3A5C] text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-400" /> Add Security Deposit
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
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Room</label>
                  <input type="text" placeholder="e.g. 101A" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-primary" />
                </div>
                <div>
                   <label className="block text-xs font-bold text-secondary uppercase mb-2">Amount (₹)</label>
                   <input type="number" placeholder="5000" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-primary" />
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-border/50 bg-card flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 bg-[var(--bg-overlay)] text-secondary rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => {
                setDeposits([{
                  id: `DEP-10${deposits.length + 1}`, studentName: 'New Student', room: '101A', amount: 5000, date: 'Today', status: 'Active', deductions: 0
                }, ...deposits]);
                setIsModalOpen(false);
              }} className="px-5 py-2 bg-[#1A3A5C] text-white rounded-xl font-bold">Add Deposit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}