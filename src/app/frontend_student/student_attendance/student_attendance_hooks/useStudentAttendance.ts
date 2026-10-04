import { useState, useEffect } from 'react';
import { useStudentContext } from '@/app/frontend_student/student_components/StudentContext';

export type AttStatus = 'P' | 'A' | 'L' | 'LT';

export interface DailyAttendance {
  date: number;
  status: AttStatus;
}

export function useStudentAttendance() {
  const { profile, loading: contextLoading } = useStudentContext();
  const [calendar, setCalendar] = useState<DailyAttendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      // Simulate fetching dynamic attendance data based on student ID
      // Generate realistic monthly calendar based on the current date
      const dateObj = new Date();
      const currentMonth = dateObj.getMonth();
      const currentYear = dateObj.getFullYear();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      
      const newCalendar: DailyAttendance[] = [];
      const studentSeed = (profile.userId || '1234').charCodeAt(0);
      
      for (let i = 1; i <= daysInMonth; i++) {
        const dayOfWeek = new Date(currentYear, currentMonth, i).getDay();
        
        let status: AttStatus = 'P';
        
        // Randomize based on student seed
        const rand = (i * studentSeed) % 100;
        if (rand < 5) {
          status = 'A';
        } else if (rand < 15) {
          status = 'L';
        } else if (rand < 25) {
          status = 'LT';
        }
        
        // Make sure future dates (beyond today) are not marked or are marked logically (let's assume full month generated for simplicity or cap at today)
        if (i > dateObj.getDate() && currentMonth === dateObj.getMonth()) {
          // Future dates in current month are not yet attended, but mock data shows full month
          status = 'P';
        }

        newCalendar.push({ date: i, status });
      }

      setCalendar(newCalendar);
      setLoading(false);
    }
  }, [profile]);

  return {
    profile,
    loading: contextLoading || loading,
    calendar
  };
}
