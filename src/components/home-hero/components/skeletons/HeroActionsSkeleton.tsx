"use client"

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const HeroActionsSkeleton = () => (
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
    <Skeleton className="h-12 w-40" />
    <div className="flex gap-3 sm:gap-5">
      <Skeleton className="h-12 w-36" />
      <Skeleton className="h-12 w-36" />
    </div>
  </div>
)

export default HeroActionsSkeleton

