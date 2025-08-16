# Genre Pages Troubleshooting & Fix Guide

This document captures what was broken, how we fixed it, and how to verify. It covers the sidebar genre list and the per‑genre page at `/the-loai/[slug]`.

## 1) Symptoms
- TypeError: `Failed to construct 'URL': Invalid URL` on the genre page
- Next/Image error: `hostname "phimimg.comupload" is not configured`
- Sidebar crash: `genres.map is not a function`

## 2) Root causes
- `/api/the-loai` proxy returned the wrong shape (expected an array)
- Wrong upstream path for per‑genre API (should be `v1/api/the-loai/{slug}`)
- `poster_url` often came as a relative path; concatenation missed a slash → bad URL
- Next/Image requires whitelisting remote domains in `next.config.js`

## 3) Fixes (summary)
1. `/api/the-loai` always returns an array (normalizes upstream response).
2. `/api/the-loai/[slug]` proxies to `https://phimapi.com/v1/api/the-loai/{slug}` and forwards filters.
3. Genre page computes a safe absolute image URL using `APP_DOMAIN_CDN_IMAGE` and a path join that guarantees a single slash.
4. Add image `remotePatterns` for domains like `phimimg.com`, `img.phimapi.com` in `next.config.js`.
5. Added concise logging on server and page to speed up debugging.

## 4) Files that changed
- `src/app/api/the-loai/route.ts` (list proxy)
- `src/app/api/the-loai/[slug]/route.ts` (per‑genre proxy)
- `src/app/(root)/the-loai/[slug]/page.tsx` (client page)
- `next.config.js` (images.remotePatterns) — add if missing

## 5) Key code excerpts

List proxy normalization:
```ts
// src/app/api/the-loai/route.ts
const data = await res.json()
return NextResponse.json(Array.isArray(data) ? data : data?.items ?? [])
```

Per-genre proxy + forwarded filters:
```ts
// src/app/api/the-loai/[slug]/route.ts
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const incoming = new URL(request.url)
  const allowed = ["page","sort_field","sort_type","sort_lang","country","year","limit"]
  const fwd = new URLSearchParams()
  for (const k of allowed) { const v = incoming.searchParams.get(k); if (v) fwd.set(k, v) }
  if (!fwd.has("page")) fwd.set("page","1")
  const apiUrl = `https://phimapi.com/v1/api/the-loai/${slug}?${fwd.toString()}`
  const res = await fetch(apiUrl, { cache: "no-store" })
  return res.ok ? NextResponse.json(await res.json()) : NextResponse.json({ error: "Failed" }, { status: res.status })
}
```

Robust image URL resolution:
```ts
// src/app/(root)/the-loai/[slug]/page.tsx
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

Image domains configuration (create at repo root):
```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "phimimg.com" },
      { protocol: "https", hostname: "img.phimapi.com" },
      // add more hosts here if they appear in responses
    ],
  },
}
module.exports = nextConfig
```

## 6) How to verify
1. Visit `/api/the-loai` → returns an array (no 500).
2. Visit `/api/the-loai/hanh-dong?page=1` → has `data.items` and `params.pagination`.
3. Open `/the-loai/hanh-dong` → thumbnails render; no "Invalid URL"; no "unconfigured host" errors.
4. Test filters: `/the-loai/hanh-dong?sort_field=_id&sort_type=asc&limit=10` (page forwards filters).

## 7) Troubleshooting
- Still "Invalid URL": log the failing `poster_url` and `APP_DOMAIN_CDN_IMAGE`; ensure join creates exactly one slash.
- Still unconfigured host: add that hostname to `next.config.js` and restart dev server.
- Sidebar crash: check `/api/the-loai` returns an array (proxy normalizes already).
- Pagination mismatch: confirm upstream `params.pagination` values.

## 8) Optional improvements
- Use `useSearchParams()` to forward filters from URL automatically.
- Reuse your MovieGrid card styling on the genre page.
- Add SSR metadata for SEO (title: `Thể loại: {titlePage}`).

