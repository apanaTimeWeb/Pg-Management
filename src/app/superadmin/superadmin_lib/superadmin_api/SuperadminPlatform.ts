import { db } from '@/lib/storage/db';
import { STORAGE_KEYS } from '@/lib/storage/keys';

export const platformApi = {
  getDashboardStats: () => {
    const owners = db.getAll(STORAGE_KEYS.USERS).filter((u: unknown) => u.role === 'owner' && !u.isDeleted);
    const activeOwnersCount = owners.length;
    
    const ownerRequests = db.getAll(STORAGE_KEYS.OWNER_REQUESTS).filter((r: unknown) => !r.isDeleted);
    const pendingRequestsCount = ownerRequests.filter((r: unknown) => r.status === 'pending').length;
    
    const properties = db.getAll(STORAGE_KEYS.PROPERTIES).filter((p: unknown) => !p.isDeleted);
    const activePropertiesCount = properties.length;
    
    const students = db.getAll(STORAGE_KEYS.USERS).filter((u: unknown) => u.role === 'student' && !u.isDeleted);
    const totalStudentsCount = students.length;
    
    // Occupancy Network Average
    const rooms = db.getAll(STORAGE_KEYS.ROOMS).filter((r: unknown) => !r.isDeleted);
    const totalCapacity = rooms.reduce((sum: number, r: unknown) => sum + (r.capacity || 0), 0);
    const occupancyPercentage = totalCapacity > 0 ? Math.round((totalStudentsCount / totalCapacity) * 100) : 0;
    
    const subscriptions = db.getAll(STORAGE_KEYS.SUBSCRIPTIONS).filter((s: unknown) => !s.isDeleted && s.status === 'active');
    const plans = db.getAll(STORAGE_KEYS.PLANS);
    let mrr = 0;
    subscriptions.forEach((sub: unknown) => {
      const plan = plans.find((p: unknown) => p.id === sub.planId);
      if (plan) {
        mrr += (plan as unknown).price;
      }
    });

    const tickets = db.getAll(STORAGE_KEYS.TICKETS).filter((t: unknown) => !t.isDeleted);
    const openTicketsCount = tickets.filter((t: unknown) => t.status === 'open').length;
    
    const expiringPlansCount = subscriptions.filter((s: unknown) => {
      if(!s.endDate) return false;
      const end = new Date(s.endDate);
      const now = new Date();
      const diffTime = Math.abs(end.getTime() - now.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 15;
    }).length;

    // Latest requests for list
    const latestRequests = [...ownerRequests].sort((a: unknown, b: unknown) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
    
    // Audit logs
    const auditLogs = db.getAll(STORAGE_KEYS.AUDIT_LOGS).filter((l: unknown) => !l.isDeleted);
    const recentAuditLogs = [...auditLogs].sort((a: unknown, b: unknown) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

    // Owners by plan
    const ownersByPlan = plans.map((p: unknown) => {
      const count = subscriptions.filter((s: unknown) => s.planId === p.id).length;
      return { plan: p.name, count };
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
