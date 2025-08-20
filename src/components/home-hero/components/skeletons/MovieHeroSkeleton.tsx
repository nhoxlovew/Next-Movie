"use client"

import React from "react"
import HeroBackgroundSkeleton from "./HeroBackgroundSkeleton"
import HeroTitleBlockSkeleton from "./HeroTitleBlockSkeleton"
import HeroMetaChipsSkeleton from "./HeroMetaChipsSkeleton"
import HeroActionsSkeleton from "./HeroActionsSkeleton"

const MovieHeroSkeleton = () => (
  <section className="relative w-full h-screen min-h-screen overflow-hidden bg-black">
    <div className="w-full h-full relative">
      <HeroBackgroundSkeleton />
      <div className="relative z-10 w-full h-full min-h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
          <div className="w-full max-w-4xl space-y-6">
            <HeroTitleBlockSkeleton />
            <HeroMetaChipsSkeleton />
            <HeroActionsSkeleton />
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default MovieHeroSkeleton

