'use client';

import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  AlertTriangle,
  TrendingDown,
  CalendarDays,
  X,
  CheckCircle2,
  ListFilter
} from 'lucide-react';

interface WastageRecord {
  id: string;
  date: string;
  meal: string;
  item: string;
  quantity: number;
  unit: string;
  reason: string;
  remarks: string;
}

const MOCK_WASTAGE: WastageRecord[] = [
  { id: '1', date: '04 Oct 2026', meal: 'Lunch', item: 'Rice', quantity: 2, unit: 'kg', reason: 'Overproduction', remarks: 'A batch of students were away on a trip' },
  { id: '2', date: '03 Oct 2026', meal: 'Dinner', item: 'Dal', quantity: 1.5, unit: 'Liters', reason: 'Spoilage', remarks: 'Left out in the heat for too long' },
  { id: '3', date: '03 Oct 2026', meal: 'Breakfast', item: 'Bread', quantity: 10, unit: 'Pieces', reason: 'Burnt', remarks: 'Toaster malfunction' },
  { id: '4', date: '02 Oct 2026', meal: 'Any', item: 'Milk', quantity: 1, unit: 'Liters', reason: 'Expired', remarks: 'Packets found expired in fridge back' }
];

const MEALS = ['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Any / Raw Item'];
const UNITS = ['kg', 'Liters', 'Pieces', 'Packets', 'Grams'];
const REASONS = ['Overproduction', 'Spoilage', 'Burnt', 'Expired', 'Dropped/Damaged', 'Student Rejection', 'Other'];

export default function FoodWastagePage() {
  const [records, setRecords] = useState<WastageRecord[]>(MOCK_WASTAGE);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    meal: MEALS[0],
    item: '',
    quantity: '',
    unit: UNITS[0],
    reason: REASONS[0],
    remarks: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: WastageRecord = {
      id: Math.random().toString(),
      date: new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(formData.date as string)),
      meal: formData.meal as string,
      item: formData.item as string,
      quantity: parseFloat(formData.quantity as string) || 0,
      unit: formData.unit as string,
      reason: formData.reason as string,
      remarks: formData.remarks as string
    };
    
    setRecords([newRecord, ...records]);
    setShowForm(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      meal: MEALS[0],
      item: '',
      quantity: '',
      unit: UNITS[0],
      reason: REASONS[0],
      remarks: ''
    });
  };

  return (
    <div className="w-full space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-danger/10 rounded-xl">
            <Trash2 className="w-6 h-6 text-danger" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Food Wastage Log</h1>
            <p className="text-sm text-secondary">Record and track food wastage for cost control</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> Log Wastage
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Today's Wastage</p>
            <h3 className="text-2xl font-black text-danger">3.5 <span className="text-sm font-medium text-secondary">Units</span></h3>
          </div>
          <div className="p-3 bg-danger/10 rounded-full text-danger">
            <TrendingDown className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Most Wasted Meal</p>
            <h3 className="text-lg font-bold text-primary">Lunch</h3>
          </div>
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Top Reason</p>
            <h3 className="text-lg font-bold text-primary">Overproduction</h3>
          </div>
          <div className="p-3 bg-warning/10 rounded-full text-warning">
            <ListFilter className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Wastage Logs Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border bg-page/30">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            Recent Wastage Logs
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-page/50 border-b border-border text-secondary font-semibold">
              <tr>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Meal</th>
                <th className="px-5 py-4">Item & Quantity</th>
                <th className="px-5 py-4">Reason</th>
                <th className="px-5 py-4 w-full">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-primary">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-page/30 transition-colors">
                  <td className="px-5 py-4 font-medium">{record.date}</td>
                  <td className="px-5 py-4">
                    <span className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-md text-xs font-bold">
                      {record.meal}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-bold">{record.item}</div>
                    <div className="text-xs text-danger font-medium mt-0.5">{record.quantity} {record.unit}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold border
                      ${record.reason === 'Overproduction' ? 'bg-orange-100 text-orange-700 border-orange-200' : 
                        record.reason === 'Spoilage' || record.reason === 'Expired' ? 'bg-red-100 text-red-700 border-red-200' :
                        'bg-page border-border text-secondary'}
                    `}>
                      {record.reason}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-secondary whitespace-normal min-w-[200px]">
                    {record.remarks || '-'}
                  </td>
                </tr>
              ))}
              
              {records.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-secondary">
                    No wastage records found. Great job!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Wastage Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-5 border-b border-border bg-page/50">
              <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-danger" /> Log Food Wastage
              </h2>
              <button 
                onClick={() => setShowForm(false)}
                className="p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-page transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-primary">Date</label>
                  <input 
                    type="date" 
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-primary">Meal</label>
                  <select 
                    name="meal"
                    value={formData.meal}
                    onChange={handleInputChange}
                    className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary"
                  >
                    {MEALS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-primary">Food Item</label>
                <input 
                  type="text" 
                  name="item"
                  required
                  placeholder="e.g. Rice, Dal, Milk, Bread"
                  value={formData.item}
                  onChange={handleInputChange}
                  className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary placeholder:text-secondary/50" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-primary">Quantity</label>
                  <input 
                    type="number" 
                    name="quantity"
                    required
                    step="0.1"
                    min="0"
                    placeholder="0"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary placeholder:text-secondary/50" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-primary">Unit</label>
                  <select 
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary"
                  >
                    {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-primary">Reason for Wastage</label>
                <select 
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary"
                >
                  {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-primary">Remarks (Optional)</label>
                <textarea 
                  name="remarks"
                  rows={2}
                  placeholder="Any additional details..."
                  value={formData.remarks}
                  onChange={handleInputChange}
                  className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary resize-none placeholder:text-secondary/50" 
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-page border border-border hover:bg-secondary/10 text-primary font-bold py-2.5 rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
