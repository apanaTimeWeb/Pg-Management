import { FoodMenu } from '@/app/staff/lib/api/food';

export interface ManagerFoodData {
  loading: boolean;
  menu: FoodMenu | null;
  selectedPropertyId: string | null;
  ctxLoading: boolean;
}

export interface UseManagerFoodReturn extends ManagerFoodData {}
