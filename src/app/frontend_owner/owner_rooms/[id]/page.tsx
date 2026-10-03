// @ts-nocheck
// RESPONSIBILITY: Renders the OwnerPage component. Receives data via props/hooks.

import { OwnerRoomsDetailsMain } from '@/app/frontend_owner/owner_rooms/[id]/OwnerRoomsDetails_components/OwnerRoomsDetailsMain';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <OwnerRoomsDetailsMain params={params} />;
}
