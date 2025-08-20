"use client"

import { Film } from 'lucide-react'
import React from 'react'
import GenreHeroSkeleton from './skeletons/genre-hero-skeleton';

interface GenreHeroProps {
  title: string;
  descriptionHead: string;
  isLoading?: boolean;
}
 


const GenreHero = ({ title, descriptionHead, isLoading = false }: GenreHeroProps) => {
  if (isLoading) return <GenreHeroSkeleton />

  return (
    <div className="relative overflow-hidden rounded-3xl sm:rounded-4xl">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10">
            <Film className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            <span className="text-xs sm:text-sm text-green-300">Thể loại phim</span>
          </div>

          <h1 className="font-bold tracking-tight text-purple-200 break-words text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15]">
            {title}
          </h1>

          <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            Khám phá bộ sưu tập phim {descriptionHead.toLowerCase()} đặc sắc với chất lượng cao và nội dung hấp dẫn
          </p>
        </div>
      </div>
    </div>
  )
}

export default GenreHero