// RESPONSIBILITY: Renders the OwnerPage component. Receives data via props/hooks.

import { OwnerStudentsDetailsMain } from '@/app/frontend_owner/owner_students/[id]/OwnerStudentsDetails_components/OwnerStudentsDetailsMain';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <OwnerStudentsDetailsMain params={params} />;
}
