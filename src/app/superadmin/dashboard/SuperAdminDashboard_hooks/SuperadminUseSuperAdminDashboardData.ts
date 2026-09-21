'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/storage/db';
import { STORAGE_KEYS } from '@/lib/storage/keys';
import type { SuperAdminDashboardData, AuditLog } from '@/app/superadmin/dashboard/SuperAdminDashboard_types/SuperAdminDashboard.types';

export function SuperadminUseSuperAdminDashboardData() {
  const [data, setData] = useState<SuperAdminDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      
      // Calculate from LocalStorage
      const allUsers = db.getAll<any>(STORAGE_KEYS.USERS);
      const allOwners = allUsers.filter(u => u.role === 'owner' && !u.isDeleted);
      const totalOwners = allOwners.length;
      
      const allProperties = db.getAll<any>(STORAGE_KEYS.PROPERTIES);
      const activeProperties = allProperties.filter(p => p.status === 'Active' && !p.isDeleted);
      const totalProperties = allProperties.filter(p => !p.isDeleted).length;
      
      const allRooms = db.getAll<any>(STORAGE_KEYS.ROOMS);
      const activeRooms = allRooms.filter(r => !r.isDeleted);
      const totalRooms = activeRooms.length;
      
      const allBeds = db.getAll<any>(STORAGE_KEYS.BEDS);
      const activeBeds = allBeds.filter(b => !b.isDeleted);
      const totalBeds = activeBeds.length;
      const occupiedBeds = activeBeds.filter(b => b.status === 'Occupied').length;
      const maintenanceBeds = activeBeds.filter(b => b.status === 'Maintenance').length;
      const vacantBeds = activeBeds.filter(b => b.status === 'Available' || !b.status).length;
      
      const occupancyPercentage = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;
      
      const allStudents = allUsers.filter(u => u.role === 'student' && !u.isDeleted);
      const activeStudentsCount = allStudents.filter(s => s.status === 'Active').length;

      const allTickets = db.getAll<any>(STORAGE_KEYS.TICKETS);
      const validTickets = allTickets.filter(t => !t.isDeleted);
      const openTicketsCount = validTickets.filter(t => t.status === 'Open').length;
      const pendingTicketsCount = validTickets.filter(t => t.status === 'Pending').length;
      const resolvedTicketsCount = validTickets.filter(t => t.status === 'Resolved').length;

      const allLogs = db.getAll<AuditLog>(STORAGE_KEYS.AUDIT_LOGS);
      const recentActivity = allLogs
        .filter(l => !l.isDeleted)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);
        
      const recentOwners = allOwners
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
        
      // For property, we need owner names and room counts if possible
      const recentPropertiesRaw = allProperties
        .filter(p => !p.isDeleted)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
        
      const recentProperties = recentPropertiesRaw.map(p => {
        const owner = allOwners.find(o => o.id === p.ownerId);
        const propRooms = activeRooms.filter(r => r.propertyId === p.id).length;
        const propBeds = activeBeds.filter(b => b.propertyId === p.id).length;
        return {
          ...p,
          ownerName: owner ? owner.name : 'Unknown',
          roomCount: propRooms,
          bedCount: propBeds
        };
      });

      setData({
        totalOwners,
        totalProperties,
        totalRooms,
        totalBeds,
        totalStudents: activeStudentsCount,
        occupiedBeds,
        vacantBeds,
        maintenanceBeds,
        occupancyPercentage,
        activePropertiesCount: activeProperties.length,
        openTicketsCount,
        pendingTicketsCount,
        resolvedTicketsCount,
        recentActivity,
        recentOwners,
        recentProperties
      });
    } catch (err) {
      console.error("Dashboard calculation failed", err);
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
}
