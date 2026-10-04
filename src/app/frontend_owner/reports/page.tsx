// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { TrendingUp, Download, FileText, FileSpreadsheet, Bed, Wallet, Users, UtensilsCrossed, CalendarCheck, Wrench, Package, PieChart, BarChart3, LineChart, ArrowUpRight, ArrowDownRight, DollarSign, Activity, ChevronDown, AlertCircle } from 'lucide-react';

export default function ReportsAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('occupancy');
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const reportTabs = [
    { id: 'occupancy', label: 'Occupancy', icon: Bed, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'financial', label: 'Financial', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'student', label: 'Student', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'mess', label: 'Mess / Food', icon: UtensilsCrossed, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, color: 'text-teal-600', bg: 'bg-teal-50' },
    { id: 'complaints', label: 'Complaints', icon: Wrench, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'inventory', label: 'Inventory', icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'occupancy':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-blue-500" /> Occupancy Reports
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {[
                { label: 'Total Capacity', value: '250', color: 'text-primary', bg: 'bg-[var(--bg-overlay)]' },
                { label: 'Occupied', value: '210', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Vacant', value: '35', color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Reserved', value: '3', color: 'text-purple-600', bg: 'bg-purple-50' },
                { label: 'Maintenance', value: '2', color: 'text-red-600', bg: 'bg-red-50' },
                { label: 'Occupancy %', value: '84%', color: 'text-[#F5A623]', bg: 'bg-[#F5A623]/10' },
              ].map((stat, i) => (
                <div key={i} className={`p-4 rounded-2xl ${stat.bg} border border-white/50 shadow-sm flex flex-col justify-center items-center text-center hover:scale-105 transition-transform`}>
                  <p className="text-xs font-bold text-[var(--text-disabled)] uppercase tracking-wider mb-1">{stat.label}</p>
                  <h3 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h3>
                </div>
              ))}
            </div>
            {/* Visual Bar Mockup */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-secondary mb-4">Capacity Breakdown</h3>
              <div className="w-full h-8 flex rounded-full overflow-hidden mb-3 shadow-inner">
                <div className="bg-emerald-500 h-full" style={{ width: '84%' }} title="Occupied (84%)"></div>
                <div className="bg-blue-500 h-full" style={{ width: '14%' }} title="Vacant (14%)"></div>
                <div className="bg-red-500 h-full" style={{ width: '2%' }} title="Maintenance (2%)"></div>
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-bold text-[var(--text-disabled)]">
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Occupied</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> Vacant</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> Maintenance</span>
              </div>
            </div>
          </div>
        );

      case 'financial':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-500" /> Financial Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Rent Collection', value: '₹14,50,000', icon: Wallet, color: 'text-emerald-600', trend: 'up' },
                { label: 'Outstanding Dues', value: '₹1,20,000', icon: AlertCircle, color: 'text-red-600', trend: 'down' },
                { label: 'Total Expenses', value: '₹4,80,000', icon: ArrowDownRight, color: 'text-orange-600', trend: 'down' },
                { label: 'Profit Summary', value: '₹9,70,000', icon: TrendingUp, color: 'text-blue-600', trend: 'up' },
              ].map((stat, i) => (
                <div key={i} className="bg-card p-5 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className={`absolute top-0 right-0 p-4 opacity-10 ${stat.color}`}>
                    <stat.icon className="w-16 h-16 -mr-4 -mt-4" />
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{stat.label}</p>
                  <h3 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h3>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-page border border-border/50 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-secondary mb-3 border-b border-border pb-2">Income Sources</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center"><span className="text-sm font-semibold text-secondary">Rent</span><span className="font-bold">₹12,00,000</span></div>
                  <div className="flex justify-between items-center"><span className="text-sm font-semibold text-secondary">Late Fines</span><span className="font-bold">₹15,000</span></div>
                  <div className="flex justify-between items-center"><span className="text-sm font-semibold text-secondary">Food/Mess Extras</span><span className="font-bold">₹2,35,000</span></div>
                </div>
              </div>
              <div className="bg-page border border-border/50 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-secondary mb-3 border-b border-border pb-2">Major Expenses</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center"><span className="text-sm font-semibold text-secondary">Groceries/Food</span><span className="font-bold">₹2,10,000</span></div>
                  <div className="flex justify-between items-center"><span className="text-sm font-semibold text-secondary">Electricity</span><span className="font-bold">₹85,000</span></div>
                  <div className="flex justify-between items-center"><span className="text-sm font-semibold text-secondary">Staff Salary</span><span className="font-bold">₹1,20,000</span></div>
                </div>
              </div>
              <div className="bg-page border border-border/50 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-secondary mb-3 border-b border-border pb-2">Deposits & Refunds</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center"><span className="text-sm font-semibold text-secondary">Total Deposits Held</span><span className="font-bold">₹5,20,000</span></div>
                  <div className="flex justify-between items-center"><span className="text-sm font-semibold text-secondary">Refunds Processed</span><span className="font-bold">₹40,000</span></div>
                  <div className="flex justify-between items-center"><span className="text-sm font-semibold text-secondary">Pending Refunds</span><span className="font-bold text-red-500">₹10,000</span></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'student':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" /> Student Reports
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {[
                { label: 'Active', value: '210', bg: 'bg-green-100', color: 'text-green-700' },
                { label: 'New Admissions', value: '12', bg: 'bg-blue-100', color: 'text-blue-700' },
                { label: 'Check-outs', value: '4', bg: 'bg-[var(--bg-overlay)]', color: 'text-secondary' },
                { label: 'Notice Period', value: '5', bg: 'bg-yellow-100', color: 'text-yellow-700' },
                { label: 'Defaulters', value: '3', bg: 'bg-red-100', color: 'text-red-700' },
              ].map((stat, i) => (
                <div key={i} className={`p-4 rounded-xl border border-white/50 text-center ${stat.bg}`}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1 text-secondary">{stat.label}</p>
                  <h3 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h3>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border/50 rounded-2xl p-6 text-center text-[var(--text-disabled)]">
              <Activity className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>Detailed tabular student status report will render here.</p>
            </div>
          </div>
        );

      case 'mess':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-orange-500" /> Mess & Food Analytics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Avg Breakfast', value: '185/day', icon: '🍳', bg: 'bg-orange-50' },
                { label: 'Avg Lunch', value: '140/day', icon: '🍛', bg: 'bg-red-50' },
                { label: 'Avg Dinner', value: '205/day', icon: '🥘', bg: 'bg-yellow-50' },
                { label: 'Monthly Food Exp.', value: '₹2,10,000', icon: '💰', bg: 'bg-emerald-50' },
              ].map((stat, i) => (
                <div key={i} className={`p-5 rounded-2xl ${stat.bg} flex flex-col items-center justify-center text-center`}>
                  <span className="text-2xl mb-2">{stat.icon}</span>
                  <p className="text-xs font-bold uppercase tracking-wider text-secondary">{stat.label}</p>
                  <h3 className="text-xl font-black text-primary mt-1">{stat.value}</h3>
                </div>
              ))}
            </div>
          </div>
        );

      case 'complaints':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-red-500" /> Complaint Analytics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Raised', value: '45', color: 'text-secondary' },
                { label: 'Resolved', value: '38', color: 'text-green-600' },
                { label: 'Pending', value: '7', color: 'text-orange-600' },
                { label: 'High Priority', value: '2', color: 'text-red-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-card border border-border/50 p-5 rounded-2xl text-center shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-disabled)] mb-1">{stat.label}</p>
                  <h3 className={`text-3xl font-black ${stat.color}`}>{stat.value}</h3>
                </div>
              ))}
            </div>
          </div>
        );

      // Remaining tabs placeholder
      default:
        return (
          <div className="animate-in fade-in zoom-in-95 duration-500 pt-16 pb-24 flex flex-col items-center justify-center text-center bg-card rounded-2xl border border-border/50">
            <div className="w-16 h-16 bg-page rounded-full flex items-center justify-center mb-4 border border-border/50">
              <LineChart className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-primary mb-2 capitalize">{activeTab} Reports</h2>
            <p className="text-[var(--text-disabled)] max-w-sm">Rich data visualization and tables for {activeTab} will be populated here.</p>
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
            <TrendingUp className="w-7 h-7 text-[#F5A623]" />
            Reports & Analytics
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Make data-driven decisions with real-time PG performance insights.</p>
        </div>
        
        {/* Export Buttons */}
        <div className="relative">
          <button 
            onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
            className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors w-full md:w-auto justify-center"
          >
            <Download className="w-4 h-4" /> Export Report <ChevronDown className="w-4 h-4" />
          </button>
          
          {isExportMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border/50 rounded-xl shadow-xl z-20 overflow-hidden">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors border-b border-gray-50">
                <FileText className="w-4 h-4" /> Export as PDF
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-green-600 hover:bg-green-50 transition-colors border-b border-gray-50">
                <FileSpreadsheet className="w-4 h-4" /> Export as Excel
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-secondary hover:bg-page transition-colors">
                <FileText className="w-4 h-4" /> Export as CSV
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Side: Horizontal/Vertical Tabs */}
        <div className="xl:w-64 shrink-0 flex flex-row xl:flex-col gap-2 overflow-x-auto pb-2 xl:pb-0 scrollbar-hide">
          {reportTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm shrink-0 xl:w-full ${
                activeTab === tab.id
                  ? 'bg-card text-primary shadow-md border-l-4 xl:border-l-4 xl:border-b-0 border-b-4 border-[#F5A623]'
                  : 'bg-card/50 text-[var(--text-disabled)] hover:bg-card hover:text-secondary border-l-4 xl:border-l-4 xl:border-b-0 border-b-4 border-transparent'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${activeTab === tab.id ? tab.bg : 'bg-[var(--bg-overlay)]'}`}>
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? tab.color : 'text-gray-400'}`} />
              </div>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Side: Tab Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
      
    </div>
  );
}
