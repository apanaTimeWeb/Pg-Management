const fs = require('fs');
const path = require('path');

// Target directories for SuperAdmin System & Compliance pages
const superAdminPages = [
  { path: 'src/app/frontend_superadmin/superadmin_feature_flags/page.tsx', title: 'Feature Toggles', icon: 'ToggleLeft', desc: 'Enable or disable features platform-wide or for specific PG owners.' },
  { path: 'src/app/frontend_superadmin/superadmin_audit_logs/page.tsx', title: 'Audit & Compliance Logs', icon: 'ShieldCheck', desc: 'System-wide activity audit, login attempts, and data changes.' },
  { path: 'src/app/frontend_superadmin/superadmin_settings/page.tsx', title: 'Environment Settings', icon: 'Settings', desc: 'Global platform settings, environment variables, and branding config.' },
  { path: 'src/app/frontend_superadmin/superadmin_system_management/page.tsx', title: 'Infrastructure Health', icon: 'Server', desc: 'Real-time server metrics, CPU/RAM usage, and database status.' },
  { path: 'src/app/frontend_superadmin/superadmin_data_management/page.tsx', title: 'Data Governance', icon: 'Database', desc: 'Manage data retention policies, archiving, and privacy compliance.' },
  { path: 'src/app/frontend_superadmin/superadmin_backups/page.tsx', title: 'Disaster Recovery', icon: 'Database', desc: 'Automated database backups, snapshots, and restore points.' },
];

const generateSystemTemplate = (title, icon, desc) => `\'use client\';

import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Download, Eye, Settings, Trash2, ${icon}, 
  AlertCircle, RefreshCw, SlidersHorizontal, Activity, ShieldAlert
} from 'lucide-react';

const MOCK_DATA = [
  { id: 'SYS-001', name: 'Database Snapshot', type: 'Critical', status: 'Healthy', metric: '4.2 GB', date: '02 Oct 2026' },
  { id: 'SYS-002', name: 'Payment Gateway V2', type: 'Core System', status: 'Active', metric: 'v2.4.1', date: '05 Oct 2026' },
  { id: 'SYS-003', name: 'Legacy Data Archive', type: 'Background Job', status: 'Warning', metric: '68%', date: '12 Oct 2026' },
];

export default function SuperAdmin${title.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Overview');

  const filteredData = MOCK_DATA.filter(item => {
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase()) && !item.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'Healthy' || status === 'Active') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'Warning') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (status === 'Critical' || status === 'Failed') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg text-slate-100">
              <${icon} className="w-7 h-7"/>
            </div>
            ${title}
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-2 font-medium">${desc}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card hover:bg-page border border-border text-primary px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Activity className="w-4 h-4" /> Run Diagnostics
          </button>
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all transform hover:scale-105">
            <ShieldAlert className="w-4 h-4 text-red-400" /> Admin Action
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-border/60 overflow-x-auto hide-scrollbar">
        {['Overview', 'System Logs', 'Configurations', 'Alerts'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={\`px-5 py-3 text-sm font-bold transition-all whitespace-nowrap relative \${
              activeTab === tab 
              ? 'text-slate-800 dark:text-slate-200' 
              : 'text-secondary hover:text-primary'
            }\`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-800 dark:bg-slate-200 rounded-t-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="bg-card border border-border/60 rounded-2xl shadow-xl shadow-black/5 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-5 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/30">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search components or logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm font-medium focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 text-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-input border border-border rounded-xl text-sm font-bold text-secondary hover:text-primary hover:bg-page transition-colors">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <button className="p-2.5 bg-input border border-border rounded-xl text-secondary hover:text-primary hover:bg-page transition-colors" title="Refresh">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/60 bg-page/50 text-[11px] font-black uppercase tracking-widest text-secondary">
                <th className="p-5">System Component</th>
                <th className="p-5">Type / Category</th>
                <th className="p-5">Primary Metric</th>
                <th className="p-5">Last Updated</th>
                <th className="p-5">Health Status</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredData.map((item, idx) => (
                <tr key={idx} className="hover:bg-page/40 transition-colors group">
                  <td className="p-5">
                    <p className="text-sm font-bold text-primary">{item.name}</p>
                    <p className="text-[11px] text-secondary mt-1 font-mono bg-page inline-block px-1.5 py-0.5 rounded border border-border">{item.id}</p>
                  </td>
                  <td className="p-5 text-sm font-semibold text-secondary">
                    {item.type}
                  </td>
                  <td className="p-5 text-sm font-bold text-primary font-mono">
                    {item.metric}
                  </td>
                  <td className="p-5 text-sm font-medium text-secondary">{item.date}</td>
                  <td className="p-5">
                    <span className={\`px-3 py-1 border rounded-lg text-[11px] font-black uppercase tracking-wide \${getStatusBadge(item.status)}\`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors" title="View Logs"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-slate-600 hover:text-slate-700 bg-slate-50 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors" title="Configure"><Settings className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr><td colSpan="6" className="p-12 text-center">
                  <div className="flex justify-center mb-3"><AlertCircle className="w-10 h-10 text-secondary opacity-50"/></div>
                  <p className="text-lg font-bold text-primary">No records found</p>
                  <p className="text-sm text-secondary mt-1">Try adjusting your search or filters.</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
`;

superAdminPages.forEach(page => {
  const absolutePath = path.join(__dirname, page.path);
  const dirPath = path.dirname(absolutePath);
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(absolutePath, generateSystemTemplate(page.title, page.icon, page.desc), 'utf8');
});
