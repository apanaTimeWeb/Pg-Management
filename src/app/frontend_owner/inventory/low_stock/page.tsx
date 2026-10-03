'use client';

import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Eye, Edit3, Package, Layers, AlertTriangle
} from 'lucide-react';

const MOCK_INVENTORY = [
  { id: 'INV-001', item: 'Bedsheets (Single)', category: 'Linen', stock: 150, reorderLevel: 20, status: 'In Stock' },
  { id: 'INV-002', item: 'Pillows', category: 'Linen', stock: 12, reorderLevel: 15, status: 'Low Stock' },
  { id: 'INV-003', item: 'Room Keys', category: 'Hardware', stock: 5, reorderLevel: 10, status: 'Low Stock' },
  { id: 'INV-004', item: 'LED Bulbs 9W', category: 'Electrical', stock: 45, reorderLevel: 20, status: 'In Stock' },
];

export default function LowStockPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = MOCK_INVENTORY.filter(inv => {
    if (title === 'Low Stock' && inv.status !== 'Low Stock') return false;
    if (searchTerm && !inv.item.toLowerCase().includes(searchTerm.toLowerCase()) && !inv.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><Package className="w-6 h-6 text-purple-500"/> Inventory: Low Stock</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage asset and consumables stock levels.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] text-primary transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-page/30 text-[10px] uppercase tracking-wider text-secondary">
                <th className="p-4 font-bold">Item Details</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Current Stock</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredInventory.map((inv, idx) => (
                <tr key={idx} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary">{inv.item}</p>
                    <p className="text-[10px] text-[var(--text-disabled)] mt-0.5 font-mono">{inv.id}</p>
                  </td>
                  <td className="p-4 text-sm font-medium text-secondary">{inv.category}</td>
                  <td className="p-4">
                    <p className="text-lg font-black text-primary">{inv.stock} <span className="text-xs text-secondary font-medium">units</span></p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 border rounded-md text-[10px] font-bold uppercase tracking-wide ${inv.status === 'In Stock' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200"><Edit3 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInventory.length === 0 && (
                <tr><td colSpan="5" className="p-8 text-center text-secondary font-medium">No items found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
