import { getSession } from '@/app/frontend_login/login_lib/login_auth/LoginSession';

import type { Role } from '@/lib/types';;

export function requireRole(expectedRole: Role) {
  const session = getSession();
  if (!session) return false;
  return session.role === expectedRole;
}
