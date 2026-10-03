'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CreditCard, Receipt, Activity, CheckCircle, XCircle, AlertCircle, RefreshCcw, Landmark, PieChart, Search, Filter, Download, Send, Eye, MoreVertical, X, Check } from 'lucide-react';

export function SuperadminBillingPaymentsMain() {
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'invoices');

  useEffect(() => {
    if (tabQuery) setActiveTab(tabQuery);
  }, [tabQuery]);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [selectedRefund, setSelectedRefund] = useState<any | null>(null);

  const tabs = [
    { id: 'transactions', label: 'All Transactions', icon: Activity, color: 'text-info', bg: 'bg-info-bg' },
    { id: 'subscriptions', label: 'Subscription Payments', icon: RefreshCcw, color: 'text-success', bg: 'bg-success-bg' },
    { id: 'invoices', label: 'Invoices', icon: Receipt, color: 'text-theme-primary', bg: 'bg-primary-subtle' },
    { id: 'refunds', label: 'Refunds Management', icon: AlertCircle, color: 'text-warning', bg: 'bg-warning-bg' },
    { id: 'failed', label: 'Failed Payments', icon: XCircle, color: 'text-danger', bg: 'bg-danger-bg' },
    { id: 'outstanding', label: 'Outstanding Dues', icon: Landmark, color: 'text-purple', bg: 'bg-purple-bg' },
    { id: 'reports', label: 'Revenue Reports', icon: PieChart, color: 'text-info', bg: 'bg-info-bg' },
  ];

  const dummyInvoices = [
    { id: 'INV-2026-1042', pg: 'Sunshine Boys PG (Rahul Sharma)', plan: 'Pro Plan (Yearly)', amount: '₹12,000', tax: '₹2,160', discount: '₹1,000', total: '₹13,160', date: '02 Oct 2026', status: 'Paid' },
    { id: 'INV-2026-1041', pg: 'Comfort Girls PG (Neha Verma)', plan: 'Basic Plan (Monthly)', amount: '₹1,500', tax: '₹270', discount: '₹0', total: '₹1,770', date: '01 Oct 2026', status: 'Pending' },
    { id: 'INV-2026-1040', pg: 'Elite Stay Co-ed (Amit Singh)', plan: 'Pro Plan (Monthly)', amount: '₹2,500', tax: '₹450', discount: '₹500', total: '₹2,450', date: '28 Sep 2026', status: 'Failed' },
  ];

  const dummyRefunds = [
    { id: 'REF-9021', invoiceId: 'INV-2026-1035', pg: 'Grand Stay PG', amount: '₹2,450', requestDate: '01 Oct 2026', reason: 'Double Charge', status: 'Review' },
    { id: 'REF-9020', invoiceId: 'INV-2026-1012', pg: 'City Center PG', amount: '₹13,160', requestDate: '25 Sep 2026', reason: 'Cancellation within 7 days', status: 'Approved' },
  ];

  return (
    <div className="w-full h-full space-y-6 pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <CreditCard className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <CreditCard className="w-8 h-8" /> Billing & Payments
            </h1>
            <p className="text-white/80 font-medium max-w-xl">
              Platform-level revenue, invoices, subscriptions, and refund management.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white/20 backdrop-blur text-white border border-white/30 px-6 py-3 rounded-xl font-bold shadow-md hover:bg-white/30 transition-colors flex items-center gap-2 whitespace-nowrap">
              <Landmark className="w-5 h-5" /> Tax / GST Config
            </button>
            <button className="bg-white/20 backdrop-blur text-white border border-white/30 px-6 py-3 rounded-xl font-bold shadow-md hover:bg-white/90 transition-colors flex items-center gap-2 whitespace-nowrap">
              <Download className="w-5 h-5" /> Export All
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[800px]">
        
        {/* Sidebar Navigation */}
        <div className="w-full lg:col-span-1 bg-card border border-border/50 rounded-3xl p-4 shadow-sm flex flex-col h-full overflow-hidden">
          <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4 px-2">Billing Sections</h3>
          <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedInvoice(null); setSelectedRefund(null); }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-primary-subtle text-theme-primary shadow-sm border border-theme-primary/20' 
                    : 'text-secondary hover:bg-bg-page hover:text-primary border border-transparent'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${activeTab === tab.id ? tab.bg : 'bg-transparent'}`}>
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-theme-primary' : tab.color}`} />
                </div>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="w-full lg:col-span-4 bg-card border border-border/50 rounded-3xl shadow-sm flex flex-col h-full overflow-hidden animate-in fade-in slide-in-from-right-8 duration-500 relative">
          
          {/* INVOICES SECTION */}
          {activeTab === 'invoices' && !selectedInvoice && (
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-bg-page/50">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-xl bg-primary-subtle text-theme-primary"><Receipt className="w-6 h-6" /></div>
                   <h2 className="text-xl font-black text-primary">Invoices</h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search Invoice No..." className="pl-9 pr-4 py-2 w-64 bg-card border border-border/50 rounded-xl text-sm focus:ring-2 focus:ring-theme-primary font-medium" />
                  </div>
                  <button className="p-2 border border-border/50 bg-card rounded-xl text-secondary hover:text-primary transition-colors"><Filter className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="bg-bg-page/50 border-b border-border/50">
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Invoice Info</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">PG / Owner</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Total Amount</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">Status</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {dummyInvoices.map((inv, i) => (
                      <tr key={i} className="hover:bg-bg-page/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-bold text-primary">{inv.id}</div>
                          <div className="text-xs text-secondary font-medium">{inv.date} • {inv.plan}</div>
                        </td>
                        <td className="py-4 px-4 text-sm font-bold text-primary">{inv.pg}</td>
                        <td className="py-4 px-4 text-right text-sm font-black text-primary">{inv.total}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                            inv.status === 'Paid' ? 'bg-success-bg text-success' : 
                            inv.status === 'Pending' ? 'bg-warning-bg text-warning-fg' : 
                            'bg-danger-bg text-danger'
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => setSelectedInvoice(inv)} className="p-1.5 text-theme-primary hover:bg-primary-subtle rounded-lg transition-colors tooltip" title="View Details"><Eye className="w-4 h-4" /></button>
                            <button className="p-1.5 text-info hover:bg-info-bg rounded-lg transition-colors tooltip" title="Download PDF"><Download className="w-4 h-4" /></button>
                            <button className="p-1.5 text-success hover:bg-success-bg rounded-lg transition-colors tooltip" title="Send via Email"><Send className="w-4 h-4" /></button>
                            {inv.status === 'Paid' && <button className="p-1.5 text-warning hover:bg-warning-bg rounded-lg transition-colors tooltip" title="Initiate Refund"><RefreshCcw className="w-4 h-4" /></button>}
                            {inv.status === 'Pending' && <button className="p-1.5 text-danger hover:bg-danger-bg rounded-lg transition-colors tooltip" title="Cancel Invoice"><XCircle className="w-4 h-4" /></button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SINGLE INVOICE VIEW */}
          {activeTab === 'invoices' && selectedInvoice && (
            <div className="flex flex-col h-full animate-in slide-in-from-right-8 duration-300">
              <div className="p-6 border-b border-border/50 flex items-center justify-between bg-bg-page/50">
                <div className="flex items-center gap-4">
                  <button onClick={() => setSelectedInvoice(null)} className="px-3 py-1.5 border border-border/50 bg-card rounded-xl text-sm font-bold text-secondary hover:text-primary transition-colors">Back</button>
                  <div>
                    <h2 className="text-xl font-black text-primary">Invoice: {selectedInvoice.id}</h2>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold mt-1 ${
                            selectedInvoice.status === 'Paid' ? 'bg-success-bg text-success' : 
                            selectedInvoice.status === 'Pending' ? 'bg-warning-bg text-warning-fg' : 
                            'bg-danger-bg text-danger'
                          }`}>
                      {selectedInvoice.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button className="bg-info hover:bg-info/90 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm"><Download className="w-4 h-4"/> Download PDF</button>
                   <button className="bg-theme-primary hover:bg-theme-primary-hover text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm"><Send className="w-4 h-4"/> Resend Email</button>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-8 bg-bg-page/30 flex justify-center">
                 {/* Invoice Document Layout */}
                 <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg border border-border p-10 flex flex-col text-gray-800">
                    <div className="flex justify-between items-start border-b pb-6">
                       <div>
                          <h1 className="text-3xl font-black text-theme-primary mb-1">SmartPG</h1>
                          <p className="text-sm font-medium text-gray-500">Global Tech Park, Sector 44, Gurgaon</p>
                          <p className="text-sm font-medium text-gray-500">GSTIN: 06ABCDE1234F1Z5</p>
                       </div>
                       <div className="text-right">
                          <h2 className="text-2xl font-black text-gray-800 mb-1">INVOICE</h2>
                          <p className="text-sm font-bold text-gray-600">No: {selectedInvoice.id}</p>
                          <p className="text-sm font-bold text-gray-600">Date: {selectedInvoice.date}</p>
                       </div>
                    </div>
                    <div className="py-6 border-b flex justify-between">
                       <div>
                          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Billed To</h3>
                          <p className="font-bold text-lg">{selectedInvoice.pg}</p>
                          <p className="text-sm font-medium text-gray-600">{selectedInvoice.plan}</p>
                       </div>
                    </div>
                    <div className="py-6 flex-1">
                       <table className="w-full text-left">
                          <thead>
                             <tr className="border-b-2 border-gray-200">
                                <th className="py-2 text-sm font-bold text-gray-600">Description</th>
                                <th className="py-2 text-sm font-bold text-gray-600 text-right">Amount</th>
                             </tr>
                          </thead>
                          <tbody>
                             <tr className="border-b border-gray-100">
                                <td className="py-4 text-sm font-medium">Subscription: {selectedInvoice.plan}</td>
                                <td className="py-4 text-sm font-medium text-right">{selectedInvoice.amount}</td>
                             </tr>
                             <tr className="border-b border-gray-100">
                                <td className="py-4 text-sm font-medium">Discount Applied</td>
                                <td className="py-4 text-sm font-medium text-right text-success">-{selectedInvoice.discount}</td>
                             </tr>
                             <tr className="border-b border-gray-100">
                                <td className="py-4 text-sm font-medium">Tax / GST (18%)</td>
                                <td className="py-4 text-sm font-medium text-right">{selectedInvoice.tax}</td>
                             </tr>
                          </tbody>
                       </table>
                    </div>
                    <div className="pt-6 border-t flex justify-end">
                       <div className="w-1/2">
                          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                             <span className="font-bold text-gray-600">Total Amount</span>
                             <span className="text-2xl font-black text-theme-primary">{selectedInvoice.total}</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* REFUNDS SECTION & FLOW */}
          {activeTab === 'refunds' && !selectedRefund && (
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-bg-page/50">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-xl bg-warning-bg text-warning"><AlertCircle className="w-6 h-6" /></div>
                   <h2 className="text-xl font-black text-primary">Refund Requests</h2>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="bg-bg-page/50 border-b border-border/50">
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Refund ID</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Invoice / PG</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Reason</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Amount</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">Status</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {dummyRefunds.map((ref, i) => (
                      <tr key={i} className="hover:bg-bg-page/50 transition-colors">
                        <td className="py-4 px-4 font-bold text-primary">{ref.id}</td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-primary">{ref.invoiceId}</div>
                          <div className="text-xs text-secondary font-medium">{ref.pg}</div>
                        </td>
                        <td className="py-4 px-4 text-sm text-secondary font-medium truncate max-w-[200px]">{ref.reason}</td>
                        <td className="py-4 px-4 text-right text-sm font-black text-danger">{ref.amount}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                            ref.status === 'Approved' ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning-fg'
                          }`}>
                            {ref.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button onClick={() => setSelectedRefund(ref)} className="bg-bg-page border border-border/50 px-3 py-1.5 rounded-lg text-sm font-bold text-primary hover:border-theme-primary transition-colors">Process</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SINGLE REFUND PROCESSING VIEW (Flow) */}
          {activeTab === 'refunds' && selectedRefund && (
            <div className="flex flex-col h-full animate-in slide-in-from-right-8 duration-300">
              <div className="p-6 border-b border-border/50 flex items-center gap-4 bg-bg-page/50">
                <button onClick={() => setSelectedRefund(null)} className="px-3 py-1.5 border border-border/50 bg-card rounded-xl text-sm font-bold text-secondary hover:text-primary transition-colors">Back</button>
                <h2 className="text-xl font-black text-primary">Process Refund: {selectedRefund.id}</h2>
              </div>
              
              <div className="flex-1 overflow-auto p-8 bg-bg-page/30">
                 
                 {/* Refund Lifecycle Flowchart */}
                 <div className="mb-10 bg-card p-6 rounded-2xl border border-border/50">
                    <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-6">Refund Processing Flow</h3>
                    <div className="flex items-center justify-between relative">
                       <div className="absolute top-1/2 left-0 right-0 h-1 bg-border/50 -translate-y-1/2 z-0"></div>
                       {[
                         { step: 'Request', icon: AlertCircle, active: true, done: true },
                         { step: 'Review', icon: Eye, active: selectedRefund.status === 'Review', done: selectedRefund.status === 'Approved' },
                         { step: 'Approve/Reject', icon: CheckCircle, active: false, done: selectedRefund.status === 'Approved' },
                         { step: 'Gateway Refund', icon: RefreshCcw, active: false, done: false },
                         { step: 'Notification', icon: Send, active: false, done: false }
                       ].map((s, i) => (
                         <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-card ${
                              s.done ? 'bg-success text-white' : s.active ? 'bg-warning text-white ring-4 ring-warning/20' : 'bg-bg-page text-secondary border-border/50'
                            }`}>
                               <s.icon className="w-4 h-4" />
                            </div>
                            <span className={`text-xs font-bold ${s.active || s.done ? 'text-primary' : 'text-secondary'}`}>{s.step}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Details & Actions */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <div className="bg-card p-5 rounded-2xl border border-border/50">
                         <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4">Request Details</h3>
                         <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span className="text-secondary font-medium">Invoice No:</span> <span className="font-bold text-primary">{selectedRefund.invoiceId}</span></div>
                            <div className="flex justify-between"><span className="text-secondary font-medium">PG Owner:</span> <span className="font-bold text-primary">{selectedRefund.pg}</span></div>
                            <div className="flex justify-between"><span className="text-secondary font-medium">Requested Date:</span> <span className="font-bold text-primary">{selectedRefund.requestDate}</span></div>
                            <div className="flex justify-between"><span className="text-secondary font-medium">Amount:</span> <span className="font-black text-danger">{selectedRefund.amount}</span></div>
                            <div className="pt-3 border-t border-border/50">
                               <span className="text-secondary font-medium block mb-1">Reason provided:</span>
                               <p className="font-medium text-primary italic">"{selectedRefund.reason}"</p>
                            </div>
                         </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="bg-card p-5 rounded-2xl border border-border/50 flex flex-col h-full">
                         <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4">Action Panel</h3>
                         <div className="flex-1 space-y-4">
                           <textarea rows={3} placeholder="Add internal review notes..." className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary font-medium text-primary resize-none"></textarea>
                           <label className="flex items-center gap-2 text-sm font-bold text-primary cursor-pointer">
                              <input type="checkbox" className="w-4 h-4 rounded border-border text-theme-primary focus:ring-theme-primary bg-bg-page" />
                              Notify user regarding this update
                           </label>
                         </div>
                         <div className="flex gap-3 pt-4 mt-auto border-t border-border/50">
                            <button className="flex-1 bg-success hover:bg-success/90 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-md">
                               <Check className="w-5 h-5" /> Approve Refund
                            </button>
                            <button className="flex-1 bg-danger hover:bg-danger/90 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-md">
                               <X className="w-5 h-5" /> Reject Request
                            </button>
                         </div>
                       </div>
                    </div>
                 </div>

              </div>
            </div>
          )}

          {/* FALLBACK FOR OTHER TABS */}
          {activeTab !== 'invoices' && activeTab !== 'refunds' && (
             <div className="flex items-center justify-center h-full text-secondary font-medium flex-col gap-4">
                <PieChart className="w-16 h-16 opacity-20" />
                <p>Metrics and Reports for <span className="font-bold text-primary uppercase">{activeTab}</span> will appear here.</p>
             </div>
          )}

        </div>
      </div>
    </div>
  );
}
