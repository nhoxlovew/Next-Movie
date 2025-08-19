"use client"

import { MovieDetails } from '@/components/movie-details'
import { MovieDetailsSkeleton } from '@/components/movie-details'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Movie } from '@/type/movie-details.types'

interface PageProps {
  params: Promise<{ slug: string }>
}

const Page = ({ params }: PageProps) => {
  const searchParams = useSearchParams()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter()
  const [movieData, setMovieData] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [slug, setSlug] = useState<string>("")

  // Get episode and server from URL params
  const episodeParam = searchParams.get('tap')
  const serverParam = searchParams.get('server')
  const initialEpisode = episodeParam ? parseInt(episodeParam) : 1
  const initialServer = serverParam || 'vietsub'

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (!slug) return

    const fetchMovieData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/phim/${slug}`)

        if (!response.ok) {
          throw new Error('Failed to fetch movie data')
        }

        const data = await response.json()

        if (data.status && data.movie) {
          setMovieData(data.movie)
        } else {
          throw new Error('Movie not found')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovieData()
  }, [slug])

  if (isLoading) {
    return <MovieDetailsSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  if (!movieData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
          <p className="text-gray-400">The movie you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    )
  }

  return (
    <MovieDetails
      movieData={movieData}
      initialEpisode={initialEpisode}
      initialServer={initialServer}
      slug={slug}
    />
  )
}

export default Page