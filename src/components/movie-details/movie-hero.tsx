"use client"

import { Button } from "@/components/ui/button"
import { Play, Heart, Share2 } from "lucide-react"
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
  }
  isLoading?: boolean
}

export function MovieHero({ movie, isLoading = false }: MovieHeroProps) {
  if (isLoading) {
    return <MovieHeroSkeleton />
  }

  return (
    <div className="relative h-[70vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="flex gap-8 max-w-6xl">
          {/* Movie Poster */}
          <div className="flex-shrink-0">
            <Image
              src={movie.poster || "/placeholder.svg"}
              alt={movie.title}
              width={256}
              height={384}
              className="w-64 h-96 object-cover rounded-xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-5xl font-bold font-serif mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {movie.title}
              </h1>
              <p className="text-xl text-gray-300 mb-4">{movie.originalTitle}</p>
            </div>

            {/* Movie Stats */}
            <MovieStats 
              rating={movie.rating}
              year={movie.year}
              duration={movie.duration}
              views={movie.views}
            />

            {/* Movie Info */}
            <MovieInfo genres={movie.genres} />

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold px-8"
              >
                <Play className="w-5 h-5 mr-2" />
                Xem Ngay
              </Button>
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
            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold mb-3">Nội dung phim</h3>
              <p className="text-gray-300 leading-relaxed">{movie.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
