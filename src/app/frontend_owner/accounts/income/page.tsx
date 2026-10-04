// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { Search, Filter, Plus, FileText, Download, Eye, IndianRupee, Calculator, TrendingUp, ArrowDownRight, ArrowUpRight, TrendingDown } from 'lucide-react';

const MOCK_ACCOUNTS = [
  { id: 'TRX-5001', title: 'Monthly Rent Collected', category: 'Rent', amount: 450000, date: '05 Oct 2026', type: 'Income', status: 'Completed' },
  { id: 'TRX-5002', title: 'Electricity Bill', category: 'Utilities', amount: 12500, date: '10 Oct 2026', type: 'Expense', status: 'Completed' },
  { id: 'TRX-5003', title: 'Plumbing Repair', category: 'Maintenance', amount: 2500, date: '12 Oct 2026', type: 'Expense', status: 'Pending' },
  { id: 'TRX-5004', title: 'Security Deposit Received', category: 'Deposits', amount: 30000, date: '15 Oct 2026', type: 'Income', status: 'Completed' },
];

export default function IncomePage() {
  const [accounts, setAccounts] = useState(MOCK_ACCOUNTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = accounts.filter(trx => {
    if (trx.type !== 'Income') return false;
    if (searchTerm && !trx.title.toLowerCase().includes(searchTerm.toLowerCase()) && !trx.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><Calculator className="w-6 h-6 text-[#1A3A5C]"/> Accounts: Income</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage income and financial tracking.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card hover:bg-page border border-border text-primary px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Record
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-[#1A3A5C] text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Plus className="w-5 h-5 text-green-500" /> Add Income
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">X</button>
            </div>
            <div className="p-6 space-y-4 bg-page/50">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Title</label>
                <input type="text" placeholder="e.g. Rent Received" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-primary" />
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Amount</label>
                <input type="number" placeholder="e.g. 15000" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-primary" />
              </div>
            </div>
            <div className="p-5 border-t border-border/50 bg-card flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 bg-[var(--bg-overlay)] text-secondary rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => { 
                setAccounts([{
                  id: `TRX-${5000 + accounts.length + 1}`, title: 'New Income', category: 'General', amount: 15000, date: new Date().toLocaleDateString(), type: 'Income', status: 'Completed'
                }, ...accounts]);
                setIsModalOpen(false); 
              }} className="px-5 py-2 bg-[#1A3A5C] text-white rounded-xl font-bold">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-100 text-green-600">
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-secondary uppercase">Total Income</p>
            <h3 className="text-xl font-black text-primary">₹ {filteredData.reduce((acc, cur) => acc + cur.amount, 0).toLocaleString('en-IN')}</h3>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search descriptions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] text-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-input border border-border rounded-xl text-sm font-semibold text-secondary hover:text-primary transition-colors">
              <Filter className="w-4 h-4" /> Month Filter
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-page/30 text-[10px] uppercase tracking-wider text-secondary">
                <th className="p-4 font-bold">Transaction / ID</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">Amount</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredData.map((trx, idx) => (
                <tr key={idx} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary">{trx.title}</p>
                    <p className="text-[10px] text-[var(--text-disabled)] mt-0.5 font-mono">{trx.id}</p>
                  </td>
                  <td className="p-4 text-sm font-semibold text-secondary">
                    {trx.category}
                  </td>
                  <td className="p-4 text-sm text-secondary font-medium">{trx.date}</td>
                  <td className="p-4">
                    <span className={`text-sm font-black flex items-center ${trx.type === 'Income' ? 'text-green-600' : 'text-red-500'}`}>
                      {trx.type === 'Income' ? '+' : '-'}<IndianRupee className="w-3 h-3 mx-0.5"/>{trx.amount}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 border rounded-md text-[10px] font-bold uppercase tracking-wide ${trx.status === 'Completed' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                      {trx.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-secondary hover:text-primary bg-page hover:bg-card rounded-lg border border-border"><FileText className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr><td colSpan="6" className="p-8 text-center text-secondary font-medium">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}
