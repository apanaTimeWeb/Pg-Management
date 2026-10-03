import { Suspense } from 'react';
import { SuperadminUserManagementMain } from '@/app/frontend_superadmin/superadmin_users/superadmin_users_components/SuperadminUserManagementMain';

export const metadata = {
  title: 'User Management | SuperAdmin',
};

export default function SuperadminUsersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuperadminUserManagementMain />
    </Suspense>
  );
}
