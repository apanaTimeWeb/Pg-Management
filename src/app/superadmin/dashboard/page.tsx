'use client';

// RESPONSIBILITY: Entry point for the SuperAdmin Dashboard page. Composes KPI grid, latest requests table, and acquisition chart.
import React from 'react';

import { SuperAdminDashboardKpiGrid } from '@/app/superadmin/dashboard/SuperAdminDashboard_components/SuperAdminDashboardKpiGrid';
import { SuperAdminDashboardLatestRequestsTable } from '@/app/superadmin/dashboard/SuperAdminDashboard_components/SuperAdminDashboardLatestRequestsTable';
import { SuperAdminDashboardAcquisitionChart } from '@/app/superadmin/dashboard/SuperAdminDashboard_components/SuperAdminDashboardAcquisitionChart';
import { SuperadminUseSuperAdminDashboardData } from '@/app/superadmin/dashboard/SuperAdminDashboard_hooks/SuperadminUseSuperAdminDashboardData';
import { SUPER_ADMIN_DASHBOARD_ACQUISITION_MOCK } from '@/app/superadmin/dashboard/SuperAdminDashboard_utils/SuperAdminDashboard.constants';

export default function SuperAdminDashboardPage() {
  const { data } = SuperadminUseSuperAdminDashboardData();

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 text-secondary">
        Loading dashboard data...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-[22px] font-bold text-primary">Dashboard</h1>
        <p className="text-secondary text-sm">Platform-wide overview and health metrics.</p>
      </div>

      {/* KPI Grid */}
      <SuperAdminDashboardKpiGrid data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Requests Table */}
        <div className="lg:col-span-2">
          <SuperAdminDashboardLatestRequestsTable requests={data.latestRequests} />
        </div>

        {/* Student Acquisition Chart */}
        <div className="lg:col-span-1">
          <SuperAdminDashboardAcquisitionChart data={SUPER_ADMIN_DASHBOARD_ACQUISITION_MOCK} />
        </div>
      </div>
    </div>
  );
}
