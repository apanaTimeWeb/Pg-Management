import { StudentSupportMain } from './student_support_components/StudentSupportMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help & Support | SmartPG',
  description: 'Help and support center for students.',
};

export default function StudentSupportPage() {
  return <StudentSupportMain />;
}
