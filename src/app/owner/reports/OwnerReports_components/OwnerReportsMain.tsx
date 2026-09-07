'use client';

// RESPONSIBILITY: Renders the OwnerReportsMain component. Receives data via props/hooks.

import { useState, useEffect } from 'react';
import { api } from '@/app/login/lib/api/auth';
import { getSession } from '@/app/login/lib/auth/session';
import { useOwnerPropertyContext } from '@/app/owner/components/OwnerPropertyContext';
import { BarChart3, PieChart, Download, Building, Users, AlertCircle } from 'lucide-react';

export function OwnerReportsMain() {
  const user = typeof window !== 'undefined' ? getSession() : null;
  const { selectedPropertyId } = useOwnerPropertyContext();

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const data = api.reports.getOwnerReport(user.id, selectedPropertyId);
    setReport(data);
    setLoading(false);
  }, [user?.id, selectedPropertyId]);

  const handleExport = () => {
    if (!report) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `pg_report_${new Date().toISOString().split('T')[0]}.json`);
    dlAnchorElem.click();
  };

  if (loading || !report) return <div className="p-6 animate-pulse">Loading reports...</div>;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-primary">Analytics & Reports</h1>
          <p className="text-sm text-secondary">Insights into occupancy, collections, and complaints.</p>
        </div>
        <button 
          onClick={handleExport}
          className="bg-card border border-border text-primary px-4 py-2 rounded-md font-medium hover:border-primary transition-colors flex items-center gap-2 text-sm shadow-sm justify-center"
        >
          <Download className="w-4 h-4" />
          <span>Export JSON</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Occupancy Card */}
        <div className="bg-card border border-border rounded-lg p-6 hover:border-primary-subtle transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[rgba(99,102,241,0.1)] text-primary rounded-lg">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-primary">Occupancy Rate</h3>
          </div>
          <div className="flex items-end gap-3 mb-2">
            <span className="text-4xl font-bold text-primary">{report.occupancyRate}%</span>
          </div>
          <div className="w-full bg-input rounded-full h-2 mb-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: `${report.occupancyRate}%` }}></div>
          </div>
          <p className="text-xs text-secondary">{report.occupiedBeds} out of {report.totalBeds} beds occupied</p>
        </div>

        {/* Collection Efficiency Card */}
        <div className="bg-card border border-border rounded-lg p-6 hover:border-success transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[rgba(16,185,129,0.1)] text-success rounded-lg">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-primary">Collection Efficiency</h3>
          </div>
          <div className="flex items-end gap-3 mb-2">
            <span className="text-4xl font-bold text-success">{report.collectionEfficiency}%</span>
          </div>
          <div className="w-full bg-input rounded-full h-2 mb-2">
            <div className="bg-success h-2 rounded-full" style={{ width: `${report.collectionEfficiency}%` }}></div>
          </div>
          <p className="text-xs text-secondary">Of total generated invoices this month</p>
        </div>

        {/* Complaints Card */}
        <div className="bg-card border border-border rounded-lg p-6 hover:border-warning transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-warning-bg text-warning rounded-lg border border-warning">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-primary">Open Complaints</h3>
          </div>
          <div className="flex items-end gap-3 mb-2">
            <span className="text-4xl font-bold text-warning">{report.openComplaints}</span>
          </div>
          <div className="w-full bg-input rounded-full h-2 mb-2">
            <div className="bg-warning h-2 rounded-full w-1/3"></div>
          </div>
          <p className="text-xs text-secondary">Total {report.totalComplaints} complaints filed historically</p>
        </div>
      </div>
    </div>
  );
}
