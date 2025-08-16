# `/the-loai/[slug]` Page — Code Explainer

This document explains the important parts of the genre page implementation, how data flows, and why certain guards exist.

## 1) Component outline
- Client component that renders a grid of movies for a specific genre `slug`.
- Fetches from our proxy endpoint `/api/the-loai/[slug]` with pagination.

```tsx
// src/app/(root)/the-loai/[slug]/page.tsx
export default function GenrePage({ params }: { params: Promise<{ slug: string }> }) { /* ... */ }
```

Why `params` is a Promise: this mirrors your existing phim page pattern, so we unwrap the slug in a `useEffect` once the component mounts.

## 2) State & params
- `slug`: resolved from params
- `page`: client-side pagination state
- `data`: response payload (typed via `ApiGenreResponse`)
- `loading` / `error`: UX states

```ts
const [slug, setSlug] = useState("")
const [page, setPage] = useState(1)
const [data, setData] = useState<ApiGenreResponse | null>(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
```

## 3) Fetching data
- We construct a relative URL to our proxy `/api/the-loai/${slug}?page=${page}`.
- On success, store the result in `data`.
- On error, store a friendly error message for the UI.

```ts
useEffect(() => {
  if (!slug) return
  setLoading(true)
  setError(null)

  const url = `/api/the-loai/${slug}?page=${page}`
  console.log("[PAGE] fetching:", url)

  fetch(url)
    .then(r => { if (!r.ok) throw new Error(`Fetch failed ${r.status}`); return r.json() })
    .then((d: ApiGenreResponse) => { console.log("[PAGE] data:", d); setData(d) })
    .catch((e) => { console.error("[PAGE] error:", e); setError(e?.message || "Lỗi tải dữ liệu") })
    .finally(() => setLoading(false))
}, [slug, page])
```

## 4) Response typing
We capture the subset of fields we actually use (titlePage, items, pagination, and optional CDN base):

```ts
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
```

## 5) Image URL resolution
Posters can be absolute or relative. We normalize to a valid absolute URL using the CDN base when provided, ensuring we don’t hit the Next/Image "Invalid URL" issue.

```ts
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
```

And in JSX:

```tsx
<Image src={resolveImageUrl(m)} alt={m.name} fill className="object-cover group-hover:scale-105 transition-transform" />
```

## 6) Rendering & pagination
- Title: `data.data.titlePage` (e.g., "Hành Động")
- Items: `data.data.items`
- Pagination: `data.data.params.pagination`

```tsx
<h1 className="text-2xl sm:text-3xl font-bold mb-6">Thể loại: {title}</h1>
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
  {items.map(m => (
    <Link key={m._id} href={`/phim/${m.slug}`} className="group block">
      {/* image + labels */}
    </Link>
  ))}
</div>
{!!pagination && (
  <div className="flex items-center gap-2 mt-6">
    <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 rounded bg-slate-800 disabled:opacity-50">Trang trước</button>
    <span className="text-gray-400 text-sm">Trang {pagination.currentPage}/{pagination.totalPages}</span>
    <button disabled={page >= pagination.totalPages} onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))} className="px-3 py-1 rounded bg-slate-800 disabled:opacity-50">Trang sau</button>
  </div>
)}
```

## 7) API proxy behavior (server side)
The proxy translates `/api/the-loai/[slug]` to the correct upstream endpoint and forwards filters:

```ts
const allowed = ["page","sort_field","sort_type","sort_lang","country","year","limit"]
const fwd = new URLSearchParams()
for (const k of allowed) { const v = incoming.searchParams.get(k); if (v) fwd.set(k, v) }
if (!fwd.has("page")) fwd.set("page","1")
const apiUrl = `https://phimapi.com/v1/api/the-loai/${slug}?${fwd.toString()}`
```

## 8) Next/Image config
Add `next.config.js` at the project root to allow external image domains used by the API responses:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "phimimg.com" },
      { protocol: "https", hostname: "img.phimapi.com" },
    ],
  },
}
module.exports = nextConfig
```

Restart dev server after adding or changing this file.

## 9) Extending with filters
To allow client-side filtering via query string (e.g., sort, year), read from `useSearchParams()` and append them to the fetch URL; the proxy already forwards them.

## 10) Common pitfalls
- Missing slash when joining CDN base + path leads to invalid host (e.g., `phimimg.comupload`).
- Unconfigured image domains always throw in Next/Image until whitelisted.
- Upstream may return relative URLs or different hostnames; add them to `remotePatterns` as needed.

