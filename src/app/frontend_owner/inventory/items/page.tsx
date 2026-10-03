'use client';

import React, { useState } from 'react';
import { 
  Package, Plus, AlertCircle, ArrowDownToLine, 
  ArrowUpFromLine, RefreshCw, XOctagon, Search, 
  Filter, CheckCircle2, Bed, Tv, Sofa, Box,
  Utensils, ChefHat, Key, ShieldAlert, FileText,
  DollarSign, MapPin, Truck
} from 'lucide-react';

const MOCK_INVENTORY = [
  { id: 1, name: 'Beds (Single)', category: 'Furniture', group: 'PG', qty: 120, unit: 'pcs', cost: 4500, supplier: 'Metro Furniture', status: 'Good' },
  { id: 2, name: 'Rice (Basmati)', category: 'Food Items', group: 'Kitchen', qty: 25, unit: 'kg', cost: 85, supplier: 'Local Grocer', status: 'Low Stock' },
  { id: 3, name: 'Commercial Gas Cylinder', category: 'Gas', group: 'Kitchen', qty: 4, unit: 'cylinders', cost: 1800, supplier: 'Indane Gas', status: 'Good' },
  { id: 4, name: 'LED Tube Lights', category: 'Electronics', group: 'PG', qty: 8, unit: 'pcs', cost: 250, supplier: 'Philips Dist.', status: 'Low Stock' },
  { id: 5, name: 'Floor Cleaner (Phenyl)', category: 'Cleaning Items', group: 'PG', qty: 50, unit: 'litres', cost: 60, supplier: 'CleanCo', status: 'Good' },
  { id: 6, name: 'Room Keys (Duplicate)', category: 'Room Items', group: 'PG', qty: 15, unit: 'pairs', cost: 100, supplier: 'Local Locksmith', status: 'Good' },
  { id: 7, name: 'Mattresses (Foam)', category: 'Room Items', group: 'PG', qty: 115, unit: 'pcs', cost: 2000, supplier: 'SleepWell', status: 'Good' },
  { id: 8, name: 'Kitchen Plates', category: 'Kitchen Items', group: 'Kitchen', qty: 200, unit: 'pcs', cost: 120, supplier: 'Steel Bazar', status: 'Good' },
  { id: 9, name: 'Office Printer Ink', category: 'Stationery', group: 'PG', qty: 1, unit: 'bottles', cost: 850, supplier: 'HP Store', status: 'Low Stock' },
];

const ROOM_HANDOVER = [
  { room: '101', student: 'Aman Singh', status: 'Complete', items: ['Bed', 'Mattress', 'Chair', 'Table', 'Fan', 'Cupboard', 'Curtain', 'Key'] },
  { room: '102', student: 'Rahul Kumar', status: 'Pending', items: ['Bed', 'Mattress', 'Fan', 'Cupboard', 'Key'] }, // Missing chair, table, curtain
  { room: '205', student: 'Vikram Patel', status: 'Complete', items: ['Bed', 'Mattress', 'Chair', 'Table', 'Fan', 'Cupboard', 'Curtain', 'Key'] },
];

export default function InventoryItemsPage() {
  const [activeTab, setActiveTab] = useState<'master' | 'handover'>('master');
  const [search, setSearch] = useState('');
  
  const filteredStock = MOCK_INVENTORY.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="w-7 h-7 text-[#F5A623]" />
            Inventory & Stock Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage PG assets, Kitchen stock, and Student Room handovers.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <ArrowDownToLine className="w-4 h-4" /> Stock In/Out
          </button>
          <button className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#e09612] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Box className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total Items</p>
            <h3 className="text-2xl font-black text-gray-800">485</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><ShieldAlert className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Low Stock</p>
            <h3 className="text-2xl font-black text-red-600">12</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><XOctagon className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Damaged/Lost</p>
            <h3 className="text-2xl font-black text-orange-600">5</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><DollarSign className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Stock Value</p>
            <h3 className="text-xl font-black text-gray-800">₹4.2L</h3>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          <button 
            onClick={() => setActiveTab('master')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold transition-colors ${activeTab === 'master' ? 'bg-white text-[#F5A623] border-b-2 border-[#F5A623]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Box className="w-4 h-4" /> Master Stock List
          </button>
          <button 
            onClick={() => setActiveTab('handover')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold transition-colors ${activeTab === 'handover' ? 'bg-white text-[#F5A623] border-b-2 border-[#F5A623]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Key className="w-4 h-4" /> Student Room Handover
          </button>
        </div>

        {activeTab === 'master' && (
          <div className="p-5 animate-in fade-in">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search furniture, electronics, food..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] bg-gray-50"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-100">
                  <Filter className="w-4 h-4" /> Filter Category
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-bold">
                    <th className="p-4">Item Name & Category</th>
                    <th className="p-4">Group</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Cost/Unit</th>
                    <th className="p-4">Supplier</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStock.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800">{item.name}</span>
                          <span className="text-xs font-semibold text-gray-500">{item.category}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg ${item.group === 'Kitchen' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                          {item.group}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-black text-gray-800 text-lg">{item.qty}</span>
                        <span className="text-xs text-gray-500 font-bold ml-1">{item.unit}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-bold text-gray-700">₹{item.cost}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                          <Truck className="w-3.5 h-3.5 text-gray-400" /> {item.supplier}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {item.status === 'Good' ? (
                          <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-green-100 text-green-700 border border-green-200">In Stock</span>
                        ) : (
                          <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-red-100 text-red-700 border border-red-200 flex items-center gap-1 w-max mx-auto"><AlertCircle className="w-3 h-3"/> Low Stock</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-1">
                          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg tooltip-trigger" title="Stock In">
                            <ArrowDownToLine className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg tooltip-trigger" title="Stock Out">
                            <ArrowUpFromLine className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg tooltip-trigger" title="Report Damage/Loss">
                            <XOctagon className="w-4 h-4" />
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

        {activeTab === 'handover' && (
          <div className="p-5 animate-in fade-in">
            <div className="mb-6 bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-blue-800 text-sm">Check-in / Check-out Integration</h4>
                <p className="text-xs text-blue-600 mt-1">This section is automatically linked to the Admission module. When a student checks in, they must acknowledge the receipt of standard room inventory. Missing items at check-out will automatically map to security deposit deductions.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ROOM_HANDOVER.map((room, idx) => (
                <div key={idx} className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow bg-white relative">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-black text-gray-800">
                        {room.room}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm">{room.student}</h3>
                        <span className="text-xs text-gray-500">Room Handover Status</span>
                      </div>
                    </div>
                    {room.status === 'Complete' ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 border border-green-200">
                        <CheckCircle2 className="w-3 h-3" /> Signed
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 border border-yellow-200">
                        <AlertCircle className="w-3 h-3" /> Pending
                      </span>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Inventory Checked</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {['Bed', 'Mattress', 'Chair', 'Table', 'Fan', 'Cupboard', 'Curtain', 'Key'].map(item => (
                        <span 
                          key={item} 
                          className={`text-[10px] px-2 py-1 rounded-md font-bold border ${room.items.includes(item) ? 'bg-white border-green-200 text-green-700' : 'bg-red-50 border-red-100 text-red-500'}`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-bold rounded-xl transition-colors border border-gray-200">
                      View Digital Signature
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
