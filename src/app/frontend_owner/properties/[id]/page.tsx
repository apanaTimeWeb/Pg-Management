// RESPONSIBILITY: Renders the OwnerPage component. Receives data via props/hooks.

import { OwnerPropertiesDetailsMain } from '@/app/frontend_owner/properties/[id]/OwnerPropertiesDetails_components/OwnerPropertiesDetailsMain';

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <OwnerPropertiesDetailsMain params={params} />;
}
