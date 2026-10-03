'use client';

import React from 'react';
import { 
  IndianRupee, Bell, Home, User, CheckCircle2, Download
} from 'lucide-react';

export default function RentFinancePage() {
  
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <IndianRupee className="w-6 h-6"/>
            </div>
            Rent & Finance
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Monitor your ward's rent & finance at Smart PG.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card border border-border text-primary hover:bg-page px-5 py-2.5 rounded-xl text-sm font-bold transition-all">
            <Download className="w-4 h-4" /> Download Report
          </button>
        </div>
      </div>

      {/* Content View */}
      <div className="bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden p-6">
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-sm font-bold text-green-100 uppercase tracking-wide">Pending Dues</p>
            <h2 className="text-4xl font-black mt-1 flex items-center">
              <IndianRupee className="w-8 h-8 mr-1" /> 0.00
            </h2>
            <p className="text-sm text-green-100 mt-2">All rent payments for the current semester are cleared.</p>
          </div>
          
          <h3 className="font-bold text-primary mt-6 mb-4">Payment History</h3>
          <div className="space-y-4">
            {[
              { month: 'October 2026', amount: '8,500', status: 'Paid', date: '01 Oct 2026' },
              { month: 'September 2026', amount: '8,500', status: 'Paid', date: '02 Sep 2026' }
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-page rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-card rounded-lg border border-border"><IndianRupee className="w-5 h-5 text-secondary"/></div>
                  <div>
                    <p className="font-bold text-primary text-sm">{p.month} Rent</p>
                    <p className="text-xs text-secondary mt-0.5">Paid on {p.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-primary">₹{p.amount}</p>
                  <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded uppercase">{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
