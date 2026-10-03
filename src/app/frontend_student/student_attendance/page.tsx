import { StudentAttendanceMain } from './student_attendance_components/StudentAttendanceMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Attendance | Student Portal',
  description: 'Track your daily and monthly attendance.',
};

export default function Page() {
  return <StudentAttendanceMain />;
}
