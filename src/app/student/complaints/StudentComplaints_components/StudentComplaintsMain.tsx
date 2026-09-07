// RESPONSIBILITY: Renders the StudentComplaintsMain component.
'use client';

import { useState, useEffect } from 'react';
import { studentOperationsApi } from '@/app/student/student_lib/student_api/StudentOperations';
import { useStudentContext } from '@/app/student/student_components/StudentContext';
import { MessageSquareWarning, Plus } from 'lucide-react';
import Link from 'next/link';
import { Pagination } from '@/components/shared/Pagination';

export function StudentComplaintsMain() {
  const { profile } = useStudentContext();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (profile) {
      setComplaints(studentOperationsApi.getComplaints(profile.id));
    }
  }, [profile]);

  if (!profile) return <div className="p-4">Loading...</div>;
  
  const paginatedComplaints = complaints.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[24px] font-bold text-primary">My Complaints</h1>
          <p className="text-sm text-secondary">Track your reported issues.</p>
        </div>
        <Link href="/student/complaints/new" className="px-4 py-2 bg-primary text-white rounded font-bold shadow-sm flex items-center gap-2 hover:bg-primary-hover transition-colors">
          <Plus className="w-4 h-4"/> New
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedComplaints.map(c => (
          <div key={c.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-transform group-hover:scale-110 ${
              c.status === 'Resolved' ? 'bg-success' :
              c.status === 'In Progress' ? 'bg-primary' :
              'bg-danger'
            }`}></div>
            <div className="flex justify-between items-start mb-3 relative z-10">
              <h3 className="font-bold text-primary text-lg capitalize">{c.title || c.category}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-sm ${
                c.status === 'Resolved' ? 'bg-success-bg border border-success/20 text-success' :
                c.status === 'In Progress' ? 'bg-primary-subtle border border-primary/20 text-primary' :
                'bg-danger-bg border border-danger/20 text-danger'
              }`}>
                {c.status}
              </span>
            </div>
            <p className="text-sm text-secondary mb-5 relative z-10 line-clamp-2">{c.description}</p>
            <div className="flex gap-2 relative z-10">
              <span className="text-xs bg-page border border-border px-3 py-1.5 rounded-lg text-secondary font-bold flex items-center gap-1 shadow-sm">
                Priority: {c.priority || 'Medium'}
              </span>
              <span className="text-xs bg-page border border-border px-3 py-1.5 rounded-lg text-secondary font-bold shadow-sm">
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
        {complaints.length === 0 && (
          <div className="text-center p-8 bg-card border border-border rounded-lg col-span-full">
            <MessageSquareWarning className="w-12 h-12 text-secondary mx-auto mb-3 opacity-20" />
            <div className="text-primary font-bold">No complaints raised</div>
            <div className="text-sm text-secondary mt-1">Everything seems fine!</div>
          </div>
        )}
      </div>

      {complaints.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(complaints.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
