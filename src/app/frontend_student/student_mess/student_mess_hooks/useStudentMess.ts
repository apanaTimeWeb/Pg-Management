import { useState, useEffect } from 'react';
import { useStudentContext } from '@/app/frontend_student/student_components/StudentContext';
import { studentOperationsApi } from '@/app/frontend_student/student_lib/student_api/StudentOperations';

export interface TodayMenu {
  meal: string;
  time: string;
  items: string;
}

export interface WeeklyMenu {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface MealAttendance {
  date: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

export function useStudentMess() {
  const { profile, loading: contextLoading } = useStudentContext();
  const [todaysMenu, setTodaysMenu] = useState<TodayMenu[]>([]);
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenu[]>([]);
  const [mealAttendance, setMealAttendance] = useState<MealAttendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      // Use the actual mock API to get today's menu
      const todayApi = studentOperationsApi.getTodayMenu(profile?.propertyId || '');
      setTodaysMenu([
        { meal: 'Breakfast', time: '08:00 AM', items: todayApi.breakfast },
        { meal: 'Lunch', time: '01:00 PM', items: todayApi.lunch },
        { meal: 'Dinner', time: '08:30 PM', items: todayApi.dinner },
      ]);

      // Mock weekly menu based on standard pattern
      setWeeklyMenu([
        { day: 'Mon', breakfast: 'Idli + Chutney', lunch: 'Dal + Rice + Sabzi', dinner: 'Roti + Rajma' },
        { day: 'Tue', breakfast: 'Poha + Tea', lunch: 'Sambar + Rice + Papad', dinner: 'Roti + Chole' },
        { day: 'Wed', breakfast: 'Upma + Tea', lunch: 'Dal Tadka + Rice', dinner: 'Roti + Kadai Paneer' },
        { day: 'Thu', breakfast: 'Puri + Aloo', lunch: 'Veg Pulao + Raita', dinner: 'Roti + Matar Paneer' },
        { day: 'Fri', breakfast: 'Paratha + Curd', lunch: 'Dal + Rice + Fried Rice', dinner: 'Roti + Dal Makhani' },
        { day: 'Sat', breakfast: 'Bread + Egg', lunch: 'Biryani + Raita', dinner: 'Roti + Mix Veg' },
        { day: 'Sun', breakfast: 'Dosa + Chutney', lunch: 'Special Thali', dinner: 'Roti + Paneer Butter Masala' },
      ]);

      // Generate realistic meal attendance for the past 5 days
      const att: MealAttendance[] = [];
      const dateObj = new Date();
      for (let i = 4; i >= 0; i--) {
        const d = new Date(dateObj);
        d.setDate(d.getDate() - i);
        const dayStr = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
        
        // Randomize based on student seed to be consistent
        const seed = (profile.userId || '123').charCodeAt(0) + i;
        att.push({
          date: dayStr,
          breakfast: seed % 5 !== 0,
          lunch: seed % 7 !== 0,
          dinner: seed % 4 !== 0,
        });
      }
      setMealAttendance(att);
      setLoading(false);
    }
  }, [profile]);

  return {
    profile,
    loading: contextLoading || loading,
    todaysMenu,
    weeklyMenu,
    mealAttendance
  };
}
