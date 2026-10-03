'use client';

import React, { useState } from 'react';
import {
  IndianRupee, CreditCard, Smartphone, Globe, CheckCircle2, Download,
  Eye, Clock, AlertCircle, X, ArrowRight, Receipt, FileText, BadgeCheck
} from 'lucide-react';
import { toast } from 'sonner';

const CURRENT_DUES = [
  { label: 'Monthly Rent', amount: 8000, type: 'primary' as const },
  { label: 'Mess Fee', amount: 1200, type: 'warning' as const },
  { label: 'Electricity', amount: 350, type: 'info' as const },
  { label: 'Late Fine', amount: 200, type: 'danger' as const },
  { label: 'Discount', amount: -500, type: 'success' as const },
  { label: 'Previous Due', amount: 0, type: 'secondary' as const },
];

const PAYMENT_HISTORY = [
  { id: 'PAY-9012', date: '01 Sep 2026', invoice: 'INV-2026-09', amount: 8500, type: 'Monthly Rent', method: 'UPI', status: 'Success' as const },
  { id: 'PAY-8876', date: '02 Sep 2026', invoice: 'INV-2026-SD', amount: 10000, type: 'Security Deposit', method: 'Net Banking', status: 'Success' as const },
  { id: 'PAY-8754', date: '01 Aug 2026', invoice: 'INV-2026-08', amount: 8200, type: 'Monthly Rent', method: 'Card', status: 'Success' as const },
];

const total = CURRENT_DUES.reduce((sum, d) => sum + d.amount, 0);
const paid = 0;
const balance = total - paid;

const getTypeColor = (type: string) => {
  const map: Record<string, string> = {
    primary: 'text-primary', warning: 'text-warning', info: 'text-info',
    danger: 'text-danger', success: 'text-success', secondary: 'text-secondary'
  };
  return map[type] || 'text-primary';
};

export function StudentRentMain() {
  const [activeTab, setActiveTab] = useState<'dues' | 'pay' | 'history'>('dues');
  const [isPayModal, setIsPayModal] = useState(false);
  const [payMethod, setPayMethod] = useState<'upi' | 'card' | 'netbanking' | null>(null);
  const [paymentDone, setPaymentDone] = useState(false);

  const handlePay = () => {
    if (!payMethod) { toast.error('Please select a payment method'); return; }
    setPaymentDone(true);
    toast.success('Payment successful! Receipt generated.');
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">

      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <IndianRupee className="w-6 h-6 text-success" />
          </div>
          Fees & Payments
        </h1>
        <p className="text-sm text-secondary mt-2 font-medium">View dues, make payments, and download receipts.</p>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Dues', value: `₹${total.toLocaleString()}`, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
          { label: 'Paid', value: `₹${paid.toLocaleString()}`, color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
          { label: 'Balance Payable', value: `₹${balance.toLocaleString()}`, color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20' },
        ].map(card => (
          <div key={card.label} className={`rounded-2xl border p-5 shadow-sm ${card.bg} ${card.border}`}>
            <p className={`text-3xl font-black ${card.color}`}>{card.value}</p>
            <p className="text-sm font-bold text-secondary mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-card border border-border rounded-xl p-1.5 w-fit">
        {[
          { id: 'dues', label: 'Current Dues' },
          { id: 'pay', label: 'Pay Now' },
          { id: 'history', label: 'Payment History' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-secondary hover:text-primary'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'dues' && (
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-border bg-input/30">
            <h3 className="font-black text-primary">October 2026 – Fee Breakdown</h3>
          </div>
          <div className="divide-y divide-border">
            {CURRENT_DUES.map(due => (
              <div key={due.label} className="flex justify-between items-center p-4 md:p-5 hover:bg-input/30 transition-colors">
                <span className="font-bold text-secondary text-sm">{due.label}</span>
                <span className={`font-black text-base ${getTypeColor(due.type)}`}>
                  {due.amount < 0 ? `- ₹${Math.abs(due.amount).toLocaleString()}` : `₹${due.amount.toLocaleString()}`}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center p-5 bg-input/50 border-t border-border">
            <span className="font-black text-primary">Total Payable</span>
            <span className="font-black text-2xl text-danger">₹{balance.toLocaleString()}</span>
          </div>
          <div className="p-4 border-t border-border">
            <button onClick={() => setActiveTab('pay')} className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <IndianRupee className="w-4 h-4" /> Pay Now — ₹{balance.toLocaleString()}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'pay' && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-black text-primary mb-4">Select Bill to Pay</h3>
            <div className="p-4 bg-danger/5 border border-danger/20 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-black text-primary">October 2026 – All Dues</p>
                <p className="text-xs font-medium text-secondary">Monthly Rent + Mess + Electricity + Fine (after discount)</p>
              </div>
              <p className="font-black text-danger text-xl">₹{balance.toLocaleString()}</p>
            </div>
          </div>

          <div>
            <h3 className="font-black text-primary mb-4">Select Payment Method</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'upi', label: 'UPI', icon: Smartphone, sub: 'Google Pay, PhonePe, Paytm' },
                { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, sub: 'Visa, Mastercard, RuPay' },
                { id: 'netbanking', label: 'Net Banking', icon: Globe, sub: 'All major banks' },
              ].map(method => {
                const Icon = method.icon;
                return (
                  <button key={method.id} onClick={() => setPayMethod(method.id as any)} className={`p-4 rounded-2xl border text-left transition-all ${payMethod === method.id ? 'bg-primary/10 border-primary text-primary shadow-md' : 'bg-card border-border text-secondary hover:border-primary/40'}`}>
                    <Icon className={`w-6 h-6 mb-2 ${payMethod === method.id ? 'text-primary' : 'text-secondary'}`} />
                    <p className="font-black text-sm">{method.label}</p>
                    <p className="text-xs opacity-70 mt-0.5">{method.sub}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <button onClick={() => setIsPayModal(true)} className="w-full bg-success text-white font-black py-4 rounded-2xl shadow-lg hover:bg-success/90 transition-colors flex items-center justify-center gap-2 text-base">
            <ArrowRight className="w-5 h-5" /> Proceed to Pay ₹{balance.toLocaleString()}
          </button>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-input/30 border-b border-border">
                  {['Date', 'Invoice', 'Amount', 'Type', 'Method', 'Status', 'Actions'].map(h => (
                    <th key={h} className="py-3 px-4 text-xs font-black text-secondary uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {PAYMENT_HISTORY.map(pay => (
                  <tr key={pay.id} className="hover:bg-input/30 transition-colors">
                    <td className="py-4 px-4 text-sm font-bold text-primary whitespace-nowrap">{pay.date}</td>
                    <td className="py-4 px-4 text-xs font-bold text-secondary">{pay.invoice}</td>
                    <td className="py-4 px-4 font-black text-success">₹{pay.amount.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm font-medium text-secondary whitespace-nowrap">{pay.type}</td>
                    <td className="py-4 px-4 text-sm font-medium text-secondary">{pay.method}</td>
                    <td className="py-4 px-4">
                      <span className="bg-success/10 text-success border border-success/20 text-[10px] font-black px-2 py-1 rounded-md flex items-center gap-1 w-fit">
                        <BadgeCheck className="w-3.5 h-3.5" /> {pay.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-1">
                        <button onClick={() => toast.success('Receipt opening...')} className="w-7 h-7 rounded-lg bg-input flex items-center justify-center text-secondary hover:text-primary hover:bg-card border border-border transition-colors" title="View Receipt">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => toast.success('Downloading...')} className="w-7 h-7 rounded-lg bg-input flex items-center justify-center text-secondary hover:text-primary hover:bg-card border border-border transition-colors" title="Download">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Confirm Modal */}
      {isPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between bg-input/30">
              <h2 className="text-lg font-black text-primary">Confirm Payment</h2>
              <button onClick={() => { setIsPayModal(false); setPaymentDone(false); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-input text-secondary hover:text-danger transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            {paymentDone ? (
              <div className="p-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <h3 className="text-xl font-black text-primary mb-2">Payment Successful!</h3>
                <p className="text-sm text-secondary mb-6">Receipt has been generated. Check your email.</p>
                <div className="flex gap-3">
                  <button onClick={() => toast.success('Downloading receipt...')} className="flex items-center gap-2 bg-card border border-border px-5 py-2 rounded-xl text-sm font-bold text-primary hover:bg-input transition-colors shadow-sm">
                    <Download className="w-4 h-4" /> Download
                  </button>
                  <button onClick={() => { setIsPayModal(false); setPaymentDone(false); }} className="bg-primary text-white font-bold text-sm px-6 py-2 rounded-xl shadow-md hover:bg-primary/90 transition-colors">Close</button>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div className="bg-input/30 border border-border rounded-xl p-4 space-y-3">
                  {[
                    { label: 'Bill Period', value: 'October 2026' },
                    { label: 'Amount', value: `₹${balance.toLocaleString()}` },
                    { label: 'Payment Method', value: payMethod === 'upi' ? 'UPI' : payMethod === 'card' ? 'Card' : 'Net Banking' },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <span className="text-secondary font-medium">{item.label}</span>
                      <span className="font-black text-primary">{item.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-medium text-secondary bg-input/30 border border-border rounded-lg p-3">You will be redirected to the secure payment gateway. Do not refresh the page.</p>
                <div className="flex gap-3">
                  <button onClick={() => setIsPayModal(false)} className="flex-1 bg-card border border-border text-secondary font-bold text-sm py-2.5 rounded-xl hover:bg-input transition-colors">Cancel</button>
                  <button onClick={handlePay} className="flex-1 bg-success text-white font-bold text-sm py-2.5 rounded-xl shadow-md hover:bg-success/90 transition-colors flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Pay Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
