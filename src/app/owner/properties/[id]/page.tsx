// RESPONSIBILITY: Renders the OwnerPage component. Receives data via props/hooks.

import { OwnerPropertiesDetailsMain } from '@/app/owner/properties/[id]/OwnerPropertiesDetails_components/OwnerPropertiesDetailsMain';

export default function PropertyDetailPage() {
// @ts-expect-error
  return <OwnerPropertiesDetailsMain />;
}
