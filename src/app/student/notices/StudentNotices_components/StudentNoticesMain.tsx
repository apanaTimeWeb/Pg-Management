// RESPONSIBILITY: Renders the StudentNoticesMain component.
'use client';

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

import { studentOperationsApi } from '@/app/student/student_lib/student_api/StudentOperations';
import { useStudentContext } from '@/app/student/student_components/StudentContext';
import { Pagination } from '@/components/ui/Pagination';

export function StudentNoticesMain() {
  const { profile } = useStudentContext();
  const [notices, setNotices] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (profile) {
      setNotices(studentOperationsApi.getNotices((profile as any).propertyId));
    }
  }, [profile]);

  if (!profile) return <div className="p-4">Loading...</div>;

  const paginatedNotices = notices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] font-bold text-primary">Notices & Broadcasts</h1>
        <p className="text-sm text-secondary">Important updates from PG Management.</p>
      </div>

      <div className="space-y-4">
        {paginatedNotices.map(n => (
          <div key={n.id} className="bg-card border border-border rounded-lg p-5 shadow-sm flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary-subtle flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-primary text-lg">{n.title}</h3>
              <p className="text-sm text-secondary mt-1">{n.message}</p>
              <div className="text-xs font-medium text-secondary mt-3">
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
        {notices.length === 0 && (
          <div className="text-center p-8 text-secondary bg-card border border-border rounded-lg">
            No notices from management yet.
          </div>
        )}
      </div>

      {notices.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(notices.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
