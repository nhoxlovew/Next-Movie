"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function MovieHeroSkeleton() {
  return (
    <div className="relative h-[70vh] overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="flex gap-8 max-w-6xl">
          {/* Movie Poster Skeleton */}
          <div className="flex-shrink-0">
            <Skeleton className="w-64 h-96 rounded-xl" />
          </div>

          {/* Movie Info Skeleton */}
          <div className="flex-1 space-y-6">
            {/* Title */}
            <div>
              <Skeleton className="h-12 w-96 mb-2" />
              <Skeleton className="h-6 w-64" />
            </div>

            {/* Movie Stats */}
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-8 w-32" />
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-7 w-18" />
              <Skeleton className="h-7 w-24" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-28" />
              <Skeleton className="h-12 w-24" />
            </div>

            {/* Description */}
            <div className="max-w-2xl space-y-2">
              <Skeleton className="h-6 w-32 mb-3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
