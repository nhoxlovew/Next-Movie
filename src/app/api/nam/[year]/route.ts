import { NextResponse } from "next/server"

export const runtime = "edge"
export const revalidate = 300

// Lightweight in-memory cache per runtime instance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = (globalThis as any).__yearCache || new Map<string, { data: unknown; exp: number }>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).__yearCache = cache

// GET /api/nam/[year]?page=1&...filters
export async function GET(request: Request, { params }: { params: { year: string } }) {
  const { year } = await Promise.resolve(params)
  const original = new URL(request.url)

  const allowed = ["page", "sort_field", "sort_type", "sort_lang", "category", "country", "limit"]
  const forwarded = new URLSearchParams()
  for (const key of allowed) {
    const val = original.searchParams.get(key)
    if (val !== null && val !== "") forwarded.set(key, val)
  }
  if (!forwarded.has("page")) forwarded.set("page", "1")
  if (!forwarded.has("limit")) forwarded.set("limit", "24")

  const qs = forwarded.toString()
  const apiUrl = `https://phimapi.com/v1/api/nam/${year}?${qs}`
  const cacheKey = `${year}?${qs}`

  const now = Date.now()
  const hit = cache.get(cacheKey)
  if (hit && hit.exp > now) {
    return NextResponse.json(hit.data, {
      headers: {
        "X-Cache": "HIT",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
      },
    })
  }

  try {
    const res = await fetch(apiUrl, { cache: "force-cache", next: { revalidate }, headers: { accept: "application/json" } })
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      return NextResponse.json({ error: "Failed", status: res.status, body: text }, { status: res.status })
    }
    const data = await res.json()
    cache.set(cacheKey, { data, exp: now + revalidate * 1000 })
    return NextResponse.json(data, {
      headers: {
        "X-Cache": "MISS",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
      },
    })
  } catch (e) {
    return NextResponse.json({ error: "Proxy error" }, { status: 500 })
  }
}

