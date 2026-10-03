const fs = require('fs');
const path = require('path');

const placeholderFiles = [
  'src/app/frontend_owner/students/pending/page.tsx',
  'src/app/frontend_owner/students/notice_period/page.tsx',
  'src/app/frontend_owner/students/checked_out/page.tsx',
  'src/app/frontend_owner/students/active/page.tsx',
  'src/app/frontend_owner/rooms_beds/occupancy/page.tsx',
  'src/app/frontend_owner/rooms_beds/maintenance/page.tsx',
  'src/app/frontend_owner/rooms_beds/beds/page.tsx',
  'src/app/frontend_owner/rooms_beds/available/page.tsx',
  'src/app/frontend_owner/mess_food/stock/page.tsx',
  'src/app/frontend_owner/mess_food/meals/page.tsx',
  'src/app/frontend_owner/inventory/stock_out/page.tsx',
  'src/app/frontend_owner/inventory/stock_in/page.tsx',
  'src/app/frontend_owner/inventory/damage_loss/page.tsx',
  'src/app/frontend_owner/inventory/low_stock/page.tsx',
  'src/app/frontend_owner/mess_food/menu/page.tsx',
  'src/app/frontend_owner/fees_payments/dues/page.tsx',
  'src/app/frontend_owner/fees_payments/payments/page.tsx',
  'src/app/frontend_owner/fees_payments/receipts/page.tsx',
  'src/app/frontend_owner/fees_payments/refunds/page.tsx',
  'src/app/frontend_owner/fees_payments/fines/page.tsx',
  'src/app/frontend_owner/mess_food/attendance/page.tsx',
  'src/app/frontend_owner/complaints_maintenance/maintenance/page.tsx',
  'src/app/frontend_owner/checkin_checkout/transfers/page.tsx',
  'src/app/frontend_owner/checkin_checkout/history/page.tsx',
  'src/app/frontend_owner/complaints_maintenance/history/page.tsx',
  'src/app/frontend_owner/checkin_checkout/checkin/page.tsx',
  'src/app/frontend_owner/checkin_checkout/checkout/page.tsx',
  'src/app/frontend_owner/complaints_maintenance/assignments/page.tsx',
  'src/app/frontend_owner/admissions/applications/page.tsx',
  'src/app/frontend_owner/admissions/verification/page.tsx',
  'src/app/frontend_owner/accounts/vendors/page.tsx',
  'src/app/frontend_owner/accounts/reports/page.tsx',
  'src/app/frontend_owner/accounts/income/page.tsx',
  'src/app/frontend_owner/admissions/rejected/page.tsx',
  'src/app/frontend_owner/admissions/approved/page.tsx'
];

const generateTemplate = (title) => `\'use client\';

import React, { useState } from 'react';
import { 
  Search, Filter, Plus, MoreVertical, FileText, 
  Download, Eye, Edit3, Trash2
} from 'lucide-react';

export default function ${title.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">${title}</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage and view all records for ${title.toLowerCase()}.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card hover:bg-page border border-border text-primary px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search records..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] text-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-input border border-border rounded-xl text-sm font-semibold text-secondary hover:text-primary transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-page/30 text-[10px] uppercase tracking-wider text-secondary">
                <th className="p-4 font-bold">ID / Ref</th>
                <th className="p-4 font-bold">Name / Details</th>
                <th className="p-4 font-bold">Date / Time</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4 text-sm font-bold text-primary">#REF-00{item}</td>
                  <td className="p-4 text-sm text-secondary font-medium">Sample Record Data {item}</td>
                  <td className="p-4 text-sm text-secondary">Oct {item + 10}, 2026</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-green-500/10 text-green-600 border border-green-500/20 rounded-md text-[10px] font-bold uppercase tracking-wide">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-secondary hover:text-blue-600 bg-page rounded-lg border border-border"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-secondary hover:text-orange-600 bg-page rounded-lg border border-border"><Edit3 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-border/50 flex items-center justify-between text-sm text-secondary bg-page/50">
          <span>Showing 1 to 5 of 24 records</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 border border-border rounded-lg hover:bg-input transition-colors disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 bg-[#1A3A5C] text-white rounded-lg font-bold">1</button>
            <button className="px-3 py-1 border border-border rounded-lg hover:bg-input transition-colors">2</button>
            <button className="px-3 py-1 border border-border rounded-lg hover:bg-input transition-colors">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
`;

placeholderFiles.forEach(file => {
  const absolutePath = path.join(__dirname, file);
  if (fs.existsSync(absolutePath)) {
    // Extract a nice title from the directory name
    const parts = file.split('/');
    const folderName = parts[parts.length - 2]; // e.g. "notice_period"
    const parentFolder = parts[parts.length - 3]; // e.g. "students"
    const title = folderName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    fs.writeFileSync(absolutePath, generateTemplate(title), 'utf8');
    console.log(`Generated full list page for: ${absolutePath}`);
  }
});
