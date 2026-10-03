import { StudentDashboardMain } from './student_dashboard_components/StudentDashboardMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Student Portal',
  description: 'Overview of your stay and recent activities.',
};

export default function Page() {
  return <StudentDashboardMain />;
}
