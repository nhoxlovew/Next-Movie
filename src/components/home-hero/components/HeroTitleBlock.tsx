"use client"

import React, { memo } from "react"

interface HeroTitleBlockProps {
  title: string
  subtitle?: string
  description?: string
}

const HeroTitleBlock = memo(function HeroTitleBlock({ title, subtitle, description }: HeroTitleBlockProps) {
  return (
    <div className="w-full max-w-4xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold font-serif mb-2 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl font-light">{subtitle}</p>
          )}
        </div>
      </div>

      {description && (
        <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-10 max-w-2xl font-light">
          {description}
        </p>
      )}
    </div>
  )
})

export default HeroTitleBlock

