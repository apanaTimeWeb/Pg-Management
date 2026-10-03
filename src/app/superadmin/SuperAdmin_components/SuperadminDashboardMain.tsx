'use client';

import React, { useState } from 'react';
import { Building2, Users, Package, CreditCard, Activity, Server, AlertCircle, TrendingUp, Clock, CheckCircle, Ticket, XCircle, ShieldCheck, Download, RefreshCcw, Bell } from 'lucide-react';

export function SuperadminDashboardMain() {
  const [filterPeriod, setFilterPeriod] = useState('Today');

  // Dummy stats based on user request
  const mainWidgets = [
    { title: 'Total PGs', value: '142', icon: Building2, color: 'text-info', bg: 'bg-info/10', trend: '+12 this month' },
    { title: 'Active PGs', value: '118', icon: CheckCircle, color: 'text-success', bg: 'bg-success/10', trend: 'Operational' },
    { title: 'Pending PGs', value: '15', icon: Clock, color: 'text-warning', bg: 'bg-warning/10', trend: 'Awaiting approval' },
    { title: 'Suspended PGs', value: '9', icon: XCircle, color: 'text-danger', bg: 'bg-danger/10', trend: 'Action required' },
    
    { title: 'Total Admins/Owners', value: '120', icon: ShieldCheck, color: 'text-purple', bg: 'bg-purple/10', trend: '+8 this month' },
    { title: 'Total Managers', value: '254', icon: Users, color: 'text-theme-primary', bg: 'bg-theme-primary/10', trend: '+15 this month' },
    { title: 'Total Students', value: '8,420', icon: Users, color: 'text-success', bg: 'bg-success/10', trend: '+450 this month' },
    { title: 'Total Cooks', value: '180', icon: Users, color: 'text-warning', bg: 'bg-warning/10', trend: 'Active staff' },
  ];

  const subWidgets = [
    { title: 'Active Subs', value: '110', label: 'Subscriptions' },
    { title: 'Trial Subs', value: '8', label: 'In Trial Period' },
    { title: 'Expiring Soon', value: '14', label: 'Next 30 days', alert: true },
    { title: 'Expired', value: '10', label: 'Needs renewal', alert: true },
  ];

  const revenueWidgets = [
    { title: 'Monthly Revenue', value: '₹4,50,000', label: 'Subscription Fees', color: 'text-success' },
    { title: 'Pending Payments', value: '₹45,000', label: 'Due this month', color: 'text-warning' },
    { title: 'Refunds Processed', value: '₹12,500', label: 'This month', color: 'text-danger' },
    { title: 'Outstanding Dues', value: '₹25,000', label: 'Past due', color: 'text-purple' },
  ];

  return (
    <div className="w-full h-full space-y-6 pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <Activity className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <Activity className="w-8 h-8" /> Platform Overview
            </h1>
            <p className="text-white/80 font-medium max-w-xl">
              Welcome back, Superadmin. Here is what's happening across your PG ecosystem today.
            </p>
          </div>
          <div className="flex gap-3">
            <select 
               className="bg-white/20 backdrop-blur text-white border border-white/30 px-4 py-3 rounded-xl font-bold outline-none cursor-pointer"
               value={filterPeriod}
               onChange={(e) => setFilterPeriod(e.target.value)}
            >
               <option className="text-black">Today</option>
               <option className="text-black">This Week</option>
               <option className="text-black">This Month</option>
               <option className="text-black">This Year</option>
            </select>
            <button className="bg-white/20 backdrop-blur text-white border border-white/30 p-3 rounded-xl font-bold shadow-md hover:bg-white/30 transition-colors tooltip" title="Refresh Dashboard">
              <RefreshCcw className="w-5 h-5" />
            </button>
            <button className="bg-white text-theme-primary px-6 py-3 rounded-xl font-bold shadow-md hover:bg-white/90 transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" /> Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         {mainWidgets.map((w, i) => (
            <div key={i} className="bg-card border border-border/50 p-6 rounded-3xl shadow-sm hover:border-theme-primary/30 hover:shadow-md transition-all group">
               <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${w.bg} ${w.color} group-hover:scale-110 transition-transform`}>
                     <w.icon className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-secondary/50" />
               </div>
               <div>
                  <h3 className="text-3xl font-black text-primary mb-1">{w.value}</h3>
                  <p className="text-sm font-bold text-secondary">{w.title}</p>
                  <p className="text-xs font-medium text-secondary/70 mt-2">{w.trend}</p>
               </div>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Subscriptions Mini Cards */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-border/50 p-6 rounded-3xl shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5"><Package className="w-24 h-24"/></div>
               <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-4">Subscription Overview</h3>
               <div className="grid grid-cols-2 gap-4 relative z-10">
                  {subWidgets.map((w, i) => (
                     <div key={i} className="bg-bg-page border border-border/50 p-4 rounded-2xl">
                        <div className="text-2xl font-black text-primary mb-1 flex items-center gap-2">
                           {w.value} {w.alert && <AlertCircle className="w-4 h-4 text-warning" />}
                        </div>
                        <div className="text-xs font-bold text-primary">{w.title}</div>
                        <div className="text-[10px] font-bold text-secondary uppercase mt-1">{w.label}</div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Financial Overview Mini Cards */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border/50 p-6 rounded-3xl shadow-sm relative overflow-hidden h-full">
               <div className="absolute bottom-0 right-0 p-4 opacity-5"><CreditCard className="w-32 h-32"/></div>
               <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-4 flex items-center justify-between">
                  Financial Overview <span className="text-xs font-bold text-theme-primary lowercase bg-theme-primary/10 px-2 py-0.5 rounded">This Month</span>
               </h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[calc(100%-2rem)] relative z-10">
                  {revenueWidgets.map((w, i) => (
                     <div key={i} className="bg-bg-page border border-border/50 p-4 rounded-2xl flex flex-col justify-center">
                        <div className={`text-xl md:text-2xl font-black mb-1 ${w.color}`}>{w.value}</div>
                        <div className="text-xs font-bold text-primary">{w.title}</div>
                        <div className="text-[10px] font-bold text-secondary uppercase mt-1">{w.label}</div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Action Alerts */}
         <div className="lg:col-span-1 bg-card border border-border/50 p-6 rounded-3xl shadow-sm flex flex-col">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-6 flex items-center gap-2"><Bell className="w-4 h-4" /> Action Alerts</h3>
            <div className="space-y-4 flex-1">
               <div className="flex items-start gap-4 p-4 bg-warning/10 border border-warning/20 rounded-2xl cursor-pointer hover:bg-warning/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white text-warning flex items-center justify-center font-bold shadow-sm shrink-0"><Building2 className="w-5 h-5"/></div>
                  <div>
                     <h4 className="font-bold text-primary text-sm">15 New PG Registrations</h4>
                     <p className="text-xs text-secondary font-medium mt-1">Pending approval and verification.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4 p-4 bg-danger/10 border border-danger/20 rounded-2xl cursor-pointer hover:bg-danger/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white text-danger flex items-center justify-center font-bold shadow-sm shrink-0"><Ticket className="w-5 h-5"/></div>
                  <div>
                     <h4 className="font-bold text-primary text-sm">24 Open Support Tickets</h4>
                     <p className="text-xs text-secondary font-medium mt-1">Require immediate administrative attention.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4 p-4 bg-purple/10 border border-purple/20 rounded-2xl cursor-pointer hover:bg-purple/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white text-purple flex items-center justify-center font-bold shadow-sm shrink-0"><Users className="w-5 h-5"/></div>
                  <div>
                     <h4 className="font-bold text-primary text-sm">New Owner Registrations</h4>
                     <p className="text-xs text-secondary font-medium mt-1">8 new owners onboarded this week.</p>
                  </div>
               </div>
            </div>
         </div>

         {/* System Health */}
         <div className="lg:col-span-2 bg-card border border-border/50 p-6 rounded-3xl shadow-sm flex flex-col">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-6 flex items-center gap-2"><Server className="w-4 h-4" /> System Health Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1">
               {[
                  { name: 'App Servers', status: 'Healthy', val: '99.9% Uptime', color: 'text-success', bg: 'bg-success' },
                  { name: 'Database', status: 'Healthy', val: '24ms latency', color: 'text-success', bg: 'bg-success' },
                  { name: 'Storage', status: 'Warning', val: '85% Capacity', color: 'text-warning', bg: 'bg-warning' },
                  { name: 'API Gateway', status: 'Healthy', val: '1.2k req/s', color: 'text-success', bg: 'bg-success' },
                  { name: 'Payment Gateway', status: 'Healthy', val: 'Razorpay OK', color: 'text-success', bg: 'bg-success' },
                  { name: 'Notifications (SMS)', status: 'Degraded', val: 'Queue delayed', color: 'text-danger', bg: 'bg-danger' },
               ].map((sys, i) => (
                  <div key={i} className="flex flex-col gap-2 p-4 bg-bg-page border border-border/50 rounded-2xl">
                     <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-primary">{sys.name}</span>
                        <div className={`w-2 h-2 rounded-full ${sys.bg} animate-pulse`}></div>
                     </div>
                     <span className={`text-xs font-bold ${sys.color}`}>{sys.status}</span>
                     <span className="text-xs font-bold text-secondary mt-1">{sys.val}</span>
                  </div>
               ))}
            </div>
         </div>

      </div>

    </div>
  );
}
