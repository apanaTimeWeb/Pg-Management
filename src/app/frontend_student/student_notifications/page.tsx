import { StudentNotificationsMain } from './student_notifications_components/StudentNotificationsMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notifications | Student Portal',
  description: 'Your personal alerts and notifications.',
};

export default function Page() {
  return <StudentNotificationsMain />;
}
