"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Heart, Info, Star } from "lucide-react"


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { Movie } from "@/type/type"



export function MovieHero() {
  const [heroMovies, setHeroMovies] = useState<Movie[]>([]);
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

    useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("/api/phim-moi-cap-nhat?page=1");
        const data = await res.json();
        console.log(data.items);
        if (data && data.items) {
          // Only take first 3 movies
          setHeroMovies(data.items.slice(0, 5));
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
        className="w-full h-full"
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
        <CarouselContent className="w-full h-full -ml-0">
          {heroMovies.map((movie, index) => (
            <CarouselItem key={movie._id} className="w-full h-full pl-0">
              <div className="relative w-full h-full min-h-screen">
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

                <div className="relative z-10 w-full h-full min-h-screen flex items-center">
                  <div className="container mx-auto px-4 lg:px-8 w-full">
                    <div className="flex items-center justify-between w-full">
                      {/* Left Content */}
                      <div className="max-w-3xl animate-fade-in-up">
                        <div className="flex items-center space-x-6 mb-8">
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                            <Image
                              src={movie.thumb_url}
                              alt={movie.name}
                              fill
                              className="relative w-24 h-24 rounded-full border-3 border-yellow-400/50 shadow-2xl"
                            />
                          </div>
                          <div>
                            <h1 className="text-white text-4xl lg:text-6xl font-bold font-serif mb-2 tracking-tight">
                              {movie.name}
                            </h1>
                            <p className="text-gray-300 text-xl lg:text-2xl font-light">{movie.name}</p>
                          </div>
                        </div>

                        <div className="flex items-center flex-wrap gap-3 mb-8">
                          <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 via-yellow-400 to-orange-500 text-black px-4 py-2.5 rounded-xl text-sm font-bold shadow-xl">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-xs font-medium">IMDb</span>
                            <span className="text-lg">{movie.name}</span>
                          </div>
                          <span className="bg-slate-800/80 backdrop-blur-xl text-white px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-600/30 shadow-lg">
                            {movie.quality}
                          </span>
                          <span className="bg-slate-800/80 backdrop-blur-xl text-white px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-600/30 shadow-lg">
                            T16
                          </span>
                          <span className="bg-slate-800/80 backdrop-blur-xl text-white px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-600/30 shadow-lg">
                            {movie.year}
                          </span>
                          <span className="bg-slate-800/80 backdrop-blur-xl text-white px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-600/30 shadow-lg">
                            {movie.time}
                          </span>
                        </div>

                        {/* <div className="flex flex-wrap gap-3 mb-8">
                          {movie.genres.map((genre: string, genreIndex: number) => (
                            <span
                              key={genreIndex}
                              className="bg-slate-900/70 backdrop-blur-sm text-gray-200 px-5 py-2.5 rounded-full text-sm font-medium border border-slate-700/40 hover:bg-slate-800/70 hover:border-yellow-400/30 hover:text-yellow-300 transition-all duration-300 cursor-pointer"
                            >
                              {genre}
                            </span>
                          ))}
                        </div> */}

                        <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl font-light">
                          {movie.content}
                        </p>

                        <div className="flex items-center space-x-5">
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-black font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-yellow-500/25"
                          >
                            <Play className="w-6 h-6 mr-3 fill-current" />
                            Xem Phim
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-gray-500/50 text-white hover:bg-white/10 hover:border-yellow-400/50 rounded-2xl px-8 py-4 bg-black/20 backdrop-blur-sm transition-all duration-300"
                          >
                            <Heart className="w-5 h-5 mr-2" />
                            Yêu Thích
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-gray-500/50 text-white hover:bg-white/10 hover:border-yellow-400/50 rounded-2xl px-8 py-4 bg-black/20 backdrop-blur-sm transition-all duration-300"
                          >
                            <Info className="w-5 h-5 mr-2" />
                            Chi Tiết
                          </Button>
                        </div>
                      </div>

                      {/* Right Content - Related Movies */}
                      {/* <div className="hidden xl:block">
                        <div className="bg-black/20 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                          <h3 className="text-white text-lg font-semibold mb-4 text-center">Phim Liên Quan</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {relatedMovies.map((relatedMovie) => (
                              <div key={relatedMovie.id} className="relative group cursor-pointer">
                                <Image
                                  src={relatedMovie.image || "/placeholder.svg"}
                                  alt={relatedMovie.title}
                                  width={1920}
                                  height={1080}
                                  className="w-24 h-36 object-cover rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end">
                                  <p className="text-white text-xs font-medium p-2 truncate">{relatedMovie.title}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div> */}


                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white border border-white/10 hover:border-yellow-400/50 w-14 h-14" />
        <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white border border-white/10 hover:border-yellow-400/50 w-14 h-14" />
      </Carousel>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroMovies.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 border border-white/20 ${
              current === index
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 border-yellow-400"
                : "bg-white/30 hover:bg-white/50"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
