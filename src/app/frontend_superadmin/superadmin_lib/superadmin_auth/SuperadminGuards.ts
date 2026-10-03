// @ts-nocheck
import { getSession } from '@/app/frontend_superadmin/superadmin_lib/superadmin_auth/SuperadminSession';

import type { Role } from '@/lib/types/models';

export function requireRole(expectedRole: Role) {
  const session = getSession();
  if (!session) return false;
  return session.role === expectedRole;
}
