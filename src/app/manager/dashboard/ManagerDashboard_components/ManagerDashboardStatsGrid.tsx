// RESPONSIBILITY: Renders the ManagerDashboardStatsGrid component.
import { 
  Users, 
  BedDouble, 
  ClipboardCheck, 
  AlertCircle, 
  UserPlus, 
  Wallet, 
  Clock 
} from 'lucide-react';
import type { ManagerDashboardStats } from '@/app/manager/dashboard/ManagerDashboard_types/ManagerDashboard.types';

export function ManagerDashboardStatsGrid({ stats }: { stats: ManagerDashboardStats | null }) {
  const widgets = [
    { label: 'Active Students', value: stats?.activeStudents || 0, icon: Users, color: 'text-primary', bg: 'bg-[rgba(99,102,241,0.1)]' },
    { label: 'Vacant Beds', value: stats?.vacantBeds || 0, icon: BedDouble, color: 'text-success', bg: 'bg-[rgba(10,185,129,0.1)]' },
    { label: 'Today Check-ins', value: stats?.todayCheckins || 0, icon: ClipboardCheck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Open Complaints', value: stats?.openComplaints || 0, icon: AlertCircle, color: 'text-danger', bg: 'bg-danger-bg' },
    { label: 'Pending Visitors', value: stats?.pendingVisitors || 0, icon: UserPlus, color: 'text-warning', bg: 'bg-warning-bg' },
    { label: 'Overdue Rent', value: stats?.overdueStudentsCount || 0, icon: Wallet, color: 'text-danger', bg: 'bg-danger-bg' },
    { label: 'Late Entries', value: stats?.lateEntries || 0, icon: Clock, color: 'text-warning', bg: 'bg-warning-bg' },
    { label: 'Active SOS', value: stats?.activeSos || 0, icon: AlertCircle, color: 'text-white', bg: 'bg-red-600 motion-safe:animate-pulse' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {widgets.map((w, i) => {
        const Icon = w.icon;
        return (
          <div key={i} className="bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-page)] border border rounded-[var(--radius-lg,12px)] p-5 motion-safe:hover:-translate-y-1 hover:shadow-lg motion-safe:transition-all group relative overflow-hidden">
            <div className={`absolute -right-4 -top-4 w-16 h-16 ${w.bg} rounded-full blur-xl opacity-50 group-hover:scale-150 transition-transform duration-700`}></div>
            <div className="flex items-center gap-3 mb-3 relative z-10">
              <div className={`p-2 rounded-lg ${w.bg}`}>
                <Icon className={`w-5 h-5 ${w.color}`} />
              </div>
              <div className="text-xs font-medium text-secondary leading-tight">{w.label}</div>
            </div>
            <div className="text-3xl font-bold text-primary relative z-10">{w.value}</div>
          </div>
        );
      })}
    </div>
  );
}
