import { StudentAdmissionMain } from './student_admission_components/StudentAdmissionMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Admission | Student Portal',
  description: 'Manage your admission details and agreement.',
};

export default function Page() {
  return <StudentAdmissionMain />;
}
