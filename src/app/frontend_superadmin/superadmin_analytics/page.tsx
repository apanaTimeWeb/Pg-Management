import { SuperadminAnalyticsMain } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_components/SuperadminAnalyticsMain';

export const metadata = {
  title: 'Reports & Analytics | SuperAdmin',
};

import { Suspense } from 'react';

export default function SuperadminAnalyticsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuperadminAnalyticsMain />
    </Suspense>
  );
}