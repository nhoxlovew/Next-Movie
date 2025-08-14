"use client"

import { useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MovieHero } from "./movie-hero"
import { EpisodeList } from "./episode-list"
import { CastCrew } from "./cast-crew"
import { MovieComments } from "./movie-comments"
import { Movie } from "@/type/movie-details.types"
import { MoviePlayer } from "./video-player"

interface MovieDetailsProps {
  movieData: Movie
  initialEpisode?: number
  initialServer?: string
  slug?: string
}

export function MovieDetails({
  movieData,
  initialEpisode = 1,
  initialServer = 'vietsub',
  slug
}: MovieDetailsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedEpisode, setSelectedEpisode] = useState(initialEpisode)
  const [selectedServer, setSelectedServer] = useState(initialServer)

  // Function to update URL when episode or server changes
  const updateURL = useCallback((episode: number, server: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tap', episode.toString())
    params.set('server', server)

    const newURL = `${window.location.pathname}?${params.toString()}`
    router.replace(newURL, { scroll: false })
  }, [router, searchParams])

  // Enhanced setSelectedEpisode that also updates URL
  const handleEpisodeChange = useCallback((episode: number) => {
    setSelectedEpisode(episode)
    updateURL(episode, selectedServer)
  }, [selectedServer, updateURL])

  // Enhanced setSelectedServer that also updates URL
  const handleServerChange = useCallback((server: string) => {
    setSelectedServer(server)
    updateURL(selectedEpisode, server)
  }, [selectedEpisode, updateURL])

  // Transform the API data to match our component interfaces
  const transformedMovie = {
    backdrop: movieData.thumb_url || movieData.poster_url,
    poster: movieData.poster_url,
    title: movieData.name,
    originalTitle: movieData.origin_name,
    description: movieData.content,
    rating: movieData.tmdb?.vote_average || 0,
    year: movieData.year.toString(),
    duration: movieData.time,
    views: movieData.view.toString(),
    genres: movieData.category?.map(cat => cat.name) || [],
    slug: movieData.slug,
  }

  // Transform episodes data (if available)
  const episodes = Array.from({ length: parseInt(movieData.episode_total) || 1 }, (_, i) => ({
    number: i + 1,
    title: `Tập ${i + 1}`,
    duration: movieData.time,
    views: Math.floor(Math.random() * 100000) + 10000
  }))

  // Transform cast data
  const cast = [
    ...movieData.actor.slice(0, 8).map((actor) => ({
      name: actor,
      role: "Diễn viên",
      avatar: `/placeholder.svg?height=80&width=80`
    })),
    ...movieData.director.slice(0, 2).map((director) => ({
      name: director,
      role: "Đạo diễn",
      avatar: `/placeholder.svg?height=80&width=80`
    }))
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <MovieHero movie={transformedMovie} />
      <MoviePlayer
        selectedEpisode={selectedEpisode}
        setSelectedEpisode={handleEpisodeChange}
        episodes={episodes}
        movieBackdrop={transformedMovie.backdrop}
        movieTitle={transformedMovie.title}
        movieSlug={movieData.slug}
        selectedServer={selectedServer}
        setSelectedServer={handleServerChange}
      />
      <EpisodeList
        episodes={episodes}
        selectedEpisode={selectedEpisode}
        setSelectedEpisode={handleEpisodeChange}
      />
      <CastCrew cast={cast} />
      <MovieComments />
    </div>
  )
}
