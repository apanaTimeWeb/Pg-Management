import { StudentNoticesMain } from './student_notices_components/StudentNoticesMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notices | Student Portal',
  description: 'Important announcements and notices from management.',
};

export default function Page() {
  return <StudentNoticesMain />;
}
