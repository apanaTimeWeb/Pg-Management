// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { Search, Filter, Plus, FileText, Download, Eye, IndianRupee, Wallet, CreditCard } from 'lucide-react';

const MOCK_FEES = [
  { id: 'INV-201', student: 'Aman Singh', room: '101', type: 'Monthly Rent', amount: 8000, date: '01 Oct 2026', status: 'Paid', method: 'UPI' },
  { id: 'INV-202', student: 'Rahul Sharma', room: '304', type: 'Monthly Rent', amount: 8000, date: '05 Oct 2026', status: 'Pending', method: '-' },
  { id: 'INV-203', student: 'Vikram Patel', room: '205', type: 'Late Fine', amount: 500, date: '10 Oct 2026', status: 'Unpaid', method: '-' },
  { id: 'INV-204', student: 'Neha Gupta', room: '105', type: 'Security Refund', amount: 12000, date: '15 Oct 2026', status: 'Processed', method: 'Bank Transfer' },
];

export default function ReceiptsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFees = MOCK_FEES.filter(fee => {
    if (searchTerm && !fee.student.toLowerCase().includes(searchTerm.toLowerCase()) && !fee.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    if (title === 'Dues') return fee.status === 'Pending' || fee.status === 'Unpaid';
    if (title === 'Payments') return fee.status === 'Paid';
    if (title === 'Fines') return fee.type.includes('Fine');
    if (title === 'Refunds') return fee.type.includes('Refund');
    
    return true; // For receipts and rent, show all generally or specifically
  });

  const getStatusBadge = (status: string) => {
    if (status === 'Paid' || status === 'Processed') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (status === 'Unpaid') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><Wallet className="w-6 h-6 text-green-600"/> Finance: Receipts</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage financial records for receipts.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card hover:bg-page border border-border text-primary px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Download className="w-4 h-4" /> Download Statement
          </button>
          <button className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Record
          </button>
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
              placeholder="Search by Student or Invoice ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] text-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-input border border-border rounded-xl text-sm font-semibold text-secondary hover:text-primary transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-page/30 text-[10px] uppercase tracking-wider text-secondary">
                <th className="p-4 font-bold">Transaction / Invoice</th>
                <th className="p-4 font-bold">Student Info</th>
                <th className="p-4 font-bold">Amount & Date</th>
                <th className="p-4 font-bold">Status / Method</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredFees.map((fee, idx) => (
                <tr key={idx} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary">{fee.type}</p>
                    <p className="text-[10px] text-[var(--text-disabled)] mt-1 font-mono">{fee.id}</p>
                  </td>
                  <td className="p-4 text-sm text-secondary font-medium">
                    <p className="text-primary font-bold">{fee.student}</p>
                    <p className="mt-0.5 text-xs">Room {fee.room}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-base font-black text-primary flex items-center"><IndianRupee className="w-3 h-3"/> {fee.amount}</p>
                    <p className="text-xs text-secondary mt-0.5">{fee.date}</p>
                  </td>
                  <td className="p-4">
                    <p className={`w-max px-2.5 py-1 border rounded-md text-[10px] font-bold uppercase tracking-wide ${getStatusBadge(fee.status)}`}>
                      {fee.status}
                    </p>
                    {fee.method !== '-' && (
                      <p className="text-xs font-semibold text-secondary mt-1 flex items-center gap-1"><CreditCard className="w-3 h-3"/> {fee.method}</p>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200" title="View Invoice"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-secondary hover:text-primary bg-page hover:bg-card rounded-lg border border-border" title="Download PDF"><FileText className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredFees.length === 0 && (
                <tr><td colSpan="5" className="p-8 text-center text-secondary font-medium">No financial records found here.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}
