import { StudentRequestsMain } from './student_requests_components/StudentRequestsMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Requests | Student Portal',
  description: 'Track all your miscellaneous requests.',
};

export default function Page() {
  return <StudentRequestsMain />;
}
