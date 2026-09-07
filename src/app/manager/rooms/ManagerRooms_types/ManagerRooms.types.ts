import { Room } from '@/app/owner/lib/api/rooms';

export interface ManagerRoomData extends Room {
  bedsCount: number;
  vacantCount: number;
}
