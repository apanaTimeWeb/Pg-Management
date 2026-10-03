const fs = require('fs');
const path = require('path');

const managerPages = [
  { path: 'src/app/frontend_manager/manager_attendance/page.tsx', title: 'Student Attendance', icon: 'CheckSquare', type: 'table' },
  { path: 'src/app/frontend_manager/manager_broadcasts/page.tsx', title: 'Broadcast Messages', icon: 'MessageCircle', type: 'list' },
  { path: 'src/app/frontend_manager/manager_check_in/page.tsx', title: 'Check In / Out', icon: 'UserPlus', type: 'table' },
  { path: 'src/app/frontend_manager/manager_complaints/page.tsx', title: 'Complaints & Maintenance', icon: 'Wrench', type: 'table' },
  { path: 'src/app/frontend_manager/manager_daily_operations/page.tsx', title: 'Daily Operations Log', icon: 'ClipboardCheck', type: 'list' },
  { path: 'src/app/frontend_manager/manager_documents/page.tsx', title: 'Documents verification', icon: 'FileText', type: 'table' },
  { path: 'src/app/frontend_manager/manager_enquiries/page.tsx', title: 'Admissions & Enquiries', icon: 'Users', type: 'table' },
  { path: 'src/app/frontend_manager/manager_expenses/page.tsx', title: 'Petty Cash & Expenses', icon: 'IndianRupee', type: 'table' },
  { path: 'src/app/frontend_manager/manager_finance/page.tsx', title: 'Rent Collection', icon: 'CreditCard', type: 'table' },
  { path: 'src/app/frontend_manager/manager_food/page.tsx', title: 'Mess & Food Log', icon: 'Utensils', type: 'list' },
  { path: 'src/app/frontend_manager/manager_gate_logs/page.tsx', title: 'Gate Entry Logs', icon: 'DoorOpen', type: 'table' },
  { path: 'src/app/frontend_manager/manager_housekeeping/page.tsx', title: 'Housekeeping Status', icon: 'Droplet', type: 'table' },
  { path: 'src/app/frontend_manager/manager_inventory/page.tsx', title: 'Stock & Inventory', icon: 'Package', type: 'table' },
  { path: 'src/app/frontend_manager/manager_leaves/page.tsx', title: 'Leave Approvals', icon: 'CalendarOff', type: 'table' },
  { path: 'src/app/frontend_manager/manager_reports/page.tsx', title: 'Manager Reports', icon: 'BarChart3', type: 'empty' },
  { path: 'src/app/frontend_manager/manager_rooms/page.tsx', title: 'Room Allocation', icon: 'Bed', type: 'table' },
  { path: 'src/app/frontend_manager/manager_settings/page.tsx', title: 'Settings', icon: 'Settings', type: 'empty' },
  { path: 'src/app/frontend_manager/manager_staff/page.tsx', title: 'Staff Attendance', icon: 'UserCog', type: 'table' },
  { path: 'src/app/frontend_manager/manager_students/page.tsx', title: 'Student Directory', icon: 'User', type: 'table' },
  { path: 'src/app/frontend_manager/manager_visitors/page.tsx', title: 'Visitor Management', icon: 'UserCheck', type: 'table' }
];

const generateManagerTemplate = (title, icon, type) => {
  let mainContent = '';

  if (type === 'table') {
    mainContent = `
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-page/30 text-[11px] uppercase tracking-wider text-secondary">
                <th className="p-4 font-bold">Record ID</th>
                <th className="p-4 font-bold">Details</th>
                <th className="p-4 font-bold">Timestamp</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {[1, 2, 3].map((item, idx) => (
                <tr key={idx} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary">REC-00{item}</p>
                  </td>
                  <td className="p-4 text-sm text-secondary font-medium">
                    <p className="text-primary font-bold">Sample Entry Data {item}</p>
                    <p className="mt-0.5 text-xs text-secondary flex items-center gap-1">Related info for row</p>
                  </td>
                  <td className="p-4 text-sm font-medium text-secondary">0\${item} Oct 2026</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-md text-[10px] font-bold uppercase tracking-wide">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-600 hover:text-blue-700 bg-blue-50 rounded-lg border border-blue-200" title="View"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-green-600 hover:text-green-700 bg-green-50 rounded-lg border border-green-200" title="Approve"><CheckCircle2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    `;
  } else if (type === 'list') {
    mainContent = `
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-page rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg"><\${icon} className="w-6 h-6 text-blue-600"/></div>
                <div>
                  <p className="font-bold text-primary text-sm">Action Item {item}</p>
                  <p className="text-xs text-secondary mt-0.5">Updated on 0\${item} Oct 2026</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                Manage
              </button>
            </div>
          ))}
        </div>
    `;
  } else {
    mainContent = `
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-page rounded-full flex items-center justify-center mx-auto mb-4 border border-border shadow-sm">
            <\${icon} className="w-8 h-8 text-secondary" />
          </div>
          <h3 className="text-lg font-bold text-primary">No Records Found</h3>
          <p className="text-secondary text-sm mt-1 max-w-sm mx-auto">There are currently no active records here. Click the button above to add a new record.</p>
        </div>
    `;
  }

  return `'use client';

import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Eye, Edit3, CheckCircle2, User, Users,
  MessageCircle, DoorOpen, IndianRupee, CreditCard, Droplet, Package, 
  CalendarOff, BarChart3, Bed, Settings, UserCog, UserCheck, Wrench, UserPlus, ClipboardCheck, FileText, Utensils
} from 'lucide-react';

export default function Manager${title.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <\${icon} className="w-6 h-6"/>
            </div>
            ${title}
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage ${title.toLowerCase()} and daily PG operations.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-gradient-to-r from-[#1A3A5C] to-[#122a42] hover:from-[#152e4a] hover:to-[#0f2338] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all">
            <Plus className="w-4 h-4" /> Add Record
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/30">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search records..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-input border border-border rounded-xl text-sm font-bold text-secondary hover:text-primary hover:bg-page transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {/* Content View */}
        ${mainContent}
        
      </div>
    </div>
  );
}
`;
}

managerPages.forEach(page => {
  const absolutePath = path.join(__dirname, page.path);
  const dirPath = path.dirname(absolutePath);
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(absolutePath, generateManagerTemplate(page.title, page.icon, page.type), 'utf8');
});
