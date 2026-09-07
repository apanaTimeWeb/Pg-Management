import { CheckCircle, Utensils } from 'lucide-react';

import { Pagination } from '@/components/ui/Pagination';

import type { MealType, MealStatusType } from '@/app/staff/staff_lib/staff_api/StaffMeals';

export function StaffCookLiveMealsTab({
  todayMenu,
  mealStatuses,
  handleMarkMealReady,
  orders,
  paginatedOrders,
  handleMarkServed,
  ordersPage,
  ordersTotalPages,
  setOrdersPage
}: {
  todayMenu: any;
  mealStatuses: Record<MealType, MealStatusType>;
  handleMarkMealReady: (meal: MealType) => void;
  orders: any[];
  paginatedOrders: any[];
  handleMarkServed: (id: string) => void;
  ordersPage: number;
  ordersTotalPages: number;
  setOrdersPage: (page: number) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
          <Utensils className="w-5 h-5 text-primary" /> Today's Menu & Status
        </h2>
        {todayMenu ? (
          <div className="mb-6 p-4 bg-primary-bg border border-primary border-opacity-20 rounded-xl">
            <h3 className="font-bold text-primary mb-2">Today's Menu</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="bg-card p-2 rounded border border-primary border-opacity-20 text-center">
                <span className="block text-[10px] uppercase font-bold text-primary">Breakfast</span>
                <span className="text-sm text-primary font-medium">{todayMenu.breakfast || 'TBD'}</span>
              </div>
              <div className="bg-card p-2 rounded border border-primary border-opacity-20 text-center">
                <span className="block text-[10px] uppercase font-bold text-primary">Lunch</span>
                <span className="text-sm text-primary font-medium">{todayMenu.lunch || 'TBD'}</span>
              </div>
              <div className="bg-card p-2 rounded border border-primary border-opacity-20 text-center">
                <span className="block text-[10px] uppercase font-bold text-primary">Dinner</span>
                <span className="text-sm text-primary font-medium">{todayMenu.dinner || 'TBD'}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-input rounded-xl border border-border text-sm text-secondary italic">
            No menu set for today.
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['Breakfast', 'Lunch', 'Dinner'] as MealType[]).map(meal => (
            <div key={meal} className="border border-border p-4 rounded-xl flex flex-col items-center text-center gap-3">
              <h3 className="font-bold text-primary">{meal}</h3>
              {mealStatuses[meal] === 'pending' && (
                <button onClick={() => handleMarkMealReady(meal)} className="bg-primary hover:bg-primary-hover text-white w-full py-2 rounded-lg text-sm font-bold motion-safe:transition-colors">
                  Mark Ready
                </button>
              )}
              {mealStatuses[meal] === 'ready' && (
                <span className="w-full py-2 bg-warning-bg text-warning rounded-lg text-sm font-bold border border-warning border-opacity-20">
                  Waiting for Manager
                </span>
              )}
              {mealStatuses[meal] === 'announced' && (
                <span className="w-full py-2 bg-success-bg text-success rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Announced
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
          <Utensils className="w-5 h-5 text-primary" /> Live Meal Queue ({orders.length})
        </h2>
        <div className="space-y-3">
          {paginatedOrders.map(o => (
            <div key={o.id} className="flex justify-between items-center p-3 bg-input border border-border rounded-xl">
              <div>
                <div className="font-bold text-primary">{o.studentName} <span className="text-xs text-secondary font-normal ml-2">Room {o.roomNumber}</span></div>
                <div className="text-sm text-secondary mt-1">{o.mealType}</div>
              </div>
              {o.status === 'Pending' ? (
                <button onClick={() => handleMarkServed(o.id)} className="flex items-center gap-2 bg-success text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-600 motion-safe:transition-colors">
                  <CheckCircle className="w-4 h-4" /> Served
                </button>
              ) : (
                <span className="text-xs font-bold text-success px-3 py-1 bg-success-bg rounded-full">Completed</span>
              )}
            </div>
          ))}
          {orders.length === 0 && (
            <div className="text-center p-8 text-secondary">No active meal orders.</div>
          )}
          {ordersTotalPages > 1 && <Pagination currentPage={ordersPage} totalPages={ordersTotalPages} onPageChange={setOrdersPage} />}
        </div>
      </div>
    </div>
  );
}
