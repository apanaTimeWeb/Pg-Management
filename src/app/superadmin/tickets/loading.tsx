import React from 'react';

export default function Loading() {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="h-7 w-48 bg-[var(--skeleton-base)] motion-safe:animate-pulse rounded-md mb-2"></div>
          <div className="h-4 w-64 bg-[var(--skeleton-base)] motion-safe:animate-pulse rounded-md"></div>
        </div>
        <div className="h-9 w-36 bg-[var(--skeleton-base)] motion-safe:animate-pulse rounded-md"></div>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] shadow-sm">
        <div className="p-4 border-b border-[var(--border)]">
          <div className="h-9 w-full sm:w-72 bg-[var(--skeleton-base)] motion-safe:animate-pulse rounded-md"></div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="h-12 w-full bg-[var(--skeleton-base)] motion-safe:animate-pulse rounded-md"></div>
            <div className="h-12 w-full bg-[var(--skeleton-base)] motion-safe:animate-pulse rounded-md"></div>
            <div className="h-12 w-full bg-[var(--skeleton-base)] motion-safe:animate-pulse rounded-md"></div>
            <div className="h-12 w-full bg-[var(--skeleton-base)] motion-safe:animate-pulse rounded-md"></div>
            <div className="h-12 w-full bg-[var(--skeleton-base)] motion-safe:animate-pulse rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
