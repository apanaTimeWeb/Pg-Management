import { Building2, Wallet, Broom, Wrench } from 'lucide-react';
import type { ManagerDashboardStats } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_types/ManagerDashboard.types';

interface Props {
  stats: ManagerDashboardStats | null;
}

export function ManagerDashboardSummaryCards({ stats }: Props) {
  if (!stats) return null;
  
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Room Status */}
      <div className="bg-card border border-border/50 rounded-3xl p-6 flex-1 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg transition-shadow">
        <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4 flex items-center gap-2 relative z-10">
          <div className="p-1.5 bg-primary-subtle rounded-lg text-theme-primary"><Building2 className="w-4 h-4" /></div> Room Status
        </h3>
        <div className="flex justify-between items-end mb-3 relative z-10">
          <p className="text-3xl font-black text-primary">{stats.occupancyRate}%</p>
          <p className="text-xs text-secondary font-medium pb-1 bg-bg-page px-2 py-0.5 rounded border border-border/50">Occupancy</p>
        </div>
        <div className="w-full bg-input rounded-full h-2 relative z-10 overflow-hidden border border-border/50">
          <div className="bg-theme-primary h-2 rounded-full shadow-[0_0_10px_rgba(var(--theme-primary),0.8)]" style={{ width: `${stats.occupancyRate}%` }}></div>
        </div>
      </div>

      {/* Rent Collection */}
      <div className="bg-card border border-border/50 rounded-3xl p-6 flex-1 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg transition-shadow">
        <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4 flex items-center gap-2 relative z-10">
          <div className="p-1.5 bg-success-bg rounded-lg text-success"><Wallet className="w-4 h-4" /></div> Rent Collection
        </h3>
        <div className="flex justify-between items-end mb-3 relative z-10">
          <p className="text-2xl font-black text-success">₹{(stats.rentCollected / 1000).toFixed(1)}k</p>
          <p className="text-xs text-secondary font-medium pb-1 bg-bg-page px-2 py-0.5 rounded border border-border/50">/ ₹{(stats.rentTarget / 1000).toFixed(1)}k</p>
        </div>
        <div className="w-full bg-input rounded-full h-2 relative z-10 overflow-hidden border border-border/50">
          <div className="bg-success h-2 rounded-full shadow-[0_0_10px_rgba(var(--success),0.8)]" style={{ width: `${stats.rentTarget ? (stats.rentCollected/stats.rentTarget)*100 : 0}%` }}></div>
        </div>
      </div>

      {/* Housekeeping */}
      <div className="bg-card border border-border/50 rounded-3xl p-6 flex-1 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg transition-shadow">
        <div className="absolute inset-0 bg-gradient-to-br from-info/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4 flex items-center gap-2 relative z-10">
          <div className="p-1.5 bg-info-bg rounded-lg text-info"><Broom className="w-4 h-4" /></div> Housekeeping
        </h3>
        <div className="flex justify-between items-end mb-3 relative z-10">
          <p className="text-3xl font-black text-info">{stats.housekeepingDone}</p>
          <p className="text-xs text-secondary font-medium pb-1 bg-bg-page px-2 py-0.5 rounded border border-border/50">/ {stats.housekeepingTotal} Rooms</p>
        </div>
        <div className="w-full bg-input rounded-full h-2 relative z-10 overflow-hidden border border-border/50">
          <div className="bg-info h-2 rounded-full shadow-[0_0_10px_rgba(var(--info),0.8)]" style={{ width: `${stats.housekeepingTotal ? (stats.housekeepingDone/stats.housekeepingTotal)*100 : 0}%` }}></div>
        </div>
      </div>

      {/* Maintenance */}
      <div className="bg-card border border-border/50 rounded-3xl p-6 flex-1 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg transition-shadow">
        <div className="absolute inset-0 bg-gradient-to-br from-danger/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4 flex items-center gap-2 relative z-10">
          <div className="p-1.5 bg-danger-bg rounded-lg text-danger"><Wrench className="w-4 h-4" /></div> Maintenance
        </h3>
        <div className="flex justify-between items-end mb-2 relative z-10">
          <p className="text-3xl font-black text-danger">{stats.maintenanceOpen}</p>
          <p className="text-xs text-secondary font-medium pb-1">Open Tickets</p>
        </div>
        <p className="text-xs font-bold text-danger bg-danger-bg border border-danger/20 inline-block px-3 py-1.5 rounded-lg mt-2 relative z-10 w-max">
          Requires Attention
        </p>
      </div>
    </div>
  );
}
