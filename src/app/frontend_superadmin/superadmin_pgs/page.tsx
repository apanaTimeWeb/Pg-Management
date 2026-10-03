import { Suspense } from 'react';
import { SuperadminPGManagementMain } from '@/app/frontend_superadmin/superadmin_pgs/superadmin_pgs_components/SuperadminPGManagementMain';

export const metadata = {
  title: 'PG Management | SuperAdmin',
};

export default function SuperadminPGsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuperadminPGManagementMain />
    </Suspense>
  );
}
