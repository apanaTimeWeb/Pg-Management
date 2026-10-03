'use client';
import React, { Suspense } from 'react';
import { SuperadminIntegrationsMain } from './superadmin_integrations_components/SuperadminIntegrationsMain';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <SuperadminIntegrationsMain />
    </Suspense>
  );
}