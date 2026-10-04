// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { Building2, Bed, Wallet, ClipboardCheck, UtensilsCrossed, CalendarClock, Users, Wrench, Bell, ScrollText, Save, Image as ImageIcon, MapPin, Phone, Globe, IndianRupee, AlertCircle, FileText, Clock, Menu } from 'lucide-react';

export default function PGSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const settingsTabs = [
    { id: 'general', label: 'General Info', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'rooms', label: 'Room Settings', icon: Bed, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'fees', label: 'Fee Settings', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'admissions', label: 'Admissions', icon: ClipboardCheck, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'mess', label: 'Mess / Food', icon: UtensilsCrossed, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'leave', label: 'Leave Settings', icon: CalendarClock, color: 'text-teal-600', bg: 'bg-teal-50' },
    { id: 'visitors', label: 'Visitor Settings', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'complaints', label: 'Complaints SLA', icon: Wrench, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { id: 'rules', label: 'House Rules', icon: ScrollText, color: 'text-pink-600', bg: 'bg-pink-50' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-primary mb-6 border-b border-border/50 pb-4">General Settings</h2>
            
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              {/* Logo Uploader */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-32 h-32 rounded-2xl bg-page border-2 border-dashed border-border flex flex-col items-center justify-center text-gray-400 hover:bg-[var(--bg-overlay)] hover:border-[#F5A623] hover:text-[#F5A623] cursor-pointer transition-all">
                  <ImageIcon className="w-8 h-8 mb-2" />
                  <span className="text-xs font-bold">Upload Logo</span>
                </div>
                <span className="text-xs font-semibold text-[var(--text-disabled)]">Max size: 2MB</span>
              </div>

              {/* Form Fields */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-bold text-secondary mb-2">PG Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" defaultValue="SmartPG Varanasi" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-all outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">Contact Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" defaultValue="+91 9876543210" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-all outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">Website</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" defaultValue="www.smartpg.in" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-all outline-none" />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-bold text-secondary mb-2">Full Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea rows={3} defaultValue="Lanka, Near BHU Gate, Varanasi, UP 221005" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-all outline-none resize-none"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'fees':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-primary mb-6 border-b border-border/50 pb-4">Fee & Payment Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-secondary mb-2">Rent Cycle</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 outline-none">
                  <option>Monthly (1st to 30th)</option>
                  <option>Monthly (Joining Date based)</option>
                  <option>Quarterly</option>
                  <option>Yearly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-secondary mb-2">Default Due Date</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 outline-none">
                  <option>5th of every month</option>
                  <option>1st of every month</option>
                  <option>7th of every month</option>
                  <option>10th of every month</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-secondary mb-2">Grace Period (Days)</label>
                <input type="number" defaultValue="3" className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-secondary mb-2">Late Fine (per day)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="number" defaultValue="50" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 outline-none" />
                </div>
              </div>
            </div>

            <div className="p-5 bg-page rounded-2xl border border-border">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-[#F5A623]" /> Accepted Payment Methods
              </h3>
              <div className="flex flex-wrap gap-4">
                {['UPI / QR Code', 'Bank Transfer (NEFT/RTGS)', 'Cash', 'Credit/Debit Card'].map(method => (
                  <label key={method} className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border border-border cursor-pointer hover:border-[#F5A623]">
                    <input type="checkbox" defaultChecked className="accent-[#F5A623]" />
                    <span className="text-sm font-semibold text-secondary">{method}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'rules':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-primary mb-6 border-b border-border/50 pb-4">House Rules & Policies</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                  <div>
                    <h3 className="font-bold text-primary text-sm">Curfew Timing</h3>
                    <p className="text-xs text-[var(--text-disabled)]">Main gate locking time</p>
                  </div>
                  <input type="time" defaultValue="22:30" className="px-3 py-1.5 border border-border rounded-lg text-sm font-bold outline-none" />
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                  <div>
                    <h3 className="font-bold text-primary text-sm">Smoking & Alcohol</h3>
                    <p className="text-xs text-[var(--text-disabled)]">Are they allowed on premises?</p>
                  </div>
                  <select className="px-3 py-1.5 border border-border rounded-lg text-sm font-bold outline-none text-red-600 bg-red-50">
                    <option>Strictly Prohibited</option>
                    <option>Allowed in Balcony</option>
                    <option>Allowed</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                  <div>
                    <h3 className="font-bold text-primary text-sm">Noise Policy</h3>
                    <p className="text-xs text-[var(--text-disabled)]">Quiet hours</p>
                  </div>
                  <input type="text" defaultValue="11 PM to 6 AM" className="w-32 px-3 py-1.5 border border-border rounded-lg text-sm font-bold outline-none" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col p-4 border border-border rounded-xl h-full">
                  <h3 className="font-bold text-primary text-sm mb-2">Other Custom Rules</h3>
                  <textarea 
                    rows={6}
                    defaultValue="1. Visitors not allowed in rooms after 8 PM.&#10;2. Use of heavy electrical appliances (heaters/inductions) is not allowed.&#10;3. Any damage to PG property will be deducted from the security deposit."
                    className="w-full flex-1 p-3 border border-border rounded-lg text-sm outline-none resize-none focus:border-[#F5A623]"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        );

      // Placeholder for other tabs to keep the file concise but functional
      default:
        return (
          <div className="animate-in fade-in zoom-in-95 duration-500 pt-16 pb-24 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-page rounded-full flex items-center justify-center mb-4 border border-border/50">
              <AlertCircle className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-primary mb-2 capitalize">{activeTab.replace('_', ' ')} Settings</h2>
            <p className="text-[var(--text-disabled)] max-w-md">Customize and manage your {activeTab.replace('_', ' ')} configurations here. This section is fully modular and ready for backend integration.</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Building2 className="w-7 h-7 text-[#F5A623]" />
            Property Settings
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Configure property-level settings, rules, fees, and operations for this PG.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => alert('Settings Saved Successfully!')} className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#e09612] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Save className="w-4 h-4" /> Save All Changes
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Mobile Tab Selector */}
        <div className="lg:hidden relative">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between bg-card border border-border p-4 rounded-2xl shadow-sm"
          >
            <div className="flex items-center gap-3">
              {(() => {
                const active = settingsTabs.find(t => t.id === activeTab);
                if (!active) return null;
                const Icon = active.icon;
                return (
                  <>
                    <div className={`p-2 rounded-lg ${active.bg} ${active.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-primary">{active.label}</span>
                  </>
                );
              })()}
            </div>
            <Menu className="w-5 h-5 text-[var(--text-disabled)]" />
          </button>

          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-2xl shadow-xl z-10 p-2 space-y-1">
              {settingsTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-semibold text-sm ${
                    activeTab === tab.id ? 'bg-page text-primary' : 'text-secondary hover:bg-page'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${tab.color}`} />
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Sidebar Tabs */}
        <div className="hidden lg:flex lg:w-64 flex-col gap-1 shrink-0 bg-card p-3 rounded-2xl shadow-sm border border-border/50">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-2">Settings Menu</h3>
          {settingsTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm ${
                activeTab === tab.id
                  ? 'bg-page text-primary shadow-sm border border-border/50'
                  : 'text-[var(--text-disabled)] hover:bg-page hover:text-secondary border border-transparent'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${activeTab === tab.id ? tab.bg : ''}`}>
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? tab.color : 'text-gray-400'}`} />
              </div>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-card rounded-2xl shadow-sm border border-border/50 p-5 md:p-8 min-h-[600px]">
          {renderContent()}
        </div>
        
      </div>
    </div>
  );
}
