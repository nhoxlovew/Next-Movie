"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function MovieCommentsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Skeleton className="h-8 w-32 mb-8" />

      {/* Comment Form Skeleton */}
      <Card className="bg-gray-900/50 border-gray-700 p-6 mb-8">
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </Card>

      {/* Comments List Skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 3 }, (_, i) => (
          <Card key={i} className="bg-gray-900/30 border-gray-700 p-4">
            <div className="flex items-start gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
