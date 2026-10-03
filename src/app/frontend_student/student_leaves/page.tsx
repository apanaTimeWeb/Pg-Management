import { StudentLeavesMain } from './student_leaves_components/StudentLeavesMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leave / Outing | Student Portal',
  description: 'Apply for leaves and view your outing history.',
};

export default function Page() {
  return <StudentLeavesMain />;
}
