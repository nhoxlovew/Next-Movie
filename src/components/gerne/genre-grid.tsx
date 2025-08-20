"use client"

import Link from "next/link"
import Image from "next/image"
import { MovieItem } from "@/type/genre-page.types"

import { GenreGridSkeleton } from "./skeletons/genre-grid-skeleton"
import { Heart } from "lucide-react"
import { memo, useCallback, useMemo } from "react"

interface GenreGridProps {
  items: MovieItem[] | null | undefined;
  cdnBase: string;
  title: string;
  isLoading?: boolean;
}

export const GenreGrid = memo(function GenreGrid({ items, cdnBase, title, isLoading = false }: GenreGridProps) {
  const resolveImageUrl = useCallback((m: MovieItem): string => {
    const raw = (m.poster_url || m.thumb_url || "").toString();
    if (raw.startsWith("http")) return raw;
    if (raw && cdnBase) {
      const path = raw.startsWith("/") ? raw : `/${raw}`;
      return `${cdnBase}${path}`;
    }
    return "";
  }, [cdnBase]);

  const prepared = useMemo(() => (items ?? []).map((m) => ({
    ...m,
    imageUrl: resolveImageUrl(m),
  })), [items, resolveImageUrl]);

  if (isLoading) {
    return <GenreGridSkeleton />
  }

  if (!prepared || prepared.length === 0) {
    return (
      <p className="text-gray-400">Không có dữ liệu.</p>
    )
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {title ? (
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-green-400 bg-clip-text mb-4 sm:mb-6">
              {title}
            </h2>
          </div>
        ) : null}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {prepared.map((m) => (
            <Link
              key={m._id}
              href={`/phim/${m.slug}`}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden hover:from-slate-700/50 hover:to-slate-800/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10 border border-green-700/30 hover:border-green-400/30 block cursor-pointer"
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                  src={m.imageUrl}
                  fill
                  alt={m.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {m.quality ? (
                    <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-1 rounded-md border border-white/10">
                      {m.quality}
                    </span>
                  ) : null}
                  {m.episode_current ? (
                    <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-1 rounded-md border border-white/10">
                      {m.episode_current}
                    </span>
                  ) : null}
                </div>

                <button
                  className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500/80 z-10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 sm:p-4 md:p-6">
                <h3 className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                  {m.name}
                </h3>

                <div className="flex flex-wrap items-center text-[10px] sm:text-xs md:text-sm text-gray-400 gap-1.5 sm:gap-2">
                  {m.year && <span className="bg-slate-700/50 px-1.5 sm:px-2 py-0.5 rounded">{m.year}</span>}
                  {m.episode_current && <span className="bg-slate-700/50 px-1.5 sm:px-2 py-0.5 rounded">{m.episode_current}</span>}
                  {m.quality && <span className="bg-slate-700/50 px-1.5 sm:px-2 py-0.5 rounded">{m.quality}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
});
