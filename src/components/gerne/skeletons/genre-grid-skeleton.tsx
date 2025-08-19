"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

interface GenreGridSkeletonProps {
  // Optional number of placeholder cards
  itemsCount?: number
}

export function GenreGridSkeleton({ itemsCount = 15 }: GenreGridSkeletonProps) {
  return (
    <div className="mt-12">
      {/* Grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: itemsCount }, (_, i) => (
          <Card key={i} className="group relative overflow-hidden rounded-lg bg-gray-800/50 border-gray-700">
            <div className="relative aspect-[2/3] overflow-hidden">
              <Skeleton className="w-full h-full" />
              {/* Top-right chip */}
              <div className="absolute top-2 right-2">
                <Skeleton className="h-5 w-12" />
              </div>
              {/* Top-left chip */}
              <div className="absolute top-2 left-2">
                <Skeleton className="h-5 w-10" />
              </div>
            </div>
            <div className="p-2">
              <Skeleton className="h-4 w-full mb-2" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

