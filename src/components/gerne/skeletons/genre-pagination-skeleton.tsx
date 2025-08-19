"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function GenrePaginationSkeleton() {
  return (
    <div className="flex items-center justify-center mt-12">
      <div className="flex items-center gap-2 p-2 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl">
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="px-6 py-2">
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl">
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  )
}

