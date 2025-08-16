"use client"
import { CastCrewSkeleton } from "./skeletons/cast-crew-skeleton"

interface CastMember {
  name: string
  role: string
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
          <div key={index} className="text-center group p-2 border-2  border-green-500/50 border-solid rounded-4xl cursor-pointer">
            <h4 className="font-semibold text-sm mb-1  group-hover:text-green-400 transition-colors">{actor.name}</h4>
            <p className="text-xs text-gray-400">{actor.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
