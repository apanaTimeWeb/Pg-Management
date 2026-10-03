const fs = require('fs');
const path = require('path');

const PAGES = [
  {
    folder: 'student_dashboard',
    title: 'Dashboard',
    icon: 'LayoutDashboard',
    description: 'Overview of your stay and recent activities.',
    tabs: []
  },
  {
    folder: 'student_admission',
    title: 'My Admission',
    icon: 'UserPlus',
    description: 'Manage your admission details and agreement.',
    tabs: [
      { id: 'details', label: 'Admission Details', default: true },
      { id: 'status', label: 'Status' },
      { id: 'agreement', label: 'Agreement' }
    ]
  },
  {
    folder: 'student_room',
    title: 'My Room & Bed',
    icon: 'BedDouble',
    description: 'View room details, roommates, and change requests.',
    tabs: [
      { id: 'details', label: 'Room Details', default: true },
      { id: 'bed', label: 'Bed Details' },
      { id: 'roommates', label: 'Roommates' },
      { id: 'change', label: 'Room Change Request' }
    ]
  },
  {
    folder: 'student_rent',
    title: 'Fees & Payments',
    icon: 'IndianRupee',
    description: 'Manage your fees, dues, and payment history.',
    tabs: [
      { id: 'current', label: 'Current Fees', default: true },
      { id: 'pay', label: 'Pay Fees' },
      { id: 'pending', label: 'Pending Dues' },
      { id: 'history', label: 'Payment History' },
      { id: 'receipts', label: 'Receipts' }
    ]
  },
  {
    folder: 'student_security_deposit',
    title: 'Security Deposit',
    icon: 'Shield',
    description: 'View your deposit details and settlement status.',
    tabs: [
      { id: 'details', label: 'Deposit Details', default: true },
      { id: 'settlement', label: 'Settlement' }
    ]
  },
  {
    folder: 'student_attendance',
    title: 'Attendance',
    icon: 'CheckSquare',
    description: 'Track your daily and monthly attendance.',
    tabs: [
      { id: 'today', label: 'Today', default: true },
      { id: 'monthly', label: 'Monthly' },
      { id: 'history', label: 'History' }
    ]
  },
  {
    folder: 'student_mess',
    title: 'Mess / Food',
    icon: 'Utensils',
    description: 'View menus, log meals, and submit food complaints.',
    tabs: [
      { id: 'today', label: 'Today\'s Menu', default: true },
      { id: 'weekly', label: 'Weekly Menu' },
      { id: 'attendance', label: 'Meal Attendance' },
      { id: 'count', label: 'My Meal Count' },
      { id: 'complaints', label: 'Food Complaint' }
    ]
  },
  {
    folder: 'student_leaves',
    title: 'Leave / Outing',
    icon: 'CalendarOff',
    description: 'Apply for leaves and view your outing history.',
    tabs: [
      { id: 'new', label: 'New Request', default: true },
      { id: 'pending', label: 'Pending' },
      { id: 'approved', label: 'Approved' },
      { id: 'active', label: 'Active' },
      { id: 'history', label: 'History' }
    ]
  },
  {
    folder: 'student_visitors',
    title: 'Visitors',
    icon: 'Users',
    description: 'Request visitor passes and view history.',
    tabs: [
      { id: 'new', label: 'Request Visitor', default: true },
      { id: 'pending', label: 'Pending' },
      { id: 'approved', label: 'Approved' },
      { id: 'history', label: 'History' }
    ]
  },
  {
    folder: 'student_complaints',
    title: 'Complaints & Maintenance',
    icon: 'MessageSquareWarning',
    description: 'Raise complaints and track maintenance requests.',
    tabs: [
      { id: 'new', label: 'New Complaint', default: true },
      { id: 'my', label: 'My Complaints' },
      { id: 'maintenance', label: 'Maintenance' },
      { id: 'resolved', label: 'Resolved / Closed' }
    ]
  },
  {
    folder: 'student_documents',
    title: 'Documents',
    icon: 'FileText',
    description: 'Manage your uploaded documents and verification status.',
    tabs: [
      { id: 'my', label: 'My Documents', default: true },
      { id: 'upload', label: 'Upload' },
      { id: 'status', label: 'Verification Status' }
    ]
  },
  {
    folder: 'student_requests',
    title: 'Requests',
    icon: 'ListTodo',
    description: 'Track all your miscellaneous requests.',
    tabs: [
      { id: 'all', label: 'All Requests', default: true },
      { id: 'pending', label: 'Pending' },
      { id: 'approved', label: 'Approved' },
      { id: 'rejected', label: 'Rejected' },
      { id: 'completed', label: 'Completed' }
    ]
  },
  {
    folder: 'student_notices',
    title: 'Notices',
    icon: 'Bell',
    description: 'Important announcements and notices from management.',
    tabs: []
  },
  {
    folder: 'student_notifications',
    title: 'Notifications',
    icon: 'Bell',
    description: 'Your personal alerts and notifications.',
    tabs: []
  }
];

const BASE_DIR = path.join(__dirname, 'src', 'app', 'frontend_student');

PAGES.forEach(page => {
  const dirPath = path.join(BASE_DIR, page.folder);
  const compDirPath = path.join(dirPath, `${page.folder}_components`);
  
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  if (!fs.existsSync(compDirPath)) fs.mkdirSync(compDirPath, { recursive: true });

  // Capitalize component name
  const compNameBase = page.folder.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  const compName = `${compNameBase}Main`;

  // Create page.tsx
  const pageContent = `import { ${compName} } from './${page.folder}_components/${compName}';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${page.title} | Student Portal',
  description: '${page.description}',
};

export default function Page() {
  return <${compName} />;
}
`;
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), pageContent);

  // Create Component
  const hasTabs = page.tabs.length > 0;
  let componentContent = `'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ${page.icon}${hasTabs ? ', ChevronRight' : ''} } from 'lucide-react';

export function ${compName}() {
${hasTabs ? `  const searchParams = useSearchParams();
  const initialView = searchParams?.get('view') || searchParams?.get('action') || '${page.tabs.find(t => t.default)?.id || page.tabs[0].id}';
  const [activeTab, setActiveTab] = useState(initialView);

  // Sync tab with URL parameter on load
  useEffect(() => {
    const view = searchParams?.get('view') || searchParams?.get('action');
    if (view) {
      // Find matching tab or fallback
      const matchingTab = [${page.tabs.map(t => `'${t.id}'`).join(', ')}].find(id => id.includes(view) || view.includes(id));
      if (matchingTab) setActiveTab(matchingTab);
    }
  }, [searchParams]);` : ''}

  return (
    <div className="w-full max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <${page.icon} className="w-6 h-6 text-primary" />
          </div>
          ${page.title}
        </h1>
        <p className="text-sm text-secondary mt-2 font-medium">${page.description}</p>
      </div>

${hasTabs ? `      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* Colorful Sidebar / Tabs */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <div className="bg-card border border-border rounded-2xl p-3 shadow-sm flex flex-row md:flex-col overflow-x-auto hide-scrollbar gap-2">
            ${page.tabs.map((tab, i) => `
            <button
              onClick={() => setActiveTab('${tab.id}')}
              className={\`flex-1 md:w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap \${
                activeTab === '${tab.id}' 
                  ? 'bg-primary text-white shadow-md scale-[1.02]' 
                  : 'text-secondary hover:bg-input hover:text-primary'
              }\`}
            >
              <div className="flex items-center gap-3">
                ${tab.label}
              </div>
              {activeTab === '${tab.id}' && <ChevronRight className="w-4 h-4 hidden md:block" />}
            </button>`).join('')}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm min-h-[400px] p-6 relative overflow-hidden">
          
          {/* Decorative background blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          ${page.tabs.map(tab => `
          {activeTab === '${tab.id}' && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-border pb-4">
                ${tab.label}
              </h2>
              
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-input flex items-center justify-center mb-4">
                  <${page.icon} className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">${tab.label} content goes here</h3>
                <p className="text-sm text-secondary max-w-sm">
                  This section handles the full UI logic for ${tab.label}. You can build tables, forms, or summary cards here.
                </p>
                <button className="mt-6 bg-primary/10 text-primary font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-primary/20 transition-colors">
                  Action Button
                </button>
              </div>
            </div>
          )}`).join('')}

        </div>
      </div>` : `      <div className="bg-card border border-border rounded-2xl shadow-sm min-h-[400px] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-20 h-20 rounded-full bg-input flex items-center justify-center mb-4">
          <${page.icon} className="w-10 h-10 text-secondary" />
        </div>
        <h2 className="text-xl font-bold text-primary mb-2">${page.title}</h2>
        <p className="text-sm text-secondary max-w-md">Detailed overview and data for ${page.title} will be displayed here.</p>
      </div>`}
    </div>
  );
}
`;
  fs.writeFileSync(path.join(compDirPath, `${compName}.tsx`), componentContent);
});

console.log('Successfully generated all student pages!');
