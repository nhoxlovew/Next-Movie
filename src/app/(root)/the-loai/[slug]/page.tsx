"use client"

import { useEffect, useMemo, useState } from "react"
import type { ApiGenreResponse } from "@/type/genre-page.types"
import { GenreGrid } from "@/components/gerne/genre-grid"
import { GenrePagination } from "@/components/gerne/genre-pagination"
import { GenreGridSkeleton } from "@/components/gerne/skeletons/genre-grid-skeleton"
import GenreHero from "@/components/gerne/genre-hero"

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

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <GenreHero title={title || ''} descriptionHead={title || ''} />
    
      {loading && <div className="text-gray-400"><GenreGridSkeleton/></div>}
      {error && <div className="text-red-400">{error}</div>}

      {!loading && !error && (
        <>
          <GenreGrid 
            items={items} 
            cdnBase={cdnBase} 
            title={title || ''} 
            isLoading={loading}
          />

          {!!pagination && (
            <GenrePagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </section>
  )
}

