import { OwnerRequest } from '@/app/superadmin/lib/api/ownerRequests';
import { BaseEntity } from '@/lib/types';

export interface AuditLog extends BaseEntity {
  action: string;
  module: string;
  actorId: string;
  actorRole: string;
  details: string;
}

export interface OwnersByPlan {
  plan: string;
  count: number;
}

export interface SuperAdminDashboardData {
  activeOwnersCount: number;
  pendingRequestsCount: number;
  activePropertiesCount: number;
  totalStudentsCount: number;
  mrr: number; // in rupees
  occupancyPercentage: number;
  openTicketsCount: number;
  expiringPlansCount: number;
  latestRequests: OwnerRequest[];
  recentAuditLogs: AuditLog[];
  ownersByPlan: OwnersByPlan[];
}

export interface SuperAdminDashboardKpiGridProps {
  data: SuperAdminDashboardData;
}

export interface SuperAdminDashboardLatestRequestsTableProps {
  requests: OwnerRequest[];
}

export interface SuperAdminDashboardAcquisitionChartProps {
  data: any[];
}
