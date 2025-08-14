"use client"

import { MovieHeroSkeleton } from "./movie-hero-skeleton"
import { EpisodeListSkeleton } from "./episode-list-skeleton"
import { CastCrewSkeleton } from "./cast-crew-skeleton"
import { MovieCommentsSkeleton } from "./movie-comments-skeleton"

export function MovieDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section Skeleton */}
      <MovieHeroSkeleton />

      {/* Episodes Section Skeleton */}
      <EpisodeListSkeleton />

      {/* Cast Section Skeleton */}
      <CastCrewSkeleton />

      {/* Comments Section Skeleton */}
      <MovieCommentsSkeleton />
    </div>
  )
}
