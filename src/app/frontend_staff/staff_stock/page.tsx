'use client';

import React from 'react';
import { 
  Bell, Home, User, CheckSquare, Wrench, Package, Utensils
} from 'lucide-react';

export default function StockInventoryPage() {
  
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-xl text-slate-100">
              <Package className="w-6 h-6"/>
            </div>
            Stock & Inventory
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage stock & inventory at Smart PG.</p>
        </div>
      </div>

      {/* Content View */}
      <div className="bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden p-6">
        
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-primary">Low Inventory Items</h3>
             <button className="text-sm text-blue-600 font-bold hover:underline">Request Stock</button>
          </div>
          {[
            { item: 'Rice (Basmati)', qty: '5 KG left', status: 'Critical' },
            { item: 'Broom/Mops', qty: '2 units left', status: 'Low' }
          ].map((stock, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-lg"><Package className="w-5 h-5 text-red-600"/></div>
                <div>
                  <p className="font-bold text-red-900 text-sm">{stock.item}</p>
                  <p className="text-xs text-red-700 mt-0.5">{stock.qty}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-red-700 bg-red-200 px-2 py-0.5 rounded uppercase">{stock.status}</span>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
