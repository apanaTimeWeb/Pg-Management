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
    <div>
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/manager/students" className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-md,8px)] p-4 flex flex-col items-center justify-center gap-3 hover:bg-[rgba(99,102,241,0.05)] hover:border-[var(--primary)] transition-all">
          <div className="p-3 bg-[rgba(99,102,241,0.1)] rounded-full text-[var(--primary)]">
            <UserPlus className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium text-[var(--text-primary)]">Add Student</span>
        </Link>
        <Link href="/manager/finance" className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-md,8px)] p-4 flex flex-col items-center justify-center gap-3 hover:bg-[rgba(16,185,129,0.05)] hover:border-[var(--success)] transition-all">
          <div className="p-3 bg-[rgba(16,185,129,0.1)] rounded-full text-[var(--success)]">
            <IndianRupee className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium text-[var(--text-primary)]">Collect Rent</span>
        </Link>
        <Link href="/manager/complaints" className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-md,8px)] p-4 flex flex-col items-center justify-center gap-3 hover:bg-[rgba(239,68,68,0.05)] hover:border-[var(--danger)] transition-all">
          <div className="p-3 bg-[rgba(239,68,68,0.1)] rounded-full text-[var(--danger)]">
            <AlertCircle className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium text-[var(--text-primary)]">Complaints</span>
        </Link>
        <Link href="/manager/inventory" className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-md,8px)] p-4 flex flex-col items-center justify-center gap-3 hover:bg-[rgba(245,158,11,0.05)] hover:border-[var(--warning)] transition-all">
          <div className="p-3 bg-[rgba(245,158,11,0.1)] rounded-full text-[var(--warning)]">
            <Package className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium text-[var(--text-primary)]">Inventory</span>
        </Link>
      </div>
    </div>
  );
}
