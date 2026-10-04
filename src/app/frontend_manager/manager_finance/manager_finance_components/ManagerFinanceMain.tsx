// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  IndianRupee, Search, Filter, AlertTriangle, CheckCircle2, 
  Bell, FileText, Plus, Receipt, Lock, CalendarClock, Download, 
  CreditCard, Banknote, History, ChevronRight
, X} from 'lucide-react';

type FeeStatus = 'Overdue' | 'Pending' | 'Upcoming' | 'Paid';

interface FeeDetail {
  rent: number;
  mess: number;
  electricity: number;
  other: number;
  fine: number;
  discount: number;
  paid: number;
}

interface StudentFee {
  id: string;
  student: string;
  room: string;
  dueDate: string;
  status: FeeStatus;
  details: FeeDetail;
}

const INITIAL_FEES: StudentFee[] = [
  {
    id: 'F-1001',
    student: 'Rahul Sharma',
    room: '102',
    dueDate: '01 Oct 2026',
    status: 'Overdue',
    details: { rent: 8000, mess: 3000, electricity: 500, other: 0, fine: 200, discount: 0, paid: 5000 }
  },
  {
    id: 'F-1002',
    student: 'Amit Kumar',
    room: '205',
    dueDate: '05 Oct 2026',
    status: 'Pending',
    details: { rent: 9000, mess: 3500, electricity: 400, other: 100, fine: 0, discount: 500, paid: 0 }
  },
  {
    id: 'F-1003',
    student: 'Suresh Patel',
    room: '304',
    dueDate: '10 Oct 2026',
    status: 'Upcoming',
    details: { rent: 8500, mess: 3000, electricity: 600, other: 0, fine: 0, discount: 0, paid: 0 }
  },
  {
    id: 'F-1004',
    student: 'Vikas Singh',
    room: '105',
    dueDate: '01 Oct 2026',
    status: 'Paid',
    details: { rent: 7500, mess: 3000, electricity: 450, other: 0, fine: 0, discount: 0, paid: 10950 }
  }
];

import { useManagerFinance } from '../manager_finance_hooks/useManagerFinance';

export default function ManagerFinanceMain() {
  const { 
    invoices, 
    loading, 
    filter: filterStatus, 
    setFilter: setFilterStatus, 
    handleMarkPaid 
  } = useManagerFinance();

  const [searchTerm, setSearchTerm] = useState('');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null); // Use any for now or map to expected interface

  // Map enriched invoices to UI expected format
  const fees = invoices.map(inv => {
    let status = 'Pending';
    if (inv.status === 'paid') status = 'Paid';
    else if (inv.status === 'overdue') status = 'Overdue';
    
    return {
      id: inv.id,
      student: (inv as any).studentName,
      room: (inv as any).roomBed,
      dueDate: new Date(inv.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status,
      details: {
        rent: inv.amount, mess: 0, electricity: 0, other: 0, fine: 0, discount: 0, paid: inv.status === 'paid' ? inv.amount : 0
      }
    };
  });

  const filteredFees = fees.filter(f => {
    const matchesSearch = f.student.toLowerCase().includes(searchTerm.toLowerCase()) || f.room.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || f.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="p-8 flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const getStatusColor = (status: FeeStatus) => {
    switch (status) {
      case 'Overdue': return 'bg-red-100 text-red-700 border-red-200';
      case 'Pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Upcoming': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Paid': return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const calculateTotalDue = (details: FeeDetail) => {
    return (details.rent + details.mess + details.electricity + details.other + details.fine) - details.discount;
  };

  const calculateBalance = (details: FeeDetail) => {
    return calculateTotalDue(details) - details.paid;
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFee) {
      handleMarkPaid(selectedFee.id);
    }
    setPaymentModalOpen(false);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 w-full h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <IndianRupee className="w-6 h-6"/>
            </div>
            Fees & Dues Collection
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage operational fee collection, record payments, and follow-ups.</p>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-secondary uppercase tracking-wider">Today's Collection</p>
            <h3 className="text-xl font-black text-green-600 mt-1">₹ 15,500</h3>
          </div>
          <div className="p-3 bg-green-50 rounded-xl text-green-600"><IndianRupee className="w-5 h-5"/></div>
        </div>
        <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-secondary uppercase tracking-wider">Total Pending</p>
            <h3 className="text-xl font-black text-orange-600 mt-1">₹ 42,000</h3>
          </div>
          <div className="p-3 bg-orange-50 rounded-xl text-orange-600"><AlertTriangle className="w-5 h-5"/></div>
        </div>
        <div className="bg-card p-4 rounded-2xl border border-red-200 dark:border-red-900/50 shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-100/50 dark:bg-red-950/30 rounded-bl-full -mr-4 -mt-4"></div>
          <div>
            <p className="text-xs font-bold text-red-600 uppercase tracking-wider">Total Overdue</p>
            <h3 className="text-xl font-black text-red-600 mt-1">₹ 18,500</h3>
          </div>
          <div className="p-3 bg-red-100 dark:bg-red-950/40 rounded-xl text-red-600 relative z-10"><CalendarClock className="w-5 h-5"/></div>
        </div>
        <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-secondary uppercase tracking-wider">Upcoming Dues</p>
            <h3 className="text-xl font-black text-blue-600 mt-1">₹ 85,000</h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><CalendarClock className="w-5 h-5"/></div>
        </div>
      </div>

      <div className="bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
        
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
          
          {/* Left Side: List */}
          <div className="lg:w-1/3 border-r border-border/50 flex flex-col min-h-0">
            <div className="p-4 border-b border-border/50 bg-page/10 shrink-0 space-y-3">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                {['All', 'Overdue', 'Pending', 'Upcoming', 'Paid'].map(status => (
                  <button 
                    key={status}
                    onClick={() => setFilterStatus(status as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                      filterStatus === status 
                        ? 'bg-indigo-600 text-white border-indigo-600' 
                        : 'bg-card text-secondary border-border/60 hover:border-indigo-300'
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
                  placeholder="Search student or room..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredFees.map(f => {
                const bal = calculateBalance(f.details);
                return (
                  <div 
                    key={f.id}
                    onClick={() => setSelectedFee(f)}
                    className={`p-3 rounded-xl cursor-pointer transition-all ${
                      selectedFee?.id === f.id 
                        ? 'bg-indigo-50 border border-indigo-200 shadow-sm' 
                        : 'bg-transparent border border-transparent hover:bg-page/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-primary truncate">{f.student}</h4>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${getStatusColor(f.status)}`}>
                        {f.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-[11px] text-secondary truncate">Rm {f.room} • Due: {f.dueDate}</p>
                      <p className={`text-xs font-black ${bal > 0 ? (f.status === 'Overdue' ? 'text-red-600' : 'text-orange-600') : 'text-green-600'}`}>
                        {bal > 0 ? `₹ ${bal.toLocaleString()} Due` : 'Cleared'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Details & Actions */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-50/30 overflow-y-auto relative">
            
            {/* Restricted Banner */}
            <div className="absolute top-0 inset-x-0 p-2 bg-gray-900 text-white text-[10px] font-bold text-center flex items-center justify-center gap-2 z-20">
              <Lock className="w-3 h-3" /> Owner Restricted Features: Plan Pricing, Global Fee Rules, Major Discounts, Refund Approvals.
            </div>

            {!selectedFee ? (
              <div className="flex-1 flex flex-col items-center justify-center text-secondary p-8 text-center pt-12">
                <FileText className="w-12 h-12 mb-4 text-border" />
                <p>Select a fee record to view details</p>
              </div>
            ) : (
              <>
                {/* Header Info */}
                <div className="p-6 pt-12 border-b border-border/50 bg-card shrink-0 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getStatusColor(selectedFee.status)}`}>
                      Status: {selectedFee.status}
                    </span>
                    <span className="text-sm font-bold text-secondary">Due Date: {selectedFee.dueDate}</span>
                  </div>
                  
                  <h2 className="text-2xl font-black text-primary leading-tight">{selectedFee.student}</h2>
                  <p className="text-sm font-bold text-secondary mt-1">Room {selectedFee.room}</p>
                </div>

                <div className="p-6 flex-1 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Breakdown */}
                <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-border/50 bg-page/30">
                    <h3 className="font-bold text-primary flex items-center gap-2"><FileText className="w-4 h-4 text-indigo-600"/> Fee Breakdown</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-secondary font-medium">Monthly Rent</span>
                      <span className="font-bold text-primary">₹ {selectedFee.details.rent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-secondary font-medium">Mess Fee</span>
                      <span className="font-bold text-primary">₹ {selectedFee.details.mess.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-secondary font-medium">Electricity</span>
                      <span className="font-bold text-primary">₹ {selectedFee.details.electricity.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-secondary font-medium">Other Charges</span>
                      <span className="font-bold text-primary">₹ {selectedFee.details.other.toLocaleString()}</span>
                    </div>
                    {selectedFee.details.fine > 0 && (
                      <div className="flex justify-between items-center text-sm text-red-600">
                        <span className="font-medium">Late Fine</span>
                        <span className="font-bold">₹ {selectedFee.details.fine.toLocaleString()}</span>
                      </div>
                    )}
                    {selectedFee.details.discount > 0 && (
                      <div className="flex justify-between items-center text-sm text-green-600">
                        <span className="font-medium">Discount</span>
                        <span className="font-bold">- ₹ {selectedFee.details.discount.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="pt-3 border-t border-border/50 flex justify-between items-center">
                      <span className="font-black text-primary">Total Amount</span>
                      <span className="font-black text-primary">₹ {calculateTotalDue(selectedFee.details).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-green-600">
                      <span className="font-bold">Amount Paid</span>
                      <span className="font-bold">- ₹ {selectedFee.details.paid.toLocaleString()}</span>
                    </div>
                    <div className="pt-3 border-t-2 border-dashed border-border/50 flex justify-between items-center text-lg">
                      <span className="font-black text-primary">Balance Due</span>
                      <span className={`font-black ${calculateBalance(selectedFee.details) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ₹ {calculateBalance(selectedFee.details).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions & History */}
                <div className="space-y-6">
                  
                  <div className="bg-card p-5 rounded-2xl border border-border shadow-sm space-y-3">
                    <h3 className="font-bold text-primary flex items-center gap-2 mb-4"><Zap className="w-4 h-4 text-indigo-600"/> Operational Actions</h3>
                    
                    {calculateBalance(selectedFee.details) > 0 && (
                      <button onClick={() => setPaymentModalOpen(true)} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2">
                        <Banknote className="w-4 h-4" /> Record Payment
                      </button>
                    )}
                    
                    {selectedFee.status === 'Overdue' && calculateBalance(selectedFee.details) > 0 && (
                      <button className="w-full py-3 bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                        <Bell className="w-4 h-4" /> Send Payment Reminder
                      </button>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <button className="py-2.5 bg-page text-secondary border border-border hover:bg-gray-100 hover:text-primary rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                        <Plus className="w-3.5 h-3.5" /> Add Charge
                      </button>
                      <button className="py-2.5 bg-page text-secondary border border-border hover:bg-gray-100 hover:text-primary rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                        <Receipt className="w-3.5 h-3.5" /> View Receipt
                      </button>
                    </div>
                  </div>

                  <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
                    <h3 className="font-bold text-primary flex items-center gap-2 mb-4"><History className="w-4 h-4 text-indigo-600"/> Payment History</h3>
                    
                    {selectedFee.details.paid > 0 ? (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-page/50 rounded-lg border border-border/50 text-sm">
                          <div>
                            <p className="font-bold text-primary">₹ {selectedFee.details.paid.toLocaleString()}</p>
                            <p className="text-xs text-secondary flex items-center gap-1 mt-0.5"><CreditCard className="w-3 h-3"/> UPI / Online</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200">Successful</p>
                            <p className="text-[10px] text-secondary mt-1">28 Sep 2026</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-4 text-sm text-secondary italic">No payments recorded yet for this billing cycle.</div>
                    )}
                  </div>

                </div>
              </div>

            </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Record Payment Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border/50 bg-page/80 flex items-center justify-between">
              <h3 className="font-black text-primary flex items-center gap-2">
                <Banknote className="w-5 h-5 text-indigo-600" /> Record Offline/Manual Payment
              </h3>
              <button onClick={() => setPaymentModalOpen(false)} className="text-secondary hover:text-red-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleRecordPayment} className="p-6 space-y-4">
              
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800 font-medium">
                Balance Due: <span className="font-black text-blue-900">₹ {calculateBalance(selectedFee.details).toLocaleString()}</span>
              </div>

              <div>
                <label className="text-sm font-bold text-secondary">Amount Paid (₹)</label>
                <input name="amount" required type="number" min="1" max={calculateBalance(selectedFee.details)} defaultValue={calculateBalance(selectedFee.details)} className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500 font-bold" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-secondary">Payment Mode</label>
                  <select className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500">
                    <option>Cash</option>
                    <option>UPI / QR</option>
                    <option>Bank Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-bold text-secondary">Date</label>
                  <input required type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-secondary">Transaction ID / Reference (Optional)</label>
                <input type="text" placeholder="e.g. UTR Number" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="receipt" defaultChecked className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="receipt" className="text-sm text-secondary font-medium cursor-pointer">Generate and send receipt to student instantly</label>
              </div>

              <div className="p-4 border-t border-border/50 bg-page/80 flex items-center justify-end gap-3 mt-4 -mx-6 -mb-6">
                <button type="button" onClick={() => setPaymentModalOpen(false)} className="px-4 py-2 font-bold text-secondary hover:text-primary transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Quick component for Zap icon
function Zap(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
  );
}