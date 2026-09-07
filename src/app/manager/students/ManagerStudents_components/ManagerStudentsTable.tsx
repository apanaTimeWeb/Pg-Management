// RESPONSIBILITY: Renders the ManagerStudentsTable component.
import Link from 'next/link';
import { ChevronRight, IndianRupee } from 'lucide-react';

import type { ManagerStudentData } from '@/app/manager/students/ManagerStudents_types/ManagerStudents.types';

interface Props {
  students: ManagerStudentData[];
}

export function ManagerStudentsTable({ students }: Props) {
  return (
    <div className="bg-card border border rounded-[var(--radius-lg,12px)] overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-[rgba(99,102,241,0.02)] border-b border text-secondary">
          <tr>
            <th className="p-4 font-medium">Student</th>
            <th className="p-4 font-medium">Contact</th>
            <th className="p-4 font-medium">Payment Status</th>
            <th className="p-4 font-medium">Score</th>
            <th className="p-4 font-medium"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {students.map(t => (
            <tr key={t.profile.id} className="hover:bg-input motion-safe:transition-colors">
              <td className="p-4">
                <div className="font-medium text-primary">{t.user?.name || 'Unknown'}</div>
                <div className="text-xs text-secondary">ID: {t.profile.id.slice(-6)}</div>
              </td>
              <td className="p-4">
                <div className="text-primary">{t.user?.phone || '-'}</div>
                <div className="text-xs text-secondary truncate max-w-[150px]">{t.user?.email || '-'}</div>
              </td>
              <td className="p-4">
                {t.profile.duesAmount > 0 ? (
                  <div className="inline-flex flex-col gap-1">
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-[rgba(239,68,68,0.1)] text-danger border border-[rgba(239,68,68,0.2)] uppercase tracking-wider">
                      Pending
                    </span>
                    <span className="text-danger font-bold flex items-center text-sm">
                      <IndianRupee className="w-3.5 h-3.5"/> {t.profile.duesAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                ) : (
                  <span className="px-2.5 py-1.5 rounded-full text-xs font-black bg-[rgba(16,185,129,0.1)] text-success border border-[rgba(16,185,129,0.2)] uppercase tracking-wider flex items-center gap-1 w-fit">
                    Paid
                  </span>
                )}
              </td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded text-xs font-bold ${t.profile.pgScore >= 80 ? 'bg-[rgba(16,185,129,0.1)] text-success' : 'bg-warning-bg text-warning'}`}>
                  {t.profile.pgScore}/100
                </span>
              </td>
              <td className="p-4 text-right">
                <Link href={`/manager/students/${t.profile.id}`} className="inline-flex items-center gap-1 text-primary hover:underline text-xs font-medium">
                  View <ChevronRight className="w-3 h-3" />
                </Link>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan={5} className="p-8 text-center text-secondary">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
