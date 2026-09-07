import { Suspense } from 'react';
import { ManagerRoomsMain } from '@/app/manager/rooms/ManagerRooms_components/ManagerRoomsMain';

export default function ManagerRoomsPage() {
  return (
    <Suspense fallback={<div className="p-6 animate-pulse">Loading rooms...</div>}>
      <ManagerRoomsMain />
    </Suspense>
  );
}
