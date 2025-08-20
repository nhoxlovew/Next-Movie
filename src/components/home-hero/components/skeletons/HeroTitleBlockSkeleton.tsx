"use client"

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const HeroTitleBlockSkeleton = () => (
  <div className="w-full max-w-4xl">
    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
      <Skeleton className="h-8 sm:h-10 md:h-12 w-2/3" />
      <Skeleton className="h-5 sm:h-6 w-1/3" />
    </div>
    <Skeleton className="h-5 sm:h-6 w-3/4" />
  </div>
)

export default HeroTitleBlockSkeleton

