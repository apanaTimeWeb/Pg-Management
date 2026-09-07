// RESPONSIBILITY: Renders the ManagerGateLogsTable component.
import { LogIn, LogOut, AlertTriangle } from 'lucide-react';
import type { GateLog } from '@/app/manager/gate-logs/ManagerGateLogs_types/ManagerGateLogs.types';

interface ManagerGateLogsTableProps {
  paginatedData: GateLog[];
}

export function ManagerGateLogsTable({ paginatedData }: ManagerGateLogsTableProps) {
  return (
    <div className="bg-card border border rounded-[var(--radius-lg,12px)] overflow-hidden shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-card border-b border text-secondary sticky top-0 z-10 shadow-sm shadow-black/5">
          <tr>
            <th className="p-4 font-semibold uppercase tracking-wider text-[11px]">Student</th>
            <th className="p-4 font-semibold uppercase tracking-wider text-[11px]">Type</th>
            <th className="p-4 font-semibold uppercase tracking-wider text-[11px]">Timestamp</th>
            <th className="p-4 font-semibold uppercase tracking-wider text-[11px]">Flags</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {paginatedData.map(log => (
            <tr key={log.id} className="hover:bg-page motion-safe:transition-colors">
              <td className="p-4 font-medium text-primary">{log.studentId}</td>
              <td className="p-4">
                {log.type === 'entry' 
                  ? <span className="text-primary flex items-center gap-1 font-medium"><LogIn className="w-4 h-4"/> Entry</span> 
                  : <span className="text-secondary flex items-center gap-1 font-medium"><LogOut className="w-4 h-4"/> Exit</span>}
              </td>
              <td className="p-4 text-secondary">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td className="p-4">
                {log.isLate && <span className="text-xs bg-danger-bg text-danger px-2 py-1 rounded flex items-center gap-1 w-max font-bold"><AlertTriangle className="w-3 h-3"/> Late Entry</span>}
              </td>
            </tr>
          ))}
          {paginatedData.length === 0 && (
            <tr>
              <td colSpan={4} className="p-8 text-center text-secondary">No gate logs found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
