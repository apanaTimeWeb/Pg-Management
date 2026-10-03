'use client';

import React, { Suspense } from 'react';

import { SuperAdminCreateOwnerForm } from '@/app/frontend_superadmin/superadmin_create_owner/SuperAdminCreateOwner_components/SuperAdminCreateOwnerForm';

export default function CreateOwnerPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64 text-secondary">Loading form...</div>}>
      <SuperAdminCreateOwnerForm />
    </Suspense>
  );
}
