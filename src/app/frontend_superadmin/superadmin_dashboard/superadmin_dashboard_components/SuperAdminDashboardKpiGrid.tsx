// RESPONSIBILITY: Renders the SuperAdminDashboardKpiGrid component.
import React from 'react';
import { Users, Building2, DoorOpen, Bed, UserCircle, Activity } from 'lucide-react';
import Link from 'next/link';

import type { SuperAdminDashboardKpiGridProps } from '@/app/frontend_superadmin/superadmin_dashboard/SuperAdminDashboard_types/SuperAdminDashboard.types';

export const SuperAdminDashboardKpiGrid: React.FC<SuperAdminDashboardKpiGridProps> = ({ data }) => {
  const kpis = [
    { label: 'Total Owners', value: data.totalOwners, icon: Users, route: '/superadmin/owners', color: 'text-info', bg: 'bg-info-bg', hover: 'hover:border-info/50', gradient: 'from-info/20 to-transparent' },
    { label: 'Total Properties', value: data.totalProperties, icon: Building2, route: null, color: 'text-success', bg: 'bg-success-bg', hover: 'hover:border-success/50', gradient: 'from-success/20 to-transparent' },
    { label: 'Total Rooms', value: data.totalRooms, icon: DoorOpen, route: null, color: 'text-warning', bg: 'bg-warning-bg', hover: 'hover:border-warning/50', gradient: 'from-warning/20 to-transparent' },
    { label: 'Total Beds', value: data.totalBeds, icon: Bed, route: null, color: 'text-purple', bg: 'bg-purple-bg', hover: 'hover:border-purple/50', gradient: 'from-purple/20 to-transparent' },
    { label: 'Total Students', value: data.totalStudents, icon: UserCircle, route: null, color: 'text-danger', bg: 'bg-danger-bg', hover: 'hover:border-danger/50', gradient: 'from-danger/20 to-transparent' },
    { label: 'Occupancy', value: `${data.occupancyPercentage}%`, icon: Activity, route: null, color: 'text-theme-primary', bg: 'bg-primary-subtle', hover: 'hover:border-theme-primary/50', gradient: 'from-theme-primary/20 to-transparent' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
      {kpis.map((kpi, i) => {
        const CardContent = (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${kpi.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl ${kpi.bg} group-hover:scale-150 transition-transform duration-700`}></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${kpi.bg} group-hover:scale-110 transition-transform duration-300`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
              <div className="mt-auto">
                <span className="text-xs font-bold text-secondary uppercase tracking-widest leading-tight mb-1 block">
                  {kpi.label}
                </span>
                <div className="text-3xl sm:text-4xl font-black leading-none tracking-tight text-primary">
                  {kpi.value}
                </div>
              </div>
            </div>
          </>
        );

        const className = `bg-card border border-border/50 rounded-3xl p-6 shadow-sm min-h-[160px] relative overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${kpi.hover}`;

        if (kpi.route) {
          return (
            <Link key={i} href={kpi.route} className={className}>
              {CardContent}
            </Link>
          );
        }

        return (
          <div key={i} className={className}>
            {CardContent}
          </div>
        );
      })}
    </div>
  );
};
