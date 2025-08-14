"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function CastCrewSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Skeleton className="h-8 w-32 mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="text-center">
            <Skeleton className="w-20 h-20 rounded-full mx-auto mb-3" />
            <Skeleton className="h-4 w-16 mx-auto mb-1" />
            <Skeleton className="h-3 w-12 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}
