import { useState, useEffect } from 'react';
import { Wifi, Fan, Lightbulb, BookOpen, Sofa, Package, BedDouble, Droplets } from 'lucide-react';
import { useStudentContext } from '@/app/frontend_student/student_components/StudentContext';

export interface RoomFacility {
  name: string;
  icon: any;
  available: boolean;
}

export interface Roommate {
  name: string;
  bed: string;
  contact: string;
}

export interface RoomData {
  pgName: string;
  building: string;
  floor: string;
  roomNumber: string;
  roomType: string;
  bedNumber: string;
  capacity: number;
  facilities: RoomFacility[];
  roommates: Roommate[];
}

export function useStudentRoom() {
  const { profile, loading } = useStudentContext();
  const [roomData, setRoomData] = useState<RoomData | null>(null);

  useEffect(() => {
    if (profile) {
      // Mock data logic based on profile
      const capacityMap: Record<string, number> = {
        'single': 1,
        'double': 2,
        'triple': 3,
        'quad': 4
      };
      
      // Extract from property mappings or default
      const roomTypeLabel = profile.roomType?.toLowerCase() || 'triple';
      const cap = capacityMap[roomTypeLabel] || 3;
      
      const roommates: Roommate[] = [];
      if (cap > 1) {
        roommates.push({ name: 'Amit Verma', bed: 'Bed A', contact: '+91 98765 XXXXX' });
      }
      if (cap > 2) {
        roommates.push({ name: 'Ravi Gupta', bed: 'Bed C', contact: '+91 87654 XXXXX' });
      }

      setRoomData({
        pgName: profile.propertyName || 'Green Valley PG',
        building: 'Block A',
        floor: '2nd Floor',
        roomNumber: `Room ${profile.roomNumber}`,
        roomType: profile.roomType ? profile.roomType.charAt(0).toUpperCase() + profile.roomType.slice(1) + ' Sharing' : 'Triple Sharing',
        bedNumber: `Bed ${profile.bedCode}`,
        capacity: cap,
        facilities: [
          { name: 'Wi-Fi', icon: Wifi, available: true },
          { name: 'Fan', icon: Fan, available: true },
          { name: 'Light', icon: Lightbulb, available: true },
          { name: 'Study Table', icon: BookOpen, available: true },
          { name: 'Chair', icon: Sofa, available: true },
          { name: 'Cupboard', icon: Package, available: true },
          { name: 'Bed + Mattress', icon: BedDouble, available: true },
          { name: 'Attached Bathroom', icon: Droplets, available: false },
        ],
        roommates
      });
    }
  }, [profile]);

  return {
    profile,
    loading,
    roomData
  };
}
