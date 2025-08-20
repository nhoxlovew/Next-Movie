"use client"

import React, { memo } from "react"
import { Button } from "@/components/ui/button"
import { Play, Heart, Info } from "lucide-react"
import Link from "next/link"

interface HeroActionsProps {
  slug: string
}

const HeroActions = memo(function HeroActions({ slug }: HeroActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
      <Link href={`/phim/${slug}`}>
        <Button
          size="lg"
          className="bg-gradient-to-r from-green-400 via-green-500 to-green-500/50 hover:from-green-500/50 hover:via-green-600 hover:to-green-600 text-black font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-yellow-500/25 w-full sm:w-auto"
        >
          <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 fill-current" />
          Xem Phim
        </Button>
      </Link>
      <div className="flex gap-3 sm:gap-5">
        <Button
          variant="outline"
          size="lg"
          className="border-2 border-gray-500/50 text-white hover:bg-white/10 hover:border-yellow-400/50 rounded-2xl px-4 sm:px-8 py-3 sm:py-4 bg-black/20 backdrop-blur-sm transition-all duration-300 flex-1 sm:flex-none"
        >
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Yêu Thích</span>
          <span className="sm:hidden">Thích</span>
        </Button>

        <Link href={`/phim/${slug}`}>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-gray-500/50 text-white hover:bg-white/10 hover:border-yellow-400/50 rounded-2xl px-8 py-4 bg-black/20 backdrop-blur-sm transition-all duration-300"
          >
            <Info className="w-5 h-5 mr-2" />
            Chi Tiết
          </Button>
        </Link>
      </div>
    </div>
  )
})

export default HeroActions

