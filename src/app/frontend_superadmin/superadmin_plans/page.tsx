import { Suspense } from 'react';
import { SuperadminSubscriptionPlansMain } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_components/SuperadminSubscriptionPlansMain';

export const metadata = {
  title: 'Subscriptions & Plans | SuperAdmin',
};

export default function SubscriptionPlansPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuperadminSubscriptionPlansMain />
    </Suspense>
  );
}