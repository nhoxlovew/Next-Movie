import { NextResponse } from "next/server"

// GET /api/the-loai/[slug]?page=1
// Proxies PhimAPI: https://phimapi.com/v1/api/danh-sach/the-loai/{slug}?page={page}
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params)
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

    const apiUrl = `https://phimapi.com/v1/api/the-loai/${slug}?${forwarded.toString()}`
    console.log("[API] /api/the-loai/", { slug, params: forwarded.toString(), apiUrl })

    const res = await fetch(apiUrl, { cache: "no-store" })
    console.log("[API] upstream status:", res.status)

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      console.error("[API] upstream error body:", text)
      return NextResponse.json({ error: "Failed", status: res.status, body: text }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (e) {
    console.error("[API] proxy error:", e)
    return NextResponse.json({ error: "Proxy error" }, { status: 500 })
  }
}

