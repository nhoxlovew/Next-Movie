"use client"

import { useEffect, useMemo, useState } from "react"
import type { ApiGenreResponse } from "@/type/genre-page.types"
import { GenreGrid } from "@/components/gerne/genre-grid"
import { GenrePagination } from "@/components/gerne/genre-pagination"
import { GenreGridSkeleton } from "@/components/gerne/skeletons/genre-grid-skeleton"
import GenreHero from "@/components/gerne/genre-hero"

export default function YearPage({ params }: { params: Promise<{ year: string }> }) {
  const [year, setYear] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [data, setData] = useState<ApiGenreResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => { const p = await params; setYear(parseInt(p.year)) })()
  }, [params])

  useEffect(() => {
    if (!year) return
    setLoading(true)
    setError(null)

    const url = `/api/nam/${year}?page=${page}`
    fetch(url)
      .then(r => { if (!r.ok) throw new Error(`Fetch failed ${r.status}`); return r.json() })
      .then((d: ApiGenreResponse) => setData(d))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Lỗi tải dữ liệu"))
      .finally(() => setLoading(false))
  }, [year, page])

  const items = useMemo(() => data?.data?.items ?? [], [data])
  const title = data?.data?.titlePage
  const pagination = data?.data?.params?.pagination
  const cdnBase = (data?.data?.APP_DOMAIN_CDN_IMAGE || "").replace(/\/$/, "")

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <GenreHero title={title || ''} descriptionHead={title || ''} isLoading={loading} />

      {loading && <div className="text-gray-400"><GenreGridSkeleton /></div>}
      {error && <div className="text-red-400">{error}</div>}

      {!loading && !error && (
        <>
          <GenreGrid items={items} cdnBase={cdnBase} title={title || ''} isLoading={loading} />
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

