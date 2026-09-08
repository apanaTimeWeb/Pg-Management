'use client';
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
/** Error boundary for the entire manager role shell. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 p-8 text-center">
      <div className="w-16 h-16 bg-danger-bg text-danger rounded-full flex items-center justify-center">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-danger">Something went wrong!</h2>
      <p className="text-secondary max-w-md">{error.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold motion-safe:transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
