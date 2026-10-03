// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Database, FileArchive, Clock, History, RotateCcw, Download, Server, Cloud, HardDrive, CheckCircle, AlertTriangle, ShieldCheck, Play, Save } from 'lucide-react';

export function SuperadminBackupsMain() {
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'database');

  useEffect(() => {
    setActiveTab(tabQuery || 'database');
  }, [tabQuery]);

  const tabs = [
    { id: 'database', label: 'Database Backup', icon: Database, color: 'text-info' },
    { id: 'files', label: 'File Backup', icon: FileArchive, color: 'text-warning' },
    { id: 'scheduled', label: 'Scheduled Backup', icon: Clock, color: 'text-success' },
    { id: 'history', label: 'Backup History', icon: History, color: 'text-purple' },
    { id: 'restore', label: 'Restore System', icon: RotateCcw, color: 'text-danger' },
  ];

  return (
    <div className="w-full h-full space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <HardDrive className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
            <Server className="w-8 h-8" /> System Backups & Recovery
          </h1>
          <p className="text-white/80 font-medium max-w-xl">
            Manage your database snapshots, file system backups, and disaster recovery strategies.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md shadow-sm border border-white/20">
              <Cloud className="w-4 h-4" /> Storage: 45.2 GB Used (85% Free)
            </div>
            <div className="inline-flex items-center gap-2 bg-success-bg text-white px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md shadow-sm border border-success/30">
              <ShieldCheck className="w-4 h-4" /> Last Backup: 2 hrs ago
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        
        {/* Top Navigation Tabs */}
        <div className="bg-card border border-border/50 rounded-3xl p-2 shadow-sm flex items-center overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-primary-subtle text-theme-primary shadow-sm' 
                  : 'text-secondary hover:bg-bg-page hover:text-primary'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${activeTab === tab.id ? 'bg-primary-subtle' : 'bg-transparent'}`}>
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-theme-primary' : tab.color}`} />
              </div>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="w-full space-y-6">
          
          {/* DATABASE BACKUP */}
          {activeTab === 'database' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-info-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <Database className="w-6 h-6 text-info" /> Database Backup
              </h2>
              <div className="space-y-6 relative z-10">
                <p className="text-secondary font-medium">Create a complete snapshot of the PostgreSQL database, including all users, owners, and transactional data.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border border-info/20 bg-info/5 flex items-start gap-4">
                     <div className="p-3 bg-info-bg text-info rounded-xl"><Database className="w-6 h-6" /></div>
                     <div>
                       <h3 className="font-bold text-primary">Full Export</h3>
                       <p className="text-sm text-secondary mt-1">Export schemas, structures, and all table data.</p>
                       <p className="text-xs font-bold text-info mt-2">Est. Size: ~245 MB</p>
                     </div>
                  </div>
                  <div className="p-5 rounded-2xl border border-border/50 bg-bg-page flex items-start gap-4 hover:border-theme-primary/30 transition-colors cursor-pointer">
                     <div className="p-3 bg-card border border-border text-secondary rounded-xl"><FileArchive className="w-6 h-6" /></div>
                     <div>
                       <h3 className="font-bold text-primary">Schema Only</h3>
                       <p className="text-sm text-secondary mt-1">Export only database structure, no user data.</p>
                       <p className="text-xs font-bold text-secondary mt-2">Est. Size: ~2.1 MB</p>
                     </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-border/50">
                  <button className="bg-theme-primary hover:bg-theme-primary-hover text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
                    <Download className="w-5 h-5" /> Generate Database Backup
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FILE BACKUP */}
          {activeTab === 'files' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-warning-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <FileArchive className="w-6 h-6 text-warning" /> File System Backup
              </h2>
              <div className="space-y-6 relative z-10">
                <p className="text-secondary font-medium">Backup uploaded user documents, tenant KYC files, owner agreements, and system configuration files.</p>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-bg-page rounded-2xl border border-border/50 hover:border-theme-primary/30 cursor-pointer transition-colors group">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border text-theme-primary focus:ring-theme-primary bg-bg-card" />
                      <div>
                        <p className="font-bold text-primary group-hover:text-theme-primary transition-colors">User Uploads (KYC, IDs, Photos)</p>
                        <p className="text-xs text-secondary font-medium mt-1">/storage/uploads/kyc</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-secondary">~4.2 GB</span>
                  </label>
                  
                  <label className="flex items-center justify-between p-4 bg-bg-page rounded-2xl border border-border/50 hover:border-theme-primary/30 cursor-pointer transition-colors group">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border text-theme-primary focus:ring-theme-primary bg-bg-card" />
                      <div>
                        <p className="font-bold text-primary group-hover:text-theme-primary transition-colors">Agreements & Invoices</p>
                        <p className="text-xs text-secondary font-medium mt-1">/storage/documents/legal</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-secondary">~1.8 GB</span>
                  </label>
                  
                  <label className="flex items-center justify-between p-4 bg-bg-page rounded-2xl border border-border/50 hover:border-theme-primary/30 cursor-pointer transition-colors group">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border text-theme-primary focus:ring-theme-primary bg-bg-card" />
                      <div>
                        <p className="font-bold text-primary group-hover:text-theme-primary transition-colors">App Configuration & Logs</p>
                        <p className="text-xs text-secondary font-medium mt-1">/config & /var/logs</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-secondary">~500 MB</span>
                  </label>
                </div>

                <div className="flex gap-4 pt-4 border-t border-border/50">
                  <button className="bg-theme-primary hover:bg-theme-primary-hover text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
                    <Download className="w-5 h-5" /> Backup Selected Files
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCHEDULED BACKUP */}
          {activeTab === 'scheduled' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-success-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2"><Clock className="w-6 h-6 text-success" /> Scheduled Backups</div>
                <div className="flex items-center gap-2 text-sm font-bold text-success bg-success-bg px-3 py-1.5 rounded-xl border border-success/20">
                  <CheckCircle className="w-4 h-4" /> Active
                </div>
              </h2>
              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">Backup Frequency</label>
                    <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary font-medium text-primary cursor-pointer">
                      <option>Every 12 Hours</option>
                      <option selected>Daily at Midnight (00:00)</option>
                      <option>Weekly on Sunday</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">Retention Policy</label>
                    <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary font-medium text-primary cursor-pointer">
                      <option>Keep last 7 backups</option>
                      <option selected>Keep last 30 backups</option>
                      <option>Keep for 6 months</option>
                      <option>Never delete</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary uppercase tracking-wider">Cloud Sync Destination</label>
                  <div className="flex items-center gap-4 p-4 bg-bg-page rounded-2xl border border-border/50">
                    <Cloud className="w-6 h-6 text-info" />
                    <div className="flex-1">
                      <p className="font-bold text-primary">AWS S3 Bucket</p>
                      <p className="text-xs text-secondary font-medium mt-0.5">s3://smartpg-backups-prod</p>
                    </div>
                    <button className="text-theme-primary font-bold text-sm hover:underline">Change</button>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-border/50">
                  <button className="bg-theme-primary hover:bg-theme-primary-hover text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
                    <Save className="w-5 h-5" /> Save Schedule
                  </button>
                  <button className="bg-bg-page border border-border hover:border-theme-primary hover:text-theme-primary text-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                    <Play className="w-5 h-5" /> Run Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* BACKUP HISTORY */}
          {activeTab === 'history' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2">
                <History className="w-6 h-6 text-purple" /> Backup History
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Date & Time</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Type</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Size</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Status</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {[
                      { time: 'Today, 00:00 AM', type: 'Full System (Auto)', size: '6.5 GB', status: 'Success' },
                      { time: 'Yesterday, 00:00 AM', type: 'Full System (Auto)', size: '6.4 GB', status: 'Success' },
                      { time: '2 Oct 2026, 14:20 PM', type: 'Database Only (Manual)', size: '245 MB', status: 'Success' },
                      { time: '1 Oct 2026, 00:00 AM', type: 'Full System (Auto)', size: '0 MB', status: 'Failed', alert: true },
                    ].map((log, i) => (
                      <tr key={i} className="hover:bg-bg-page/50 transition-colors group">
                        <td className="py-4 px-4 text-sm font-bold text-primary">{log.time}</td>
                        <td className="py-4 px-4 text-sm text-secondary font-medium">{log.type}</td>
                        <td className="py-4 px-4 text-sm text-secondary font-medium">{log.size}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${log.alert ? 'bg-danger-bg text-danger' : 'bg-success-bg text-success'}`}>
                            {log.alert ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                            {log.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button className="text-theme-primary font-bold text-sm hover:underline px-2 disabled:opacity-50 disabled:hover:no-underline" disabled={log.alert}>Download</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* RESTORE */}
          {activeTab === 'restore' && (
            <div className="bg-card border border-danger/30 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-danger-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-danger mb-6 border-b border-danger/20 pb-4 flex items-center gap-2 relative z-10">
                <RotateCcw className="w-6 h-6" /> Restore System
              </h2>
              <div className="space-y-6 relative z-10">
                <div className="p-5 bg-danger-bg border border-danger/20 rounded-2xl flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-danger shrink-0" />
                  <div>
                    <h3 className="font-bold text-danger">Warning: Destructive Action</h3>
                    <p className="text-sm text-danger/80 font-medium mt-1">Restoring from a backup will overwrite the current live database and files. Any changes made after the selected backup date will be permanently lost.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary uppercase tracking-wider">Select Backup to Restore</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-danger font-medium text-primary cursor-pointer">
                    <option>Today, 00:00 AM - Full System (6.5 GB)</option>
                    <option>Yesterday, 00:00 AM - Full System (6.4 GB)</option>
                    <option>2 Oct 2026, 14:20 PM - Database Only (245 MB)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary uppercase tracking-wider">Upload Backup File (Optional)</label>
                  <div className="border-2 border-dashed border-border/50 rounded-2xl p-8 text-center hover:border-danger/50 hover:bg-danger/5 transition-colors cursor-pointer group">
                     <FileArchive className="w-10 h-10 text-secondary group-hover:text-danger mx-auto mb-3 transition-colors" />
                     <p className="font-bold text-primary group-hover:text-danger transition-colors">Drag and drop a .tar.gz or .sql file here</p>
                     <p className="text-sm text-secondary mt-1">or click to browse from your computer</p>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-border/50 mt-8">
                  <button className="bg-danger hover:bg-danger/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
                    <RotateCcw className="w-5 h-5" /> Confirm & Restore Data
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
