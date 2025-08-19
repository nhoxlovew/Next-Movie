import { NextResponse } from "next/server"

// Prefer Edge for lower cold start and faster networking
export const runtime = "edge"
// Default revalidation window for fetch in this route (in seconds)
export const revalidate = 300

// Lightweight in-memory cache (best-effort). Persists per runtime instance.
// Useful locally and can help in Edge isolates between requests.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = (globalThis as any).__genreCache || new Map<string, { data: unknown; exp: number }>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).__genreCache = cache

// GET /api/the-loai/[slug]?page=1
// Proxies PhimAPI: https://phimapi.com/v1/api/danh-sach/the-loai/{slug}?page={page}
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const url = new URL(request.url)
  const page = url.searchParams.get("page") || "1"

  try {
    // Collect and forward supported filters
    const original = new URL(request.url)
    const allowed = ["page", "sort_field", "sort_type", "sort_lang", "country", "year", "limit"]
    const forwarded = new URLSearchParams()
    for (const key of allowed) {
      const val = original.searchParams.get(key)
      if (val !== null && val !== "") forwarded.set(key, val)
    }
    if (!forwarded.has("page")) forwarded.set("page", page)
    // Reasonable default to keep payloads small unless overridden by client
    if (!forwarded.has("limit")) forwarded.set("limit", "24")

    const qs = forwarded.toString()
    const apiUrl = `https://phimapi.com/v1/api/the-loai/${slug}?${qs}`
    const cacheKey = `${slug}?${qs}`

    // Return from memory cache when fresh
    const now = Date.now()
    const hit = cache.get(cacheKey)
    if (hit && hit.exp > now) {
      return NextResponse.json(hit.data, {
        headers: {
          "X-Cache": "HIT",
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
          Vary: "Accept-Encoding",
        },
      })
    }

    console.log("[API] /api/the-loai/", { slug, params: qs, apiUrl })

    // Cache upstream response for revalidate seconds; Next will serve from cache and revalidate in background
    const res = await fetch(apiUrl, {
      cache: "force-cache",
      next: { revalidate, tags: ["genre", slug] },
      headers: { accept: "application/json" },
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      console.error("[API] upstream error body:", text)
      return NextResponse.json({ error: "Failed", status: res.status, body: text }, { status: res.status })
    }

    const data = await res.json()
    // populate memory cache
    cache.set(cacheKey, { data, exp: now + revalidate * 1000 })

    return NextResponse.json(data, {
      headers: {
        // Cache on CDN/proxy and allow stale while revalidating
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
        Vary: "Accept-Encoding",
        "X-Cache": "MISS",
      },
    })
  } catch (e) {
    console.error("[API] proxy error:", e)
    return NextResponse.json({ error: "Proxy error" }, { status: 500 })
  }
}
