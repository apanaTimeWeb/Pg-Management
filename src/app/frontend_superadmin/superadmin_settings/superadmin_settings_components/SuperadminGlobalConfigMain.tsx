// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Settings, Globe, Building, Bell, ShieldCheck, HardDrive, UploadCloud, Save, Plus } from 'lucide-react';

export function SuperadminGlobalConfigMain() {
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'platform');

  useEffect(() => {
    setActiveTab(tabQuery || 'platform');
  }, [tabQuery]);

  const tabs = [
    { id: 'platform', label: 'Platform Settings', icon: Globe, color: 'text-info', bg: 'bg-info-bg' },
    { id: 'pg', label: 'Default PG Settings', icon: Building, color: 'text-success', bg: 'bg-success-bg' },
    { id: 'notifications', label: 'Notification Rules', icon: Bell, color: 'text-warning', bg: 'bg-warning-bg' },
    { id: 'security', label: 'Security Policy', icon: ShieldCheck, color: 'text-danger', bg: 'bg-danger-bg' },
    { id: 'storage', label: 'File & Storage', icon: HardDrive, color: 'text-purple', bg: 'bg-purple-bg' },
  ];

  return (
    <div className="w-full h-full space-y-6 pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <Settings className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <Settings className="w-8 h-8" /> Global Configuration
            </h1>
            <p className="text-white/80 font-medium max-w-xl">
              Manage platform-wide configurations, default PG parameters, security policies, and storage limits.
            </p>
          </div>
          <button className="bg-white/20 backdrop-blur text-white border border-white/30 px-6 py-3 rounded-xl font-bold shadow-md hover:bg-white/90 transition-colors flex items-center gap-2 whitespace-nowrap">
            <Save className="w-5 h-5" /> Save All Changes
          </button>
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
          
          {/* PLATFORM SETTINGS TAB */}
          {activeTab === 'platform' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-info-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <Globe className="w-6 h-6 text-info" /> Platform Core Settings
              </h2>
              
              <div className="flex flex-col gap-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Platform Logos</label>
                  <div className="flex flex-wrap gap-4">
                    <div className="border-2 border-dashed border-border/50 p-6 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-info/50 hover:bg-info/5 transition-colors cursor-pointer text-center w-40">
                      <UploadCloud className="w-6 h-6 text-info" />
                      <span className="text-xs font-bold text-primary">Upload Logo</span>
                    </div>
                    <div className="border-2 border-dashed border-border/50 p-6 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-info/50 hover:bg-info/5 transition-colors cursor-pointer text-center w-40">
                      <UploadCloud className="w-6 h-6 text-info" />
                      <span className="text-xs font-bold text-primary">Upload Favicon</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Platform Name</label>
                  <input type="text" defaultValue="SmartPG Management" className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-info font-medium text-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Contact Email</label>
                  <input type="email" defaultValue="support@smartpg.in" className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-info font-medium text-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Support Contact Number</label>
                  <input type="text" defaultValue="+91 1800-123-4567" className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-info font-medium text-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Official Website</label>
                  <input type="text" defaultValue="https://smartpg.in" className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-info font-medium text-primary" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Default Language</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-info font-medium text-primary cursor-pointer">
                    <option>English (US)</option>
                    <option>Hindi (IN)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Timezone</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-info font-medium text-primary cursor-pointer">
                    <option>Asia/Kolkata (IST)</option>
                    <option>America/New_York (EST)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Currency</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-info font-medium text-primary cursor-pointer">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Date Format</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-info font-medium text-primary cursor-pointer">
                    <option>DD-MM-YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* DEFAULT PG SETTINGS TAB */}
          {activeTab === 'pg' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-success-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <Building className="w-6 h-6 text-success" /> Default PG Templates
              </h2>
              
              <div className="flex flex-col gap-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Default Room Types</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-success font-medium text-primary cursor-pointer">
                    <option>Single AC, Double Non-AC, Triple AC</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Default Bed Types</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-success font-medium text-primary cursor-pointer">
                    <option>Standard, Bunk Bed, Premium</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Default Payment Modes</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-success font-medium text-primary cursor-pointer">
                    <option>UPI, Cash, Credit Card, Net Banking</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Default Leave Types</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-success font-medium text-primary cursor-pointer">
                    <option>Home Visit, Vacation, Sick Leave</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Default Meal Types</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-success font-medium text-primary cursor-pointer">
                    <option>Breakfast, Lunch, Snacks, Dinner</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Default Complaint Categories</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-success font-medium text-primary cursor-pointer">
                    <option>Plumbing, Electrical, Internet, Food</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATION RULES TAB */}
          {activeTab === 'notifications' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-warning-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <Bell className="w-6 h-6 text-warning" /> Notification Event Rules
              </h2>
              
              <div className="relative z-10 overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Event Name</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">Email</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">SMS</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">WhatsApp</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">In-App</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {[
                      { name: 'New PG Registration', email: true, sms: false, wa: false, inapp: true },
                      { name: 'PG Approval', email: true, sms: true, wa: true, inapp: true },
                      { name: 'Subscription Expiry', email: true, sms: true, wa: true, inapp: true },
                      { name: 'Payment Success', email: true, sms: true, wa: true, inapp: true },
                      { name: 'Payment Failure', email: true, sms: true, wa: true, inapp: true },
                      { name: 'User Creation', email: true, sms: true, wa: true, inapp: false },
                      { name: 'Password Reset', email: true, sms: true, wa: false, inapp: false },
                      { name: 'Support Ticket', email: true, sms: false, wa: false, inapp: true },
                      { name: 'System Announcement', email: true, sms: false, wa: false, inapp: true },
                    ].map((event, i) => (
                      <tr key={i} className="hover:bg-bg-page/50 transition-colors">
                        <td className="py-4 px-4 text-sm font-bold text-primary">{event.name}</td>
                        <td className="py-4 px-4 text-center">
                          <input type="checkbox" defaultChecked={event.email} className="w-5 h-5 rounded border-border text-warning focus:ring-warning bg-bg-page" />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input type="checkbox" defaultChecked={event.sms} className="w-5 h-5 rounded border-border text-warning focus:ring-warning bg-bg-page" />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input type="checkbox" defaultChecked={event.wa} className="w-5 h-5 rounded border-border text-warning focus:ring-warning bg-bg-page" />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input type="checkbox" defaultChecked={event.inapp} className="w-5 h-5 rounded border-border text-warning focus:ring-warning bg-bg-page" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECURITY POLICY TAB */}
          {activeTab === 'security' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-danger-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <ShieldCheck className="w-6 h-6 text-danger" /> Security & Access Controls
              </h2>
              
              <div className="flex flex-col gap-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Password Policy</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-danger font-medium text-primary cursor-pointer">
                    <option>Strong (Min 8 chars, 1 Uppercase, 1 Number, 1 Symbol)</option>
                    <option>Medium (Min 8 chars, 1 Number)</option>
                    <option>Basic (Min 6 chars)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Session Timeout (Idle time)</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-danger font-medium text-primary cursor-pointer">
                    <option>15 Minutes</option>
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>12 Hours</option>
                    <option>Never</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Login Attempt Limit</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-danger font-medium text-primary cursor-pointer">
                    <option>3 Attempts</option>
                    <option>5 Attempts</option>
                    <option>10 Attempts</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Account Lockout Duration</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-danger font-medium text-primary cursor-pointer">
                    <option>15 Minutes</option>
                    <option>1 Hour</option>
                    <option>24 Hours</option>
                    <option>Require Admin Unlock</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">OTP Settings (Length)</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-danger font-medium text-primary cursor-pointer">
                    <option>4 Digits</option>
                    <option>6 Digits</option>
                  </select>
                </div>
                
                <div className="md:col-span-2 pt-4 border-t border-border/50 space-y-4">
                  <label className="flex items-center justify-between p-4 bg-bg-page rounded-2xl border border-border/50 hover:border-danger/30 cursor-pointer transition-colors group">
                    <div>
                      <p className="font-bold text-primary group-hover:text-danger transition-colors">Enforce Two-Factor Authentication (2FA)</p>
                      <p className="text-xs text-secondary font-medium mt-1">Require all Admins and Managers to use 2FA to login.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-6 h-6 rounded border-border text-danger focus:ring-danger bg-bg-card" />
                  </label>
                  <label className="flex items-center justify-between p-4 bg-bg-page rounded-2xl border border-border/50 hover:border-danger/30 cursor-pointer transition-colors group">
                    <div>
                      <p className="font-bold text-primary group-hover:text-danger transition-colors">Device & Session Controls</p>
                      <p className="text-xs text-secondary font-medium mt-1">Restrict users from logging in on multiple devices simultaneously.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-6 h-6 rounded border-border text-danger focus:ring-danger bg-bg-card" />
                  </label>
                  <label className="flex items-center justify-between p-4 bg-bg-page rounded-2xl border border-border/50 hover:border-danger/30 cursor-pointer transition-colors group">
                    <div>
                      <p className="font-bold text-primary group-hover:text-danger transition-colors">IP Restrictions</p>
                      <p className="text-xs text-secondary font-medium mt-1">Block logins from unusual locations automatically.</p>
                    </div>
                    <input type="checkbox" className="w-6 h-6 rounded border-border text-danger focus:ring-danger bg-bg-card" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* FILE / STORAGE TAB */}
          {activeTab === 'storage' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-purple-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <HardDrive className="w-6 h-6 text-purple" /> File & Storage Settings
              </h2>
              
              <div className="flex flex-col gap-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Maximum File Upload Size</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-purple font-medium text-primary cursor-pointer">
                    <option>5 MB</option>
                    <option>10 MB</option>
                    <option>25 MB</option>
                    <option>50 MB</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Document Retention Period</label>
                  <select className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-purple font-medium text-primary cursor-pointer">
                    <option>1 Year after expiry</option>
                    <option>3 Years after expiry</option>
                    <option>Indefinite (Never delete)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">Allowed File Types for Upload</label>
                  <input type="text" defaultValue=".jpg, .jpeg, .png, .pdf, .csv, .xlsx" className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-purple font-medium text-primary" />
                </div>
                
                <div className="md:col-span-2 pt-4 border-t border-border/50 space-y-4">
                  <label className="flex items-center justify-between p-4 bg-bg-page rounded-2xl border border-border/50 hover:border-purple/30 cursor-pointer transition-colors group">
                    <div>
                      <p className="font-bold text-primary group-hover:text-purple transition-colors">Auto Image Compression</p>
                      <p className="text-xs text-secondary font-medium mt-1">Compress uploaded images (ID proofs, Profile pics) automatically to save space.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-6 h-6 rounded border-border text-purple focus:ring-purple bg-bg-card" />
                  </label>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
