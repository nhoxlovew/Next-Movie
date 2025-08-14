"use client"

import { useState, useEffect } from "react"
import { movie } from "@/constants/route"
import { MovieHero } from "./movie-hero"
import { EpisodeList } from "./episode-list"
import { CastCrew } from "./cast-crew"
import { MovieComments } from "./movie-comments"
import { MovieDetailsSkeleton } from "./skeletons/movie-details-skeleton"

interface MovieDetailsProps {
  movieId: string
  isLoading?: boolean
}

export function MovieDetails({ movieId, isLoading = false }: MovieDetailsProps) {
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    // Simulate API call
    if (movieId) {
      setLoading(true)
      const timer = setTimeout(() => {
        setLoading(false)
      }, 2000) // 2 second loading simulation

      return () => clearTimeout(timer)
    }
  }, [movieId])

  if (loading) {
    return <MovieDetailsSkeleton />
  }

  return (
    <div className="min-h-screen bg-black text-white">
     
      <MovieHero movie={movie} />
     
      <EpisodeList episodes={movie.episodes} />

      <CastCrew cast={movie.cast} />

      <MovieComments />
    </div>
  )
}
