// RESPONSIBILITY: Renders the ManagerFinanceMain component.
'use client';
import { Pagination } from '@/components/ui/Pagination';
import { IndianRupee, Download } from 'lucide-react';
import { useManagerFinance } from '@/app/frontend_manager/finance/ManagerFinance_hooks/useManagerFinance';
import { ManagerFinanceStats } from '@/app/frontend_manager/finance/ManagerFinance_components/ManagerFinanceStats';
import { ManagerFinanceTable } from '@/app/frontend_manager/finance/ManagerFinance_components/ManagerFinanceTable';
export function ManagerFinanceMain() {
  const {
    invoices,
    stats,
    loading,
    filter,
    setFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    handleMarkPaid,
    handleSendReminder,
    selectedPropertyId,
    ctxLoading
  } = useManagerFinance();
  if (ctxLoading || loading) return <div className="p-6 text-secondary motion-safe:animate-pulse">Loading Rent Management...</div>;
  if (!selectedPropertyId) return <div className="p-6 text-center text-secondary">Property Required</div>;
  return (
    <div className="space-y-6 pb-20 max-w-6xl mx-auto manager-theme animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-success to-emerald-600 text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group mb-6">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <IndianRupee className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <IndianRupee className="w-8 h-8" /> Rent & Financials
            </h1>
            <p className="text-white/80 font-medium max-w-xl">
              Track expected rent, collect payments, manage dues, and generate receipts.
            </p>
          </div>
          <button className="bg-white text-success px-6 py-3 rounded-xl font-bold shadow-md hover:bg-white/90 transition-colors flex items-center gap-2 w-fit">
            <Download className="w-5 h-5" /> Export Report
          </button>
        </div>
      </div>
      <ManagerFinanceStats stats={stats} />
      <ManagerFinanceTable 
        invoices={invoices}
        paginatedData={paginatedData}
        filter={filter}
        setFilter={setFilter}
        handleSendReminder={handleSendReminder}
        handleMarkPaid={handleMarkPaid}
      />
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}