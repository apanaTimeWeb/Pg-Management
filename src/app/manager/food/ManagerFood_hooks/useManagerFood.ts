// [DATA HOOK] useManagerFood
// Responsibility: Fetches the weekly food menu for the selected property.
// Data Flow: ManagerPropertyContext → api.food → local state → ManagerFoodPage

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useManagerPropertyContext } from '@/app/manager/manager_shared/ManagerPropertyContext';
import { FoodMenu } from '@/app/staff/lib/api/food';
import type { UseManagerFoodReturn } from '@/app/manager/food/ManagerFood_types/ManagerFood.types';

export function useManagerFood(): UseManagerFoodReturn {
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState<FoodMenu | null>(null);

  // Reload menu when property changes or context finishes loading.
  useEffect(() => {
    if (!ctxLoading && selectedPropertyId) {
      setLoading(true);
      const data = api.food.getByProperty(selectedPropertyId);
      setMenu(data);
      setLoading(false);
    }
  }, [selectedPropertyId, ctxLoading]);

  return {
    loading,
    menu,
    selectedPropertyId,
    ctxLoading
  };
}
