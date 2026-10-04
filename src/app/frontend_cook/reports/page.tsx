'use client';

import React from 'react';
import { 
  FileText, 
  Utensils, 
  ClipboardList, 
  Package, 
  Trash2, 
  AlertTriangle,
  Download,
  Eye,
  ChevronRight
} from 'lucide-react';

type ReportCategory = {
  title: string;
  icon: any;
  color: string;
  bg: string;
  reports: string[];
};

const REPORT_CATEGORIES: ReportCategory[] = [
  {
    title: 'Meal Reports',
    icon: Utensils,
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    reports: [
      'Breakfast Count',
      'Lunch Count',
      'Dinner Count',
      'Monthly Meal Count'
    ]
  },
  {
    title: 'Menu Reports',
    icon: ClipboardList,
    color: 'text-indigo-500',
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    reports: [
      'Daily Menu',
      'Weekly Menu',
      'Monthly Menu',
      'Menu History'
    ]
  },
  {
    title: 'Inventory Reports',
    icon: Package,
    color: 'text-green-500',
    bg: 'bg-green-100 dark:bg-green-900/30',
    reports: [
      'Current Stock',
      'Low Stock',
      'Stock Usage',
      'Consumption'
    ]
  },
  {
    title: 'Wastage Reports',
    icon: Trash2,
    color: 'text-orange-500',
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    reports: [
      'Daily Wastage',
      'Weekly Wastage',
      'Monthly Wastage',
      'Item-wise Wastage',
      'Meal-wise Wastage'
    ]
  },
  {
    title: 'Complaint Reports',
    icon: AlertTriangle,
    color: 'text-red-500',
    bg: 'bg-red-100 dark:bg-red-900/30',
    reports: [
      'Open Complaints',
      'Resolved Complaints',
      'Category-wise Complaints'
    ]
  }
];

export default function ReportsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Operational Reports</h1>
            <p className="text-sm text-secondary">
              Generate and view kitchen operations and meal analytics
            </p>
          </div>
        </div>
        
        {/* Info Banner showing financial reports restriction */}
        <div className="bg-warning/10 border border-warning/20 px-4 py-2 rounded-lg flex items-center gap-2 max-w-sm">
          <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
          <p className="text-xs font-medium text-warning">
            Note: Financial and pricing reports are restricted to Owner access only.
          </p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {REPORT_CATEGORIES.map((category, idx) => (
          <div 
            key={idx} 
            className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-primary/30"
          >
            {/* Card Header */}
            <div className="p-5 border-b border-border flex items-center gap-3 bg-page/30">
              <div className={`p-2 rounded-lg ${category.bg}`}>
                <category.icon className={`w-5 h-5 ${category.color}`} />
              </div>
              <h2 className="text-lg font-bold text-primary">{category.title}</h2>
            </div>
            
            {/* Card Body - Report List */}
            <div className="p-2 flex-1">
              <ul className="space-y-1">
                {category.reports.map((report, rIdx) => (
                  <li key={rIdx}>
                    <button className="w-full flex items-center justify-between px-4 py-3 rounded-md text-sm font-medium text-secondary hover:text-primary hover:bg-page transition-colors group">
                      <span className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all" />
                        {report}
                      </span>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="p-1.5 bg-primary/10 text-primary rounded-md hover:bg-primary hover:text-white transition-colors" title="View Report">
                          <Eye className="w-3.5 h-3.5" />
                        </span>
                        <span className="p-1.5 bg-primary/10 text-primary rounded-md hover:bg-primary hover:text-white transition-colors" title="Download CSV/PDF">
                          <Download className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
