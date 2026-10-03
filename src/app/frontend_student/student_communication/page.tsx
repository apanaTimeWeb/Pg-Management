import { StudentCommunicationMain } from '@/app/frontend_student/student_communication/student_communication_components/StudentCommunicationMain';

export const metadata = {
  title: 'Communication | Student Portal',
  description: 'Chat with admin, warden, and roommates',
};

export default function StudentCommunicationPage() {
  return <StudentCommunicationMain />;
}
