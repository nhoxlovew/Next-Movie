import React from 'react'
import { MovieHero } from '@/components/home-hero/movie-hero'
import { MovieGrid } from '@/components/movie-grid/movie-grid'
import { Footer } from '@/components/footer/footer'

const page = () => {
  return (
    <>
      <MovieHero />
      <MovieGrid />
      <Footer />
    </>
  )
}

export default page