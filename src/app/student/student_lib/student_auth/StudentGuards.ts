import { getSession } from '@/app/student/student_lib/student_auth/StudentSession';
import { Role } from '@/lib/types';

export function requireRole(expectedRole: Role) {
  const session = getSession();
  if (!session) return false;
  return session.role === expectedRole;
}
