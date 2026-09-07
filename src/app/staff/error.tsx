'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { STAFF_ROUTES } from './staff_url_config';

export default function StaffError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center space-y-4">
      <div className="w-16 h-16 bg-[var(--danger-bg)] text-[var(--danger)] rounded-[var(--radius-full)] flex items-center justify-center mb-2">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-[var(--text-primary)]">Something went wrong</h2>
      <p className="text-sm text-[var(--text-secondary)] max-w-md">
        An unexpected error occurred in the staff module. We've been notified and are looking into it.
      </p>
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => reset()}
          className="bg-[var(--primary)] text-white px-6 py-2 rounded-[var(--radius-md)] font-medium hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
        <a
          href={STAFF_ROUTES.DASHBOARD}
          className="bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] px-6 py-2 rounded-[var(--radius-md)] font-medium hover:bg-[var(--bg-page)] transition-colors"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
}
