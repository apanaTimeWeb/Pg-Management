// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  User, Shield, Bell, LogOut, Key, Smartphone, Mail, Building, 
  MapPin, Activity, Clock, Laptop, Monitor, RefreshCw, CheckCircle2, AlertTriangle, Fingerprint
} from 'lucide-react';

export default function ManagerProfileMain() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'sessions'>('profile');

  // Dummy state for notifications
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <User className="w-6 h-6"/>
            </div>
            My Profile & Security
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage your personal information, security settings, and active sessions.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-md' : 'bg-card text-secondary hover:bg-page border border-border/50'}`}
          >
            <User className="w-5 h-5" />
            Personal Information
          </button>
          
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'security' ? 'bg-indigo-600 text-white shadow-md' : 'bg-card text-secondary hover:bg-page border border-border/50'}`}
          >
            <Shield className="w-5 h-5" />
            Security & Password
          </button>

          <button 
            onClick={() => setActiveTab('sessions')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'sessions' ? 'bg-indigo-600 text-white shadow-md' : 'bg-card text-secondary hover:bg-page border border-border/50'}`}
          >
            <Activity className="w-5 h-5" />
            Active Sessions & History
          </button>

          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'notifications' ? 'bg-indigo-600 text-white shadow-md' : 'bg-card text-secondary hover:bg-page border border-border/50'}`}
          >
            <Bell className="w-5 h-5" />
            Notification Preferences
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border/60 rounded-2xl shadow-sm p-6 md:p-8">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-4 border-b border-border/50 pb-6">
                  <div className="w-20 h-20 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 border-2 border-indigo-200">
                    <User className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">Rohan Sharma</h2>
                    <p className="text-secondary font-medium">Manager</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                      <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs font-bold">
                        ID: MGR-2023-089
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-secondary flex items-center gap-2">
                      <Smartphone className="w-4 h-4" /> Mobile Number
                    </label>
                    <input 
                      type="text" 
                      defaultValue="+91 9876543210" 
                      readOnly 
                      className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm font-bold text-primary focus:outline-none cursor-not-allowed opacity-80"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-secondary flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email Address
                    </label>
                    <input 
                      type="text" 
                      defaultValue="rohan.manager@smartpg.com" 
                      readOnly 
                      className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm font-bold text-primary focus:outline-none cursor-not-allowed opacity-80"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-secondary flex items-center gap-2">
                      <Building className="w-4 h-4" /> Assigned PG
                    </label>
                    <input 
                      type="text" 
                      defaultValue="Sunrise PG" 
                      readOnly 
                      className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm font-bold text-primary focus:outline-none cursor-not-allowed opacity-80"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-secondary flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Assigned Building
                    </label>
                    <input 
                      type="text" 
                      defaultValue="Block A (Boys)" 
                      readOnly 
                      className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm font-bold text-primary focus:outline-none cursor-not-allowed opacity-80"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button className="bg-gradient-to-r from-[#1A3A5C] to-[#122a42] hover:from-[#152e4a] hover:to-[#0f2338] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all">
                    Request Profile Update
                  </button>
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                
                <div>
                  <h3 className="text-lg font-bold text-primary mb-1 flex items-center gap-2">
                    <Key className="w-5 h-5 text-indigo-600" /> Change Password
                  </h3>
                  <p className="text-secondary text-sm mb-6">Ensure your account is using a long, random password to stay secure.</p>
                  
                  <div className="space-y-5 max-w-md">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-secondary">Current Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm font-medium text-primary focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-secondary">New Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm font-medium text-primary focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-secondary">Confirm New Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm font-medium text-primary focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all w-full md:w-auto">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-orange-50/50 p-5 rounded-2xl border border-orange-100">
                    <div>
                      <h3 className="text-md font-bold text-orange-800 mb-1 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" /> Forgot Password / Reset
                      </h3>
                      <p className="text-orange-700/80 text-sm">If you've forgotten your password or need a reset link sent to your registered email.</p>
                    </div>
                    <button className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all whitespace-nowrap">
                      Send Reset Link
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SESSIONS TAB */}
            {activeTab === 'sessions' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                        <Monitor className="w-5 h-5 text-indigo-600" /> Active Sessions
                      </h3>
                      <p className="text-secondary text-sm">Devices currently logged into your account.</p>
                    </div>
                    <button className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                      Terminate All Other Sessions
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Current Session */}
                    <div className="flex items-start gap-4 p-4 border border-indigo-200 bg-indigo-50/30 rounded-2xl">
                      <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                        <Laptop className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-primary flex items-center gap-2">
                            Windows PC - Chrome
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-md text-[10px] font-black uppercase tracking-wider">Current</span>
                          </h4>
                        </div>
                        <p className="text-secondary text-sm mt-1">IP: 192.168.1.45 • Mumbai, India</p>
                        <p className="text-indigo-600/80 text-xs font-medium mt-1">Active right now</p>
                      </div>
                    </div>

                    {/* Other Session */}
                    <div className="flex items-start gap-4 p-4 border border-border/60 bg-page/30 rounded-2xl">
                      <div className="p-3 bg-gray-100 text-gray-500 rounded-xl">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-primary">iPhone 13 - Safari</h4>
                          <button className="text-red-500 hover:text-red-700 text-sm font-bold">Logout</button>
                        </div>
                        <p className="text-secondary text-sm mt-1">IP: 103.45.67.89 • Delhi, India</p>
                        <p className="text-gray-500 text-xs font-medium mt-1">Last active: 2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-8">
                  <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600" /> Recent Login History
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="pb-3 text-sm font-bold text-secondary">Date & Time</th>
                          <th className="pb-3 text-sm font-bold text-secondary">Device / Browser</th>
                          <th className="pb-3 text-sm font-bold text-secondary">IP Address</th>
                          <th className="pb-3 text-sm font-bold text-secondary">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr className="border-b border-border/30 hover:bg-page/50 transition-colors">
                          <td className="py-4 text-primary font-medium">03 Oct 2026, 10:30 AM</td>
                          <td className="py-4 text-secondary">Windows PC • Chrome</td>
                          <td className="py-4 text-secondary">192.168.1.45</td>
                          <td className="py-4">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold">Success</span>
                          </td>
                        </tr>
                        <tr className="border-b border-border/30 hover:bg-page/50 transition-colors">
                          <td className="py-4 text-primary font-medium">02 Oct 2026, 08:15 PM</td>
                          <td className="py-4 text-secondary">iPhone 13 • Safari</td>
                          <td className="py-4 text-secondary">103.45.67.89</td>
                          <td className="py-4">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold">Success</span>
                          </td>
                        </tr>
                        <tr className="hover:bg-page/50 transition-colors">
                          <td className="py-4 text-primary font-medium">01 Oct 2026, 11:45 PM</td>
                          <td className="py-4 text-secondary">Unknown Device</td>
                          <td className="py-4 text-secondary">45.22.11.90</td>
                          <td className="py-4">
                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs font-bold">Failed</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                
                <div>
                  <h3 className="text-lg font-bold text-primary mb-1 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-indigo-600" /> Notification Preferences
                  </h3>
                  <p className="text-secondary text-sm mb-6">Choose how you want to receive alerts and updates regarding your assigned PG.</p>
                  
                  <div className="space-y-6 max-w-2xl">
                    
                    {/* Item */}
                    <div className="flex items-center justify-between p-4 border border-border/60 rounded-2xl bg-page/30">
                      <div>
                        <h4 className="font-bold text-primary">Email Notifications</h4>
                        <p className="text-sm text-secondary mt-0.5">Receive daily summaries, major alerts, and reports via email.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    {/* Item */}
                    <div className="flex items-center justify-between p-4 border border-border/60 rounded-2xl bg-page/30">
                      <div>
                        <h4 className="font-bold text-primary">SMS Alerts</h4>
                        <p className="text-sm text-secondary mt-0.5">Get instant text messages for critical events like check-ins or emergencies.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={smsNotifs} onChange={() => setSmsNotifs(!smsNotifs)} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    {/* Item */}
                    <div className="flex items-center justify-between p-4 border border-border/60 rounded-2xl bg-page/30">
                      <div>
                        <h4 className="font-bold text-primary">Push Notifications</h4>
                        <p className="text-sm text-secondary mt-0.5">Receive real-time alerts on your dashboard and mobile app.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={pushNotifs} onChange={() => setPushNotifs(!pushNotifs)} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                  </div>
                  
                  <div className="mt-8">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all">
                      Save Preferences
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
      
    </div>
  );
}
