"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Play, Heart, Share2, Star, Calendar, Clock, Eye } from "lucide-react"
import Image from "next/image"

interface MovieDetailsProps {
  movieId: string
}

export function MovieDetails({ movieId }: MovieDetailsProps) {
  const [selectedEpisode, setSelectedEpisode] = useState(1)
  const [comment, setComment] = useState("")

  // Mock data - in real app this would come from API
  const movie = {
    title: "Thử Thách Thần Tượng",
    originalTitle: "Challenge Idol",
    year: "2024",
    duration: "45 phút/tập",
    rating: 8.5,
    views: "1.2M",
    genres: ["Thực Tế", "Giải Trí", "Âm Nhạc", "Thi Đấu"],
    description:
      "Thử Thách Thần Tượng là chương trình thực tế âm nhạc đầy kịch tính, nơi các thí sinh tài năng từ khắp nơi quy tụ để tranh tài và chứng minh khả năng của mình. Với những thử thách đa dạng từ hát, nhảy đến diễn xuất, chương trình hứa hẹn mang đến những màn trình diễn spectacular và cảm xúc.",
    poster: "/placeholder.svg?height=600&width=400",
    backdrop: "/placeholder.svg?height=800&width=1400",
    episodes: Array.from({ length: 24 }, (_, i) => ({
      number: i + 1,
      title: `Tập ${i + 1}`,
      duration: "45:30",
      views: Math.floor(Math.random() * 500000) + 100000,
    })),
    cast: [
      { name: "Lee Min Ho", role: "MC chính", avatar: "/placeholder.svg?height=80&width=80" },
      { name: "Park Shin Hye", role: "Giám khảo", avatar: "/placeholder.svg?height=80&width=80" },
      { name: "Kim Soo Hyun", role: "Mentor", avatar: "/placeholder.svg?height=80&width=80" },
      { name: "Song Hye Kyo", role: "Giám khảo", avatar: "/placeholder.svg?height=80&width=80" },
      { name: "Jung Hae In", role: "Mentor", avatar: "/placeholder.svg?height=80&width=80" },
      { name: "IU", role: "Khách mời", avatar: "/placeholder.svg?height=80&width=80" },
      { name: "BTS RM", role: "Khách mời", avatar: "/placeholder.svg?height=80&width=80" },
      { name: "BLACKPINK Lisa", role: "Khách mời", avatar: "/placeholder.svg?height=80&width=80" },
    ],
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
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
                fill
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
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold px-3 py-1">
                  <Star className="w-4 h-4 mr-1" />
                  IMDb {movie.rating}
                </Badge>
                <Badge variant="outline" className="border-white/20 text-white backdrop-blur-sm bg-white/10">
                  <Calendar className="w-4 h-4 mr-1" />
                  {movie.year}
                </Badge>
                <Badge variant="outline" className="border-white/20 text-white backdrop-blur-sm bg-white/10">
                  <Clock className="w-4 h-4 mr-1" />
                  {movie.duration}
                </Badge>
                <Badge variant="outline" className="border-white/20 text-white backdrop-blur-sm bg-white/10">
                  <Eye className="w-4 h-4 mr-1" />
                  {movie.views} lượt xem
                </Badge>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>

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

      {/* Episodes Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Danh sách tập phim</h2>
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black">
            {movie.episodes.length} tập
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {movie.episodes.map((episode) => (
            <Card
              key={episode.number}
              className={`p-4 cursor-pointer transition-all duration-300 border ${
                selectedEpisode === episode.number
                  ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50"
                  : "bg-gray-900/50 border-gray-700 hover:bg-gray-800/50 hover:border-gray-600"
              }`}
              onClick={() => setSelectedEpisode(episode.number)}
            >
              <div className="text-center">
                <div className="text-lg font-bold mb-1">Tập {episode.number}</div>
                <div className="text-sm text-gray-400">{episode.duration}</div>
                <div className="text-xs text-gray-500 mt-1">{episode.views.toLocaleString()} lượt xem</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Cast Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Diễn viên</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {movie.cast.map((actor, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <Avatar className="w-20 h-20 mx-auto mb-3 ring-2 ring-transparent group-hover:ring-yellow-500/50 transition-all">
                <AvatarImage src={actor.avatar || "/placeholder.svg"} alt={actor.name} />
                <AvatarFallback>
                  {actor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h4 className="font-semibold text-sm mb-1 group-hover:text-yellow-400 transition-colors">{actor.name}</h4>
              <p className="text-xs text-gray-400">{actor.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Bình luận</h2>

        {/* Comment Form */}
        <Card className="bg-gray-900/50 border-gray-700 p-6 mb-8">
          <div className="space-y-4">
            <Textarea
              placeholder="Viết bình luận của bạn..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black">
                Gửi bình luận
              </Button>
            </div>
          </div>
        </Card>

        {/* Sample Comments */}
        <div className="space-y-6">
          {[
            {
              user: "Nguyễn Văn A",
              time: "2 giờ trước",
              content: "Phim hay quá! Diễn viên diễn xuất rất tự nhiên và cảm xúc.",
            },
            {
              user: "Trần Thị B",
              time: "5 giờ trước",
              content: "Cốt truyện hấp dẫn, không thể rời mắt khỏi màn hình. Đang chờ tập tiếp theo!",
            },
            {
              user: "Lê Minh C",
              time: "1 ngày trước",
              content: "Chất lượng hình ảnh và âm thanh tuyệt vời. Cảm ơn RoPhim đã có phim hay như vậy.",
            },
          ].map((comment, index) => (
            <Card key={index} className="bg-gray-900/30 border-gray-700 p-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{comment.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{comment.user}</span>
                    <span className="text-sm text-gray-400">{comment.time}</span>
                  </div>
                  <p className="text-gray-300">{comment.content}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
