import { db } from '@/lib/storage/db';
import { STORAGE_KEYS } from '@/lib/storage/keys';

export const platformApi = {
  getDashboardStats: () => {
    const owners = db.getAll(STORAGE_KEYS.USERS).filter((u: Record<string, unknown>) => u.role === 'owner' && !u.isDeleted);
    const activeOwnersCount = owners.length;
    
    const ownerRequests = db.getAll(STORAGE_KEYS.OWNER_REQUESTS).filter((r: Record<string, unknown>) => !r.isDeleted);
    const pendingRequestsCount = ownerRequests.filter((r: Record<string, unknown>) => r.status === 'pending').length;
    
    const properties = db.getAll(STORAGE_KEYS.PROPERTIES).filter((p: Record<string, unknown>) => !p.isDeleted);
    const activePropertiesCount = properties.length;
    
    const students = db.getAll(STORAGE_KEYS.USERS).filter((u: Record<string, unknown>) => u.role === 'student' && !u.isDeleted);
    const totalStudentsCount = students.length;
    
    // Occupancy Network Average
    const rooms = db.getAll(STORAGE_KEYS.ROOMS).filter((r: Record<string, unknown>) => !r.isDeleted);
    const totalCapacity = rooms.reduce((sum: number, r: unknown) => sum + ((r as any).capacity || 0), 0);
    const occupancyPercentage = totalCapacity > 0 ? Math.round((totalStudentsCount / (totalCapacity as number)) * 100) : 0;
    
    const subscriptions = db.getAll(STORAGE_KEYS.SUBSCRIPTIONS).filter((s: Record<string, unknown>) => !s.isDeleted && s.status === 'active');
    const plans = db.getAll(STORAGE_KEYS.PLANS);
    let mrr = 0;
    subscriptions.forEach((sub: Record<string, unknown>) => {
      const plan = plans.find((p: Record<string, unknown>) => p.id === sub.planId);
      if (plan) {
        mrr += (plan as Record<string, unknown>).price as number;
      }
    });

    const tickets = db.getAll(STORAGE_KEYS.TICKETS).filter((t: Record<string, unknown>) => !t.isDeleted);
    const openTicketsCount = tickets.filter((t: Record<string, unknown>) => t.status === 'open').length;
    
    const expiringPlansCount = subscriptions.filter((s: Record<string, unknown>) => {
      if(!s.endDate) return false;
      const end = new Date((s as any).endDate);
      const now = new Date();
      const diffTime = Math.abs(end.getTime() - now.getTime());
      const diffDays = Math.ceil((diffTime as number) / (1000 * 60 * 60 * 24));
      return diffDays <= 15;
    }).length;

    // Latest requests for list
    const latestRequests = [...ownerRequests].sort((a: Record<string, unknown>, b: Record<string, unknown>) => new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()).slice(0, 5);
    
    // Audit logs
    const auditLogs = db.getAll(STORAGE_KEYS.AUDIT_LOGS).filter((l: Record<string, unknown>) => !l.isDeleted);
    const recentAuditLogs = [...auditLogs].sort((a: Record<string, unknown>, b: Record<string, unknown>) => new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()).slice(0, 5);

    // Owners by plan
    const ownersByPlan = plans.map((p: Record<string, unknown>) => {
      const count = subscriptions.filter((s: Record<string, unknown>) => s.planId === p.id).length;
      return { plan: (p as any).name, count };
    });

    return {
      activeOwnersCount,
      pendingRequestsCount,
      activePropertiesCount,
      totalStudentsCount,
      mrr,
      occupancyPercentage,
      openTicketsCount,
      expiringPlansCount,
      latestRequests,
      recentAuditLogs,
      ownersByPlan
    };
  }
};
