import { NextResponse } from "next/server"

export const runtime = "edge"
export const revalidate = 300

// GET /api/quoc-gia
// Returns the list of countries from phimapi.com/quoc-gia
export async function GET() {
  try {
    const res = await fetch("https://phimapi.com/quoc-gia", { cache: "force-cache", next: { revalidate } })
    if (!res.ok) return NextResponse.json({ error: "Failed" }, { status: res.status })
    const data = await res.json()
    return NextResponse.json(Array.isArray(data) ? data : data?.items ?? [], {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" },
    })
  } catch (e) {
    console.error("/api/quoc-gia error:", e)
    return NextResponse.json({ error: "Proxy error" }, { status: 500 })
  }
}

