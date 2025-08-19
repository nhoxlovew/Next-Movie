"use client"

import Link from "next/link"
import Image from "next/image"
import { MovieItem } from "@/type/genre-page.types"

import { GenreGridSkeleton } from "./skeletons/genre-grid-skeleton"

interface GenreGridProps {
  items: MovieItem[] | null | undefined;
  cdnBase: string;
  title: string;
  isLoading?: boolean;
}

export function GenreGrid({ items, cdnBase, title, isLoading = false }: GenreGridProps) {
  const resolveImageUrl = (m: MovieItem): string => {
    const raw = (m.poster_url || m.thumb_url || "").toString();
    if (raw.startsWith("http")) return raw;
    if (raw && cdnBase) {
      const path = raw.startsWith("/") ? raw : `/${raw}`;
      return `${cdnBase}${path}`;
    }
    return "/placeholder.svg?height=600&width=400";
  };

  if (isLoading) {
    return <GenreGridSkeleton />
  }

  if (!items || items.length === 0) {
    return (
        <p className="text-gray-400">Không có dữ liệu.</p>
    )
  }

  return (
    <div className="mt-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map((m) => (
          <Link key={m._id} href={`/phim/${m.slug}`} className="group block">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-slate-900/50">
              <Image
                src={resolveImageUrl(m)}
                alt={m.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="mt-2">
              <h3 className="text-sm line-clamp-2 group-hover:text-yellow-400 transition-colors">
                {m.name}
              </h3>
              <div className="text-xs text-gray-400 flex gap-2 mt-1">
                <span>{m.year}</span>
                <span>{m.episode_current}</span>
                <span>{m.quality}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
