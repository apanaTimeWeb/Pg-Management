import { Utensils } from 'lucide-react';
import { MealStatus } from '@/app/manager/lib/api/meals';

interface ManagerDashboardMealAlertsProps {
  readyMeals: MealStatus[];
  handleAnnounceMeal: (mealType: 'Breakfast'|'Lunch'|'Dinner') => void;
}

export function ManagerDashboardMealAlerts({ readyMeals, handleAnnounceMeal }: ManagerDashboardMealAlertsProps) {
  if (readyMeals.length === 0) return null;

  return (
    <div className="mb-6 bg-[rgba(99,102,241,0.05)] border border-[var(--primary)] border-opacity-30 rounded-[var(--radius-lg,12px)] p-6">
      <h2 className="text-lg font-semibold text-[var(--primary)] mb-4 flex items-center gap-2">
        <Utensils className="w-5 h-5" />
        Meals Ready for Announcement
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {readyMeals.map(meal => (
          <div key={meal.id} className="bg-[var(--bg-card)] border border-[var(--primary)] border-opacity-20 rounded-xl p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-full flex items-center justify-center text-[var(--primary)] mb-3">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[var(--text-primary)] text-lg mb-1">{meal.mealType} is Ready!</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">The cook has prepared the meal.</p>
            <button 
              onClick={() => handleAnnounceMeal(meal.mealType)}
              className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
            >
              Announce to Students
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
