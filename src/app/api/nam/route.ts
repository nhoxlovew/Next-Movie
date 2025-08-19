import { NextResponse } from "next/server"

export const runtime = "edge"

// GET /api/nam?count=20&from=2025
// Returns an array of years in descending order.
export async function GET(request: Request) {
  const url = new URL(request.url)
  const now = new Date()
  const current = parseInt(url.searchParams.get("from") || `${now.getFullYear()}`, 10)
  const count = Math.max(1, Math.min(200, parseInt(url.searchParams.get("count") || "40", 10)))

  const years: number[] = Array.from({ length: count }, (_, i) => current - i)
  return NextResponse.json(years, { headers: { "Cache-Control": "public, s-maxage=86400" } })
}

