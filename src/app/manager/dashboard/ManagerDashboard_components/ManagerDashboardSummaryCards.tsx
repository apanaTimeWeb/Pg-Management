import { Building2, Wallet, Broom, Wrench } from 'lucide-react';
import type { ManagerDashboardStats } from '@/app/manager/dashboard/ManagerDashboard_types/ManagerDashboard.types';

interface Props {
  stats: ManagerDashboardStats | null;
}

export function ManagerDashboardSummaryCards({ stats }: Props) {
  if (!stats) return null;
  
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Room Status */}
      <div className="bg-card border border-border/40 rounded-2xl p-5 flex-1 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg transition-shadow">
        <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-xs font-bold text-secondary uppercase mb-3 flex items-center gap-1.5 relative z-10">
          <Building2 className="w-4 h-4 text-theme-primary" /> Room Status
        </h3>
        <div className="flex justify-between items-end mb-3 relative z-10">
          <p className="text-3xl font-black text-primary">{stats.occupancyRate}%</p>
          <p className="text-xs text-secondary font-medium pb-1">Occupancy</p>
        </div>
        <div className="w-full bg-input rounded-full h-1.5 relative z-10 overflow-hidden">
          <div className="bg-theme-primary h-1.5 rounded-full" style={{ width: `${stats.occupancyRate}%` }}></div>
        </div>
      </div>

      {/* Rent Collection */}
      <div className="bg-card border border-border/40 rounded-2xl p-5 flex-1 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg transition-shadow">
        <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-xs font-bold text-secondary uppercase mb-3 flex items-center gap-1.5 relative z-10">
          <Wallet className="w-4 h-4 text-success" /> Rent Collection
        </h3>
        <div className="flex justify-between items-end mb-3 relative z-10">
          <p className="text-xl font-black text-success">₹{(stats.rentCollected / 1000).toFixed(1)}k</p>
          <p className="text-xs text-secondary font-medium pb-0.5">/ ₹{(stats.rentTarget / 1000).toFixed(1)}k</p>
        </div>
        <div className="w-full bg-input rounded-full h-1.5 relative z-10 overflow-hidden">
          <div className="bg-success h-1.5 rounded-full" style={{ width: `${stats.rentTarget ? (stats.rentCollected/stats.rentTarget)*100 : 0}%` }}></div>
        </div>
      </div>

      {/* Housekeeping */}
      <div className="bg-card border border-border/40 rounded-2xl p-5 flex-1 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg transition-shadow">
        <div className="absolute inset-0 bg-gradient-to-br from-info/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-xs font-bold text-secondary uppercase mb-3 flex items-center gap-1.5 relative z-10">
          <Broom className="w-4 h-4 text-info" /> Housekeeping
        </h3>
        <div className="flex justify-between items-end mb-3 relative z-10">
          <p className="text-3xl font-black text-info">{stats.housekeepingDone}</p>
          <p className="text-xs text-secondary font-medium pb-1">/ {stats.housekeepingTotal} Rooms</p>
        </div>
        <div className="w-full bg-input rounded-full h-1.5 relative z-10 overflow-hidden">
          <div className="bg-info h-1.5 rounded-full" style={{ width: `${stats.housekeepingTotal ? (stats.housekeepingDone/stats.housekeepingTotal)*100 : 0}%` }}></div>
        </div>
      </div>

      {/* Maintenance */}
      <div className="bg-card border border-border/40 rounded-2xl p-5 flex-1 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg transition-shadow">
        <div className="absolute inset-0 bg-gradient-to-br from-danger/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-xs font-bold text-secondary uppercase mb-3 flex items-center gap-1.5 relative z-10">
          <Wrench className="w-4 h-4 text-danger" /> Maintenance
        </h3>
        <div className="flex justify-between items-end mb-2 relative z-10">
          <p className="text-3xl font-black text-danger">{stats.maintenanceOpen}</p>
          <p className="text-xs text-secondary font-medium pb-1">Open Tickets</p>
        </div>
        <p className="text-xs font-bold text-danger bg-danger/10 border border-danger/20 inline-block px-2.5 py-1 rounded-md mt-2 relative z-10 w-max">
          Requires Attention
        </p>
      </div>
    </div>
  );
}
