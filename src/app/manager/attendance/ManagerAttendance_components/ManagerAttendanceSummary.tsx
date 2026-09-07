import { format } from 'date-fns';

interface Props {
  presentCount: number;
  absentCount: number;
  pendingCount: number;
}

export function ManagerAttendanceSummary({ presentCount, absentCount, pendingCount }: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
      <div>
        <h1 className="text-[24px] font-bold text-[var(--text-primary)]">Student Roll Call</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Mark night attendance for {format(new Date(), 'MMMM d, yyyy')}</p>
      </div>
      
      <div className="flex gap-2">
        <div className="bg-[var(--success-bg)] px-3 py-1.5 rounded-md border border-[var(--success)] border-opacity-20 flex flex-col items-center min-w-[70px]">
          <span className="text-xs font-bold text-[var(--success)] uppercase">Present</span>
          <span className="text-lg font-bold text-[var(--success)]">{presentCount}</span>
        </div>
        <div className="bg-[var(--danger-bg)] px-3 py-1.5 rounded-md border border-[var(--danger)] border-opacity-20 flex flex-col items-center min-w-[70px]">
          <span className="text-xs font-bold text-[var(--danger)] uppercase">Absent</span>
          <span className="text-lg font-bold text-[var(--danger)]">{absentCount}</span>
        </div>
        <div className="bg-[var(--bg-input)] px-3 py-1.5 rounded-md border border-[var(--border)] flex flex-col items-center min-w-[70px]">
          <span className="text-xs font-bold text-[var(--text-secondary)] uppercase">Pending</span>
          <span className="text-lg font-bold text-[var(--text-primary)]">{pendingCount}</span>
        </div>
      </div>
    </div>
  );
}
