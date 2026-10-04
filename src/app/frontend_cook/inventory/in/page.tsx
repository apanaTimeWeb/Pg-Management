'use client';

import React, { useState } from 'react';
import { 
  PackagePlus, 
  CheckCircle2, 
  Clock, 
  Receipt,
  Truck,
  ChevronRight,
  Info,
  X
} from 'lucide-react';

interface StockInRecord {
  id: string;
  date: string;
  item: string;
  quantity: number;
  unit: string;
  supplier: string;
  invoice: string;
  status: 'Pending Manager Approval' | 'Added to Inventory';
}

const MOCK_STOCK_IN: StockInRecord[] = [
  { id: '1', date: '04 Oct 2026', item: 'Basmati Rice', quantity: 50, unit: 'kg', supplier: 'Mandi Traders', invoice: 'INV-4029', status: 'Pending Manager Approval' },
  { id: '2', date: '03 Oct 2026', item: 'Sunflower Oil', quantity: 15, unit: 'Liters', supplier: 'Fresh Mart', invoice: 'INV-4010', status: 'Added to Inventory' },
  { id: '3', date: '01 Oct 2026', item: 'Wheat Flour (Atta)', quantity: 30, unit: 'kg', supplier: 'Mandi Traders', invoice: 'INV-3988', status: 'Added to Inventory' }
];

export default function StockInPage() {
  const [records, setRecords] = useState<StockInRecord[]>(MOCK_STOCK_IN);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    item: '',
    quantity: '',
    unit: 'kg',
    supplier: '',
    invoice: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: StockInRecord = {
      id: Math.random().toString(),
      date: new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(formData.date as string)),
      item: formData.item,
      quantity: parseFloat(formData.quantity) || 0,
      unit: formData.unit,
      supplier: formData.supplier,
      invoice: formData.invoice || 'N/A',
      status: 'Pending Manager Approval'
    };
    
    setRecords([newRecord, ...records]);
    setShowForm(false);
    setFormData({ ...formData, item: '', quantity: '', supplier: '', invoice: '' });
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
            <PackagePlus className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Stock In (Deliveries)</h1>
            <p className="text-sm text-secondary">Record incoming raw materials and vendor deliveries</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm flex items-center gap-2"
        >
          <PackagePlus className="w-4 h-4" /> Record New Delivery
        </button>
      </div>

      {/* Flow Visualizer & Note */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex items-center justify-center gap-3 text-xs font-bold text-secondary">
          <div className="flex items-center gap-1.5"><Truck className="w-4 h-4" /> Delivery</div>
          <ChevronRight className="w-4 h-4 text-border" />
          <div className="flex items-center gap-1.5 text-green-600"><PackagePlus className="w-4 h-4" /> Stock In Log</div>
          <ChevronRight className="w-4 h-4 text-border" />
          <div className="flex items-center gap-1.5 text-primary"><CheckCircle2 className="w-4 h-4" /> Inventory Updated</div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-4 shadow-sm flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 dark:text-blue-300 font-medium leading-relaxed">
            <strong>Note:</strong> You can record deliveries here. However, formal purchase approval and financial processing are managed by the Owner/Manager.
          </p>
        </div>
      </div>

      {/* Stock In Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-page/50 border-b border-border text-secondary font-semibold">
              <tr>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Item Received</th>
                <th className="px-5 py-4">Supplier</th>
                <th className="px-5 py-4">Invoice / Bill</th>
                <th className="px-5 py-4">Approval Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-primary">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-page/30 transition-colors">
                  <td className="px-5 py-4 font-medium">{record.date}</td>
                  <td className="px-5 py-4">
                    <div className="font-bold">{record.item}</div>
                    <div className="text-xs text-green-600 font-bold mt-0.5">+ {record.quantity} {record.unit}</div>
                  </td>
                  <td className="px-5 py-4 font-medium text-secondary">{record.supplier}</td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-primary bg-page border border-border px-2 py-1 rounded-md w-fit">
                      <Receipt className="w-3 h-3" /> {record.invoice}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md border w-fit
                      ${record.status === 'Added to Inventory' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}
                    `}>
                      {record.status === 'Added to Inventory' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {record.status}
                    </span>
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
              <h2 className="text-xl font-bold text-primary">Log New Delivery</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-page transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-primary">Delivery Date</label>
                <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-primary">Item Name</label>
                <input type="text" name="item" required placeholder="e.g. Basmati Rice" value={formData.item} onChange={handleInputChange} className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-primary">Quantity Received</label>
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
                <label className="text-sm font-semibold text-primary">Supplier Name</label>
                <input type="text" name="supplier" required placeholder="e.g. Fresh Mart" value={formData.supplier} onChange={handleInputChange} className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary" />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-primary">Invoice/Bill Number (Optional)</label>
                <input type="text" name="invoice" placeholder="e.g. INV-1002" value={formData.invoice} onChange={handleInputChange} className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary" />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-page border border-border text-primary font-bold py-2.5 rounded-lg text-sm transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-sm">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
