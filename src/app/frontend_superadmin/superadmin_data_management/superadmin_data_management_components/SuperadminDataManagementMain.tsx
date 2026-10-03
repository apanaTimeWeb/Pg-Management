// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Database, UploadCloud, DownloadCloud, CopyX, FileSpreadsheet, FileText, CheckCircle, AlertTriangle, Eye, Merge, XCircle, Search, Users, Building2, Receipt, Activity, Save } from 'lucide-react';

export function SuperadminDataManagementMain() {
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'import');

  useEffect(() => {
    setActiveTab(tabQuery || 'import');
  }, [tabQuery]);
  const [duplicateStage, setDuplicateStage] = useState<'detect' | 'review' | 'resolved'>('detect');

  const tabs = [
    { id: 'import', label: 'Import Data', icon: UploadCloud, color: 'text-info', bg: 'bg-info-bg' },
    { id: 'export', label: 'Export Data', icon: DownloadCloud, color: 'text-success', bg: 'bg-success-bg' },
    { id: 'duplicates', label: 'Duplicate Management', icon: CopyX, color: 'text-warning', bg: 'bg-warning-bg' },
  ];

  return (
    <div className="w-full h-full space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <Database className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
            <Database className="w-8 h-8" /> Data Management Center
          </h1>
          <p className="text-white/80 font-medium max-w-xl">
            Import bulk records, export reports for auditing, and automatically resolve duplicate entries across the platform.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md shadow-sm border border-white/20">
              <Building2 className="w-4 h-4" /> 1,240 PGs
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md shadow-sm border border-white/20">
              <Users className="w-4 h-4" /> 45,100 Users
            </div>
            <div className="inline-flex items-center gap-2 bg-warning-bg text-warning-fg px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md shadow-sm border border-warning/30">
              <AlertTriangle className="w-4 h-4" /> 12 Potential Duplicates Detected
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
              <div className={`p-1.5 rounded-lg ${activeTab === tab.id ? tab.bg : 'bg-transparent'}`}>
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-theme-primary' : tab.color}`} />
              </div>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="w-full space-y-6">
          
          {/* IMPORT DATA TAB */}
          {activeTab === 'import' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-info-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <UploadCloud className="w-6 h-6 text-info" /> Import Data
              </h2>
              
              <div className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-start justify-between p-4 bg-bg-page rounded-2xl border border-border/50 hover:border-theme-primary/30 cursor-pointer transition-colors group">
                    <div className="flex items-start gap-4">
                      <input type="radio" name="importType" defaultChecked className="mt-1 w-5 h-5 rounded-full border-border text-theme-primary focus:ring-theme-primary bg-bg-card" />
                      <div>
                        <p className="font-bold text-primary group-hover:text-theme-primary transition-colors flex items-center gap-2"><Building2 className="w-4 h-4 text-info" /> PG Import</p>
                        <p className="text-xs text-secondary font-medium mt-1">Bulk create PG properties and assignments.</p>
                      </div>
                    </div>
                  </label>
                  
                  <label className="flex items-start justify-between p-4 bg-bg-page rounded-2xl border border-border/50 hover:border-theme-primary/30 cursor-pointer transition-colors group">
                    <div className="flex items-start gap-4">
                      <input type="radio" name="importType" className="mt-1 w-5 h-5 rounded-full border-border text-theme-primary focus:ring-theme-primary bg-bg-card" />
                      <div>
                        <p className="font-bold text-primary group-hover:text-theme-primary transition-colors flex items-center gap-2"><Users className="w-4 h-4 text-success" /> Users Import</p>
                        <p className="text-xs text-secondary font-medium mt-1">Bulk onboard Owners, Managers, Cooks, and Students.</p>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">Upload File (CSV or Excel)</label>
                    <button className="text-xs font-bold text-theme-primary hover:underline flex items-center gap-1"><DownloadCloud className="w-3 h-3" /> Download Template</button>
                  </div>
                  <div className="border-2 border-dashed border-border/50 rounded-2xl p-10 text-center hover:border-info/50 hover:bg-info/5 transition-colors cursor-pointer group">
                     <FileSpreadsheet className="w-12 h-12 text-secondary group-hover:text-info mx-auto mb-3 transition-colors" />
                     <p className="font-bold text-primary group-hover:text-info transition-colors">Drag and drop your .csv or .xlsx file here</p>
                     <p className="text-sm text-secondary mt-1">Maximum file size: 50MB</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-warning-bg border border-warning/20 rounded-2xl">
                  <AlertTriangle className="w-6 h-6 text-warning shrink-0" />
                  <div>
                    <h3 className="font-bold text-warning text-sm">Data Migration Warning</h3>
                    <p className="text-xs text-secondary font-medium mt-0.5">Ensure columns exactly match the template. Incorrect mappings will cause the import process to fail.</p>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-border/50 mt-8">
                  <button className="bg-theme-primary hover:bg-theme-primary-hover text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
                    <UploadCloud className="w-5 h-5" /> Start Import Process
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* EXPORT DATA TAB */}
          {activeTab === 'export' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-success-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <DownloadCloud className="w-6 h-6 text-success" /> Export Data
              </h2>
              
              <div className="flex flex-col gap-6 relative z-10">
                {[
                  { title: 'PG Data', desc: 'Export all properties, rooms, beds, and amenities.', icon: Building2, color: 'text-info', bg: 'bg-info-bg' },
                  { title: 'User Data', desc: 'Export all students, owners, and staff members.', icon: Users, color: 'text-success', bg: 'bg-success-bg' },
                  { title: 'Transactions', desc: 'Export all financial invoices and payment logs.', icon: Receipt, color: 'text-warning', bg: 'bg-warning-bg' },
                  { title: 'System Reports', desc: 'Export occupancy stats, growth charts and analytics.', icon: FileText, color: 'text-theme-primary', bg: 'bg-primary-subtle' },
                  { title: 'Audit Logs', desc: 'Export system-wide activity and security logs.', icon: Activity, color: 'text-purple', bg: 'bg-purple-bg' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col p-5 bg-bg-page rounded-2xl border border-border/50 hover:border-success/30 hover:shadow-md transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${item.bg} group-hover:scale-110 transition-transform`}>
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <select className="px-3 py-1.5 bg-bg-card border border-border/50 rounded-lg text-xs font-bold text-primary focus:ring-2 focus:ring-success cursor-pointer">
                        <option>CSV Format</option>
                        <option>Excel (.xlsx)</option>
                        <option>JSON Format</option>
                      </select>
                    </div>
                    <h3 className="font-bold text-primary text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-secondary font-medium mb-4 flex-1">{item.desc}</p>
                    <button className="w-full bg-card border border-border hover:bg-success hover:text-white hover:border-success text-primary px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                      <DownloadCloud className="w-4 h-4" /> Export {item.title}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DUPLICATE MANAGEMENT TAB */}
          {activeTab === 'duplicates' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-warning-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2"><CopyX className="w-6 h-6 text-warning" /> Duplicate Management</div>
              </h2>
              
              <div className="space-y-6 relative z-10">
                {/* Stage Indicators */}
                <div className="flex gap-2 p-1 bg-bg-page border border-border/50 rounded-xl mb-6">
                  <button onClick={() => setDuplicateStage('detect')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${duplicateStage === 'detect' ? 'bg-card text-warning shadow-sm border border-border/50' : 'text-secondary hover:text-primary'}`}>
                    1. Detect
                  </button>
                  <button onClick={() => setDuplicateStage('review')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${duplicateStage === 'review' ? 'bg-card text-warning shadow-sm border border-border/50' : 'text-secondary hover:text-primary'}`}>
                    2. Review & Merge
                  </button>
                </div>

                {duplicateStage === 'detect' && (
                  <div className="space-y-6 animate-in fade-in">
                    <div className="p-8 text-center border-2 border-dashed border-warning/30 bg-warning/5 rounded-2xl">
                      <Search className="w-12 h-12 text-warning mx-auto mb-4 animate-pulse" />
                      <h3 className="text-xl font-bold text-primary mb-2">Scan for Duplicates</h3>
                      <p className="text-sm text-secondary font-medium max-w-md mx-auto mb-6">Run an AI-powered scan across your entire database to find duplicate PGs, Users, Mobile Numbers, and Emails.</p>
                      <button onClick={() => setDuplicateStage('review')} className="bg-warning text-warning-fg hover:bg-warning/90 px-8 py-3 rounded-xl font-bold inline-flex items-center gap-2 transition-all shadow-md">
                        <Search className="w-5 h-5" /> Run Global Scan
                      </button>
                    </div>
                  </div>
                )}

                {duplicateStage === 'review' && (
                  <div className="space-y-6 animate-in slide-in-from-right-4">
                    <div className="flex items-center justify-between bg-warning-bg border border-warning/20 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                        <span className="font-bold text-warning text-sm">Found 1 Potential Duplicate Set</span>
                      </div>
                    </div>

                    {/* Duplicate Set Card */}
                    <div className="bg-bg-page border border-border/50 rounded-2xl p-6">
                      <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4">
                        <h3 className="font-bold text-primary flex items-center gap-2"><Users className="w-5 h-5 text-info" /> User Duplicate (Mobile Number Clash)</h3>
                        <span className="bg-danger-bg text-danger text-xs font-bold px-3 py-1 rounded-full">High Confidence (98%)</span>
                      </div>
                      
                      <div className="flex flex-col gap-6">
                        {/* Record A */}
                        <div className="bg-card border border-border/50 p-4 rounded-xl">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-secondary bg-bg-page px-2 py-1 rounded">Record A (Master)</span>
                            <span className="text-xs text-secondary">Created: 1 Oct 2026</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between border-b border-border/30 pb-1">
                              <span className="text-sm text-secondary">Name:</span>
                              <span className="text-sm font-bold text-primary">Rahul Sharma</span>
                            </div>
                            <div className="flex justify-between border-b border-danger/30 pb-1 bg-danger/5 px-1 -mx-1 rounded">
                              <span className="text-sm text-secondary">Mobile:</span>
                              <span className="text-sm font-bold text-danger">+91 9876543210</span>
                            </div>
                            <div className="flex justify-between border-b border-border/30 pb-1">
                              <span className="text-sm text-secondary">Email:</span>
                              <span className="text-sm font-bold text-primary">rahul.s@gmail.com</span>
                            </div>
                          </div>
                        </div>

                        {/* Record B */}
                        <div className="bg-card border border-border/50 p-4 rounded-xl">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-secondary bg-bg-page px-2 py-1 rounded">Record B (Duplicate)</span>
                            <span className="text-xs text-secondary">Created: 3 Oct 2026</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between border-b border-border/30 pb-1">
                              <span className="text-sm text-secondary">Name:</span>
                              <span className="text-sm font-bold text-primary">Rahul K. Sharma</span>
                            </div>
                            <div className="flex justify-between border-b border-danger/30 pb-1 bg-danger/5 px-1 -mx-1 rounded">
                              <span className="text-sm text-secondary">Mobile:</span>
                              <span className="text-sm font-bold text-danger">+91 9876543210</span>
                            </div>
                            <div className="flex justify-between border-b border-border/30 pb-1">
                              <span className="text-sm text-secondary">Email:</span>
                              <span className="text-sm font-bold text-primary">None</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border/50">
                        <button onClick={() => setDuplicateStage('detect')} className="bg-theme-primary hover:bg-theme-primary-hover text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all flex-1 shadow-md">
                          <Merge className="w-5 h-5" /> Merge into Record A
                        </button>
                        <button onClick={() => setDuplicateStage('detect')} className="bg-danger-bg hover:bg-danger hover:text-white text-danger px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all flex-1">
                          <XCircle className="w-5 h-5" /> Reject Duplicate
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
