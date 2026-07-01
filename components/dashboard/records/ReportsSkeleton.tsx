"use client";

export function ReportsTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      {/* table header */}
      <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-4 border-b border-slate-100 px-6 py-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 w-20 animate-pulse rounded bg-slate-100" />
        ))}
      </div>
      {/* rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-4 border-b border-slate-50 px-6 py-5 last:border-0"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-slate-100" />
            <div className="space-y-2">
              <div className="h-3.5 w-36 animate-pulse rounded bg-slate-100" />
              <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-6 w-16 animate-pulse rounded-full bg-slate-100" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-pulse rounded-full bg-slate-100" />
            <div className="h-3.5 w-24 animate-pulse rounded bg-slate-100" />
          </div>
          <div className="flex items-center">
            <div className="h-3.5 w-20 animate-pulse rounded bg-slate-100" />
          </div>
          <div className="flex items-center">
            <div className="h-3.5 w-24 animate-pulse rounded bg-slate-100" />
          </div>
          <div className="flex items-center">
            <div className="h-8 w-16 animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>
      ))}
      {/* mobile cards skeleton */}
      <div className="flex flex-col gap-3 p-4 md:hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-slate-100" />
              <div className="space-y-2 flex-1">
                <div className="h-3.5 w-3/4 animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-3 animate-pulse rounded bg-slate-100" />
              ))}
            </div>
            <div className="h-8 w-full animate-pulse rounded-xl bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
