'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, History, LogIn, Monitor, ShieldAlert, Search, Filter, Eye, AlertTriangle, UserX, CheckCircle, MapPin, MonitorSmartphone } from 'lucide-react';

export function SuperadminAuditSecurityMain() {
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'auditLogs');

  useEffect(() => {
    setActiveTab(tabQuery || 'auditLogs');
  }, [tabQuery]);

  const tabs = [
    { id: 'auditLogs', label: 'Audit Logs', icon: History, color: 'text-info', bg: 'bg-info-bg' },
    { id: 'loginActivity', label: 'Login Activity', icon: LogIn, color: 'text-success', bg: 'bg-success-bg' },
    { id: 'activeSessions', label: 'Active Sessions', icon: Monitor, color: 'text-theme-primary', bg: 'bg-primary-subtle' },
    { id: 'securityAlerts', label: 'Security Alerts', icon: ShieldAlert, color: 'text-danger', bg: 'bg-danger-bg' },
  ];

  return (
    <div className="w-full h-full space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <ShieldCheck className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8" /> Audit & Security
          </h1>
          <p className="text-white/80 font-medium max-w-xl">
            Track user activities, monitor active sessions, and review critical security alerts across the system.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="inline-flex items-center gap-2 bg-success-bg text-white px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md shadow-sm border border-success/30">
              <CheckCircle className="w-4 h-4" /> System Secure
            </div>
            <div className="inline-flex items-center gap-2 bg-danger-bg text-white px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md shadow-sm border border-danger/30">
              <AlertTriangle className="w-4 h-4" /> 3 Security Alerts
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
          
          {/* AUDIT LOGS TAB */}
          {activeTab === 'auditLogs' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-info-bg rounded-full blur-3xl"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6 mb-6 relative z-10">
                <h2 className="text-xl font-black text-primary flex items-center gap-2">
                  <History className="w-6 h-6 text-info" /> Audit Logs
                </h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search by Who, What, PG..." className="pl-9 pr-4 py-2 bg-bg-page border border-border/50 rounded-xl text-sm focus:ring-2 focus:ring-info font-medium" />
                  </div>
                  <button className="p-2 border border-border/50 bg-bg-page rounded-xl text-secondary hover:text-primary transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                {[
                  { who: 'Superadmin (Rahul)', action: 'Changed Plan', pg: 'ABC Hostel', old: 'Basic', new: 'Pro', time: '02 Oct 2026, 10:32 PM', ip: '45.112.x.x', device: 'Windows / Chrome' },
                  { who: 'Owner (Amit Singh)', action: 'Deleted Tenant', pg: 'Sunshine PG', old: 'Tenant ID: 145', new: 'Deleted', time: '02 Oct 2026, 09:15 PM', ip: '102.45.x.x', device: 'iPhone / Safari' },
                  { who: 'Manager (Vikas)', action: 'Updated Rent', pg: 'Blue Lagoon', old: '₹5,000', new: '₹5,500', time: '01 Oct 2026, 11:45 AM', ip: '27.100.x.x', device: 'Android / Chrome' },
                ].map((log, i) => (
                  <div key={i} className="bg-bg-page border border-border/50 rounded-2xl p-5 hover:border-info/30 transition-colors">
                    <div className="flex items-center justify-between mb-3 border-b border-border/50 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-info-bg text-info flex items-center justify-center font-bold">{log.who.charAt(0)}</div>
                        <div>
                          <p className="font-bold text-primary text-sm">{log.who}</p>
                          <p className="text-xs text-secondary font-medium">{log.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-info-bg text-info px-3 py-1 rounded-lg text-xs font-bold">{log.action}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mt-3">
                      <div>
                        <p className="text-xs text-secondary uppercase font-bold tracking-wider mb-1">PG Property</p>
                        <p className="font-medium text-primary">{log.pg}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-secondary uppercase font-bold tracking-wider mb-1">Changes Made</p>
                        <p className="font-medium text-primary flex items-center gap-2">
                          <span className="line-through text-danger">{log.old}</span> → <span className="text-success">{log.new}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <button className="text-info font-bold text-xs hover:underline flex items-center justify-end gap-1 w-full"><Eye className="w-3 h-3" /> Details</button>
                        <p className="text-[10px] text-secondary mt-1">{log.device} • {log.ip}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LOGIN ACTIVITY TAB */}
          {activeTab === 'loginActivity' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-success-bg rounded-full blur-3xl"></div>
              
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <LogIn className="w-6 h-6 text-success" /> Login Activity
              </h2>

              <div className="overflow-x-auto relative z-10">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">User</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Event</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Device & IP</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Location</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {[
                      { user: 'Rahul Sharma (Owner)', event: 'Successful Login', device: 'Windows 11 / Chrome (45.112.x.x)', loc: 'Mumbai, India', time: '10 mins ago', success: true },
                      { user: 'Amit Singh (Owner)', event: 'Failed Login (Wrong Password)', device: 'iPhone 14 / Safari (102.45.x.x)', loc: 'Delhi, India', time: '1 hour ago', success: false },
                      { user: 'Vikas (Manager)', event: 'Logout', device: 'Android / Chrome (27.100.x.x)', loc: 'Pune, India', time: '3 hours ago', success: true, neutral: true },
                      { user: 'Unknown', event: 'Failed Login (Invalid User)', device: 'Unknown / Bot (185.12.x.x)', loc: 'Moscow, Russia', time: '5 hours ago', success: false },
                    ].map((log, i) => (
                      <tr key={i} className="hover:bg-bg-page/50 transition-colors">
                        <td className="py-4 px-4 text-sm font-bold text-primary">{log.user}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${log.success && !log.neutral ? 'bg-success-bg text-success' : log.neutral ? 'bg-secondary/10 text-secondary' : 'bg-danger-bg text-danger'}`}>
                            {log.event}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-secondary font-medium">
                          <div className="flex items-center gap-2"><MonitorSmartphone className="w-3.5 h-3.5" /> {log.device}</div>
                        </td>
                        <td className="py-4 px-4 text-sm text-secondary font-medium">
                          <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {log.loc}</div>
                        </td>
                        <td className="py-4 px-4 text-sm text-secondary">{log.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ACTIVE SESSIONS TAB */}
          {activeTab === 'activeSessions' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary-subtle rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2"><Monitor className="w-6 h-6 text-theme-primary" /> Active User Sessions</div>
                <div className="flex items-center gap-2 text-sm font-bold text-theme-primary bg-primary-subtle px-3 py-1.5 rounded-xl border border-theme-primary/20">
                   1,245 Online Now
                </div>
              </h2>
              
              <div className="grid grid-cols-1 gap-4 relative z-10">
                {[
                  { user: 'Rahul Sharma (Owner)', role: 'Owner', device: 'Windows 11 / Chrome', ip: '45.112.89.2', loginTime: 'Today, 10:00 AM', lastActive: '2 mins ago' },
                  { user: 'Neha Verma (Student)', role: 'Student', device: 'iPhone 13 / App', ip: '112.196.25.10', loginTime: 'Today, 08:30 AM', lastActive: 'Active Now' },
                  { user: 'Vikas Kumar (Manager)', role: 'Manager', device: 'MacBook Air / Safari', ip: '27.100.45.12', loginTime: 'Yesterday, 09:00 AM', lastActive: '5 mins ago' },
                ].map((session, i) => (
                  <div key={i} className="p-5 bg-bg-page border border-border/50 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-theme-primary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-card border border-border/50 rounded-xl flex items-center justify-center font-bold text-lg text-theme-primary shadow-sm">
                        {session.user.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-primary text-sm">{session.user} <span className="text-xs font-bold bg-border px-2 py-0.5 rounded text-secondary ml-2">{session.role}</span></h3>
                        <p className="text-xs text-secondary font-medium mt-1">Device: {session.device} • IP: {session.ip}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-6 md:min-w-[300px]">
                      <div className="text-left md:text-right">
                        <p className="text-xs text-secondary uppercase font-bold tracking-wider mb-1">Last Active</p>
                        <p className={`text-sm font-bold ${session.lastActive === 'Active Now' ? 'text-success' : 'text-primary'}`}>{session.lastActive}</p>
                      </div>
                      <button className="bg-danger-bg text-danger hover:bg-danger hover:text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm text-xs border border-transparent hover:border-danger/30">
                        <UserX className="w-4 h-4" /> Force Logout
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECURITY ALERTS TAB */}
          {activeTab === 'securityAlerts' && (
            <div className="bg-card border border-danger/20 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-danger-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-danger mb-6 border-b border-danger/20 pb-4 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2"><ShieldAlert className="w-6 h-6" /> Security Alerts</div>
                <button className="text-sm font-bold text-danger hover:bg-danger-bg px-3 py-1.5 rounded-lg transition-colors">
                  Dismiss All
                </button>
              </h2>

              <div className="space-y-4 relative z-10">
                {[
                  { title: 'Multiple Failed Logins Detected', desc: '5 failed login attempts for user rahul.s@gmail.com within 2 minutes from IP 185.12.x.x (Moscow, RU). Account temporarily locked.', type: 'High', time: '10 mins ago' },
                  { title: 'Suspicious Permission Change', desc: 'Manager Vikas assigned "Delete PG" permissions to Cook Ramesh.', type: 'Critical', time: '1 hour ago' },
                  { title: 'Unusual API Usage', desc: 'Rate limit exceeded on endpoint /api/export/users by user Amit Singh.', type: 'Medium', time: '3 hours ago' },
                ].map((alert, i) => (
                  <div key={i} className={`p-5 rounded-2xl border ${alert.type === 'Critical' ? 'border-danger bg-danger/5' : alert.type === 'High' ? 'border-warning bg-warning/5' : 'border-info/30 bg-info/5'} flex items-start gap-4`}>
                    <div className="shrink-0 mt-1">
                      {alert.type === 'Critical' && <ShieldAlert className="w-6 h-6 text-danger" />}
                      {alert.type === 'High' && <AlertTriangle className="w-6 h-6 text-warning" />}
                      {alert.type === 'Medium' && <Search className="w-6 h-6 text-info" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-bold text-base ${alert.type === 'Critical' ? 'text-danger' : alert.type === 'High' ? 'text-warning' : 'text-info'}`}>{alert.title}</h3>
                        <span className="text-xs font-bold text-secondary">{alert.time}</span>
                      </div>
                      <p className="text-sm text-primary font-medium">{alert.desc}</p>
                      <div className="mt-4 flex gap-3">
                        <button className={`px-4 py-1.5 rounded-lg text-xs font-bold ${alert.type === 'Critical' ? 'bg-danger text-white' : alert.type === 'High' ? 'bg-warning text-warning-fg' : 'bg-info text-white'}`}>Investigate</button>
                        <button className="px-4 py-1.5 rounded-lg text-xs font-bold bg-bg-card border border-border hover:bg-border/50 text-secondary transition-colors">Dismiss</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
