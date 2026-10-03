'use client';
import React, { Suspense } from 'react';
import { SuperadminMarketingMain } from './superadmin_marketing_components/SuperadminMarketingMain';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <SuperadminMarketingMain />
    </Suspense>
  );
}