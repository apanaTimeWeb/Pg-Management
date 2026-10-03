'use client';
import React, { Suspense } from 'react';
import { SuperadminAffiliatesMain } from './superadmin_affiliates_components/SuperadminAffiliatesMain';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <SuperadminAffiliatesMain />
    </Suspense>
  );
}