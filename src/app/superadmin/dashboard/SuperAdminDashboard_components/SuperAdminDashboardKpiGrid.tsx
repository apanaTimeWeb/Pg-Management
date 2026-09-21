// RESPONSIBILITY: Renders the SuperAdminDashboardKpiGrid component.
import React from 'react';
import { Users, Building2, DoorOpen, Bed, UserCircle, Activity } from 'lucide-react';
import Link from 'next/link';

import type { SuperAdminDashboardKpiGridProps } from '@/app/superadmin/dashboard/SuperAdminDashboard_types/SuperAdminDashboard.types';

export const SuperAdminDashboardKpiGrid: React.FC<SuperAdminDashboardKpiGridProps> = ({ data }) => {
  const kpis = [
    { label: 'Total Owners', value: data.totalOwners, icon: Users, route: '/superadmin/owners' },
    { label: 'Total Properties', value: data.totalProperties, icon: Building2, route: null },
    { label: 'Total Rooms', value: data.totalRooms, icon: DoorOpen, route: null },
    { label: 'Total Beds', value: data.totalBeds, icon: Bed, route: null },
    { label: 'Total Students', value: data.totalStudents, icon: UserCircle, route: null },
    { label: 'Occupancy', value: `${data.occupiedBeds} / ${data.totalBeds} (${data.occupancyPercentage}%)`, icon: Activity, route: null },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi, i) => {
        const CardContent = (
          <>
            <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-10 bg-[var(--primary)] transition-transform group-hover:scale-110"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[var(--primary-subtle)]">
                  <kpi.icon className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider leading-tight">
                  {kpi.label}
                </span>
              </div>
              <div className="mt-auto text-2xl sm:text-3xl font-extrabold leading-none tracking-tight text-[var(--text-primary)]">
                {kpi.value}
              </div>
            </div>
          </>
        );

        const className = "bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm min-h-[130px] relative overflow-hidden group motion-safe:transition-all hover:border-[var(--primary)] hover:shadow-md";

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
