import { StudentRentMain } from './student_rent_components/StudentRentMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fees & Payments | Student Portal',
  description: 'Manage your fees, dues, and payment history.',
};

export default function Page() {
  return <StudentRentMain />;
}
