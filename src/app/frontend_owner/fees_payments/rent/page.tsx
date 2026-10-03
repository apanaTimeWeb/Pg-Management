'use client';

import React, { useState } from 'react';
import { 
  Wallet, BellRing, Receipt, CalendarCheck, 
  Search, Download, IndianRupee, AlertTriangle, 
  CheckCircle2, Clock, X, FileText, Zap, Flame, 
  Wand2, CreditCard, Landmark, Banknote
} from 'lucide-react';

const MOCK_DUES = [
  { id: 'INV-1025', student: 'Aman Singh', room: '101', rent: 8000, mess: 2000, elec: 500, fine: 200, discount: 0, totalDue: 10700, dueDate: '05 Oct 2026', status: 'Pending' },
  { id: 'INV-1024', student: 'Vikram Patel', room: '205', rent: 9000, mess: 2500, elec: 600, fine: 500, discount: 0, totalDue: 12600, dueDate: '01 Oct 2026', status: 'Overdue' },
  { id: 'INV-1023', student: 'Rahul Sharma', room: '304', rent: 8000, mess: 2000, elec: 400, fine: 0, discount: 500, totalDue: 9900, dueDate: '05 Oct 2026', status: 'Pending' },
];

const MOCK_HISTORY = [
  { id: 'REC-2041', student: 'Suresh Kumar', room: '401', amountPaid: 10500, mode: 'UPI', date: '02 Oct 2026', status: 'Full Payment' },
  { id: 'REC-2040', student: 'Amit Verma', room: '105', amountPaid: 5000, mode: 'Cash', date: '01 Oct 2026', status: 'Partial Payment' },
];

export default function FeesRentManagementPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCollectModalOpen, setIsCollectModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const [paymentForm, setPaymentForm] = useState({ 
    payingNow: 0, 
    mode: 'UPI', 
    discount: 0, 
    fineWaiver: 0, 
    sendReceipt: true 
  });

  const openCollectModal = (invoice: any) => {
    setSelectedInvoice(invoice);
    setPaymentForm({ 
      payingNow: invoice.totalDue, 
      mode: 'UPI', 
      discount: invoice.discount, 
      fineWaiver: 0, 
      sendReceipt: true 
    });
    setIsCollectModalOpen(true);
  };

  const currentTotal = selectedInvoice ? (selectedInvoice.totalDue - paymentForm.fineWaiver) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Collect Payment Modal Overlay */}
      {isCollectModalOpen && selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#1A3A5C] text-white shrink-0">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Wallet className="w-5 h-5 text-green-400" /> Collect Fee Payment
              </h2>
              <button onClick={() => setIsCollectModalOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto bg-gray-50/50">
              
              {/* Student Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{selectedInvoice.student}</h3>
                  <p className="text-sm font-semibold text-gray-500 flex items-center gap-2 mt-1">
                    Room {selectedInvoice.room} <span className="text-gray-300">•</span> Invoice ID: {selectedInvoice.id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Due</p>
                  <h3 className="text-3xl font-black text-gray-800">₹{selectedInvoice.totalDue.toLocaleString()}</h3>
                </div>
              </div>

              {/* Fee Structure Breakdown */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Fee Structure Breakdown</h4>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                    <span>Monthly Rent</span><span>₹{selectedInvoice.rent}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                    <span>Mess Charges</span><span>₹{selectedInvoice.mess}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                    <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-yellow-500" /> Electricity (Metered)</span><span>₹{selectedInvoice.elec}</span>
                  </div>
                  
                  {selectedInvoice.fine > 0 && (
                    <div className="flex justify-between items-center text-sm font-bold text-red-600 pt-2 border-t border-gray-100">
                      <span>Late Payment Fine</span>
                      <div className="flex items-center gap-3">
                        <span>₹{selectedInvoice.fine}</span>
                        <button className="text-[10px] bg-red-50 px-2 py-1 rounded-md border border-red-100 hover:bg-red-100 transition-colors">Waive Fine</button>
                      </div>
                    </div>
                  )}
                  {selectedInvoice.discount > 0 && (
                    <div className="flex justify-between items-center text-sm font-bold text-green-600 pt-2 border-t border-gray-100">
                      <span>Pre-applied Discount</span><span>- ₹{selectedInvoice.discount}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Processing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-gray-700 uppercase">Amount Receiving Now (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 font-black text-xl">₹</span>
                    <input 
                      type="number" 
                      value={paymentForm.payingNow} 
                      onChange={(e) => setPaymentForm({...paymentForm, payingNow: Number(e.target.value)})} 
                      className="w-full pl-9 pr-4 py-3 border-2 border-green-500 rounded-xl focus:border-green-600 outline-none text-xl font-black text-green-700 bg-green-50/30" 
                    />
                  </div>
                  {paymentForm.payingNow < currentTotal && (
                    <p className="text-xs font-bold text-orange-600 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Partial Payment (Balance: ₹{currentTotal - paymentForm.payingNow})
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-bold text-gray-700 uppercase">Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['UPI', 'Cash', 'Bank Transfer', 'Card'].map(mode => (
                      <button 
                        key={mode}
                        onClick={() => setPaymentForm({...paymentForm, mode})}
                        className={`py-2 text-sm font-bold rounded-xl border ${paymentForm.mode === mode ? 'bg-[#1A3A5C] text-white border-[#1A3A5C]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer w-max">
                  <input type="checkbox" checked={paymentForm.sendReceipt} onChange={(e) => setPaymentForm({...paymentForm, sendReceipt: e.target.checked})} className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                  <span className="text-sm font-bold text-gray-700 flex items-center gap-1.5"><Receipt className="w-4 h-4 text-gray-400" /> Send instant receipt to student's app</span>
                </label>
              </div>

            </div>
            
            <div className="p-5 border-t border-gray-100 bg-white flex justify-end gap-3 shrink-0">
              <button onClick={() => setIsCollectModalOpen(false)} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => { alert('Payment Collected & Ledger Updated!'); setIsCollectModalOpen(false); }} className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm">
                <CheckCircle2 className="w-4 h-4" /> Confirm & Update Ledger
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <IndianRupee className="w-7 h-7 text-green-600" />
            Fees & Rent Collection
          </h1>
          <p className="text-gray-500 text-sm mt-1">Generate bulk dues, collect monthly rent, and manage outstanding ledgers.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Wand2 className="w-4 h-4 text-yellow-400" /> Bulk Generate Dues
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Wallet className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Collected (Oct)</p>
            <h3 className="text-2xl font-black text-gray-800">₹4.2L</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4 border-l-4 border-red-400">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><AlertTriangle className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Outstanding Dues</p>
            <h3 className="text-xl font-black text-red-600">₹85,500</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><CalendarCheck className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Pending Payments</p>
            <h3 className="text-2xl font-black text-gray-800">42</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Banknote className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Late Fines</p>
            <h3 className="text-2xl font-black text-gray-800">₹4,500</h3>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Top Bar: Tabs & Filters */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col lg:flex-row justify-between gap-4 shrink-0">
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-max">
            <button 
              onClick={() => setActiveTab('pending')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'pending' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <AlertTriangle className="w-4 h-4" /> Pending / Overdue
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Receipt className="w-4 h-4" /> Payment History
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search student or room..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white"
              />
            </div>
            <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl w-full sm:w-auto cursor-pointer hover:bg-gray-50 font-bold text-gray-700 text-sm">
              <BellRing className="w-4 h-4" /> Send Reminders
            </button>
          </div>
        </div>

        {/* Dynamic Table Content */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-bold">
                <th className="p-5 w-24 text-center">Room</th>
                <th className="p-5">Student Details</th>
                {activeTab === 'pending' ? (
                  <>
                    <th className="p-5">Total Due Amount</th>
                    <th className="p-5 text-center">Due Date & Status</th>
                    <th className="p-5 text-center">Actions</th>
                  </>
                ) : (
                  <>
                    <th className="p-5">Paid Amount & Method</th>
                    <th className="p-5">Payment Date</th>
                    <th className="p-5 text-center">Status & Receipt</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              
              {/* PENDING DUES */}
              {activeTab === 'pending' && MOCK_DUES.filter(s => s.student.toLowerCase().includes(searchTerm.toLowerCase())).map((record) => (
                <tr key={record.id} className={`transition-colors ${record.status === 'Overdue' ? 'bg-red-50/20 hover:bg-red-50/40' : 'hover:bg-gray-50/50'}`}>
                  <td className="p-5 text-center"><span className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-black text-gray-800 mx-auto">{record.room}</span></td>
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-sm flex items-center gap-2">{record.student}</span>
                      <span className="text-xs font-semibold text-gray-500 mt-0.5">{record.id}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="font-black text-gray-800 text-xl">₹{record.totalDue.toLocaleString()}</span>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-sm font-bold text-gray-700 flex items-center gap-1.5"><CalendarCheck className="w-4 h-4 text-gray-400" /> {record.dueDate}</span>
                      {record.status === 'Overdue' ? (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max border border-red-200"><AlertTriangle className="w-3 h-3"/> Overdue</span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max border border-yellow-200"><Clock className="w-3 h-3"/> Pending</span>
                      )}
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <button onClick={() => openCollectModal(record)} className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2 mx-auto w-max">
                      <Wallet className="w-4 h-4" /> Collect
                    </button>
                  </td>
                </tr>
              ))}

              {/* PAYMENT HISTORY */}
              {activeTab === 'history' && MOCK_HISTORY.filter(s => s.student.toLowerCase().includes(searchTerm.toLowerCase())).map((record) => (
                <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-5 text-center"><span className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-black text-gray-800 mx-auto">{record.room}</span></td>
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-sm flex items-center gap-2">{record.student}</span>
                      <span className="text-xs font-semibold text-gray-500 mt-0.5">{record.id}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col gap-1">
                      <span className="font-black text-green-600 text-xl">₹{record.amountPaid.toLocaleString()}</span>
                      <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-md w-max border border-gray-200">{record.mode}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="text-sm font-bold text-gray-700">{record.date}</span>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex flex-col items-center gap-2">
                      {record.status === 'Full Payment' ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max border border-green-200"><CheckCircle2 className="w-3 h-3"/> Full Payment</span>
                      ) : (
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max border border-orange-200"><AlertTriangle className="w-3 h-3"/> Partial Payment</span>
                      )}
                      <button className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline">
                        <FileText className="w-3 h-3" /> Download Receipt
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
