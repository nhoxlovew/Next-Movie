/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server"

export const runtime = "edge"
export const revalidate = 120

const allowedParams = [
  "keyword",
  "page",
  "sort_field",
  "sort_type",
  "sort_lang",
  "category",
  "country",
  "year",
  "limit",
] as const

type AllowedParam = typeof allowedParams[number]

export async function GET(request: Request) {
  const url = new URL(request.url)
  const forwarded = new URLSearchParams()

  for (const key of allowedParams) {
    const val = url.searchParams.get(key)
    if (val !== null && val !== "") forwarded.set(key, val)
  }

  const keyword = forwarded.get("keyword")?.trim()
  if (!keyword) {
    return NextResponse.json({ status: false, msg: "Missing keyword" }, { status: 400 })
  }

  // defaults
  if (!forwarded.has("page")) forwarded.set("page", "1")
  if (!forwarded.has("limit")) forwarded.set("limit", "10")

  // phimapi expects keyword then other params with & (only one ?)
  const qs = forwarded.toString()
  const apiUrl = `https://phimapi.com/v1/api/tim-kiem?${qs}`

  try {
    const res = await fetch(apiUrl, {
      cache: "force-cache",
      next: { revalidate },
      headers: { accept: "application/json" },
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      return NextResponse.json({ status: false, msg: text || "Upstream error" }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=86400",
      },
    })
  } catch (e) {
    return NextResponse.json({ status: false, msg: "Proxy error" }, { status: 500 })
  }
}

