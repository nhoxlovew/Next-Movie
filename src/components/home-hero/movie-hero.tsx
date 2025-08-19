"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Heart, Info, Star} from "lucide-react"


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { Movie } from "@/type/movie-details.types"
import Link from "next/link"



export function MovieHero() {
  const [heroMovies, setHeroMovies] = useState<Movie[]>([]);
  const [api, setApi] = useState<CarouselApi>()
  useEffect(() => {
    if (!api) {
      return
    }
    api.on("select", () => {
      /* no-op: can be used to track current slide */
    })
  }, [api])

    useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("api/phim-moi-cap-nhat");
        const data = await res.json();
        console.log(data);
        if (data && data.items) {  
          // Only take first 5 movies
          setHeroMovies(data.items.slice(0, 10));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
  }, []);


  return (
    <section className="relative w-full h-screen min-h-screen overflow-hidden bg-black">
      <Carousel
        setApi={setApi}
        className="w-full h-full overflow-hidden"
        plugins={[
          Autoplay({
            delay: 6000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="w-full h-full -ml-0 ">
          {heroMovies.map((movie) => (
            <CarouselItem key={movie._id} className="w-full h-full pl-0 ">
              <div className="relative w-full h-full min-h-screen overflow-hidden">
                <div className="absolute inset-0 w-full h-full"> 
                  <Image
                    src={movie.thumb_url}
                    alt={movie.name}
                    fill
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                </div>

                <div className="relative z-10 w-full h-full min-h-screen flex items-center overflow-hidden">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
                    <div className="flex items-center justify-between w-full max-w-full overflow-hidden">
                     
                      <div className="w-full max-w-4xl overflow-hidden">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8">
                          <div className="flex-1 min-w-0">
                            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold  font-serif mb-2  leading-tight">
                              {movie.name}
                            </h1>
                            <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl font-light">{movie.origin_name}</p>
                          </div>
                        </div>

                        <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                          <div className="flex items-center space-x-1 sm:space-x-2 bg-green-400/60 text-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xl">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current bg text-yellow-500 " />
                            <span className="text-xs font-medium hidden sm:inline">IMDb</span>
                            <span className="text-sm sm:text-lg">{movie.tmdb?.vote_average?.toFixed(1)||""}</span>
                          </div>
                          <span className="bg-slate-800/80 backdrop-blur-xl text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-600/30 shadow-lg">
                            {movie.quality}
                          </span>
                          <span className="bg-slate-800/80 backdrop-blur-xl text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-600/30 shadow-lg">
                            {movie.type}
                          </span>
                          <span className="bg-slate-800/80 backdrop-blur-xl text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-600/30 shadow-lg">
                            {movie.year}
                          </span>
                          <span className="bg-slate-800/80 backdrop-blur-xl text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-600/30 shadow-lg">
                            {movie.time}
                          </span>
                        </div>

                        {movie.category && movie.category.length > 0 && (
                          <div className="flex flex-wrap gap-3 mb-8">
                            {movie.category.map((genre) => (
                              <span
                                key={genre.id}
                                className="bg-slate-900/70 backdrop-blur-sm text-gray-200 px-5 py-2.5 rounded-full text-sm font-medium border border-slate-700/40 hover:bg-slate-800/70 hover:border-green-400/30 hover:text-green-300 transition-all duration-300 cursor-pointer"
                              >
                                {genre.name}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-10 max-w-2xl font-light">
                          {movie.content || movie.origin_name || "Một bộ phim hấp dẫn với nội dung thú vị và diễn xuất tuyệt vời."}
                        </p>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
                          <Link href={`/phim/${movie.slug}`} >
                          
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-green-400 via-green-500 to-green-500/50 hover:from-green-500/50 hover:via-green-600 hover:to-green-600 text-black font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-yellow-500/25 w-full sm:w-auto"
                          >
                            <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 fill-current" />
                            Xem Phim
                          </Button>
                          </Link> 
                          <div className="flex gap-3 sm:gap-5">
                            <Button
                              variant="outline"
                              size="lg"
                              className="border-2 border-gray-500/50 text-white hover:bg-white/10 hover:border-yellow-400/50 rounded-2xl px-4 sm:px-8 py-3 sm:py-4 bg-black/20 backdrop-blur-sm transition-all duration-300 flex-1 sm:flex-none"
                            >
                              <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Yêu Thích</span>
                              <span className="sm:hidden">Thích</span>
                            </Button>
                            
                            <Link href={`/phim/${movie.slug}`} >
                            <Button
                              variant="outline"
                              size="lg"
                              className="border-2 border-gray-500/50 text-white hover:bg-white/10 hover:border-yellow-400/50 rounded-2xl px-8 py-4 bg-black/20 backdrop-blur-sm transition-all duration-300"
                            >
                              <Info className="w-5 h-5 mr-2" />
                              Chi Tiết
                            </Button>
                          </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white border border-white/10 hover:border-yellow-400/50 w-10 h-10 sm:w-14 sm:h-14" />
        <CarouselNext className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white border border-white/10 hover:border-yellow-400/50 w-10 h-10 sm:w-14 sm:h-14" /> */}
      </Carousel>
    </section>
  )
}
