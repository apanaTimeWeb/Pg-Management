'use client';

// RESPONSIBILITY: Renders the OwnerFinanceMain component. Receives data via props/hooks.

import { useState, useEffect } from 'react';
import { authApi as api } from '@/app/owner/owner_lib/owner_api/OwnerAuth';
import { getSession } from '@/app/owner/owner_lib/owner_auth/OwnerSession';
import { useOwnerPropertyContext } from '@/app/owner/owner_components/OwnerPropertyContext';
import { TrendingDown } from 'lucide-react';
import { Expense } from '@/app/owner/owner_lib/owner_api/OwnerFinance';
import { OwnerFinanceCards } from '@/app/owner/finance/OwnerFinance_components/OwnerFinanceCards';
import { OwnerFinanceCharts } from '@/app/owner/finance/OwnerFinance_components/OwnerFinanceCharts';
import { OwnerFinanceTabs } from '@/app/owner/finance/OwnerFinance_components/OwnerFinanceTabs';
import { useTableSync } from '@/lib/hooks/useTableSync';

export function OwnerFinanceMain() {
  const user = typeof window !== 'undefined' ? getSession() : null;
  const { selectedPropertyId } = useOwnerPropertyContext();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'payments' | 'invoices' | 'expenses'>('payments');
  
  const { page: currentPage, setPage: setCurrentPage } = useTableSync();
  const itemsPerPage = 10;

  const loadData = () => {
    if (!user) return;
    setLoading(true);
    const data = api.finance.getStats(user.id, selectedPropertyId);
    setStats(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [user?.id, selectedPropertyId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, selectedPropertyId, setCurrentPage]);

  if (loading || !stats) {
    return <div className="p-6 animate-pulse">Loading finance data...</div>;
  }

  const getPaginatedData = (array: any[]) => {
    const totalPages = Math.ceil(array.length / itemsPerPage);
    const paginated = array.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return { paginated, totalPages };
  };

  const paymentsData = getPaginatedData(stats.payments);
  const expensesData = getPaginatedData(stats.expenses);
  const invoicesData = getPaginatedData(stats.invoices);

  const netProfit = stats.revenue - stats.totalExpenses;
  const profitMargin = stats.revenue > 0 ? ((netProfit / stats.revenue) * 100).toFixed(1) : 0;
  const isProfitable = netProfit >= 0;

  // Group expenses by category for pie chart
  const expenseCategories = stats.expenses.reduce((acc: any, exp: Expense) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});
  
  const expenseLabels = Object.keys(expenseCategories).map(k => k.replace('_', ' ').toUpperCase());
  const expenseSeries = Object.values(expenseCategories) as number[];

  // Chart configs
  const expensePieOptions: any = {
    chart: { type: 'donut', fontFamily: 'inherit', background: 'transparent' },
    labels: expenseLabels,
    colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#64748b'],
    stroke: { show: false },
    theme: { mode: 'dark' },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { show: true },
            value: { show: true, formatter: (val: number) => `₹${val.toLocaleString()}` },
            total: {
              show: true,
              label: 'Total Expenses',
              formatter: () => `₹${stats.totalExpenses.toLocaleString()}`
            }
          }
        }
      }
    },
    legend: { position: 'bottom' }
  };

  const trendOptions: any = {
    chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit', background: 'transparent' },
    plotOptions: { bar: { horizontal: false, columnWidth: '55%', borderRadius: 4 } },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    yaxis: { title: { text: '₹ (INR)' } },
    fill: { opacity: 1 },
    colors: ['#10b981', '#ef4444'], // Green for Income, Red for Expense
    theme: { mode: 'dark' },
    tooltip: { y: { formatter: (val: number) => `₹${val.toLocaleString()}` } }
  };
  
  const trendSeries = [
    { name: 'Income', data: [45000, 52000, 48000, 60000, 58000, stats.revenue] },
    { name: 'Expenses', data: [20000, 22000, 18000, 25000, 24000, stats.totalExpenses] }
  ];

  return (
    <div className="space-y-6 pb-20 print:pb-0 print:space-y-4 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-[22px] font-bold text-primary">Financial Dashboard</h1>
          <p className="text-sm text-secondary">Track enterprise-grade financial metrics, revenue, and expenses.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-card border border-border text-primary rounded-md text-sm font-medium hover:border-primary transition-colors flex items-center gap-2">
            <TrendingDown className="w-4 h-4" /> Record Expense
          </button>
        </div>
      </div>

      <OwnerFinanceCards 
        stats={stats}
        netProfit={netProfit}
        profitMargin={profitMargin}
        isProfitable={isProfitable}
      />

      <OwnerFinanceCharts 
        trendOptions={trendOptions}
        trendSeries={trendSeries}
        expenseSeries={expenseSeries}
        expensePieOptions={expensePieOptions}
      />

      <OwnerFinanceTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        paymentsData={paymentsData}
        expensesData={expensesData}
        invoicesData={invoicesData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
