"use client"

import { Button } from "@/components/ui/button"
import { Heart, Share2 } from "lucide-react"
import Image from "next/image"
import { MovieStats } from "./movie-stats"
import { MovieInfo } from "./movie-info"
import { MovieHeroSkeleton } from "./skeletons/movie-hero-skeleton"

interface MovieHeroProps {
  movie: {
    backdrop: string
    poster: string
    title: string
    originalTitle: string
    description: string
    rating: number
    year: string
    duration: string
    views: string
    genres: string[]
    episode_current: string;
    episode_total: string;
  }
  isLoading?: boolean
}

export function MovieHero({ movie, isLoading = false }: MovieHeroProps) {
  if (isLoading) {
    return <MovieHeroSkeleton />
  }

  return (
    <div className="relative min-h-[60vh] md:h-[70vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center py-8 md:py-0">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-6xl">
          {/* Movie Poster */}
          <div className="flex-shrink-0 self-center border-green-500 rounded-xl border-1 md:self-start">
            <Image
              src={movie.poster || "/placeholder.svg"}
              alt={movie.title}
              width={256}
              height={384}
              className="w-40 h-60 sm:w-48 sm:h-72 md:w-64 md:h-96 object-cover rounded-xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold font-serif mb-2 text-green-400 bg-clip-text">
                {movie.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4">{movie.originalTitle}</p>
            </div>

            {/* Movie Stats */}
            <MovieStats
              rating={movie.rating}
              year={movie.year}
              duration={movie.duration}
              episode_current={movie.episode_current}
            />

            {/* Movie Info */}
            <MovieInfo genres={movie.genres} />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Heart className="w-5 h-5 mr-2" />
                Yêu thích
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Chia sẻ
              </Button>
            </div>

            {/* Description */}
            <div className="max-w-2xl mx-auto md:mx-0">
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Nội dung phim</h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{movie.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
