import { Suspense } from 'react';
import { SuperadminBillingPaymentsMain } from '@/app/frontend_superadmin/superadmin_billing/superadmin_billing_components/SuperadminBillingPaymentsMain';

export const metadata = {
  title: 'Billing & Payments | SuperAdmin',
};

export default function SuperadminBillingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuperadminBillingPaymentsMain />
    </Suspense>
  );
}
