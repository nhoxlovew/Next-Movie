"use client"

import { Film } from 'lucide-react'
import React from 'react'
import GenreHeroSkeleton from './skeletons/genre-hero-skeleton';

interface GenreHeroProps {
  title: string;
  descriptionHead: string;
  isLoading?: boolean;
}
 


const GenreHero = ({title, descriptionHead,isLoading = false}: GenreHeroProps,) => {

  if (isLoading) {
    return  <GenreHeroSkeleton />
  }
  return (
   <div className="relative overflow-hidden rounded-4xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10"></div>
        {/* Rely on parent section for width; avoid double max-width constraints */}
        <div className="relative py-16">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10">
              <Film className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300">Thể loại phim</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-purple-200 bg-clip-text ">
              {title}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Khám phá bộ sưu tập phim {descriptionHead.toLowerCase()} đặc sắc với chất lượng cao và nội dung hấp dẫn
            </p>
          </div>
        </div>
      </div>
  )
}

export default GenreHero