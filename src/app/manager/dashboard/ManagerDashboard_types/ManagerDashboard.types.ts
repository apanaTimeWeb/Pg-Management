import { StockRequest } from '@/app/staff/lib/api/stockRequests';
import { MealStatus } from '@/app/manager/lib/api/meals';

export interface ManagerDashboardStats {
  activeStudents: number;
  vacantBeds: number;
  todayCheckins: number;
  openComplaints: number;
  pendingVisitors: number;
  overdueStudentsCount: number;
  lateEntries: number;
  activeSos: number;
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
  properties: any[];
  user: any;
}
