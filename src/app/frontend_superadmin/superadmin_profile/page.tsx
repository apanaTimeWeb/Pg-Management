// @ts-nocheck
import { SuperadminProfileMain } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_components/SuperadminProfileMain';

export const metadata = {
  title: 'SuperAdmin Profile | SmartPG',
};

import { Suspense } from 'react';

export default function SuperadminProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuperadminProfileMain />
    </Suspense>
  );
}
