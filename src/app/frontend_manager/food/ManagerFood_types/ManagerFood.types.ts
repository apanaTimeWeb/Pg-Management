import type { FoodMenu } from '@/app/frontend_staff/staff_lib/staff_api/StaffFood';
export interface ManagerFoodData {
  loading: boolean;
  menu: FoodMenu | null;
  selectedPropertyId: string | null;
  ctxLoading: boolean;
}
export interface UseManagerFoodReturn extends ManagerFoodData {}