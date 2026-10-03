import { Suspense } from 'react';
import { SuperadminOwnerManagementMain } from '@/app/frontend_superadmin/superadmin_owners/superadmin_owners_components/SuperadminOwnerManagementMain';

export const metadata = {
  title: 'Admin / Owner Management | SuperAdmin',
};

export default function SuperAdminOwnersDirectoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuperadminOwnerManagementMain />
    </Suspense>
  );
}