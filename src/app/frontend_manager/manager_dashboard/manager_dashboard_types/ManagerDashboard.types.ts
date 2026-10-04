import type { StockRequest } from '@/app/frontend_staff/staff_lib/staff_api/StaffStockRequests';
import type { MealStatus } from '@/app/frontend_manager/manager_lib/manager_api/ManagerMeals';
export interface ManagerDashboardStats {
  // Row 1
  todayCheckins: number;
  todayCheckouts: number;
  openComplaints: number;
  pendingVisitors: number;
  occupiedBeds: number;
  // Row 2 Summary
  occupancyRate: number;
  rentCollected: number;
  rentTarget: number;
  housekeepingDone: number;
  housekeepingTotal: number;
  maintenanceOpen: number;
  maintenanceTotal: number;
  // General (kept from old)
  activeStudents: number;
  totalStudents: number;
  vacantBeds: number;
  totalBeds: number;
  activeSos: number;
  pendingRentAmount: number;
  totalExpectedRent: number;
  todayLeaves: number;
}
export interface ManagerDashboardData {
  stats: ManagerDashboardStats | null;
  kitchenRequests: StockRequest[];
  readyMeals: MealStatus[];
  isPresent: boolean;
  loading: boolean;
}
export interface UseManagerDashboardReturn extends ManagerDashboardData {
  handleAnnounceMeal: (mealType: 'Breakfast' | 'Lunch' | 'Dinner') => void;
  handleMarkPresent: () => void;
  selectedPropertyId: string | null;
  ctxLoading: boolean;
  properties: unknown[];
  user: unknown;
}