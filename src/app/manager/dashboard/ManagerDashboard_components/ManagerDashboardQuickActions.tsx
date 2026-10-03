// RESPONSIBILITY: Renders the ManagerDashboardQuickActions component.
import Link from 'next/link';
import { 
  UserPlus, 
  IndianRupee, 
  AlertCircle, 
  Package, 
  TrendingUp 
} from 'lucide-react';
export function ManagerDashboardQuickActions() {
  return (
    <div className="md:col-span-3 lg:col-span-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-primary text-xl tracking-tight">
          Quick Actions
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/manager/students" className="relative group overflow-hidden bg-card border border-border/50 rounded-2xl p-4 flex flex-col gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 bg-theme-primary/10 rounded-xl flex items-center justify-center text-theme-primary group-hover:scale-110 transition-transform shadow-sm relative z-10">
            <UserPlus className="w-6 h-6" />
          </div>
          <div className="relative z-10 mt-1">
            <span className="text-sm font-bold text-primary block">Add Resident</span>
            <span className="text-xs text-secondary mt-0.5 block">Onboard new students</span>
          </div>
        </Link>

        <Link href="/manager/finance" className="relative group overflow-hidden bg-card border border-border/50 rounded-2xl p-4 flex flex-col gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center text-success group-hover:scale-110 transition-transform shadow-sm relative z-10">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div className="relative z-10 mt-1">
            <span className="text-sm font-bold text-primary block">Collect Rent</span>
            <span className="text-xs text-secondary mt-0.5 block">Record payments & dues</span>
          </div>
        </Link>

        <Link href="/manager/complaints" className="relative group overflow-hidden bg-card border border-border/50 rounded-2xl p-4 flex flex-col gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-danger/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 bg-danger/10 rounded-xl flex items-center justify-center text-danger group-hover:scale-110 transition-transform shadow-sm relative z-10">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="relative z-10 mt-1">
            <span className="text-sm font-bold text-primary block">Complaints</span>
            <span className="text-xs text-secondary mt-0.5 block">Resolve issues quickly</span>
          </div>
        </Link>

        <Link href="/manager/inventory" className="relative group overflow-hidden bg-card border border-border/50 rounded-2xl p-4 flex flex-col gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-warning/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center text-warning group-hover:scale-110 transition-transform shadow-sm relative z-10">
            <Package className="w-6 h-6" />
          </div>
          <div className="relative z-10 mt-1">
            <span className="text-sm font-bold text-primary block">Inventory</span>
            <span className="text-xs text-secondary mt-0.5 block">Manage PG stock & items</span>
          </div>
        </Link>
      </div>
    </div>
  );
}