import { StudentMessMain } from './student_mess_components/StudentMessMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mess / Food | Student Portal',
  description: 'View menus, log meals, and submit food complaints.',
};

export default function Page() {
  return <StudentMessMain />;
}
