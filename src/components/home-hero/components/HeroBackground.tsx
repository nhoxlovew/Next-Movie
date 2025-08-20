"use client"

import Image from "next/image"
import React, { memo } from "react"

interface HeroBackgroundProps {
  src: string
  alt: string
  priority?: boolean
  sizes?: string
  quality?: number
}

const HeroBackground = memo(function HeroBackground({ src, alt, priority, sizes = "100vw", quality = 70 }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        quality={quality}
        sizes={sizes}
        className="w-full h-full object-cover object-center will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
    </div>
  )
})

export default HeroBackground

