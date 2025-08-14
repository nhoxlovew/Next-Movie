"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function MovieGridSkeleton() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-10 w-20" />
          ))}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {Array.from({ length: 18 }, (_, i) => (
            <Card key={i} className="group relative overflow-hidden rounded-xl bg-gray-800/50 border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
              <div className="relative aspect-[2/3] overflow-hidden">
                <Skeleton className="w-full h-full" />
                
                {/* Quality Badge */}
                <div className="absolute top-2 left-2">
                  <Skeleton className="h-5 w-8" />
                </div>

                {/* Rating */}
                <div className="absolute top-2 right-2">
                  <Skeleton className="h-6 w-12" />
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="w-12 h-12 rounded-full" />
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-3 sm:p-4">
                <Skeleton className="h-5 w-full mb-2" />
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Skeleton className="h-12 w-32 mx-auto" />
        </div>
      </div>
    </section>
  )
}
