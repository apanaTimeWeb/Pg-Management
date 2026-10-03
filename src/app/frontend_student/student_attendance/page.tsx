import { StudentAttendanceMain } from '@/app/frontend_student/student_attendance/student_attendance_components/StudentAttendanceMain';

export const metadata = {
  title: 'Attendance | Student Portal',
  description: 'View your monthly attendance and stats',
};

export default function StudentAttendancePage() {
  return <StudentAttendanceMain />;
}
