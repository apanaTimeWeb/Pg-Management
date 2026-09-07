'use client';

import { useManagerDashboard } from '../ManagerDashboard_hooks/useManagerDashboard';
import { ManagerDashboardHeader } from './ManagerDashboardHeader';
import { ManagerDashboardStatsGrid } from './ManagerDashboardStatsGrid';
import { ManagerDashboardMealAlerts } from './ManagerDashboardMealAlerts';
import { ManagerDashboardKitchenAlerts } from './ManagerDashboardKitchenAlerts';
import { ManagerDashboardQuickActions } from './ManagerDashboardQuickActions';
import { ManagerDashboardNoProperty } from './ManagerDashboardNoProperty';

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
