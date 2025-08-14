"use client"

import { Star, Clock, Eye, Heart } from "lucide-react"
import Link from "next/link";
import Image from "next/image"
import { useEffect, useState } from "react";
import { MovieGridSkeleton } from "./skeletons/movie-grid-skeleton";
import { Movie } from "@/type/movie-details.types";



export function MovieGrid() {
  const [moviesCard, setMoviesCard] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          const res = await fetch("api/phim-moi-cap-nhat");
          const data = await res.json();
          console.log(data);
          if (data && data.items) {
            // Only take first 24 movies
            setMoviesCard(data.items.slice(0,24));
          }
        } catch (error) {
          console.error("Error fetching movies:", error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovies();
    }, []);

  if (isLoading) {
    return <MovieGridSkeleton />;
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4 sm:mb-6">
            Phim Mới Cập Nhật
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            Khám phá những bộ phim mới nhất với chất lượng HD và 4K, được cập nhật liên tục mỗi ngày
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-4 sm:mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 hover:cursor-pointer">
          {moviesCard.map((movie) => (
            <div
              key={movie._id}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden hover:from-slate-700/50 hover:to-slate-800/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10 border border-slate-700/30 hover:border-yellow-400/30"
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                <Link href={`/details/${movie.slug}`} >
                  <Image
                    src={movie.poster_url}
                    fill
                    alt={movie.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </Link>

                <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg">
                  <Eye className="w-3 h-3" />
                  <span>{Math.floor(Math.random() * 10000) + 1000}</span>
                </div>

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  
                </div>

                <button className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500/80">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-white font-bold text-lg sm:text-xl mb-3 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                  {movie.name}
                </h3>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-400 mb-4 gap-2 sm:gap-0">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="bg-slate-700/50 px-2 py-1 rounded text-xs sm:text-sm">{movie.year}</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">{movie.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 font-bold text-xs sm:text-sm">
                      {movie.tmdb?.vote_average ? movie.tmdb.vote_average.toFixed(1) : "0"}
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{movie.content || movie.origin_name || "Một bộ phim hấp dẫn với nội dung thú vị và diễn xuất tuyệt vời."}</p>

                {movie.category && movie.category.length > 0 && (
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {movie.category.slice(0, 2).map((category: { id: string; name: string; slug: string }) => (
                      <span
                        key={category.id}  
                        className="bg-slate-900/70 backdrop-blur-sm text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs font-medium border border-slate-700/40 hover:bg-slate-800/70 hover:border-yellow-400/30 hover:text-yellow-300 transition-all duration-300 cursor-pointer"
                      >
                        {category.name}
                      </span>
                    ))}
                    {movie.category.length > 2 && (
                      <span className="bg-slate-900/70 backdrop-blur-sm text-gray-400 px-2 sm:px-3 py-1 rounded-full text-xs font-medium border border-slate-700/40">
                        +{movie.category.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
