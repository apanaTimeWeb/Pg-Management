import { SuperadminCommunicationMain } from '@/app/frontend_superadmin/superadmin_communication/superadmin_communication_components/SuperadminCommunicationMain';

export const metadata = {
  title: 'Communication Center | SuperAdmin',
};

import { Suspense } from 'react';

export default function SuperadminCommunicationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuperadminCommunicationMain />
    </Suspense>
  );
}
