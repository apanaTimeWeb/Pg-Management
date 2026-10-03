'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, ArrowRight, Wallet, UserCheck, 
  MinusCircle, CheckCircle2, AlertTriangle, 
  Search, Download, Filter, Receipt, ArrowDownToLine,
  X
} from 'lucide-react';

const MOCK_DEPOSITS = [
  { id: 'DEP-101', student: 'Aman Singh', room: '101', amount: 10000, date: '15 Jan 2026', receipt: 'REC-001', status: 'Held', checkoutDate: '-' },
  { id: 'DEP-102', student: 'Vikram Patel', room: '205', amount: 15000, date: '10 Mar 2026', receipt: 'REC-002', status: 'Held', checkoutDate: '-' },
];

const MOCK_SETTLEMENTS = [
  { id: 'DEP-099', student: 'Rahul Sharma', room: '304', amount: 10000, checkoutDate: '01 Oct 2026', status: 'Pending Settlement', damages: 0, dues: 2000 },
  { id: 'DEP-098', student: 'Amit Verma', room: '105', amount: 12000, checkoutDate: '28 Sep 2026', status: 'Pending Settlement', damages: 500, dues: 0 },
];

const MOCK_HISTORY = [
  { id: 'DEP-095', student: 'Suresh Kumar', room: '401', amount: 10000, damages: 1000, dues: 0, refunded: 9000, status: 'Settled', date: '15 Sep 2026' }
];

export default function SecurityDepositPage() {
  const [activeTab, setActiveTab] = useState<'held' | 'pending' | 'history'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSettleModalOpen, setIsSettleModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const [settlementForm, setSettlementForm] = useState({ damages: 0, damageReason: '', dues: 0, paymentMethod: 'Bank Transfer' });

  const openSettleModal = (student: any) => {
    setSelectedStudent(student);
    setSettlementForm({ damages: student.damages, damageReason: '', dues: student.dues, paymentMethod: 'Bank Transfer' });
    setIsSettleModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Settlement Modal Overlay */}
      {isSettleModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#1A3A5C] text-white shrink-0">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#F5A623]" /> Process Final Settlement
              </h2>
              <button onClick={() => setIsSettleModalOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto">
              
              {/* Flow Visualizer */}
              <div className="flex items-center justify-between px-4 pb-6 border-b border-gray-100">
                <div className="flex flex-col items-center gap-1"><div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 className="w-4 h-4"/></div><span className="text-[10px] font-bold text-gray-500 uppercase">Check-out</span></div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
                <div className="flex flex-col items-center gap-1"><div className="w-6 h-6 rounded-full bg-[#F5A623] text-white flex items-center justify-center shadow-md"><ShieldCheck className="w-4 h-4"/></div><span className="text-[10px] font-bold text-[#F5A623] uppercase">Calculate</span></div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
                <div className="flex flex-col items-center gap-1"><div className="w-6 h-6 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center"><Wallet className="w-4 h-4"/></div><span className="text-[10px] font-bold text-gray-400 uppercase">Refund</span></div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-800">{selectedStudent.student}</h3>
                  <p className="text-xs text-gray-500">Room {selectedStudent.room} • ID: {selectedStudent.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase">Base Deposit Held</p>
                  <h3 className="text-2xl font-black text-gray-800">₹{selectedStudent.amount.toLocaleString()}</h3>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <MinusCircle className="w-4 h-4 text-red-500" /> Deductions & Adjustments
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-red-100 bg-red-50/50 rounded-xl">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Pending Dues / Rent</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                      <input type="number" value={settlementForm.dues} onChange={(e) => setSettlementForm({...settlementForm, dues: Number(e.target.value)})} className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm font-bold" />
                    </div>
                  </div>
                  <div className="p-4 border border-red-100 bg-red-50/50 rounded-xl">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Inventory Damages</label>
                    <div className="relative mb-2">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                      <input type="number" value={settlementForm.damages} onChange={(e) => setSettlementForm({...settlementForm, damages: Number(e.target.value)})} className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm font-bold" />
                    </div>
                    <input type="text" placeholder="Reason (e.g. Broken Chair)" value={settlementForm.damageReason} onChange={(e) => setSettlementForm({...settlementForm, damageReason: e.target.value})} className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs outline-none" />
                  </div>
                </div>
              </div>

              <div className="p-5 bg-green-50 border border-green-200 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="font-bold text-green-800 flex items-center gap-2">
                    <Wallet className="w-5 h-5" /> Final Refund Amount
                  </h3>
                  <p className="text-xs text-green-600 font-medium">₹{selectedStudent.amount} - ₹{(settlementForm.dues + settlementForm.damages)} (Deductions)</p>
                </div>
                <h2 className="text-3xl font-black text-green-700">
                  ₹{(selectedStudent.amount - settlementForm.dues - settlementForm.damages).toLocaleString()}
                </h2>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Refund Payment Method</label>
                <select value={settlementForm.paymentMethod} onChange={(e) => setSettlementForm({...settlementForm, paymentMethod: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-gray-700">
                  <option>Bank Transfer (NEFT/RTGS)</option>
                  <option>UPI</option>
                  <option>Cash</option>
                  <option>Cheque</option>
                </select>
              </div>

            </div>
            
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
              <button onClick={() => setIsSettleModalOpen(false)} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-colors">Cancel</button>
              <button onClick={() => { alert('Settlement Complete & Refund Processed!'); setIsSettleModalOpen(false); }} className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm">
                <CheckCircle2 className="w-4 h-4" /> Process Final Refund
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-[#F5A623]" />
            Security Deposit Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">Track collected deposits, manage deductions, and process checkout refunds.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Download className="w-4 h-4" /> Export Ledger
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><ShieldCheck className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total Held Deposits</p>
            <h3 className="text-2xl font-black text-gray-800">₹3.2L</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4 border-l-4 border-yellow-400">
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl"><AlertTriangle className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Pending Settlements</p>
            <h3 className="text-xl font-black text-yellow-600">2 Checkouts</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Settled This Month</p>
            <h3 className="text-2xl font-black text-gray-800">5</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><MinusCircle className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Damage Deductions (YTD)</p>
            <h3 className="text-xl font-black text-gray-800">₹14,500</h3>
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
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'pending' ? 'bg-white text-[#F5A623] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <AlertTriangle className="w-4 h-4" /> Pending Settlements <span className="bg-yellow-500 text-white px-1.5 py-0.5 rounded-full text-[10px]">2</span>
            </button>
            <button 
              onClick={() => setActiveTab('held')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'held' ? 'bg-white text-[#F5A623] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <ShieldCheck className="w-4 h-4" /> Active Deposits (Held)
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-white text-[#F5A623] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <CheckCircle2 className="w-4 h-4" /> Settlement History
            </button>
          </div>
          
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by student or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] bg-white"
            />
          </div>
        </div>

        {/* Dynamic Table Content */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-bold">
                <th className="p-4 w-24 text-center">Room</th>
                <th className="p-4">Student & Deposit ID</th>
                <th className="p-4">Base Deposit</th>
                {activeTab === 'pending' && <th className="p-4">Checkout Date</th>}
                {activeTab === 'history' && <th className="p-4">Deductions</th>}
                {activeTab === 'history' && <th className="p-4">Refunded</th>}
                {activeTab === 'held' && <th className="p-4">Payment Date & Receipt</th>}
                <th className="p-4 text-center">Status & Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              
              {/* PENDING SETTLEMENTS */}
              {activeTab === 'pending' && MOCK_SETTLEMENTS.filter(s => s.student.toLowerCase().includes(searchTerm.toLowerCase())).map((student) => (
                <tr key={student.id} className="hover:bg-yellow-50/30 transition-colors">
                  <td className="p-4 text-center"><span className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-black text-gray-800 mx-auto">{student.room}</span></td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-sm">{student.student}</span>
                      <span className="text-xs font-semibold text-gray-500">{student.id}</span>
                    </div>
                  </td>
                  <td className="p-4"><span className="font-black text-gray-800 text-lg">₹{student.amount.toLocaleString()}</span></td>
                  <td className="p-4"><span className="text-sm font-semibold text-red-600">{student.checkoutDate}</span></td>
                  <td className="p-4 text-center">
                    <button onClick={() => openSettleModal(student)} className="px-4 py-2 bg-[#F5A623] hover:bg-[#e09612] text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2 mx-auto">
                      Settle Refund <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {/* HELD DEPOSITS */}
              {activeTab === 'held' && MOCK_DEPOSITS.filter(s => s.student.toLowerCase().includes(searchTerm.toLowerCase())).map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-center"><span className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-black text-gray-800 mx-auto">{student.room}</span></td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-sm">{student.student}</span>
                      <span className="text-xs font-semibold text-gray-500">{student.id}</span>
                    </div>
                  </td>
                  <td className="p-4"><span className="font-black text-gray-800 text-lg">₹{student.amount.toLocaleString()}</span></td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-gray-700">{student.date}</span>
                      <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md w-max border border-blue-100">
                        <Receipt className="w-3.5 h-3.5" /> {student.receipt}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 w-max mx-auto">
                      <ShieldCheck className="w-4 h-4" /> Actively Held
                    </span>
                  </td>
                </tr>
              ))}

              {/* SETTLEMENT HISTORY */}
              {activeTab === 'history' && MOCK_HISTORY.filter(s => s.student.toLowerCase().includes(searchTerm.toLowerCase())).map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-center"><span className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-black text-gray-800 mx-auto">{student.room}</span></td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-sm">{student.student}</span>
                      <span className="text-xs font-semibold text-gray-500">{student.id}</span>
                    </div>
                  </td>
                  <td className="p-4"><span className="font-black text-gray-800 text-lg">₹{student.amount.toLocaleString()}</span></td>
                  <td className="p-4">
                    <span className="text-sm font-bold text-red-600">- ₹{(student.damages + student.dues).toLocaleString()}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-black text-green-600">₹{student.refunded.toLocaleString()}</span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 border border-gray-200 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max">
                        <CheckCircle2 className="w-3 h-3" /> Settled
                      </span>
                      <button className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline">
                        <ArrowDownToLine className="w-3 h-3" /> Settlement PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {(activeTab === 'pending' && MOCK_SETTLEMENTS.length === 0) && (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <CheckCircle2 className="w-12 h-12 text-gray-200 mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-1">All clear!</h3>
              <p className="text-gray-500 text-sm">There are no pending checkouts requiring a security deposit settlement.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
