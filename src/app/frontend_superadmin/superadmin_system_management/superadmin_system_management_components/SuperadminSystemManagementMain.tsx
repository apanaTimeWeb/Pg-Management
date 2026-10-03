// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Activity, AlertTriangle, Bug, Settings, Server, CheckCircle2, Clock, Trash2, Power, Eye, CheckCircle, XCircle, Search, Filter } from 'lucide-react';

export function SuperadminSystemManagementMain() {
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'health');

  useEffect(() => {
    setActiveTab(tabQuery || 'health');
  }, [tabQuery]);
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(false);

  const tabs = [
    { id: 'health', label: 'System Health', icon: Activity, color: 'text-success', bg: 'bg-success-bg' },
    { id: 'logs', label: 'Error Logs', icon: Bug, color: 'text-danger', bg: 'bg-danger-bg' },
    { id: 'jobs', label: 'Background Jobs', icon: Clock, color: 'text-info', bg: 'bg-info-bg' },
    { id: 'maintenance', label: 'Maintenance Mode', icon: Power, color: 'text-warning', bg: 'bg-warning-bg' },
  ];

  return (
    <div className="w-full h-full space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <Server className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <Settings className="w-8 h-8" /> System Management
            </h1>
            <p className="text-white/80 font-medium max-w-xl">
              Technical control area. Monitor system health, track error logs, manage background jobs, and toggle maintenance mode.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-2 bg-success-bg text-white px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md shadow-sm border border-success/30">
                <CheckCircle2 className="w-4 h-4" /> All Systems Operational
              </div>
              <div className="inline-flex items-center gap-2 bg-danger-bg text-white px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md shadow-sm border border-danger/30">
                <Bug className="w-4 h-4" /> 12 New Errors Logged
              </div>
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
          
          {/* SYSTEM HEALTH TAB */}
          {activeTab === 'health' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-success-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <Activity className="w-6 h-6 text-success" /> System Health Status
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {[
                  { name: 'Core Application', status: 'Healthy', ping: '12ms', color: 'text-success', bg: 'bg-success-bg', border: 'border-success/20' },
                  { name: 'Database (PostgreSQL)', status: 'Healthy', ping: '8ms', color: 'text-success', bg: 'bg-success-bg', border: 'border-success/20' },
                  { name: 'Storage (AWS S3)', status: 'Warning', ping: '145ms', color: 'text-warning', bg: 'bg-warning-bg', border: 'border-warning/30' },
                  { name: 'External API Gateway', status: 'Healthy', ping: '32ms', color: 'text-success', bg: 'bg-success-bg', border: 'border-success/20' },
                  { name: 'Payment Gateway (Razorpay)', status: 'Healthy', ping: '45ms', color: 'text-success', bg: 'bg-success-bg', border: 'border-success/20' },
                  { name: 'Email Service (SendGrid)', status: 'Down', ping: 'Timeout', color: 'text-danger', bg: 'bg-danger-bg', border: 'border-danger/30' },
                  { name: 'SMS Gateway', status: 'Healthy', ping: '20ms', color: 'text-success', bg: 'bg-success-bg', border: 'border-success/20' },
                  { name: 'WhatsApp Service', status: 'Warning', ping: '180ms', color: 'text-warning', bg: 'bg-warning-bg', border: 'border-warning/30' },
                ].map((sys, i) => (
                  <div key={i} className={`p-4 rounded-2xl border ${sys.border} bg-bg-page hover:bg-bg-page/50 transition-colors flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${sys.bg}`}>
                        {sys.status === 'Healthy' && <CheckCircle className={`w-5 h-5 ${sys.color}`} />}
                        {sys.status === 'Warning' && <AlertTriangle className={`w-5 h-5 ${sys.color}`} />}
                        {sys.status === 'Down' && <XCircle className={`w-5 h-5 ${sys.color}`} />}
                      </div>
                      <div>
                        <h3 className="font-bold text-primary text-sm">{sys.name}</h3>
                        <p className="text-xs text-secondary font-medium mt-0.5">Latency: {sys.ping}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${sys.bg} ${sys.color}`}>
                      {sys.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ERROR LOGS TAB */}
          {activeTab === 'logs' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6 mb-6">
                <h2 className="text-xl font-black text-primary flex items-center gap-2">
                  <Bug className="w-6 h-6 text-danger" /> Error Logs
                </h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search logs..." className="pl-9 pr-4 py-2 bg-bg-page border border-border/50 rounded-xl text-sm focus:ring-2 focus:ring-theme-primary" />
                  </div>
                  <button className="p-2 border border-border/50 bg-bg-page rounded-xl text-secondary hover:text-primary transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Timestamp</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Type</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Error Message</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {[
                      { time: '2 mins ago', type: 'Payment Error', msg: 'Webhook verification failed for sub_123', alert: 'text-danger', bg: 'bg-danger-bg' },
                      { time: '1 hour ago', type: 'Notification Error', msg: 'Failed to send WhatsApp template to +91...', alert: 'text-warning', bg: 'bg-warning-bg' },
                      { time: '3 hours ago', type: 'Auth Error', msg: 'Invalid token signature detected (IP: 45.x.x.x)', alert: 'text-danger', bg: 'bg-danger-bg' },
                      { time: '5 hours ago', type: 'Application Error', msg: 'NullReferenceException in DashboardController', alert: 'text-danger', bg: 'bg-danger-bg' },
                      { time: '1 day ago', type: 'API Error', msg: 'Rate limit exceeded on external API provider', alert: 'text-warning', bg: 'bg-warning-bg' },
                    ].map((log, i) => (
                      <tr key={i} className="hover:bg-bg-page/50 transition-colors group">
                        <td className="py-4 px-4 text-sm font-medium text-secondary">{log.time}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${log.bg} ${log.alert}`}>
                            {log.type}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm font-bold text-primary truncate max-w-xs">{log.msg}</td>
                        <td className="py-4 px-4 text-right space-x-2">
                          <button className="p-1.5 text-info hover:bg-info-bg rounded-lg transition-colors" title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-success hover:bg-success-bg rounded-lg transition-colors" title="Mark Resolved">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* BACKGROUND JOBS TAB */}
          {activeTab === 'jobs' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-info-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2"><Clock className="w-6 h-6 text-info" /> Background Jobs</div>
                <div className="flex items-center gap-2 text-sm font-bold text-info bg-info-bg px-3 py-1.5 rounded-xl border border-info/20">
                  <Activity className="w-4 h-4 animate-pulse" /> 3 Jobs Running
                </div>
              </h2>
              
              <div className="grid grid-cols-1 gap-4 relative z-10">
                {[
                  { name: 'Subscription Reminders', type: 'Notification', status: 'Running', progress: '45%', color: 'text-info', bg: 'bg-info-bg' },
                  { name: 'Invoice Generation (Monthly)', type: 'Data Processing', status: 'Pending', progress: '0%', color: 'text-warning', bg: 'bg-warning-bg' },
                  { name: 'System Cleanup (Temp files)', type: 'Cleanup Job', status: 'Success', progress: '100%', color: 'text-success', bg: 'bg-success-bg' },
                  { name: 'Data Migration Sync', type: 'Data Processing', status: 'Failed', progress: '12%', color: 'text-danger', bg: 'bg-danger-bg' },
                ].map((job, i) => (
                  <div key={i} className="p-5 bg-bg-page border border-border/50 rounded-2xl hover:border-theme-primary/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-primary flex items-center gap-2">{job.name}</h3>
                        <p className="text-xs text-secondary font-medium mt-1">Type: {job.type}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${job.bg} ${job.color} flex items-center gap-1`}>
                        {job.status === 'Running' && <Activity className="w-3 h-3 animate-spin-slow" />}
                        {job.status === 'Failed' && <AlertTriangle className="w-3 h-3" />}
                        {job.status === 'Success' && <CheckCircle className="w-3 h-3" />}
                        {job.status === 'Pending' && <Clock className="w-3 h-3" />}
                        {job.status}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                      <div className={`h-full ${job.status === 'Failed' ? 'bg-danger' : job.status === 'Success' ? 'bg-success' : 'bg-info'}`} style={{ width: job.progress }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MAINTENANCE MODE TAB */}
          {activeTab === 'maintenance' && (
            <div className={`bg-card border ${maintenanceEnabled ? 'border-warning' : 'border-border/50'} rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden transition-colors`}>
              <div className={`absolute -right-10 -bottom-10 w-48 h-48 ${maintenanceEnabled ? 'bg-warning-bg' : 'bg-border/20'} rounded-full blur-3xl transition-colors`}></div>
              <h2 className={`text-xl font-black mb-6 border-b ${maintenanceEnabled ? 'border-warning/30 text-warning' : 'border-border/50 text-primary'} pb-4 flex items-center gap-2 relative z-10 transition-colors`}>
                <Power className="w-6 h-6" /> Maintenance Mode
              </h2>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between p-6 bg-bg-page border border-border/50 rounded-2xl">
                  <div>
                    <h3 className="font-bold text-primary text-lg">Enable Maintenance Mode</h3>
                    <p className="text-sm text-secondary font-medium mt-1">Restrict access to the platform for users and owners. Superadmin access remains available.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" className="sr-only peer" checked={maintenanceEnabled} onChange={() => setMaintenanceEnabled(!maintenanceEnabled)} />
                    <div className="w-16 h-8 bg-bg-card border border-border/50 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-warning rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-warning"></div>
                  </label>
                </div>

                {maintenanceEnabled && (
                  <div className="space-y-5 animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary uppercase tracking-wider">Maintenance Message to Display</label>
                      <textarea rows={3} className="w-full px-4 py-3 bg-warning/5 border border-warning/30 rounded-xl focus:ring-2 focus:ring-warning font-medium text-warning-fg placeholder-warning/50" defaultValue="We are currently undergoing scheduled maintenance to upgrade our systems. We will be back online shortly."></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary uppercase tracking-wider">Start Time</label>
                        <input type="datetime-local" className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-warning font-medium text-primary" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary uppercase tracking-wider">Estimated End Time</label>
                        <input type="datetime-local" className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-warning font-medium text-primary" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary uppercase tracking-wider">Allowed Roles (Bypass Maintenance)</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer opacity-50">
                          <input type="checkbox" checked disabled className="w-5 h-5 rounded border-border text-warning bg-bg-card" />
                          <span className="font-bold text-primary">Superadmin (Always)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="w-5 h-5 rounded border-border text-warning focus:ring-warning bg-bg-card" />
                          <span className="font-bold text-primary">Staff / Developer</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4 border-t border-border/50 mt-8">
                  <button className={`${maintenanceEnabled ? 'bg-warning hover:bg-warning/90 text-warning-fg' : 'bg-theme-primary hover:bg-theme-primary-hover text-white'} px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg`}>
                    <Server className="w-5 h-5" /> Save Configuration
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
