"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { EpisodeListSkeleton } from "./skeletons/episode-list-skeleton"

interface Episode {
  number: number
  duration: string
  
}

interface EpisodeListProps {
  episodes: Episode[]
  isLoading?: boolean
  selectedEpisode?: number
  setSelectedEpisode?: (episode: number) => void
}

export function EpisodeList({
  episodes,
  isLoading = false,
  selectedEpisode: externalSelectedEpisode,
  setSelectedEpisode: externalSetSelectedEpisode
}: EpisodeListProps) {
  const [internalSelectedEpisode, setInternalSelectedEpisode] = useState(1)

  // Use external state if provided, otherwise use internal state
  const selectedEpisode = externalSelectedEpisode ?? internalSelectedEpisode
  const setSelectedEpisode = externalSetSelectedEpisode ?? setInternalSelectedEpisode

  if (isLoading) {
    return <EpisodeListSkeleton />
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Danh sách tập phim</h2>
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black">
          {episodes.length} tập
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {episodes.map((episode) => (
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

            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
