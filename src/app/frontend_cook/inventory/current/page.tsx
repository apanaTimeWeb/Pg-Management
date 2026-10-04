'use client';

import React, { useState } from 'react';
import { 
  Package,
  AlertTriangle,
  CheckCircle2,
  PackageX,
  Clock,
  Filter,
  Search,
  MoreVertical,
  Edit
} from 'lucide-react';

type ItemCategory = 'Rice' | 'Dal' | 'Flour' | 'Vegetables' | 'Fruits' | 'Milk' | 'Oil' | 'Spices' | 'Tea/Coffee' | 'Sugar' | 'Gas' | 'Cleaning Supplies' | 'Utensils' | 'Other' | 'All';
type StockStatus = 'Available' | 'Low Stock' | 'Out of Stock' | 'Expired';

interface InventoryItem {
  id: string;
  name: string;
  category: ItemCategory;
  currentQuantity: number;
  minimumStock: number;
  unit: string;
  status: StockStatus;
  lastUpdated: string;
}

const MOCK_INVENTORY: InventoryItem[] = [
  { id: '1', name: 'Basmati Rice', category: 'Rice', currentQuantity: 120, minimumStock: 50, unit: 'kg', status: 'Available', lastUpdated: 'Today, 08:30 AM' },
  { id: '2', name: 'Sunflower Oil', category: 'Oil', currentQuantity: 15, minimumStock: 20, unit: 'Liters', status: 'Low Stock', lastUpdated: 'Yesterday' },
  { id: '3', name: 'Toor Dal', category: 'Dal', currentQuantity: 0, minimumStock: 10, unit: 'kg', status: 'Out of Stock', lastUpdated: 'Today, 07:00 AM' },
  { id: '4', name: 'Wheat Flour (Atta)', category: 'Flour', currentQuantity: 45, minimumStock: 30, unit: 'kg', status: 'Available', lastUpdated: '02 Oct 2026' },
  { id: '5', name: 'Milk Packets', category: 'Milk', currentQuantity: 2, minimumStock: 10, unit: 'Liters', status: 'Expired', lastUpdated: 'Today, 06:00 AM' },
  { id: '6', name: 'Commercial Gas Cylinder', category: 'Gas', currentQuantity: 1, minimumStock: 2, unit: 'Cylinders', status: 'Low Stock', lastUpdated: '28 Sep 2026' },
  { id: '7', name: 'Onions', category: 'Vegetables', currentQuantity: 25, minimumStock: 15, unit: 'kg', status: 'Available', lastUpdated: 'Today, 09:15 AM' },
  { id: '8', name: 'Turmeric Powder', category: 'Spices', currentQuantity: 3, minimumStock: 1, unit: 'kg', status: 'Available', lastUpdated: '15 Sep 2026' },
];

const CATEGORIES: ItemCategory[] = [
  'All', 'Rice', 'Dal', 'Flour', 'Vegetables', 'Fruits', 'Milk', 'Oil', 'Spices', 
  'Tea/Coffee', 'Sugar', 'Gas', 'Cleaning Supplies', 'Utensils', 'Other'
];

const getStatusStyle = (status: StockStatus) => {
  switch (status) {
    case 'Available': return { color: 'text-green-700', bg: 'bg-green-100', border: 'border-green-200', icon: CheckCircle2 };
    case 'Low Stock': return { color: 'text-orange-700', bg: 'bg-orange-100', border: 'border-orange-200', icon: AlertTriangle };
    case 'Out of Stock': return { color: 'text-red-700', bg: 'bg-red-100', border: 'border-red-200', icon: PackageX };
    case 'Expired': return { color: 'text-gray-700', bg: 'bg-gray-200', border: 'border-gray-300', icon: Clock };
  }
};

export default function CurrentInventoryPage() {
  const [activeCategory, setActiveCategory] = useState<ItemCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = MOCK_INVENTORY.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const lowStockCount = MOCK_INVENTORY.filter(i => i.status === 'Low Stock').length;
  const outOfStockCount = MOCK_INVENTORY.filter(i => i.status === 'Out of Stock').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Package className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Kitchen Inventory</h1>
            <p className="text-sm text-secondary">Real-time tracking of raw materials and supplies</p>
          </div>
        </div>
      </div>

      {/* Summary Alerts */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {outOfStockCount > 0 && (
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600">
                  <PackageX className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-red-800 dark:text-red-300">Out of Stock Alert</h3>
                  <p className="text-xs text-red-600/80 dark:text-red-400 font-medium">{outOfStockCount} items completely depleted</p>
                </div>
              </div>
            </div>
          )}
          {lowStockCount > 0 && (
            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-600">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-orange-800 dark:text-orange-300">Low Stock Warning</h3>
                  <p className="text-xs text-orange-600/80 dark:text-orange-400 font-medium">{lowStockCount} items below minimum threshold</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col md:flex-row overflow-hidden min-h-[600px]">
        
        {/* Sidebar: Categories */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border bg-page/30 flex flex-col h-auto md:h-full shrink-0">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            <span className="font-bold text-primary">Categories</span>
          </div>
          <div className="p-2 overflow-y-auto flex-1 flex md:flex-col gap-1 overflow-x-auto">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all shrink-0 whitespace-nowrap md:whitespace-normal
                  ${activeCategory === category 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-secondary hover:bg-page hover:text-primary'}
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Toolbar */}
          <div className="p-4 border-b border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-secondary" />
              </div>
              <input 
                type="text" 
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-page border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary text-primary transition-colors"
              />
            </div>
            
            <div className="text-sm font-bold text-primary">
              Showing {filteredItems.length} Items
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-page/50 border-b border-border text-secondary font-semibold sticky top-0 backdrop-blur-sm z-10">
                <tr>
                  <th className="px-5 py-4">Item Name</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Current Stock</th>
                  <th className="px-5 py-4">Min. Required</th>
                  <th className="px-5 py-4">Last Updated</th>
                  <th className="px-5 py-4 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-primary">
                {filteredItems.map((item) => {
                  const style = getStatusStyle(item.status);
                  const Icon = style.icon;
                  const isCritical = item.status === 'Out of Stock' || item.status === 'Expired';
                  const isWarning = item.status === 'Low Stock';
                  
                  return (
                    <tr key={item.id} className="hover:bg-page/30 transition-colors group">
                      <td className="px-5 py-4">
                        <div className="font-bold text-base">{item.name}</div>
                        <div className="text-xs font-medium text-secondary mt-0.5">{item.category}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${style.bg} ${style.color} ${style.border}`}>
                          <Icon className="w-3.5 h-3.5" />
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className={`text-lg font-black ${isCritical ? 'text-red-600' : isWarning ? 'text-orange-500' : 'text-primary'}`}>
                          {item.currentQuantity} <span className="text-xs font-semibold text-secondary ml-0.5">{item.unit}</span>
                        </div>
                        {isWarning && (
                          <div className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mt-0.5">Below Min Threshold</div>
                        )}
                      </td>
                      <td className="px-5 py-4 font-semibold text-secondary">
                        {item.minimumStock} {item.unit}
                      </td>
                      <td className="px-5 py-4 text-xs font-medium text-secondary">
                        {item.lastUpdated}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button title="Update Stock" className="p-1.5 bg-page border border-border text-primary hover:bg-primary/10 hover:border-primary/30 hover:text-primary rounded-md transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {filteredItems.length === 0 && (
              <div className="flex flex-col items-center justify-center p-12 text-center h-full">
                <PackageX className="w-12 h-12 text-secondary/30 mb-4" />
                <h3 className="text-lg font-medium text-primary">No Items Found</h3>
                <p className="text-sm text-secondary mt-1">Try selecting a different category or change your search query.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
