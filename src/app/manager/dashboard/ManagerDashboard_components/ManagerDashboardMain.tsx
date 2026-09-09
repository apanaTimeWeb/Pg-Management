// RESPONSIBILITY: Renders the ManagerDashboardMain component.
'use client';
import { useManagerDashboard } from '@/app/manager/dashboard/ManagerDashboard_hooks/useManagerDashboard';
import { ManagerDashboardHeader } from '@/app/manager/dashboard/ManagerDashboard_components/ManagerDashboardHeader';
import { ManagerDashboardStatsGrid } from '@/app/manager/dashboard/ManagerDashboard_components/ManagerDashboardStatsGrid';
import { ManagerDashboardMealAlerts } from '@/app/manager/dashboard/ManagerDashboard_components/ManagerDashboardMealAlerts';
import { ManagerDashboardKitchenAlerts } from '@/app/manager/dashboard/ManagerDashboard_components/ManagerDashboardKitchenAlerts';
import { ManagerDashboardQuickActions } from '@/app/manager/dashboard/ManagerDashboard_components/ManagerDashboardQuickActions';
import { ManagerDashboardNoProperty } from '@/app/manager/dashboard/ManagerDashboard_components/ManagerDashboardNoProperty';
import { ManagerDashboardTasks } from '@/app/manager/dashboard/ManagerDashboard_components/ManagerDashboardTasks';
import { ManagerDashboardActivity } from '@/app/manager/dashboard/ManagerDashboard_components/ManagerDashboardActivity';
import { ManagerDashboardPerformance } from '@/app/manager/dashboard/ManagerDashboard_components/ManagerDashboardPerformance';
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
  console.log('ManagerDashboardMain render ' + JSON.stringify({ ctxLoading, loading, selectedPropertyId }));
  if (ctxLoading || loading) {
    return <div className="p-6 motion-safe:animate-pulse text-slate-400">Loading operational dashboard...</div>;
  }
  if (properties.length === 0 || !selectedPropertyId) {
    return <ManagerDashboardNoProperty />;
  }  const selectedProp = properties.find((p) => (p as { id: string }).id === selectedPropertyId);
  return (
    <div className="space-y-6 pb-20 manager-theme animate-fade-in">
      <ManagerDashboardHeader 
        user={user}
        selectedProp={selectedProp}
        isPresent={isPresent}
        handleMarkPresent={handleMarkPresent}
      />
      <ManagerDashboardStatsGrid stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ManagerDashboardQuickActions />
          <ManagerDashboardActivity />
        </div>
        <div className="space-y-6">
          <ManagerDashboardTasks />
          <ManagerDashboardPerformance />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <ManagerDashboardMealAlerts 
          readyMeals={readyMeals}
          handleAnnounceMeal={handleAnnounceMeal}
        />
        <ManagerDashboardKitchenAlerts kitchenRequests={kitchenRequests} />
      </div>
    </div>
  );
}