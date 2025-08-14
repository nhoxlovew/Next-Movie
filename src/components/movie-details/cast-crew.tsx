"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CastCrewSkeleton } from "./skeletons/cast-crew-skeleton"

interface CastMember {
  name: string
  role: string
  avatar?: string
}

interface CastCrewProps {
  cast: CastMember[]
  isLoading?: boolean
}

export function CastCrew({ cast, isLoading = false }: CastCrewProps) {
  if (isLoading) {
    return <CastCrewSkeleton />
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Diễn viên</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {cast.map((actor, index) => (
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
  )
}
