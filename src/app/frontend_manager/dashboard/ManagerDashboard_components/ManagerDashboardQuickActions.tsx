// RESPONSIBILITY: Renders the ManagerDashboardQuickActions component.
import Link from 'next/link';
import { 
  UserPlus, 
  IndianRupee, 
  AlertCircle, 
  Package
} from 'lucide-react';

export function ManagerDashboardQuickActions() {
  return (
    <div className="md:col-span-3 lg:col-span-4 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-black text-primary text-xl tracking-tight">
          Quick Actions
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Link href="/frontend_manager/students" className="relative group overflow-hidden bg-card border border-border/50 rounded-3xl p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 hover:border-theme-primary/30 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform text-theme-primary"><UserPlus className="w-16 h-16"/></div>
          <div className="w-14 h-14 bg-primary-subtle rounded-2xl flex items-center justify-center text-theme-primary group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-sm relative z-10">
            <UserPlus className="w-7 h-7" />
          </div>
          <div className="relative z-10 mt-2">
            <span className="text-lg font-black text-primary block">Add Resident</span>
            <span className="text-xs font-bold text-secondary mt-1 block">Onboard new students</span>
          </div>
        </Link>

        <Link href="/frontend_manager/finance" className="relative group overflow-hidden bg-card border border-border/50 rounded-3xl p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 hover:border-success/30 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-success/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform text-success"><IndianRupee className="w-16 h-16"/></div>
          <div className="w-14 h-14 bg-success-bg rounded-2xl flex items-center justify-center text-success group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-sm relative z-10">
            <IndianRupee className="w-7 h-7" />
          </div>
          <div className="relative z-10 mt-2">
            <span className="text-lg font-black text-primary block">Collect Rent</span>
            <span className="text-xs font-bold text-secondary mt-1 block">Record payments & dues</span>
          </div>
        </Link>

        <Link href="/frontend_manager/complaints" className="relative group overflow-hidden bg-card border border-border/50 rounded-3xl p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 hover:border-danger/30 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-danger/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform text-danger"><AlertCircle className="w-16 h-16"/></div>
          <div className="w-14 h-14 bg-danger-bg rounded-2xl flex items-center justify-center text-danger group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-sm relative z-10">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="relative z-10 mt-2">
            <span className="text-lg font-black text-primary block">Complaints</span>
            <span className="text-xs font-bold text-secondary mt-1 block">Resolve issues quickly</span>
          </div>
        </Link>

        <Link href="/frontend_manager/inventory" className="relative group overflow-hidden bg-card border border-border/50 rounded-3xl p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 hover:border-warning/30 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-warning/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform text-warning"><Package className="w-16 h-16"/></div>
          <div className="w-14 h-14 bg-warning-bg rounded-2xl flex items-center justify-center text-warning group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-sm relative z-10">
            <Package className="w-7 h-7" />
          </div>
          <div className="relative z-10 mt-2">
            <span className="text-lg font-black text-primary block">Inventory</span>
            <span className="text-xs font-bold text-secondary mt-1 block">Manage PG stock & items</span>
          </div>
        </Link>
      </div>
    </div>
  );
}