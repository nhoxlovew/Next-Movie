"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function EpisodeListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-16" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {Array.from({ length: 24 }, (_, i) => (
          <Card key={i} className="p-4 bg-gray-900/50 border-gray-700">
            <div className="text-center space-y-2">
              <Skeleton className="h-5 w-12 mx-auto" />
              <Skeleton className="h-4 w-16 mx-auto" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
