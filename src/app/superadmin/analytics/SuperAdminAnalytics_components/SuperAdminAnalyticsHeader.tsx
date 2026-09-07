import React from 'react';
import { SuperAdminAnalyticsHeaderProps } from '../SuperAdminAnalytics_types/SuperAdminAnalytics.types';

export const SuperAdminAnalyticsHeader: React.FC<SuperAdminAnalyticsHeaderProps> = () => {
  return (
    <div>
      <h1 className="text-[22px] font-bold text-[var(--text-primary)]">Platform Analytics</h1>
      <p className="text-[var(--text-secondary)] text-sm">Real-time aggregate network performance.</p>
    </div>
  );
};
