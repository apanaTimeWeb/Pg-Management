const fs = require('fs');
const path = require('path');

// 1. Staff Customization
const staffPages = [
  'src/app/frontend_owner/staff/all/page.tsx',
  'src/app/frontend_owner/staff/managers/page.tsx',
  'src/app/frontend_owner/staff/cooks/page.tsx',
];

const generateStaffTemplate = (title) => `\'use client\';

import React, { useState } from 'react';
import { 
  Search, Filter, Plus, FileText, Download, Eye, Edit3, Trash2, UserCog, Phone, Briefcase
} from 'lucide-react';

const MOCK_STAFF = [
  { id: 'EMP-101', name: 'Ramesh Singh', role: 'Property Manager', phone: '+91 9876543210', property: 'PG Varanasi Main', salary: 25000, status: 'Active' },
  { id: 'EMP-102', name: 'Sneha Pandey', role: 'Property Manager', phone: '+91 9123456789', property: 'PG Lanka Branch', salary: 22000, status: 'Active' },
  { id: 'EMP-201', name: 'Raju Chacha', role: 'Head Cook', phone: '+91 9988776655', property: 'PG Varanasi Main', salary: 18000, status: 'Active' },
  { id: 'EMP-202', name: 'Bheem Kumar', role: 'Cook', phone: '+91 8877665544', property: 'PG Lanka Branch', salary: 15000, status: 'On Leave' },
];

export default function ${title.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStaff = MOCK_STAFF.filter(staff => {
    if (title === 'Managers' && staff.role !== 'Property Manager') return false;
    if (title === 'Cooks' && !staff.role.includes('Cook')) return false;
    
    if (searchTerm && !staff.name.toLowerCase().includes(searchTerm.toLowerCase()) && !staff.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><UserCog className="w-6 h-6 text-[#F5A623]"/> Staff: ${title}</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage employee records and roles.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Employee
          </button>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search staff..." 
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
                <th className="p-4 font-bold">Employee</th>
                <th className="p-4 font-bold">Role & Property</th>
                <th className="p-4 font-bold">Salary</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredStaff.map((staff, idx) => (
                <tr key={idx} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary">{staff.name}</p>
                    <p className="text-xs font-semibold text-secondary flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3"/> {staff.phone}</p>
                    <p className="text-[10px] text-[var(--text-disabled)] mt-1 font-mono">{staff.id}</p>
                  </td>
                  <td className="p-4 text-sm text-secondary font-medium">
                    <p className="text-primary font-bold flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-[#F5A623]"/> {staff.role}</p>
                    <p className="mt-0.5 text-xs">{staff.property}</p>
                  </td>
                  <td className="p-4 text-sm font-medium text-secondary">₹{staff.salary}</td>
                  <td className="p-4">
                    <span className={\`px-2.5 py-1 border rounded-md text-[10px] font-bold uppercase tracking-wide \${staff.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}\`}>
                      {staff.status}
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
              {filteredStaff.length === 0 && (
                <tr><td colSpan="5" className="p-8 text-center text-secondary font-medium">No staff members found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
`;

staffPages.forEach(file => {
  const absolutePath = path.join(__dirname, file);
  const dirPath = path.dirname(absolutePath);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

  let title = 'All Staff';
  if (file.includes('managers')) title = 'Managers';
  if (file.includes('cooks')) title = 'Cooks';
  
  fs.writeFileSync(absolutePath, generateStaffTemplate(title), 'utf8');
});


// 2. Single Pages (Attendance, Leave/Outing, Visitors, Mess Menu/Meals/Stock/Attendance)
// Note: Mess/Food pages were already created as generic tables. I'll overwrite them with nice empty states or custom tables if needed, but for speed, I'll make them clean tailored templates.

const messPages = [
  { path: 'src/app/frontend_owner/mess_food/menu/page.tsx', title: 'Food Menu', desc: 'Manage weekly food menus', icon: 'UtensilsCrossed' },
  { path: 'src/app/frontend_owner/mess_food/meals/page.tsx', title: 'Meals Tracking', desc: 'Track daily meals prepared', icon: 'UtensilsCrossed' },
  { path: 'src/app/frontend_owner/mess_food/attendance/page.tsx', title: 'Meal Attendance', desc: 'Track student meal attendance', icon: 'UtensilsCrossed' },
  { path: 'src/app/frontend_owner/mess_food/stock/page.tsx', title: 'Kitchen Stock', desc: 'Manage kitchen inventory', icon: 'Package' },
];

const standalonePages = [
  { path: 'src/app/frontend_owner/attendance/page.tsx', title: 'Student Attendance', desc: 'Mark and view student attendance', icon: 'CalendarCheck' },
  { path: 'src/app/frontend_owner/leave_outing/page.tsx', title: 'Leave & Outing', desc: 'Manage student leave requests and outings', icon: 'PlaneTakeoff' },
  { path: 'src/app/frontend_owner/visitors/page.tsx', title: 'Visitors Log', desc: 'Track guest entries and exits', icon: 'Users' }
];

const generateSingleTemplate = (title, desc, iconName) => `\'use client\';
import React, { useState } from 'react';
import { Search, Filter, Plus, FileText, Download, Eye, CalendarCheck, Users, PlaneTakeoff, UtensilsCrossed, Package } from 'lucide-react';

export default function ${title.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><${iconName} className="w-6 h-6 text-[#F5A623]"/> ${title}</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">${desc}.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> New Record
          </button>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden p-8 text-center">
        <div className="w-16 h-16 bg-page rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
          <${iconName} className="w-8 h-8 text-secondary" />
        </div>
        <h3 className="text-lg font-bold text-primary">No Records Found</h3>
        <p className="text-secondary text-sm mt-1 max-w-sm mx-auto">There are currently no active records for ${title.toLowerCase()}. Click the button above to add a new record.</p>
      </div>
    </div>
  );
}`;

[...messPages, ...standalonePages].forEach(page => {
  const absolutePath = path.join(__dirname, page.path);
  const dirPath = path.dirname(absolutePath);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(absolutePath, generateSingleTemplate(page.title, page.desc, page.icon), 'utf8');
});
