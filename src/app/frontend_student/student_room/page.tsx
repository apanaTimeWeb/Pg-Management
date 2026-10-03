import { StudentRoomMain } from './student_room_components/StudentRoomMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Room & Bed | Student Portal',
  description: 'View room details, roommates, and change requests.',
};

export default function Page() {
  return <StudentRoomMain />;
}
