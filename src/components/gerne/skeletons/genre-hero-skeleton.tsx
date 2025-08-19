"use client"

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const GenreHeroSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-4xl">
      <div className="absolute inset-0 rounded-4xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10"></div>
      <div className="relative py-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-12 w-[220px] sm:w-[320px] md:w-[420px]" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-[240px] sm:w-[420px] md:w-[560px]" />
            <Skeleton className="h-4 w-[200px] sm:w-[360px] md:w-[480px]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenreHeroSkeleton