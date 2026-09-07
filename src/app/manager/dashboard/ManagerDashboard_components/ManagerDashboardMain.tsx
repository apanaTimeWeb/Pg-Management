// RESPONSIBILITY: Renders the ManagerDashboardMain component.
'use client';

import { useManagerDashboard } from '@/app/manager/dashboard/ManagerDashboard_hooks/ManagerUseManagerDashboard';
import { ManagerDashboardHeader } from '@/app/manager/dashboard/ManagerDashboard_components/ManagerDashboardHeader';
import { ManagerDashboardStatsGrid } from '@/app/manager/dashboard/ManagerDashboard_components/ManagerDashboardStatsGrid';
import { ManagerDashboardMealAlerts } from '@/app/manager/dashboard/ManagerDashboard_components/ManagerDashboardMealAlerts';
import { ManagerDashboardKitchenAlerts } from '@/app/manager/dashboard/ManagerDashboard_components/ManagerDashboardKitchenAlerts';
import { ManagerDashboardQuickActions } from '@/app/manager/dashboard/ManagerDashboard_components/ManagerDashboardQuickActions';
import { ManagerDashboardNoProperty } from '@/app/manager/dashboard/ManagerDashboard_components/ManagerDashboardNoProperty';

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
    return <div className="p-6 animate-pulse text-slate-400">Loading operational dashboard...</div>;
  }

  if (properties.length === 0 || !selectedPropertyId) {
    return <ManagerDashboardNoProperty />;
  }

  const selectedProp = properties.find(p => p.id === selectedPropertyId);

  return (
    <div className="space-y-8 pb-20">
      <ManagerDashboardHeader 
        user={user}
        selectedProp={selectedProp}
        isPresent={isPresent}
        handleMarkPresent={handleMarkPresent}
      />
      
      <ManagerDashboardStatsGrid stats={stats} />
      
      <ManagerDashboardMealAlerts 
        readyMeals={readyMeals}
        handleAnnounceMeal={handleAnnounceMeal}
      />
      
      <ManagerDashboardKitchenAlerts kitchenRequests={kitchenRequests} />
      
      <ManagerDashboardQuickActions />
    </div>
  );
}
