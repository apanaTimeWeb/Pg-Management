import { CheckCircle2 } from 'lucide-react';

interface ManagerDashboardHeaderProps {
  user: any;
  selectedProp: any;
  isPresent: boolean;
  handleMarkPresent: () => void;
}

export function ManagerDashboardHeader({ user, selectedProp, isPresent, handleMarkPresent }: ManagerDashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 className="text-[24px] font-bold text-[var(--text-primary)] tracking-tight">Welcome back, {user?.name}</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Operational Overview for <span className="text-[var(--primary)] font-medium">{selectedProp?.name}</span></p>
      </div>
      
      <div className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-md,8px)] p-2 pr-4 shadow-sm">
        {isPresent ? (
          <>
            <div className="w-10 h-10 rounded bg-[var(--success-bg)] text-[var(--success)] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-secondary)] uppercase">Attendance</p>
              <p className="text-sm font-bold text-[var(--success)]">Marked Present ✅</p>
            </div>
          </>
        ) : (
          <>
            <button 
              onClick={handleMarkPresent}
              className="bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] px-6 py-2.5 rounded-[var(--radius-md,8px)] font-bold text-sm transition-colors shadow-sm"
            >
              Mark Attendance for Today
            </button>
          </>
        )}
      </div>
    </div>
  );
}
