// DATA FLOW: [AI_TODO: Document data flow direction for ManagerUseManagerFood.ts]
// [DATA HOOK] ManagerUseManagerFood
// Responsibility: Fetches the weekly food menu for the selected property.
// Data Flow: ManagerPropertyContext → (api as any).food → local state → ManagerFoodPage

import { useState, useEffect } from 'react';

import { authApi as api } from '@/app/manager/manager_lib/manager_api/ManagerAuth';
import { useManagerPropertyContext } from '@/app/manager/manager_components/ManagerPropertyContext';

import type { FoodMenu } from '@/app/staff/staff_lib/staff_api/StaffFood';
import type { UseManagerFoodReturn } from '@/app/manager/food/ManagerFood_types/ManagerFood.types';

export function ManagerUseManagerFood(): UseManagerFoodReturn {
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState<FoodMenu | null>(null);

  // Reload menu when property changes or context finishes loading.
  useEffect(() => {
    if (!ctxLoading && selectedPropertyId) {
      setLoading(true);
      const data = (api as any).food.getByProperty(selectedPropertyId);
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
