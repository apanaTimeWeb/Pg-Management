import type { BaseEntity } from '@/lib/storage/db';

export interface AuditLog extends BaseEntity {
  action: string;
  module: string;
  actorId: string;
  actorRole: string;
  details: string;
}

export interface SuperAdminDashboardData {
  totalOwners: number;
  totalProperties: number;
  totalRooms: number;
  totalBeds: number;
  totalStudents: number;
  occupiedBeds: number;
  vacantBeds: number;
  maintenanceBeds: number;
  occupancyPercentage: number;
  activePropertiesCount: number;
  openTicketsCount: number;
  pendingTicketsCount: number;
  resolvedTicketsCount: number;
  recentActivity: AuditLog[];
  recentOwners: any[];
  recentProperties: any[];
}

export interface SuperAdminDashboardKpiGridProps {
  data: SuperAdminDashboardData;
}

export interface SuperAdminDashboardLatestRequestsTableProps {
  requests: any[];
}

export interface SuperAdminDashboardAcquisitionChartProps {
  data: unknown[];
}

