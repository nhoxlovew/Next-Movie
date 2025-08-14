"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { MovieCommentsSkeleton } from "./skeletons/movie-comments-skeleton"

interface Comment {
  user: string
  time: string
  content: string
}

interface MovieCommentsProps {
  isLoading?: boolean
}

export function MovieComments({ isLoading = false }: MovieCommentsProps) {
  const [comment, setComment] = useState("")

  if (isLoading) {
    return <MovieCommentsSkeleton />
  }

  const sampleComments: Comment[] = [
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
  ]

  return (
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

      {/* Comments List */}
      <div className="space-y-6">
        {sampleComments.map((comment, index) => (
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
  )
}
