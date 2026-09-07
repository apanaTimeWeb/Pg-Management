// DATA FLOW: [AI_TODO: Document data flow direction for ManagerUseManagerDashboard.ts]
// [DATA HOOK] ManagerUseManagerDashboard
// Responsibility: Aggregates all dashboard KPIs (rent, attendance, meals, stock alerts) for the selected property.
// Data Flow: ManagerPropertyContext → multiple APIs → ManagerDashboardStats object → ManagerDashboardPage

import { useState, useEffect } from 'react';
import { authApi as api } from '@/app/manager/manager_lib/manager_api/ManagerAuth';
import { getSession } from '@/app/manager/manager_lib/manager_auth/ManagerSession';
import { useManagerPropertyContext } from '@/app/manager/manager_components/ManagerPropertyContext';
import { mealsApi, MealStatus } from '@/app/manager/manager_lib/manager_api/ManagerMeals';
import { attendanceApi } from '@/app/owner/owner_lib/owner_api/OwnerAttendance';
import { StockRequest } from '@/app/staff/staff_lib/staff_api/StaffStockRequests';
import type { ManagerDashboardStats, UseManagerDashboardReturn } from '@/app/manager/dashboard/ManagerDashboard_types/ManagerDashboard.types';

export function ManagerUseManagerDashboard(): UseManagerDashboardReturn {
  const user = typeof window !== 'undefined' ? getSession() : null;
  const { properties, selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  
  const [stats, setStats] = useState<ManagerDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [kitchenRequests, setKitchenRequests] = useState<StockRequest[]>([]);
  const [readyMeals, setReadyMeals] = useState<MealStatus[]>([]);
  const [isPresent, setIsPresent] = useState(false);

  const loadData = () => {
    if (!selectedPropertyId) return;
    setLoading(true);
    setStats(api.managerDashboard.getStats(selectedPropertyId) as ManagerDashboardStats);
    setKitchenRequests(api.stockRequests.getByProperty(selectedPropertyId).filter((r: StockRequest) => ['pending'].includes(r.status)));
    setReadyMeals(mealsApi.getAllTodayStatuses(selectedPropertyId).filter((m: MealStatus) => m.status === 'ready'));
    if (user) {
      setIsPresent(attendanceApi.getTodayStatus(selectedPropertyId, user.id));
    }
    setLoading(false);
  };

  // Re-fetch all KPI data when the selected property changes or context finishes loading.
  useEffect(() => {
    if (!ctxLoading) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPropertyId, ctxLoading]);

  const handleAnnounceMeal = (mealType: 'Breakfast'|'Lunch'|'Dinner') => {
    if (!user || !selectedPropertyId) return;
    mealsApi.announceMeal(selectedPropertyId, mealType, user.id);
    loadData();
  };

  const handleMarkPresent = () => {
    if (!user || !selectedPropertyId) return;
    attendanceApi.markPresent(selectedPropertyId, user.id);
    loadData();
  };

  return {
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
  };
}
