/** Structural skeleton loading screen — no spinner per design §28. */
export default function Loading() {
  return (
    <div className="p-6 space-y-6 animate-in fade-in motion-safe:duration-300">
      {/* Header skeleton */}
      <div className="h-8 bg-skeleton-base rounded-lg w-1/3 skeleton-shimmer" />
      {/* Stats row skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-skeleton-base rounded-xl skeleton-shimmer" />
        ))}
      </div>
      {/* Main content skeleton */}
      <div className="h-64 bg-skeleton-base rounded-xl skeleton-shimmer" />
      {/* Table rows skeleton */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-skeleton-base rounded-lg skeleton-shimmer" />
        ))}
      </div>
    </div>
  );
}
