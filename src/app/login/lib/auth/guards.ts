import { getSession } from '@/app/login/lib/auth/session';
import { Role } from '@/app/login/lib/types';

export function requireRole(expectedRole: Role) {
  const session = getSession();
  if (!session) return false;
  return session.role === expectedRole;
}
