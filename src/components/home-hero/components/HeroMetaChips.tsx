"use client"

import { Star } from "lucide-react"
import React, { memo } from "react"

interface HeroMetaChipsProps {
  rating?: number
  quality?: string
  type?: string
  year?: number | string
  time?: string
}

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-slate-800/80 backdrop-blur-xl text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-600/30 shadow-lg">
    {children}
  </span>
)

const HeroMetaChips = memo(function HeroMetaChips({ rating, quality, type, year, time }: HeroMetaChipsProps) {
  return (
    <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
      <div className="flex items-center space-x-1 sm:space-x-2 bg-green-400/60 text-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xl">
        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current bg text-yellow-500" />
        <span className="text-xs font-medium hidden sm:inline">IMDb</span>
        <span className="text-sm sm:text-lg">{rating?.toFixed ? rating.toFixed(1) : rating ?? ""}</span>
      </div>
      {quality && <Chip>{quality}</Chip>}
      {type && <Chip>{type}</Chip>}
      {year !== undefined && <Chip>{year}</Chip>}
      {time && <Chip>{time}</Chip>}
    </div>
  )
})

export default HeroMetaChips

