import { Users, LogIn, LogOut, MessageSquare, BedDouble, TrendingUp } from 'lucide-react';
import type { ManagerDashboardStats } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_types/ManagerDashboard.types';

interface Props {
  stats: ManagerDashboardStats | null;
}

export function ManagerDashboardStatsGrid({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatCard 
        icon={LogIn} 
        color="text-success" 
        bg="bg-success-bg"
        label="Check-in Today" 
        value={stats?.todayCheckins || 0} 
        trend="Scheduled"
      />
      <StatCard 
        icon={LogOut} 
        color="text-warning" 
        bg="bg-warning-bg"
        label="Check-out Today" 
        value={stats?.todayCheckouts || 0} 
        trend="Pending"
      />
      <StatCard 
        icon={MessageSquare} 
        color="text-danger" 
        bg="bg-danger-bg"
        label="Pending Complaints" 
        value={stats?.openComplaints || 0} 
        trend="Requires action"
      />
      <StatCard 
        icon={Users} 
        color="text-info" 
        bg="bg-info-bg"
        label="Pending Visitors" 
        value={stats?.pendingVisitors || 0} 
        trend="Approvals needed"
      />
      <StatCard 
        icon={BedDouble} 
        color="text-theme-primary" 
        bg="bg-primary-subtle"
        label="Occupied Beds" 
        value={stats?.occupiedBeds || 0} 
        trend="Active residents"
      />
    </div>
  );
}

function StatCard({ icon: Icon, color, bg, label, value, trend }: { icon: any, color: string, bg: string, label: string, value: number, trend: string }) {
  return (
    <div className="bg-card border border-border/50 p-6 rounded-3xl shadow-sm hover:border-theme-primary/30 hover:shadow-md transition-all group flex flex-col justify-between relative overflow-hidden">
      <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform ${color}`}><Icon className="w-16 h-16"/></div>
      <div>
         <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 rounded-xl ${bg} ${color} group-hover:scale-110 transition-transform`}>
               <Icon className="w-5 h-5" />
            </div>
            <TrendingUp className="w-4 h-4 text-secondary/50" />
         </div>
         <div className="relative z-10">
            <h3 className="text-3xl font-black text-primary mb-1">{value}</h3>
            <p className="text-sm font-bold text-secondary tracking-tight">{label}</p>
            <p className="text-[10px] font-bold text-secondary/70 uppercase mt-1">{trend}</p>
         </div>
      </div>
    </div>
  );
}