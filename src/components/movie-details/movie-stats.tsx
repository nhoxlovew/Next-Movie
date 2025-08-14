"use client"

import { Badge } from "@/components/ui/badge"
import { Star, Calendar, Clock, Eye } from "lucide-react"

interface MovieStatsProps {
  rating: number
  year: string
  duration: string
  views: string
}

export function MovieStats({ rating, year, duration, views }: MovieStatsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold px-3 py-1">
        <Star className="w-4 h-4 mr-1" />
        IMDb {rating}
      </Badge>
      <Badge variant="outline" className="border-white/20 text-white backdrop-blur-sm bg-white/10">
        <Calendar className="w-4 h-4 mr-1" />
        {year}
      </Badge>
      <Badge variant="outline" className="border-white/20 text-white backdrop-blur-sm bg-white/10">
        <Clock className="w-4 h-4 mr-1" />
        {duration}
      </Badge>
      <Badge variant="outline" className="border-white/20 text-white backdrop-blur-sm bg-white/10">
        <Eye className="w-4 h-4 mr-1" />
        {views} lượt xem
      </Badge>
    </div>
  )
}
