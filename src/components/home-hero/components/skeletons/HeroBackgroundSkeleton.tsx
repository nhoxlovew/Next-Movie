"use client"

import React from "react"

const HeroBackgroundSkeleton = () => (
  <div className="absolute inset-0 w-full h-full">
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
  </div>
)

export default HeroBackgroundSkeleton

