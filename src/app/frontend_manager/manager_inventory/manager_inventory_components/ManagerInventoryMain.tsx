// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  Package, Search, Filter, Plus, ArrowDownToLine, ArrowUpFromLine, 
  AlertTriangle, ShieldAlert, ShoppingCart, ListTodo, Wrench, 
  Utensils, Bed, Sparkles, Box, CheckCircle2, X
} from 'lucide-react';

import { useManagerPropertyContext } from '@/app/frontend_manager/manager_components/ManagerPropertyContext';
import { useManagerInventory } from '../manager_inventory_hooks/useManagerInventory';
import type { ManagerInventoryItem } from '../manager_inventory_types/ManagerInventory.types';

export default function ManagerInventoryMain() {
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  const userId = 'manager-1'; // Mock user id
  
  const {
    inventory, activeTab, setActiveTab, 
    handleUpdateQty
  } = useManagerInventory(selectedPropertyId, ctxLoading, userId);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [stockOutModalOpen, setStockOutModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ManagerInventoryItem | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Room Items': return <Bed className="w-4 h-4" />;
      case 'Cleaning': return <Sparkles className="w-4 h-4" />;
      case 'Kitchen': return <Utensils className="w-4 h-4" />;
      case 'Food': return <Package className="w-4 h-4" />;
      case 'Maintenance': return <Wrench className="w-4 h-4" />;
      case 'Stationery': return <ListTodo className="w-4 h-4" />;
      default: return <Box className="w-4 h-4" />;
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleOpenRequest = (item?: ManagerInventoryItem) => {
    if(item) setSelectedItem(item);
    else setSelectedItem(null);
    setRequestModalOpen(true);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 w-full h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <Package className="w-6 h-6"/>
            </div>
            Inventory Management
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Monitor operational stock and manage purchase requests.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleOpenRequest()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all"
          >
            <ShoppingCart className="w-4 h-4" /> Request New Stock
          </button>
        </div>
      </div>

      <div className="bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
        
        {/* Top Navigation */}
        <div className="flex items-center gap-1 p-2 border-b border-border/50 bg-page/30 shrink-0 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('stock')}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'stock' ? 'bg-card text-indigo-600 shadow-sm border border-border/50' : 'text-secondary hover:bg-page hover:text-primary'}`}
          >
            Current Stock
          </button>
          <button 
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'transactions' ? 'bg-card text-indigo-600 shadow-sm border border-border/50' : 'text-secondary hover:bg-page hover:text-primary'}`}
          >
            Stock In / Out
          </button>
          <button 
            onClick={() => setActiveTab('damaged')}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'damaged' ? 'bg-card text-indigo-600 shadow-sm border border-border/50' : 'text-secondary hover:bg-page hover:text-primary'}`}
          >
            Damage & Lost
          </button>
          <button 
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'requests' ? 'bg-card text-indigo-600 shadow-sm border border-border/50' : 'text-secondary hover:bg-page hover:text-primary'}`}
          >
            Purchase Requests
          </button>
        </div>

        {/* Filters Area (Only for Current Stock) */}
        {activeTab === 'stock' && (
          <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card shrink-0">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar flex-1">
              {['All', 'Room Items', 'Cleaning', 'Kitchen', 'Food', 'Maintenance', 'Stationery'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as InventoryCategory)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    selectedCategory === cat 
                      ? 'bg-indigo-600 text-white border-indigo-600' 
                      : 'bg-page text-secondary border-border/60 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input 
                type="text" 
                placeholder="Search items..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50/30">
          {activeTab === 'stock' && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-card border-b border-border/50 sticky top-0">
                  <th className="py-3 px-6 text-xs font-black text-secondary uppercase tracking-wider">Item Name</th>
                  <th className="py-3 px-6 text-xs font-black text-secondary uppercase tracking-wider">Category</th>
                  <th className="py-3 px-6 text-xs font-black text-secondary uppercase tracking-wider">Stock Level</th>
                  <th className="py-3 px-6 text-xs font-black text-secondary uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs font-black text-secondary uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm bg-card">
                {filteredInventory.map(item => {
                  const isLow = item.quantity <= (item.threshold || 0);
                  return (
                    <tr key={item.id} className="border-b border-border/30 hover:bg-page/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-primary">{item.name}</div>
                        <div className="text-xs text-secondary mt-0.5">ID: {item.id}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-page border border-border/60 rounded-md text-xs font-bold text-secondary">
                          {getCategoryIcon(item.category)} {item.category}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-end gap-1">
                          <span className={`text-xl font-black ${isLow ? 'text-red-600' : 'text-primary'}`}>
                            {item.quantity}
                          </span>
                          <span className="text-xs font-bold text-secondary mb-1">{item.unit}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {isLow ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-700 border border-red-200 rounded-md text-xs font-bold">
                            <AlertTriangle className="w-3.5 h-3.5" /> Low Stock
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 border border-green-200 rounded-md text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Adequate
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            className="p-1.5 text-secondary hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200"
                            title="Stock In"
                          >
                            <ArrowDownToLine className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => { setSelectedItem(item); setStockOutModalOpen(true); }}
                            className="p-1.5 text-secondary hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors border border-transparent hover:border-orange-200"
                            title="Stock Out / Consume"
                          >
                            <ArrowUpFromLine className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-1.5 text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                            title="Report Damaged / Lost"
                          >
                            <AlertTriangle className="w-4 h-4" />
                          </button>
                          {isLow && (
                            <button 
                              onClick={() => handleOpenRequest(item)}
                              className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-bold ml-2 transition-colors"
                            >
                              Request Purchase
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {activeTab !== 'stock' && (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-card">
              <div className="w-16 h-16 bg-page rounded-full flex items-center justify-center border border-border shadow-sm mb-4">
                <Box className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-primary">Data View Placeholder</h3>
              <p className="text-sm text-secondary mt-1 max-w-sm">
                Tabular data for {activeTab === 'transactions' ? 'Stock In/Out history' : activeTab === 'damaged' ? 'Damaged and Lost items' : 'Purchase Requests status'} will be listed here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stock Out Modal */}
      {stockOutModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
              <h3 className="font-black text-primary">Stock Out / Consumption</h3>
              <button onClick={() => setStockOutModalOpen(false)} className="text-secondary hover:text-red-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm font-bold text-secondary">Item</p>
                <p className="font-bold text-primary">{selectedItem.name}</p>
                <p className="text-xs text-secondary mt-1">Available: {selectedItem.quantity} {selectedItem.unit}</p>
              </div>
              <div>
                <label className="text-sm font-bold text-secondary">Quantity to consume</label>
                <input type="number" min="1" max={selectedItem.quantity} defaultValue="1" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="text-sm font-bold text-secondary">Reason / Assigned to</label>
                <input type="text" placeholder="e.g. For Room 102 cleaning" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
            </div>
            <div className="p-4 border-t border-border/50 flex justify-end gap-3">
              <button onClick={() => setStockOutModalOpen(false)} className="px-4 py-2 font-bold text-secondary">Cancel</button>
              <button onClick={() => setStockOutModalOpen(false)} className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">Confirm Stock Out</button>
            </div>
          </div>
        </div>
      )}

      {/* Request Purchase Modal */}
      {requestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border/50 flex items-center justify-between bg-page/50">
              <h3 className="font-black text-primary flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-indigo-600" /> Purchase Request
              </h3>
              <button onClick={() => setRequestModalOpen(false)} className="text-secondary hover:text-red-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-purple-900 text-sm">Owner Approval Flow</h4>
                  <p className="text-xs text-purple-700 mt-1">As a manager, your purchase request will be sent to the Owner for approval. You cannot directly authorize purchases.</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-secondary">Item Name</label>
                <input 
                  type="text" 
                  defaultValue={selectedItem?.name || ''} 
                  placeholder="What needs to be purchased?" 
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-secondary">Quantity Required</label>
                  <input type="number" min="1" defaultValue="1" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-sm font-bold text-secondary">Estimated Cost (₹)</label>
                  <input type="number" min="0" placeholder="Optional" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-bold text-secondary">Notes / Reason</label>
                <textarea rows={2} placeholder="Why is this required?" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500 resize-none"></textarea>
              </div>

            </div>

            <div className="p-4 border-t border-border/50 flex justify-end gap-3 bg-page/30">
              <button onClick={() => setRequestModalOpen(false)} className="px-5 py-2.5 font-bold text-secondary hover:text-primary transition-colors">Cancel</button>
              <button onClick={() => setRequestModalOpen(false)} className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2">
                Send to Owner
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}