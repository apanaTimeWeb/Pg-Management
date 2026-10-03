'use client';

import React, { useState } from 'react';
import { BarChart3, Building2, Users, Package, DollarSign, Activity, Calendar, Download, Filter, MapPin, Search } from 'lucide-react';

export function SuperadminAnalyticsMain() {
  const [activeTab, setActiveTab] = useState('pg');

  const tabs = [
    { id: 'pg', label: 'PG Reports', icon: Building2, color: 'text-info', bg: 'bg-info-bg' },
    { id: 'users', label: 'User Reports', icon: Users, color: 'text-success', bg: 'bg-success-bg' },
    { id: 'subscriptions', label: 'Subscriptions', icon: Package, color: 'text-purple', bg: 'bg-purple-bg' },
    { id: 'financial', label: 'Financials', icon: DollarSign, color: 'text-warning', bg: 'bg-warning-bg' },
    { id: 'operational', label: 'Operations', icon: Activity, color: 'text-danger', bg: 'bg-danger-bg' },
  ];

  return (
    <div className="w-full h-full space-y-6 pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <BarChart3 className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <BarChart3 className="w-8 h-8" /> Reports & Analytics
            </h1>
            <p className="text-white/80 font-medium max-w-xl">
              Platform-level insights covering PGs, Users, Finances, and Operations.
            </p>
          </div>
          
          {/* Global Filters & Export */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white/20 p-1.5 rounded-xl backdrop-blur-md border border-white/20">
              <select className="bg-transparent text-white font-bold text-sm outline-none cursor-pointer px-2 py-1">
                <option className="text-primary">Last 30 Days</option>
                <option className="text-primary">This Year</option>
                <option className="text-primary">Custom Date</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-white/20 p-1.5 rounded-xl backdrop-blur-md border border-white/20">
              <select className="bg-transparent text-white font-bold text-sm outline-none cursor-pointer px-2 py-1">
                <option className="text-primary">All PGs</option>
                <option className="text-primary">Active PGs</option>
                <option className="text-primary">Suspended PGs</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-white/20 p-1.5 rounded-xl backdrop-blur-md border border-white/20">
              <select className="bg-transparent text-white font-bold text-sm outline-none cursor-pointer px-2 py-1">
                <option className="text-primary">All Plans</option>
                <option className="text-primary">Pro Plan</option>
                <option className="text-primary">Basic Plan</option>
              </select>
            </div>
            
            <button className="bg-white/20 backdrop-blur text-white border border-white/30 px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-white/90 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Navigation */}
        <div className="bg-card border border-border/50 rounded-3xl p-4 shadow-sm h-fit">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
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
        </div>

        {/* Tab Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* PG REPORTS TAB */}
          {activeTab === 'pg' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-info-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2"><Building2 className="w-6 h-6 text-info" /> PG Analytics</div>
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 relative z-10 mb-8">
                {[
                  { label: 'Total PGs', value: '1,240', color: 'text-info', bg: 'bg-info-bg' },
                  { label: 'Active', value: '1,105', color: 'text-success', bg: 'bg-success-bg' },
                  { label: 'New (This Month)', value: '+45', color: 'text-theme-primary', bg: 'bg-primary-subtle' },
                  { label: 'Suspended', value: '25', color: 'text-danger', bg: 'bg-danger-bg' },
                  { label: 'Expired', value: '65', color: 'text-warning', bg: 'bg-warning-bg' },
                ].map((stat, i) => (
                  <div key={i} className={`p-4 rounded-2xl border border-border/50 bg-bg-page flex flex-col justify-center items-center text-center`}>
                    <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">{stat.label}</p>
                    <h3 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h3>
                  </div>
                ))}
              </div>

              <div className="relative z-10">
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-theme-primary" /> City/State-wise Distribution</h3>
                <div className="bg-bg-page border border-border/50 rounded-2xl p-6">
                  {/* Mock Chart Area */}
                  <div className="h-48 w-full flex items-end justify-around gap-2 px-4 pb-2 border-b border-border/50">
                    {[
                      { city: 'Delhi', height: '80%' },
                      { city: 'Bangalore', height: '60%' },
                      { city: 'Pune', height: '40%' },
                      { city: 'Mumbai', height: '30%' },
                      { city: 'Noida', height: '50%' },
                    ].map((bar, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 w-full group cursor-pointer">
                        <div className="w-full max-w-[40px] bg-info/80 hover:bg-info transition-colors rounded-t-md relative group" style={{ height: bar.height }}>
                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card border border-border shadow-md text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                             {bar.height}
                           </div>
                        </div>
                        <span className="text-xs font-bold text-secondary">{bar.city}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* USER REPORTS TAB */}
          {activeTab === 'users' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-success-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <Users className="w-6 h-6 text-success" /> User Analytics
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10 mb-8">
                {[
                  { label: 'Total Admins', value: '1,350', color: 'text-success' },
                  { label: 'Total Managers', value: '4,200', color: 'text-info' },
                  { label: 'Total Cooks', value: '850', color: 'text-warning' },
                  { label: 'Total Students', value: '45,100', color: 'text-theme-primary' },
                ].map((stat, i) => (
                  <div key={i} className={`p-5 rounded-2xl border border-border/50 bg-bg-page hover:border-${stat.color.split('-')[1]}/30 transition-colors`}>
                    <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">{stat.label}</p>
                    <h3 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h3>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6 relative z-10">
                <div className="bg-bg-page border border-border/50 rounded-2xl p-6">
                  <h3 className="font-bold text-primary mb-4 flex items-center gap-2">User Status</h3>
                  <div className="flex items-center justify-center gap-8 h-40">
                    <div className="relative w-32 h-32 rounded-full border-8 border-success/20 border-t-success border-r-success flex items-center justify-center">
                       <div className="text-center">
                         <span className="block text-xl font-black text-success">85%</span>
                         <span className="text-xs font-bold text-secondary">Active</span>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-success"></div><span className="text-sm font-bold text-secondary">Active (38.3k)</span></div>
                       <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-border"></div><span className="text-sm font-bold text-secondary">Inactive (6.8k)</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUBSCRIPTION REPORTS TAB */}
          {activeTab === 'subscriptions' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-purple-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <Package className="w-6 h-6 text-purple" /> Subscription Analytics
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 relative z-10 mb-8">
                {[
                  { label: 'New Subs', value: '342', trend: '+12%' },
                  { label: 'Renewals', value: '890', trend: '+5%' },
                  { label: 'Expired', value: '145', trend: '-2%' },
                  { label: 'Cancelled', value: '23', trend: '-1%' },
                  { label: 'Trial Conv.', value: '68%', trend: '+4%' },
                  { label: 'Total Active', value: '1,105', trend: '' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-border/50 bg-bg-page flex flex-col items-center justify-center text-center hover:border-purple/30 transition-colors">
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-2">{stat.label}</p>
                    <h3 className="text-xl font-black text-purple">{stat.value}</h3>
                    {stat.trend && <p className={`text-[10px] font-bold mt-1 ${stat.trend.startsWith('+') ? 'text-success' : 'text-danger'}`}>{stat.trend}</p>}
                  </div>
                ))}
              </div>

              <div className="relative z-10 bg-bg-page border border-border/50 rounded-2xl p-6">
                <h3 className="font-bold text-primary mb-4">Plan Distribution</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span className="text-primary">Pro Plan</span>
                      <span className="text-theme-primary">60%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-border"><div className="h-full bg-theme-primary rounded-full w-[60%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span className="text-primary">Basic Plan</span>
                      <span className="text-info">30%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-border"><div className="h-full bg-info rounded-full w-[30%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span className="text-primary">Enterprise Plan</span>
                      <span className="text-warning">10%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-border"><div className="h-full bg-warning rounded-full w-[10%]"></div></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FINANCIAL REPORTS TAB */}
          {activeTab === 'financial' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-warning-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <DollarSign className="w-6 h-6 text-warning" /> Financial Overview
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                <div className="p-6 rounded-2xl border border-success/30 bg-success/5">
                  <p className="text-xs font-bold text-success uppercase tracking-wider mb-2">Total Revenue</p>
                  <h3 className="text-2xl font-black text-success">₹45.2 L</h3>
                  <p className="text-xs text-success/80 font-bold mt-2">+15% from last month</p>
                </div>
                <div className="p-6 rounded-2xl border border-theme-primary/30 bg-theme-primary/5">
                  <p className="text-xs font-bold text-theme-primary uppercase tracking-wider mb-2">Subscription Revenue</p>
                  <h3 className="text-2xl font-black text-theme-primary">₹38.5 L</h3>
                  <p className="text-xs text-theme-primary/80 font-bold mt-2">85% of total</p>
                </div>
                <div className="p-6 rounded-2xl border border-warning/30 bg-warning/5">
                  <p className="text-xs font-bold text-warning uppercase tracking-wider mb-2">Outstanding Dues</p>
                  <h3 className="text-2xl font-black text-warning">₹4.2 L</h3>
                  <p className="text-xs text-warning/80 font-bold mt-2">From 45 owners</p>
                </div>
                <div className="p-6 rounded-2xl border border-danger/30 bg-danger/5">
                  <p className="text-xs font-bold text-danger uppercase tracking-wider mb-2">Refunds & Failed</p>
                  <h3 className="text-2xl font-black text-danger">₹1.8 L</h3>
                  <p className="text-xs text-danger/80 font-bold mt-2">24 Failed txns</p>
                </div>
              </div>
            </div>
          )}

          {/* OPERATIONAL REPORTS TAB */}
          {activeTab === 'operational' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-danger-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <Activity className="w-6 h-6 text-danger" /> Operational Metrics
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                <div className="p-5 rounded-2xl border border-border/50 bg-bg-page text-center">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Support Tickets</p>
                  <h3 className="text-2xl font-black text-info">342</h3>
                  <p className="text-xs text-secondary font-bold mt-1">12 Pending</p>
                </div>
                <div className="p-5 rounded-2xl border border-border/50 bg-bg-page text-center">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Complaints (Users)</p>
                  <h3 className="text-2xl font-black text-danger">1,205</h3>
                  <p className="text-xs text-danger font-bold mt-1">Needs attention</p>
                </div>
                <div className="p-5 rounded-2xl border border-border/50 bg-bg-page text-center">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Daily Logins</p>
                  <h3 className="text-2xl font-black text-theme-primary">28.4k</h3>
                  <p className="text-xs text-success font-bold mt-1">Avg per day</p>
                </div>
                <div className="p-5 rounded-2xl border border-border/50 bg-bg-page text-center">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">System Uptime</p>
                  <h3 className="text-2xl font-black text-success">99.9%</h3>
                  <p className="text-xs text-secondary font-bold mt-1">Last 30 days</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
