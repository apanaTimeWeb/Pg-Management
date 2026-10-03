// RESPONSIBILITY: Renders the ManagerDashboardMain component.
'use client';
import { useManagerDashboard } from '@/app/frontend_manager/manager_dashboard/ManagerDashboard_hooks/useManagerDashboard';
import { ManagerDashboardHeader } from '@/app/frontend_manager/manager_dashboard/ManagerDashboard_components/ManagerDashboardHeader';
import { ManagerDashboardStatsGrid } from '@/app/frontend_manager/manager_dashboard/ManagerDashboard_components/ManagerDashboardStatsGrid';
import { ManagerDashboardSummaryCards } from '@/app/frontend_manager/manager_dashboard/ManagerDashboard_components/ManagerDashboardSummaryCards';
import { ManagerDashboardTasks } from '@/app/frontend_manager/manager_dashboard/ManagerDashboard_components/ManagerDashboardTasks';
import { ManagerDashboardActivity } from '@/app/frontend_manager/manager_dashboard/ManagerDashboard_components/ManagerDashboardActivity';
import { ManagerDashboardPerformance } from '@/app/frontend_manager/manager_dashboard/ManagerDashboard_components/ManagerDashboardPerformance';
import { ManagerDashboardQuickActions } from '@/app/frontend_manager/manager_dashboard/ManagerDashboard_components/ManagerDashboardQuickActions';
import { ManagerDashboardNoProperty } from '@/app/frontend_manager/manager_dashboard/ManagerDashboard_components/ManagerDashboardNoProperty';

export function ManagerDashboardMain() {
  const {
    stats,
    loading,
    kitchenRequests,
    readyMeals,
    isPresent,
    handleAnnounceMeal,
    handleMarkPresent,
    selectedPropertyId,
    ctxLoading,
    properties,
    user
  } = useManagerDashboard();

  if (ctxLoading || loading) {
    return <div className="p-6 motion-safe:animate-pulse text-secondary">Loading operational dashboard...</div>;
  }
  if (properties.length === 0 || !selectedPropertyId) {
    return <ManagerDashboardNoProperty />;
  }
  
  const selectedProp = properties.find((p) => (p as { id: string }).id === selectedPropertyId);

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Top Greeting Bar */}
      <ManagerDashboardHeader 
        user={user}
        selectedProp={selectedProp}
        isPresent={isPresent}
        handleMarkPresent={handleMarkPresent}
      />

      {/* BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* Quick Stats - Spans full width on mobile, 3 cols on desktop */}
        <div className="md:col-span-3 lg:col-span-3">
          <ManagerDashboardStatsGrid stats={stats} />
        </div>
        
        {/* Summary Cards - Fits beside Quick Stats */}
        <div className="md:col-span-3 lg:col-span-1 space-y-6 flex flex-col justify-between">
          <ManagerDashboardSummaryCards stats={stats} />
        </div>

        {/* Tasks / Complaints - Spans 2 cols */}
        <div className="md:col-span-2 lg:col-span-2">
          <ManagerDashboardTasks />
        </div>

        {/* Performance Summary - Spans 2 cols */}
        <div className="md:col-span-2 lg:col-span-2 bg-card border border-border/50 rounded-3xl shadow-sm overflow-hidden p-6 relative">
          <ManagerDashboardPerformance />
        </div>

        {/* Recent Activity - Full width at bottom */}
        <div className="md:col-span-3 lg:col-span-4 bg-card border border-border/50 rounded-3xl shadow-sm overflow-hidden p-6 relative">
          <ManagerDashboardActivity />
        </div>
      </div>

      {/* Bottom: Quick Action Buttons */}
      <ManagerDashboardQuickActions />
    </div>
  );
}