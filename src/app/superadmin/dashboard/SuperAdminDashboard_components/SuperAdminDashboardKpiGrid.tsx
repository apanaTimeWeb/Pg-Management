// RESPONSIBILITY: Renders the SuperAdminDashboardKpiGrid component.
import React from 'react';
import { Users, Clock, Building2, UserCircle, CreditCard, Activity, Ticket } from 'lucide-react';

import type { SuperAdminDashboardKpiGridProps } from '@/app/superadmin/dashboard/SuperAdminDashboard_types/SuperAdminDashboard.types';

export const SuperAdminDashboardKpiGrid: React.FC<SuperAdminDashboardKpiGridProps> = ({ data }) => {
  const kpis = [
    { label: 'TOTAL OWNERS', value: data.activeOwnersCount, icon: Users, color: 'text-primary', bg: 'bg-primary-subtle', trend: '+12% vs last month', trendUp: true },
    { label: 'PENDING REQUESTS', value: data.pendingRequestsCount, icon: Clock, color: 'text-warning', bg: 'bg-warning-bg', trend: '-2% vs last month', trendUp: false },
    { label: 'ACTIVE PROPERTIES', value: data.activePropertiesCount, icon: Building2, color: 'text-success', bg: 'bg-success-bg', trend: '+5% vs last month', trendUp: true },
    { label: 'TOTAL STUDENTS', value: data.totalStudentsCount, icon: UserCircle, color: 'text-info', bg: 'bg-info-bg', trend: '+18% vs last month', trendUp: true },
    { label: 'MRR (DUMMY)', value: `₹${(data.mrr / 1000).toFixed(1)}k`, icon: CreditCard, color: 'text-success', bg: 'bg-success-bg', trend: '+8.4% vs last month', trendUp: true },
    { label: 'NETWORK OCCUPANCY', value: `${data.occupancyPercentage}%`, icon: Activity, color: 'text-primary', bg: 'bg-primary-subtle', trend: '+2.1% vs last month', trendUp: true },
    { label: 'OPEN TICKETS', value: data.openTicketsCount, icon: Ticket, color: 'text-danger', bg: 'bg-danger-bg', trend: '-14% vs last month', trendUp: false },
    { label: 'EXPIRING PLANS', value: data.expiringPlansCount, icon: Clock, color: 'text-warning', bg: 'bg-warning-bg', trend: 'Next 30 days', trendUp: null },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => (
        <div
          key={(kpi as any).id || (kpi as any).name || (kpi as any).title || i}
          className="card bg-card border border p-5 rounded-[var(--radius-lg,12px)] shadow-sm flex flex-col justify-between min-h-[120px] group motion-safe:hover:-translate-y-1 hover:shadow-md motion-safe:transition-all"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-[var(--radius-md,8px)] flex items-center justify-center ${kpi.bg} bg-opacity-20`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <span className="text-[11px] font-bold text-secondary tracking-wider">
                {kpi.label}
              </span>
            </div>
            <div className="text-[28px] font-bold text-primary leading-none">{kpi.value}</div>
          </div>
          {kpi.trend && (
            <div className={`text-xs mt-4 font-medium ${kpi.trendUp === true ? 'text-success' : kpi.trendUp === false ? 'text-danger' : 'text-secondary'}`}>
              {kpi.trendUp === true ? '↑ ' : kpi.trendUp === false ? '↓ ' : ''}{kpi.trend}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
