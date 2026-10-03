import { StudentComplaintsMain } from './student_complaints_components/StudentComplaintsMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complaints & Maintenance | Student Portal',
  description: 'Raise complaints and track maintenance requests.',
};

export default function Page() {
  return <StudentComplaintsMain />;
}
