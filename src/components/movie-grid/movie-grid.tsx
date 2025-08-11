import { Star, Play, Clock, Eye, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const movies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    year: "2024",
    rating: 8.9,
    duration: "181 phút",
    genre: "Hành Động, Khoa Học Viễn Tưởng",
    quality: "4K",
    subtitle: "Vietsub",
    views: "2.5M",
    trending: true,
  },
  {
    id: 2,
    title: "Spider-Man: No Way Home",
    year: "2024",
    rating: 8.7,
    duration: "148 phút",
    genre: "Hành Động, Phiêu Lưu",
    quality: "4K",
    subtitle: "Vietsub",
    views: "3.1M",
    trending: true,
  },
  {
    id: 3,
    title: "The Batman",
    year: "2024",
    rating: 8.5,
    duration: "176 phút",
    genre: "Hành Động, Tội Phạm",
    quality: "HD",
    subtitle: "Vietsub",
    views: "1.8M",
    trending: false,
  },
  {
    id: 4,
    title: "Top Gun: Maverick",
    year: "2024",
    rating: 8.8,
    duration: "130 phút",
    genre: "Hành Động, Drama",
    quality: "4K",
    subtitle: "Vietsub",
    views: "2.2M",
    trending: true,
  },
  {
    id: 5,
    title: "Black Panther",
    year: "2024",
    rating: 8.6,
    duration: "161 phút",
    genre: "Hành Động, Khoa Học Viễn Tưởng",
    quality: "HD",
    subtitle: "Vietsub",
    views: "1.9M",
    trending: false,
  },
  {
    id: 6,
    title: "Dune",
    year: "2024",
    rating: 8.4,
    duration: "155 phút",
    genre: "Khoa Học Viễn Tưởng, Drama",
    quality: "4K",
    subtitle: "Vietsub",
    views: "1.6M",
    trending: false,
  },
]

export function MovieGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6">
            Phim Mới Cập Nhật
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Khám phá những bộ phim mới nhất với chất lượng HD và 4K, được cập nhật liên tục mỗi ngày
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden hover:from-slate-700/50 hover:to-slate-800/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10 border border-slate-700/30 hover:border-yellow-400/30"
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={`/placeholder.svg?height=450&width=300&query=${movie.title} movie poster`}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  <span
                    className={`${movie.quality === "4K" ? "bg-gradient-to-r from-red-500 to-red-600" : "bg-gradient-to-r from-blue-500 to-blue-600"} text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm`}
                  >
                    {movie.quality}
                  </span>
                  <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm">
                    {movie.subtitle}
                  </span>
                  {movie.trending && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm">
                      HOT
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg">
                  <Eye className="w-3 h-3" />
                  <span>{movie.views}</span>
                </div>

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-black font-bold rounded-full w-16 h-16 shadow-2xl"
                    >
                      <Play className="w-8 h-8 fill-current" />
                    </Button>
                  </div>
                </div>

                <button className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500/80">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-3 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                  {movie.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="bg-slate-700/50 px-2 py-1 rounded">{movie.year}</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{movie.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 font-bold">{movie.rating}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-5 line-clamp-2">{movie.genre}</p>

                <Button className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-black font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <Play className="w-4 h-4 mr-2 fill-current" />
                  Xem Phim
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-yellow-400/50 text-yellow-400 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-black hover:border-transparent px-12 py-4 bg-transparent backdrop-blur-sm rounded-2xl font-bold transition-all duration-300 transform hover:scale-105"
          >
            Xem Thêm Phim
          </Button>
        </div>
      </div>
    </section>
  )
}
