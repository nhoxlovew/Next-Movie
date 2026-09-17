import { NextResponse } from "next/server"

// GET /api/the-loai
// Returns the list of genres from phimapi.com/the-loai
export async function GET() {
  try {
    const res = await fetch("https://phimapi.com/the-loai", { cache: "no-store" })
    console.log("[API] /api/the-loai status:", res.status)
    if (!res.ok) return NextResponse.json({ error: "Failed" }, { status: res.status })
    const data = await res.json()
    return NextResponse.json(
      Array.isArray(data) ? data : data?.data?.items ?? data?.items ?? []
    )
  } catch (e) {
    console.error("[API] /api/the-loai error:", e)
    return NextResponse.json({ error: "Proxy error" }, { status: 500 })
  }
}

