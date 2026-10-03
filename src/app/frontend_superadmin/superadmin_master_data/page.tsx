import { Suspense } from 'react';
import { SuperadminMasterDataMain } from '@/app/frontend_superadmin/superadmin_master_data/superadmin_master_data_components/SuperadminMasterDataMain';

export const metadata = {
  title: 'Master Data | SuperAdmin',
};

export default function SuperadminMasterDataPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuperadminMasterDataMain />
    </Suspense>
  );
}
