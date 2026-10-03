import { Users, LogIn, LogOut, MessageSquare, BedDouble } from 'lucide-react';
import type { ManagerDashboardStats } from '@/app/manager/dashboard/ManagerDashboard_types/ManagerDashboard.types';

interface Props {
  stats: ManagerDashboardStats | null;
}

export function ManagerDashboardStatsGrid({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* 5 Stats Cards as requested: Check-in Today, Check-out, Pending Complaints, Visitors, Occupied Beds */}
      <StatCard 
        icon={<LogIn className="w-5 h-5 text-success" />} 
        label="Check-in Today" 
        value={stats?.todayCheckins || 0} 
      />
      <StatCard 
        icon={<LogOut className="w-5 h-5 text-warning" />} 
        label="Check-out Today" 
        value={stats?.todayCheckouts || 0} 
      />
      <StatCard 
        icon={<MessageSquare className="w-5 h-5 text-danger" />} 
        label="Pending Complaints" 
        value={stats?.openComplaints || 0} 
      />
      <StatCard 
        icon={<Users className="w-5 h-5 text-info" />} 
        label="Pending Visitors" 
        value={stats?.pendingVisitors || 0} 
      />
      <StatCard 
        icon={<BedDouble className="w-5 h-5 text-theme-primary" />} 
        label="Occupied Beds" 
        value={stats?.occupiedBeds || 0} 
      />
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) {
  return (
    <div className="relative overflow-hidden bg-card border border-border/40 rounded-2xl p-5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      {/* Subtle background glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-theme-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className="text-sm font-bold text-secondary uppercase tracking-wider">{label}</span>
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-border/50 shadow-sm backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-black text-primary relative z-10">{value}</div>
    </div>
  );
}