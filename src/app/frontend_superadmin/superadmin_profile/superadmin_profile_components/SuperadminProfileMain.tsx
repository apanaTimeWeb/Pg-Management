'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { User, Mail, Phone, Shield, Key, Smartphone, Clock, Monitor, Bell, Lock, AlertTriangle, CheckCircle, Save, LogOut } from 'lucide-react';
import { getSession } from '@/app/frontend_superadmin/superadmin_lib/superadmin_auth/SuperadminSession';

export function SuperadminProfileMain() {
  const [session, setSession] = useState<any>(null);
  
  useEffect(() => {
    setSession(getSession());
  }, []);

  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'personal');

  useEffect(() => {
    if (tabQuery) setActiveTab(tabQuery);
  }, [tabQuery]);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User, color: 'text-info' },
    { id: 'security', label: 'Security & 2FA', icon: Shield, color: 'text-success' },
    { id: 'sessions', label: 'Sessions & History', icon: Clock, color: 'text-warning' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-purple' },
  ];

  return (
    <div className="w-full h-full space-y-6">
      
      {/* 1. Profile Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <Shield className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-24 h-24 bg-white text-theme-primary rounded-full flex items-center justify-center text-4xl font-black shadow-xl border-4 border-white/20">
            {session?.name?.charAt(0).toUpperCase() || 'S'}
          </div>
          <div>
            <h1 className="text-3xl font-black mb-1">{session?.name || 'Super Admin'}</h1>
            <p className="text-white/80 font-medium mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4" /> {session?.email || 'admin@smartpg.com'}
            </p>
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md shadow-sm border border-white/20 uppercase tracking-widest">
              Role: System Administrator
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
          
          {/* PERSONAL INFO TAB */}
          {activeTab === 'personal' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2">
                <User className="w-6 h-6 text-info" /> Personal Information
              </h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-secondary" />
                      </div>
                      <input type="text" defaultValue={session?.name || 'Super Admin'} className="w-full pl-10 pr-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary focus:border-theme-primary transition-all font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-secondary" />
                      </div>
                      <input type="email" defaultValue={session?.email || 'admin@smartpg.com'} className="w-full pl-10 pr-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary focus:border-theme-primary transition-all font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">Mobile Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="w-5 h-5 text-secondary" />
                      </div>
                      <input type="tel" defaultValue="+91 9876543210" className="w-full pl-10 pr-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary focus:border-theme-primary transition-all font-medium" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-border/50">
                  <button type="button" className="bg-theme-primary hover:bg-theme-primary-hover text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
                    <Save className="w-5 h-5" /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SECURITY & 2FA TAB */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Change Password */}
              <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm">
                <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2">
                  <Key className="w-6 h-6 text-warning" /> Change Password
                </h2>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2 max-w-md">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary transition-all font-medium" />
                  </div>
                  <div className="space-y-2 max-w-md">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary transition-all font-medium" />
                  </div>
                  <div className="space-y-2 max-w-md">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary transition-all font-medium" />
                  </div>
                  <div className="pt-2">
                    <button type="button" className="bg-bg-page border border-border hover:border-theme-primary hover:text-theme-primary text-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              {/* 2FA & Security Settings */}
              <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm">
                <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-success" /> Two-Factor Authentication (2FA) & Security
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start justify-between p-5 bg-success-bg border border-success/30 rounded-2xl">
                    <div className="flex gap-4">
                      <div className="p-3 bg-success-bg rounded-xl text-success h-fit">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-success text-lg mb-1">Authenticator App</h3>
                        <p className="text-sm text-secondary font-medium max-w-md">Secure your account with TOTP (Time-based One Time Password) using Google Authenticator or Authy.</p>
                      </div>
                    </div>
                    <button className="bg-success text-white px-4 py-2 rounded-xl font-bold shadow-sm hover:bg-success/90 transition-colors shrink-0">
                      Enabled
                    </button>
                  </div>

                  <div className="flex items-start justify-between p-5 bg-bg-page border border-border/50 rounded-2xl">
                    <div className="flex gap-4">
                      <div className="p-3 bg-card border border-border/50 rounded-xl text-primary h-fit">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary text-lg mb-1">Strict IP Binding</h3>
                        <p className="text-sm text-secondary font-medium max-w-md">Only allow logins from recognized whitelisted IP addresses.</p>
                      </div>
                    </div>
                    <button className="bg-bg-page border border-border hover:bg-primary-subtle hover:border-theme-primary/30 text-primary hover:text-theme-primary px-4 py-2 rounded-xl font-bold transition-all shrink-0">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SESSIONS & HISTORY TAB */}
          {activeTab === 'sessions' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Active Sessions */}
              <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm">
                <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-6 h-6 text-info" /> Active Sessions
                  </div>
                  <button className="text-sm font-bold text-danger hover:bg-danger-bg px-3 py-1.5 rounded-lg transition-colors">
                    Logout All Other Devices
                  </button>
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-info-bg border border-info/30 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-info-bg text-info rounded-lg"><Monitor className="w-5 h-5" /></div>
                      <div>
                        <p className="font-bold text-primary">Windows 11 • Chrome Browser</p>
                        <p className="text-xs text-secondary font-medium mt-0.5">IP: 192.168.1.45 • Mumbai, India</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-success bg-success-bg px-3 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Current Session
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-bg-page border border-border/50 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-card border border-border text-secondary rounded-lg"><Smartphone className="w-5 h-5" /></div>
                      <div>
                        <p className="font-bold text-primary">iPhone 14 Pro • Safari</p>
                        <p className="text-xs text-secondary font-medium mt-0.5">IP: 112.196.25.10 • Delhi, India</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-danger hover:bg-danger-bg px-3 py-1 rounded-full transition-colors border border-transparent hover:border-danger/30 flex items-center gap-1">
                      <LogOut className="w-3 h-3" /> Revoke
                    </button>
                  </div>
                </div>
              </div>

              {/* Login History */}
              <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm">
                <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-warning" /> Recent Login History
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Date & Time</th>
                        <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Device & Browser</th>
                        <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">IP Address</th>
                        <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {[
                        { time: 'Today, 10:35 AM', device: 'Windows 11 • Chrome', ip: '192.168.1.45', status: 'Success' },
                        { time: 'Yesterday, 08:15 PM', device: 'iPhone 14 Pro • Safari', ip: '112.196.25.10', status: 'Success' },
                        { time: '2 Oct 2026, 11:20 AM', device: 'MacBook Pro • Firefox', ip: '45.112.89.2', status: 'Failed', alert: true },
                        { time: '1 Oct 2026, 09:00 AM', device: 'Windows 11 • Chrome', ip: '192.168.1.45', status: 'Success' },
                      ].map((log, i) => (
                        <tr key={i} className="hover:bg-bg-page/50 transition-colors group">
                          <td className="py-3 px-4 text-sm font-medium text-primary">{log.time}</td>
                          <td className="py-3 px-4 text-sm text-secondary">{log.device}</td>
                          <td className="py-3 px-4 text-sm text-secondary">{log.ip}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${log.alert ? 'bg-danger-bg text-danger' : 'bg-success-bg text-success'}`}>
                              {log.alert ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2">
                <Bell className="w-6 h-6 text-purple" /> Notification Preferences
              </h2>
              
              <div className="space-y-6">
                {[
                  { title: 'Security Alerts', desc: 'Get notified about new logins, password changes, and security events.', email: true, push: true, sms: true },
                  { title: 'System Updates', desc: 'Receive announcements about new features and scheduled maintenance.', email: true, push: false, sms: false },
                  { title: 'Owner Approvals', desc: 'Alerts when a new PG Owner registers and requires approval.', email: true, push: true, sms: false },
                  { title: 'Support Tickets', desc: 'Notifications for new high-priority support tickets raised by owners.', email: true, push: true, sms: false },
                  { title: 'Billing & Invoices', desc: 'Monthly subscription summaries and failed payment alerts.', email: true, push: false, sms: true },
                ].map((pref, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-bg-page rounded-2xl border border-border/50 hover:border-border transition-colors">
                    <div className="flex-1">
                      <h3 className="font-bold text-primary text-base mb-1">{pref.title}</h3>
                      <p className="text-sm text-secondary font-medium">{pref.desc}</p>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" defaultChecked={pref.email} className="w-4 h-4 rounded border-border text-theme-primary focus:ring-theme-primary bg-bg-card" />
                        <span className="text-sm font-bold text-secondary group-hover:text-primary transition-colors">Email</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" defaultChecked={pref.push} className="w-4 h-4 rounded border-border text-theme-primary focus:ring-theme-primary bg-bg-card" />
                        <span className="text-sm font-bold text-secondary group-hover:text-primary transition-colors">Push</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" defaultChecked={pref.sms} className="w-4 h-4 rounded border-border text-theme-primary focus:ring-theme-primary bg-bg-card" />
                        <span className="text-sm font-bold text-secondary group-hover:text-primary transition-colors">SMS</span>
                      </label>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-end pt-4 border-t border-border/50 mt-8">
                  <button type="button" className="bg-theme-primary hover:bg-theme-primary-hover text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
                    <Save className="w-5 h-5" /> Save Preferences
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
