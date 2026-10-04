'use client';

import React, { useState } from 'react';
import { 
  PackageMinus, 
  Utensils, 
  MinusCircle,
  CalendarDays,
  ChevronRight,
  DatabaseZap,
  X
} from 'lucide-react';

interface StockOutRecord {
  id: string;
  date: string;
  item: string;
  quantity: number;
  unit: string;
  meal: string;
  purpose: string;
}

const MOCK_STOCK_OUT: StockOutRecord[] = [
  { id: '1', date: '04 Oct 2026', item: 'Rice', quantity: 5, unit: 'kg', meal: 'Lunch', purpose: 'Daily lunch prep for 50 students' },
  { id: '2', date: '04 Oct 2026', item: 'Sunflower Oil', quantity: 2, unit: 'Liters', meal: 'Lunch', purpose: 'Used for frying and dal tadka' },
  { id: '3', date: '04 Oct 2026', item: 'Bread', quantity: 15, unit: 'Packets', meal: 'Breakfast', purpose: 'Morning breakfast sandwiches' }
];

export default function StockOutPage() {
  const [records, setRecords] = useState<StockOutRecord[]>(MOCK_STOCK_OUT);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    item: '',
    quantity: '',
    unit: 'kg',
    meal: 'Lunch',
    purpose: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: StockOutRecord = {
      id: Math.random().toString(),
      date: new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(formData.date as string)),
      item: formData.item,
      quantity: parseFloat(formData.quantity) || 0,
      unit: formData.unit,
      meal: formData.meal,
      purpose: formData.purpose
    };
    
    setRecords([newRecord, ...records]);
    setShowForm(false);
    setFormData({ ...formData, item: '', quantity: '', purpose: '' });
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
            <PackageMinus className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Stock Out (Consumption)</h1>
            <p className="text-sm text-secondary">Log items taken out for food preparation</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowForm(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm flex items-center gap-2"
        >
          <MinusCircle className="w-4 h-4" /> Log Consumption
        </button>
      </div>

      {/* Flow Visualizer */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex items-center justify-center sm:justify-start overflow-x-auto">
        <div className="flex items-center gap-2 text-xs font-bold text-secondary min-w-max">
          <div className="flex items-center gap-1.5"><DatabaseZap className="w-4 h-4" /> Available Stock</div>
          <ChevronRight className="w-4 h-4 text-border" />
          <div className="flex items-center gap-1.5 text-orange-600"><Utensils className="w-4 h-4" /> Food Preparation</div>
          <ChevronRight className="w-4 h-4 text-border" />
          <div className="flex items-center gap-1.5 text-primary"><PackageMinus className="w-4 h-4" /> Stock Out Logged</div>
        </div>
      </div>

      {/* Stock Out Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-page/50 border-b border-border text-secondary font-semibold">
              <tr>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Item Used</th>
                <th className="px-5 py-4">Meal Segment</th>
                <th className="px-5 py-4 w-full">Purpose / Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-primary">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-page/30 transition-colors">
                  <td className="px-5 py-4 font-medium flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-secondary" /> {record.date}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-bold">{record.item}</div>
                    <div className="text-xs text-orange-600 font-bold mt-0.5">- {record.quantity} {record.unit}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-md text-xs font-bold">
                      {record.meal}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs font-medium text-secondary whitespace-normal min-w-[200px]">
                    {record.purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-border bg-page/50">
              <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                <MinusCircle className="w-5 h-5 text-orange-600" /> Log Consumption
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-page transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-primary">Date Used</label>
                  <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-primary">Meal</label>
                  <select name="meal" value={formData.meal} onChange={handleInputChange} className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary">
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Special Event">Special Event</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-primary">Item Name</label>
                <input type="text" name="item" required placeholder="e.g. Rice, Potatoes" value={formData.item} onChange={handleInputChange} className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-primary">Quantity Used</label>
                  <input type="number" name="quantity" required step="0.1" min="0" value={formData.quantity} onChange={handleInputChange} className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-primary">Unit</label>
                  <select name="unit" value={formData.unit} onChange={handleInputChange} className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary">
                    <option value="kg">kg</option>
                    <option value="Liters">Liters</option>
                    <option value="Pieces">Pieces</option>
                    <option value="Packets">Packets</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-primary">Purpose / Details</label>
                <textarea name="purpose" required rows={2} placeholder="e.g. Daily lunch prep for 50 students" value={formData.purpose} onChange={handleInputChange} className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary resize-none" />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-page border border-border text-primary font-bold py-2.5 rounded-lg text-sm transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-sm">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
