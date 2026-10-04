// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { User, ShieldCheck, Mail, Phone, Lock, Key, History, Smartphone, Bell, Building, LogOut, Save, Camera, Edit3 } from 'lucide-react';

export default function MyProfilePage() {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: User, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'pg_info', label: 'PG Information', icon: Building, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'contact', label: 'Contact (Email & Mobile)', icon: Mail, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 'security', label: 'Security & 2FA', icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-50' },
    { id: 'sessions', label: 'Login History & Sessions', icon: History, color: 'text-teal-500', bg: 'bg-teal-50' },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <User className="w-8 h-8 text-[#F5A623]" />
            My Profile & Security
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage your personal information, security settings, and notifications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar for Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-sm ${
                activeTab === tab.id
                  ? 'bg-card shadow-md text-primary border-l-4 border-[#F5A623]'
                  : 'text-[var(--text-disabled)] hover:bg-[var(--bg-overlay)] hover:text-secondary border-l-4 border-transparent'
              }`}
            >
              <div className={`p-2 rounded-lg ${activeTab === tab.id ? tab.bg : 'bg-[var(--bg-overlay)]'}`}>
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? tab.color : 'text-gray-400'}`} />
              </div>
              {tab.label}
            </button>
          ))}

          <div className="pt-6 mt-6 border-t border-border">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 font-bold transition-colors">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-2xl shadow-sm border border-border/50 min-h-[500px]">
            
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-primary">Personal Information</h2>
                  <button onClick={() => alert('Profile Updated Successfully!')} className="flex items-center gap-2 text-sm font-bold text-white bg-[#F5A623] hover:bg-[#e09612] px-4 py-2 rounded-lg transition-colors">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#1A3A5C] to-[#2D7D9A] flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
                        O
                      </div>
                      <button className="absolute bottom-0 right-0 p-2 bg-[#F5A623] text-white rounded-full shadow-md hover:scale-105 transition-transform">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Profile Photo</span>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-2">First Name</label>
                      <input type="text" defaultValue="Admin" className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-all outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-2">Last Name</label>
                      <input type="text" defaultValue="Owner" className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-all outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-2">Gender</label>
                      <select className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-all outline-none">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-2">Date of Birth</label>
                      <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-all outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-bold text-primary mb-8">Security & 2FA</h2>
                
                <div className="space-y-8">
                  {/* Password Section */}
                  <div className="p-5 border border-border/50 rounded-2xl bg-page/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                          <Lock className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-primary">Change Password</h3>
                          <p className="text-xs text-[var(--text-disabled)]">Ensure your account uses a long, random password.</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-card border border-border text-secondary font-semibold rounded-lg text-sm hover:bg-page transition-colors">
                        Update
                      </button>
                    </div>
                  </div>

                  {/* 2FA Section */}
                  <div className="p-5 border border-border/50 rounded-2xl bg-page/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-primary">Two-Factor Authentication (2FA)</h3>
                          <p className="text-xs text-[var(--text-disabled)]">Add additional security to your account using OTP.</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg text-sm hover:bg-green-700 transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Login History */}
            {activeTab === 'sessions' && (
              <div className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-bold text-primary mb-6">Login History & Active Sessions</h2>
                
                <div className="space-y-4">
                  {[
                    { device: 'MacBook Pro - Chrome', loc: 'Delhi, India', time: 'Active now', icon: History, color: 'text-green-500' },
                    { device: 'iPhone 13 - Safari', loc: 'Delhi, India', time: '2 hours ago', icon: Smartphone, color: 'text-[var(--text-disabled)]' },
                    { device: 'Windows PC - Edge', loc: 'Varanasi, India', time: 'Yesterday', icon: History, color: 'text-[var(--text-disabled)]' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-border/50 rounded-xl hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-page rounded-full">
                          <s.icon className={`w-5 h-5 ${s.color}`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-primary text-sm">{s.device}</h4>
                          <p className="text-xs text-[var(--text-disabled)]">{s.loc} • {s.time}</p>
                        </div>
                      </div>
                      {i !== 0 && (
                        <button className="text-sm font-semibold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                          Revoke
                        </button>
                      )}
                      {i === 0 && (
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Current</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other tabs placeholder */}
            {['pg_info', 'contact', 'notifications'].includes(activeTab) && (
              <div className="p-6 md:p-8 flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in-95 duration-500 pt-24">
                <div className="w-20 h-20 bg-page rounded-full flex items-center justify-center mb-4">
                  <Edit3 className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-primary mb-2 capitalize">{activeTab.replace('_', ' ')} Settings</h2>
                <p className="text-[var(--text-disabled)] max-w-sm">This section allows you to manage your {activeTab.replace('_', ' ')} preferences. Form fields will be available here.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
