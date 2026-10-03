import { StudentVisitorsMain } from './student_visitors_components/StudentVisitorsMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visitors | Student Portal',
  description: 'Request visitor passes and view history.',
};

export default function Page() {
  return <StudentVisitorsMain />;
}
