'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ToggleLeft, Zap, MessageSquare, CreditCard, Bot, Server, ShieldCheck, DownloadCloud, RotateCw, GitBranch, ArrowUpCircle } from 'lucide-react';

export function SuperadminFeatureFlagsMain() {
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'flags');

  useEffect(() => {
    setActiveTab(tabQuery || 'flags');
  }, [tabQuery]);

  const tabs = [
    { id: 'flags', label: 'Feature Flags', icon: ToggleLeft, color: 'text-info', bg: 'bg-info-bg' },
    { id: 'system', label: 'System Version', icon: Server, color: 'text-success', bg: 'bg-success-bg' },
  ];

  // Feature Flags State
  const [flags, setFlags] = useState({
    advReports: true,
    whatsapp: false,
    onlinePayment: true,
    aiFeatures: false
  });

  const toggleFlag = (key: keyof typeof flags) => {
    setFlags(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full h-full space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <ToggleLeft className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
            <ToggleLeft className="w-8 h-8" /> System Configuration
          </h1>
          <p className="text-white/80 font-medium max-w-xl">
            Manage global feature availability and track platform version updates.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="inline-flex items-center gap-2 bg-success-bg text-white px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md shadow-sm border border-success/30">
              <ShieldCheck className="w-4 h-4" /> Version: v14.6
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md shadow-sm border border-white/20">
              <Zap className="w-4 h-4" /> 2 Beta Features Active
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
          
          {/* FEATURE FLAGS TAB */}
          {activeTab === 'flags' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-info-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <ToggleLeft className="w-6 h-6 text-info" /> Global Feature Flags
              </h2>
              
              <div className="space-y-4 relative z-10">
                <p className="text-secondary font-medium mb-6">Enable or disable beta and premium features globally for all PG Owners and Users.</p>
                
                {/* Advanced Reports */}
                <div className="flex items-center justify-between p-5 bg-bg-page border border-border/50 rounded-2xl hover:border-info/30 transition-colors group">
                  <div className="flex gap-4 items-center">
                    <div className="p-3 bg-info-bg text-info rounded-xl shrink-0"><Zap className="w-6 h-6" /></div>
                    <div>
                      <h3 className="font-bold text-primary group-hover:text-info transition-colors">Advanced Reports</h3>
                      <p className="text-xs text-secondary font-medium mt-1">Unlock detailed analytics and multi-PG financial reports.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" className="sr-only peer" checked={flags.advReports} onChange={() => toggleFlag('advReports')} />
                    <div className="w-14 h-7 bg-bg-card border border-border/50 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-theme-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-success"></div>
                  </label>
                </div>

                {/* WhatsApp Integration */}
                <div className="flex items-center justify-between p-5 bg-bg-page border border-border/50 rounded-2xl hover:border-success/30 transition-colors group">
                  <div className="flex gap-4 items-center">
                    <div className="p-3 bg-success-bg text-success rounded-xl shrink-0"><MessageSquare className="w-6 h-6" /></div>
                    <div>
                      <h3 className="font-bold text-primary group-hover:text-success transition-colors">WhatsApp Notifications</h3>
                      <p className="text-xs text-secondary font-medium mt-1">Send invoice alerts and rent reminders directly to students via WhatsApp.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" className="sr-only peer" checked={flags.whatsapp} onChange={() => toggleFlag('whatsapp')} />
                    <div className="w-14 h-7 bg-bg-card border border-border/50 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-theme-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-success"></div>
                  </label>
                </div>

                {/* Online Payment */}
                <div className="flex items-center justify-between p-5 bg-bg-page border border-border/50 rounded-2xl hover:border-warning/30 transition-colors group">
                  <div className="flex gap-4 items-center">
                    <div className="p-3 bg-warning-bg text-warning rounded-xl shrink-0"><CreditCard className="w-6 h-6" /></div>
                    <div>
                      <h3 className="font-bold text-primary group-hover:text-warning transition-colors">Online Payments Gateway</h3>
                      <p className="text-xs text-secondary font-medium mt-1">Allow students to pay rent via UPI and Credit Cards in the app.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" className="sr-only peer" checked={flags.onlinePayment} onChange={() => toggleFlag('onlinePayment')} />
                    <div className="w-14 h-7 bg-bg-card border border-border/50 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-theme-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-success"></div>
                  </label>
                </div>

                {/* AI Features */}
                <div className="flex items-center justify-between p-5 bg-bg-page border border-border/50 rounded-2xl hover:border-purple/30 transition-colors group">
                  <div className="flex gap-4 items-center">
                    <div className="p-3 bg-purple-bg text-purple rounded-xl shrink-0"><Bot className="w-6 h-6" /></div>
                    <div>
                      <h3 className="font-bold text-primary group-hover:text-purple transition-colors">AI Smart Insights</h3>
                      <p className="text-xs text-secondary font-medium mt-1">Enable AI-driven predictive insights for PG growth and bed occupancy.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" className="sr-only peer" checked={flags.aiFeatures} onChange={() => toggleFlag('aiFeatures')} />
                    <div className="w-14 h-7 bg-bg-card border border-border/50 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-theme-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-success"></div>
                  </label>
                </div>

              </div>
            </div>
          )}

          {/* SYSTEM VERSION TAB */}
          {activeTab === 'system' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-success-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2"><Server className="w-6 h-6 text-success" /> System & Versioning</div>
                <button className="flex items-center gap-2 px-4 py-2 bg-theme-primary text-white text-sm font-bold rounded-xl shadow-md hover:bg-theme-primary-hover transition-colors">
                  <RotateCw className="w-4 h-4" /> Check for Updates
                </button>
              </h2>
              
              <div className="space-y-8 relative z-10">
                {/* Current Version Card */}
                <div className="p-6 bg-success-bg border border-success/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-success text-white rounded-xl flex items-center justify-center shrink-0">
                      <GitBranch className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-success uppercase tracking-wider mb-1">Current Version</p>
                      <h3 className="text-2xl font-black text-success">v14.6.0 (Stable)</h3>
                      <p className="text-sm font-medium text-success/80 mt-0.5">Last updated: 1 Oct 2026, 03:00 AM</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-success text-white font-bold rounded-lg text-sm self-start sm:self-center shadow-sm">
                    Up to Date
                  </div>
                </div>

                {/* Available Update */}
                <div className="p-6 bg-bg-page border border-border/50 hover:border-theme-primary/30 transition-colors rounded-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <ArrowUpCircle className="w-6 h-6 text-theme-primary" />
                      <h3 className="font-bold text-primary text-lg">Update v14.7.0 (Beta) is Available!</h3>
                    </div>
                    <span className="text-xs font-bold bg-primary-subtle text-theme-primary px-3 py-1 rounded-full">Optional</span>
                  </div>
                  <p className="text-sm text-secondary font-medium mb-4">This update includes the new AI Insights engine and minor UI improvements for the Student Dashboard.</p>
                  <div className="flex items-center gap-4">
                    <button className="bg-bg-page border border-border hover:border-theme-primary hover:text-theme-primary text-primary px-5 py-2 rounded-xl font-bold flex items-center gap-2 transition-all text-sm">
                      <DownloadCloud className="w-4 h-4" /> Download & Install
                    </button>
                    <button className="text-theme-primary font-bold text-sm hover:underline">Read Changelog</button>
                  </div>
                </div>

                {/* Release Notes */}
                <div className="pt-4 border-t border-border/50">
                  <h3 className="font-bold text-primary mb-4 flex items-center gap-2">Release Notes (v14.6)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-primary text-sm">Security Patch</p>
                        <p className="text-xs text-secondary font-medium">Upgraded JWT token expiration handling.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-primary text-sm">Performance Boost</p>
                        <p className="text-xs text-secondary font-medium">Database query optimization for Dashboard KPI cards.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
