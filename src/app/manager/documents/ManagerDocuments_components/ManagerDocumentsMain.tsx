// RESPONSIBILITY: Renders the ManagerDocumentsMain component.
'use client';
import { useState, useEffect } from 'react';
import { FileText, Download } from 'lucide-react';

import { useManagerUrlPagination } from '@/app/manager/manager_components/manager_hooks/useManagerUrlPagination';
import { api } from '@/app/manager/manager_lib/manager_api/ManagerApi';
import { useManagerPropertyContext } from '@/app/manager/manager_components/ManagerPropertyContext';
import { Pagination } from '@/components/ui/Pagination';
export function ManagerDocumentsMain() {
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  const [documents, setDocuments] = useState<unknown[]>([]);
  useEffect(() => {
    if (!ctxLoading && selectedPropertyId) {
      setDocuments(api.managerOperations.listDocuments(selectedPropertyId));
    }
  }, [selectedPropertyId, ctxLoading]);
  // Pagination
  const { currentPage, setCurrentPage } = useManagerUrlPagination(1);
  const itemsPerPage = 10;
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPropertyId]);
  const totalPages = Math.ceil(documents.length / itemsPerPage);
  const paginatedData = documents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  if (ctxLoading) return <div className="p-6 text-secondary">Loading...</div>;
  if (!selectedPropertyId) return <div className="p-6 text-center text-secondary">Property Required</div>;
  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-[24px] font-bold text-primary">Student Documents</h1>
        <p className="text-sm text-secondary">Verify uploaded IDs and agreements.</p>
      </div>
      <div className="bg-card border border rounded-[var(--radius-lg,12px)] overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-card border-b border text-secondary sticky top-0 z-10 shadow-sm shadow-black/5">
            <tr>
              <th className="p-4 font-semibold uppercase tracking-wider text-[11px]">Student ID</th>
              <th className="p-4 font-semibold uppercase tracking-wider text-[11px]">Document Type</th>
              <th className="p-4 font-semibold uppercase tracking-wider text-[11px]">Status</th>
              <th className="p-4 font-semibold uppercase tracking-wider text-[11px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {paginatedData.map((d: any) => (
              <tr key={String(d.id)} className="hover:bg-page motion-safe:transition-colors">
                <td className="p-4 font-medium text-primary">{String(d.uploaderId || d.studentId || 'student').slice(0,8)}...</td>
                <td className="p-4 text-secondary uppercase text-xs">{String(d.type || d.documentType || 'Aadhaar')}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${d.status === 'verified' ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'}`}>
                    {d.status || 'pending'}
                  </span>
                </td>
                <td className="p-4 flex justify-end">
                  <button className="p-2 hover:bg-input rounded border border-transparent hover:border text-secondary hover:text-primary motion-safe:transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-secondary">No documents uploaded.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}