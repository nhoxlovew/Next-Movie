"use client"

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const HeroMetaChipsSkeleton = () => (
  <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
    <Skeleton className="h-8 w-20" />
    <Skeleton className="h-8 w-16" />
    <Skeleton className="h-8 w-16" />
    <Skeleton className="h-8 w-14" />
    <Skeleton className="h-8 w-16" />
  </div>
)

export default HeroMetaChipsSkeleton

