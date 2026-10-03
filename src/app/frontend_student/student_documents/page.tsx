import { StudentDocumentsMain } from './student_documents_components/StudentDocumentsMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documents | Student Portal',
  description: 'Manage your uploaded documents and verification status.',
};

export default function Page() {
  return <StudentDocumentsMain />;
}
