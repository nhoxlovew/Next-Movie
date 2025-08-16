"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { MovieItem } from "@/type/movie-list.types"

interface ApiGenreResponse {
  status: boolean | string
  msg: string
  data: {
    titlePage: string
    items: MovieItem[]
    params: { pagination: { currentPage: number; totalPages: number } }
    APP_DOMAIN_CDN_IMAGE?: string
  }
}

export default function GenrePage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>("")
  const [page, setPage] = useState(1)
  const [data, setData] = useState<ApiGenreResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Optional: read filters from URL later with useSearchParams

  useEffect(() => {
    (async () => { const p = await params; setSlug(p.slug) })()
  }, [params])

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(null)

    const url = `/api/the-loai/${slug}?page=${page}`
    console.log("[PAGE] fetching:", url)

    fetch(url)
      .then(r => { if (!r.ok) throw new Error(`Fetch failed ${r.status}`) ; return r.json() })
      .then((d: ApiGenreResponse) => { console.log("[PAGE] data:", d); setData(d) })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((e: any) => { console.error("[PAGE] error:", e); setError(e?.message || "Lỗi tải dữ liệu") })
      .finally(() => setLoading(false))
  }, [slug, page])

  const items = useMemo(() => data?.data?.items ?? [], [data])
  const title = data?.data?.titlePage
  const pagination = data?.data?.params?.pagination
  const cdnBase = (data?.data?.APP_DOMAIN_CDN_IMAGE || "").replace(/\/$/, "")

  const resolveImageUrl = (m: MovieItem): string => {
    const raw = (m.poster_url || (m as unknown as { thumb_url?: string })?.thumb_url || "").toString()
    if (raw.startsWith("http")) return raw
    if (raw && cdnBase) {
      const path = raw.startsWith("/") ? raw : `/${raw}`
      return `${cdnBase}${path}`
    }
    return "/placeholder.svg?height=600&width=400"
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      

      {loading && <div className="text-gray-400">Đang tải...</div>}
      {error && <div className="text-red-400">{error}</div>}

      {!loading && !error && (
        <div><h1 className="text-2xl sm:text-3xl font-bold mb-6">Thể loại: {title}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map((m) => (
            <Link key={m._id} href={`/phim/${m.slug}`} className="group block">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-slate-900/50">
                <Image src={resolveImageUrl(m)} alt={m.name} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="mt-2">
                <h3 className="text-sm line-clamp-2 group-hover:text-yellow-400 transition-colors">{m.name}</h3>
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
      )}

      {/* Simple pagination */}
      {!!pagination && (
        <div className="flex items-center gap-2 mt-6">
          <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded bg-slate-800 disabled:opacity-50">Trang trước</button>
          <span className="text-gray-400 text-sm">Trang {pagination.currentPage}/{pagination.totalPages}</span>
          <button disabled={page >= pagination.totalPages} onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))} className="px-3 py-1 rounded bg-slate-800 disabled:opacity-50">Trang sau</button>
        </div>
      )}
    </section>
  )
}

