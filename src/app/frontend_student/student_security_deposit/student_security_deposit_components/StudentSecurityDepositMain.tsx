'use client';

import React, { useState } from 'react';
import {
  ShieldCheck, IndianRupee, CheckCircle2, Clock, AlertCircle,
  Download, FileText, ChevronRight, Calculator, ArrowDown
} from 'lucide-react';
import { toast } from 'sonner';

const DEPOSIT_DATA = {
  amount: 10000,
  paymentDate: '20 Aug 2026',
  paymentMethod: 'UPI (Google Pay)',
  receiptNo: 'REC-2024-SD-001',
  status: 'Active' as const,
  adjustments: [
    { label: 'Outstanding Fees', amount: 0 },
    { label: 'Damage Charges', amount: 500 },
    { label: 'Notice Period Deduction', amount: 0 },
    { label: 'Other Adjustments', amount: 0 },
  ],
};

const totalDeductions = DEPOSIT_DATA.adjustments.reduce((sum, a) => sum + a.amount, 0);
const refundable = DEPOSIT_DATA.amount - totalDeductions;

export function StudentSecurityDepositMain() {
  const [activeTab, setActiveTab] = useState<'details' | 'settlement'>('details');

  return (
    <div className="w-full max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
      
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-success" />
          </div>
          Security Deposit
        </h1>
        <p className="text-sm text-secondary mt-2 font-medium">Track your security deposit, adjustments, and refund status.</p>
      </div>

      {/* Hero Deposit Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-success/10 to-primary/10 border border-success/20 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-success/10 rounded-full blur-2xl"></div>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Total Deposit Paid</p>
            <p className="text-4xl font-black text-primary mb-2">₹{DEPOSIT_DATA.amount.toLocaleString()}</p>
            <div className="flex flex-wrap gap-3 text-xs font-medium text-secondary">
              <span>Paid on {DEPOSIT_DATA.paymentDate}</span>
              <span>•</span>
              <span>via {DEPOSIT_DATA.paymentMethod}</span>
            </div>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-2">
            <span className="bg-success/10 text-success border border-success/20 text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active
            </span>
            <button onClick={() => toast.success('Receipt downloading...')} className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl text-xs font-bold text-primary hover:bg-input transition-colors shadow-sm">
              <Download className="w-3.5 h-3.5" /> Receipt
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-card border border-border rounded-xl p-1.5 w-fit">
        <button
          onClick={() => setActiveTab('details')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'details' ? 'bg-primary text-white shadow-md' : 'text-secondary hover:text-primary'}`}
        >
          Deposit Details
        </button>
        <button
          onClick={() => setActiveTab('settlement')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'settlement' ? 'bg-primary text-white shadow-md' : 'text-secondary hover:text-primary'}`}
        >
          Settlement
        </button>
      </div>

      {activeTab === 'details' && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="font-black text-primary mb-6">Deposit Information</h3>
          <div className="space-y-4">
            {[
              { label: 'Receipt Number', value: DEPOSIT_DATA.receiptNo },
              { label: 'Deposit Amount', value: `₹${DEPOSIT_DATA.amount.toLocaleString()}` },
              { label: 'Payment Date', value: DEPOSIT_DATA.paymentDate },
              { label: 'Payment Method', value: DEPOSIT_DATA.paymentMethod },
              { label: 'Current Status', value: DEPOSIT_DATA.status },
              { label: 'Refundable Amount', value: `₹${refundable.toLocaleString()}` },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                <span className="text-sm text-secondary font-medium">{item.label}</span>
                <span className={`text-sm font-black ${item.label === 'Refundable Amount' ? 'text-success' : 'text-primary'}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settlement' && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-black text-primary mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" /> Settlement Breakdown
            </h3>

            <div className="space-y-3">
              {/* Deposit Row */}
              <div className="flex justify-between items-center p-4 bg-success/5 border border-success/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-success" />
                  </div>
                  <span className="font-bold text-primary">Security Deposit</span>
                </div>
                <span className="font-black text-success text-lg">+ ₹{DEPOSIT_DATA.amount.toLocaleString()}</span>
              </div>

              {/* Downward Arrow */}
              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-secondary" />
              </div>

              {/* Deductions */}
              {DEPOSIT_DATA.adjustments.map((adj, idx) => (
                <div key={adj.label} className={`flex justify-between items-center p-4 rounded-xl border ${adj.amount > 0 ? 'bg-danger/5 border-danger/20' : 'bg-input/30 border-border'}`}>
                  <span className={`font-bold text-sm ${adj.amount > 0 ? 'text-danger' : 'text-secondary'}`}>{adj.label}</span>
                  <span className={`font-black ${adj.amount > 0 ? 'text-danger' : 'text-secondary'}`}>
                    {adj.amount > 0 ? `- ₹${adj.amount.toLocaleString()}` : '₹0'}
                  </span>
                </div>
              ))}

              {/* Divider */}
              <div className="border-t border-border my-2"></div>

              {/* Final Refund */}
              <div className="flex justify-between items-center p-5 bg-gradient-to-r from-success/10 to-primary/10 border border-success/20 rounded-2xl">
                <div>
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Final Refundable Amount</p>
                  <p className="text-3xl font-black text-success">₹{refundable.toLocaleString()}</p>
                </div>
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>
            </div>

            <p className="text-xs text-secondary mt-4 bg-warning/5 border border-warning/20 rounded-lg p-3">
              Note: Final settlement is calculated at check-out time. Amounts may change based on final inspection.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
