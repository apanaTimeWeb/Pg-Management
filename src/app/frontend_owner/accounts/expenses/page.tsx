'use client';

import React, { useState } from 'react';
import { 
  Receipt, Plus, Download, Filter, Search, 
  Zap, Droplet, Wifi, UtensilsCrossed, Brush, Flame, Clock,
  Wrench, Users, Building2, Truck, FileWarning,
  CheckCircle2, XCircle, MoreVertical, DollarSign,
  PieChart, TrendingUp, TrendingDown, Paperclip, X
} from 'lucide-react';

const CATEGORIES: any = {
  'Electricity': Zap, 'Water': Droplet, 'Internet': Wifi, 'Food': UtensilsCrossed, 
  'Gas': Flame, 'Cleaning': Brush, 'Maintenance': Wrench, 'Salary': Users, 
  'Rent/Property': Building2, 'Transport': Truck, 'Other': FileWarning
};



const MOCK_EXPENSES = [
  { id: 'EXP-1045', category: 'Food', vendor: 'Local Grocer', amount: 45000, date: '03 Oct 2026', method: 'UPI', pg: 'PG Varanasi Main', status: 'Approved', attachment: true },
  { id: 'EXP-1044', category: 'Electricity', vendor: 'State Electricity Board', amount: 12500, date: '01 Oct 2026', method: 'Bank Transfer', pg: 'PG Lanka Branch', status: 'Pending Approval', attachment: true },
  { id: 'EXP-1043', category: 'Maintenance', vendor: 'Rajesh (Plumber)', amount: 1500, date: '28 Sep 2026', method: 'Cash', pg: 'PG Varanasi Main', status: 'Approved', attachment: false },
  { id: 'EXP-1042', category: 'Internet', vendor: 'Airtel Broadband', amount: 3000, date: '25 Sep 2026', method: 'Credit Card', pg: 'PG Varanasi Main', status: 'Approved', attachment: true },
  { id: 'EXP-1041', category: 'Gas', vendor: 'Indane Gas', amount: 5400, date: '22 Sep 2026', method: 'UPI', pg: 'PG Lanka Branch', status: 'Cancelled', attachment: false },
];

export default function ExpensesPage() {
  const [activeTab, setActiveTab] = useState<'log' | 'approvals' | 'reports'>('log');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredExpenses = MOCK_EXPENSES.filter(exp => {
    const matchesSearch = exp.vendor.toLowerCase().includes(searchTerm.toLowerCase()) || exp.category.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'approvals') return exp.status === 'Pending Approval';
    return true;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'Approved') return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-[10px] font-bold uppercase flex items-center gap-1 w-max border border-green-200"><CheckCircle2 className="w-3 h-3"/> Approved</span>;
    if (status === 'Pending Approval') return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-[10px] font-bold uppercase flex items-center gap-1 w-max border border-yellow-200"><Clock className="w-3 h-3"/> Pending</span>;
    return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-[10px] font-bold uppercase flex items-center gap-1 w-max border border-red-200"><XCircle className="w-3 h-3"/> Cancelled</span>;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Add Expense Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-emerald-50 shrink-0">
              <h2 className="text-xl font-bold flex items-center gap-2 text-emerald-800">
                <Receipt className="w-5 h-5 text-emerald-600" /> Record New Expense
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 hover:bg-card rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-page/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Category</label>
                  <select className="w-full px-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-bold text-secondary">
                    {Object.keys(CATEGORIES).map(cat => <option key={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Vendor / Payee Name</label>
                  <input type="text" placeholder="e.g. State Electricity Board" className="w-full px-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-bold text-secondary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Amount (₹)</label>
                  <input type="number" placeholder="0.00" className="w-full px-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-lg font-black text-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Payment Method</label>
                  <select className="w-full px-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-bold text-secondary">
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Bank Transfer (NEFT/RTGS)</option>
                    <option>Credit/Debit Card</option>
                    <option>Cheque</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Date of Expense</label>
                  <input type="date" className="w-full px-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-bold text-secondary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Assign to PG</label>
                  <select className="w-full px-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-bold text-secondary">
                    <option>PG Varanasi Main</option>
                    <option>PG Lanka Branch</option>
                    <option>Global Business Expense</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Upload Bill / Attachment (Optional)</label>
                  <div className="w-full px-4 py-4 border-2 border-dashed border-border rounded-xl text-center hover:bg-[var(--bg-overlay)] cursor-pointer transition-colors bg-card">
                    <Paperclip className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                    <span className="text-xs font-bold text-emerald-600">Click to upload Receipt PDF/Image</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-border/50 bg-card flex justify-end gap-3 shrink-0">
              <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 bg-[var(--bg-overlay)] text-secondary rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => { alert('Expense submitted for approval!'); setIsAddModalOpen(false); }} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm">
                Save Expense
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Receipt className="w-7 h-7 text-emerald-600" />
            Expenses & Accounts
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage vendor payments, operational costs, and view profitability.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card border border-border text-secondary hover:bg-page px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Download className="w-4 h-4" /> Export Excel
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Record Expense
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><TrendingDown className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Monthly Expenses</p>
            <h3 className="text-2xl font-black text-primary">₹2.8L</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl"><Clock className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Pending Approvals</p>
            <h3 className="text-xl font-black text-yellow-600">₹12,500</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><TrendingUp className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Monthly Income</p>
            <h3 className="text-2xl font-black text-primary">₹14.5L</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4 border-l-4 border-emerald-500">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><DollarSign className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Profit Summary</p>
            <h3 className="text-2xl font-black text-emerald-600">₹11.7L</h3>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Top Bar: Tabs & Filters */}
        <div className="p-4 border-b border-border/50 bg-page/50 flex flex-col lg:flex-row justify-between gap-4 shrink-0">
          <div className="flex bg-[var(--bg-overlay)] p-1 rounded-xl w-full md:w-max">
            <button 
              onClick={() => setActiveTab('log')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'log' ? 'bg-card text-emerald-600 shadow-sm' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
            >
              <Receipt className="w-4 h-4" /> Expense Log
            </button>
            <button 
              onClick={() => setActiveTab('approvals')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'approvals' ? 'bg-card text-emerald-600 shadow-sm' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
            >
              <CheckCircle2 className="w-4 h-4" /> Approvals <span className="bg-yellow-500 text-white px-1.5 py-0.5 rounded-full text-[10px]">1</span>
            </button>
            <button 
              onClick={() => setActiveTab('reports')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'reports' ? 'bg-card text-emerald-600 shadow-sm' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
            >
              <PieChart className="w-4 h-4" /> Reports
            </button>
          </div>
          
          {(activeTab === 'log' || activeTab === 'approvals') && (
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search vendor or category..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-card"
                />
              </div>
              <button className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl w-full sm:w-auto cursor-pointer hover:bg-page font-bold text-secondary text-sm">
                <Filter className="w-4 h-4" /> Filter
              </button>
            </div>
          )}
        </div>

        {/* Content Body */}
        {activeTab === 'log' || activeTab === 'approvals' ? (
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-page border-b border-border/50 text-[var(--text-disabled)] text-xs uppercase tracking-wider font-bold">
                  <th className="p-4">Category & Date</th>
                  <th className="p-4">Vendor / Payee</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Method & PG</th>
                  <th className="p-4">Bill</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredExpenses.map((record) => {
                  const Icon = CATEGORIES[record.category] || FileWarning;
                  return (
                    <tr key={record.id} className="hover:bg-page/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[var(--bg-overlay)] text-secondary flex items-center justify-center border border-border shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-primary text-sm">{record.category}</span>
                            <span className="text-xs font-semibold text-[var(--text-disabled)]">{record.date}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-primary text-sm">{record.vendor}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-black text-primary text-lg flex items-center">
                          ₹{record.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-secondary bg-[var(--bg-overlay)] px-2 py-1 rounded-md w-max">{record.method}</span>
                          <span className="text-xs text-[var(--text-disabled)] font-semibold">{record.pg}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {record.attachment ? (
                          <button className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100 hover:bg-blue-100 transition-colors">
                            <Paperclip className="w-3.5 h-3.5" /> View Bill
                          </button>
                        ) : (
                          <span className="text-xs font-semibold text-gray-400 italic">No bill</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center">
                          {getStatusBadge(record.status)}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {record.status === 'Pending Approval' ? (
                          <div className="flex justify-center gap-1">
                            <button className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg tooltip-trigger" title="Approve">
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg tooltip-trigger" title="Cancel/Reject">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-[var(--bg-overlay)] rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {filteredExpenses.length === 0 && (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <Receipt className="w-12 h-12 text-gray-200 mb-4" />
                <h3 className="text-lg font-bold text-primary mb-1">No expenses found</h3>
                <p className="text-[var(--text-disabled)] text-sm">No records match your search criteria.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-page/30">
            <PieChart className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">Financial Reports Engine</h3>
            <p className="text-[var(--text-disabled)] max-w-md">Interactive graphs for Daily/Monthly expenses, Category-wise breakdown, Vendor-wise spend, and Income vs Expense Profit Summaries will render here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
