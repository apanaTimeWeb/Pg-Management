// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  BarChart3, Users, Bed, CalendarCheck, IndianRupee, DoorOpen, 
  MessageSquare, Utensils, Package, Download, FileText, 
  FileSpreadsheet, FileIcon, Filter, Search, ChevronRight
} from 'lucide-react';

type ReportCategory = 'Students' | 'Occupancy' | 'Attendance' | 'Fees' | 'Leave' | 'Complaints' | 'Mess' | 'Inventory';

const categories: { id: ReportCategory, icon: React.ReactNode, label: string }[] = [
  { id: 'Students', icon: <Users className="w-5 h-5" />, label: 'Student Reports' },
  { id: 'Occupancy', icon: <Bed className="w-5 h-5" />, label: 'Occupancy' },
  { id: 'Attendance', icon: <CalendarCheck className="w-5 h-5" />, label: 'Attendance' },
  { id: 'Fees', icon: <IndianRupee className="w-5 h-5" />, label: 'Fees & Dues' },
  { id: 'Leave', icon: <DoorOpen className="w-5 h-5" />, label: 'Leave & Outing' },
  { id: 'Complaints', icon: <MessageSquare className="w-5 h-5" />, label: 'Complaints' },
  { id: 'Mess', icon: <Utensils className="w-5 h-5" />, label: 'Mess & Food' },
  { id: 'Inventory', icon: <Package className="w-5 h-5" />, label: 'Inventory' },
];

export default function ManagerReportsMain() {
  const [activeCategory, setActiveCategory] = useState<ReportCategory>('Students');

  // Dummy metrics based on category
  const getMetrics = () => {
    switch (activeCategory) {
      case 'Students':
        return [
          { label: 'Active Students', value: '145', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'New Admissions', value: '12', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Check-outs', value: '5', color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'On Notice Period', value: '8', color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Room-wise Allocation', value: 'View', color: 'text-blue-600', bg: 'bg-blue-50', isLink: true },
        ];
      case 'Occupancy':
        return [
          { label: 'Room Occupancy', value: '85%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Bed Occupancy', value: '145/160', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Vacant Beds', value: '12', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Maintenance Beds', value: '3', color: 'text-red-600', bg: 'bg-red-50' },
        ];
      case 'Attendance':
        return [
          { label: 'Daily Attendance', value: '92%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Monthly Avg.', value: '89%', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Student-wise', value: 'View', color: 'text-indigo-600', bg: 'bg-indigo-50', isLink: true },
          { label: 'Room-wise', value: 'View', color: 'text-indigo-600', bg: 'bg-indigo-50', isLink: true },
        ];
      case 'Fees':
        return [
          { label: "Today's Collection", value: '₹45,000', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Pending Dues', value: '₹1.2L', color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Overdue (Critical)', value: '₹35,000', color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Payment History', value: 'View', color: 'text-indigo-600', bg: 'bg-indigo-50', isLink: true },
        ];
      case 'Leave':
        return [
          { label: 'Pending Requests', value: '4', color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Approved (This Month)', value: '28', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Current Outings', value: '15', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Overdue Returns', value: '2', color: 'text-red-600', bg: 'bg-red-50' },
        ];
      case 'Complaints':
        return [
          { label: 'New / Unassigned', value: '5', color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Pending Resolution', value: '3', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Resolved (This Month)', value: '42', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Category-wise Breakdown', value: 'View', color: 'text-indigo-600', bg: 'bg-indigo-50', isLink: true },
        ];
      case 'Mess':
        return [
          { label: "Today's Meal Count", value: '135', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Avg. Meal Attendance', value: '88%', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Menu Report', value: 'View', color: 'text-indigo-600', bg: 'bg-indigo-50', isLink: true },
        ];
      case 'Inventory':
        return [
          { label: 'Total Categories', value: '12', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Low Stock Alerts', value: '3', color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Monthly Usage', value: 'View', color: 'text-blue-600', bg: 'bg-blue-50', isLink: true },
          { label: 'Damage/Loss', value: '₹2,500', color: 'text-red-600', bg: 'bg-red-50' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <BarChart3 className="w-6 h-6"/>
            </div>
            Operational Reports
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Generate and export day-to-day operational reports.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-page p-1 rounded-xl border border-border/60">
            <button className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
              <FileText className="w-4 h-4 text-red-500" /> PDF
            </button>
            <button className="flex items-center gap-2 text-secondary hover:text-primary hover:bg-white/50 px-4 py-2 rounded-lg text-sm font-bold transition-all">
              <FileSpreadsheet className="w-4 h-4 text-green-600" /> Excel
            </button>
            <button className="flex items-center gap-2 text-secondary hover:text-primary hover:bg-white/50 px-4 py-2 rounded-lg text-sm font-bold transition-all">
              <FileIcon className="w-4 h-4 text-blue-500" /> CSV
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                activeCategory === cat.id 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-card text-secondary hover:bg-page border border-border/50'
              }`}
            >
              <div className="flex items-center gap-3">
                {cat.icon}
                {cat.label}
              </div>
              {activeCategory === cat.id && <ChevronRight className="w-4 h-4 opacity-70" />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {getMetrics().map((metric, idx) => (
              <div key={idx} className="bg-card border border-border/60 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer">
                <p className="text-secondary text-xs font-bold uppercase tracking-wider mb-2">{metric.label}</p>
                {metric.isLink ? (
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-black ${metric.bg} ${metric.color}`}>
                    {metric.value} <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <h3 className={`text-2xl font-black ${metric.color}`}>{metric.value}</h3>
                )}
              </div>
            ))}
          </div>

          {/* Report Data Table area */}
          <div className="bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100">
            <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/30">
              <h3 className="font-bold text-primary flex items-center gap-2">
                Detailed {activeCategory} Data
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                  <input 
                    type="text" 
                    placeholder="Search in report..." 
                    className="pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500 w-full sm:w-auto"
                  />
                </div>
                <button className="p-2 border border-border rounded-lg text-secondary hover:text-primary hover:bg-page transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-8 text-center min-h-[300px] flex flex-col items-center justify-center bg-gray-50/30">
              <div className="w-16 h-16 bg-white border border-border rounded-2xl flex items-center justify-center mb-4 shadow-sm rotate-3">
                <BarChart3 className="w-8 h-8 text-indigo-400 -rotate-3" />
              </div>
              <h4 className="text-lg font-bold text-primary mb-1">{activeCategory} Data Table</h4>
              <p className="text-sm text-secondary max-w-md mx-auto mb-6">
                Detailed tabular data for {activeCategory.toLowerCase()} will be generated here. Use the export options above to download the full report.
              </p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2">
                <Download className="w-4 h-4" /> Generate Report
              </button>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
