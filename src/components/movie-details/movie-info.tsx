"use client"

import { Badge } from "@/components/ui/badge"

interface MovieInfoProps {
  genres: string[]
}

export function MovieInfo({ genres }: MovieInfoProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <Badge
          key={genre}
          variant="secondary"
          className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors"
        >
          {genre}
        </Badge>
      ))}
    </div>
  )
}
