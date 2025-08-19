import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";

  const apiUrl = `https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3?page=${(page)}`;

  try {
    // Use Next.js caching to avoid duplicate upstream hits within the revalidation window.
    // Note: In dev, React Strict Mode can still trigger multiple calls from the client.
    const res = await fetch(apiUrl, { next: { revalidate: 60 } });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from PhimAPI: ${res.status}` },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        // Helps the browser/CDN cache the API response briefly
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });

  } catch (error) {
    return NextResponse.json(
      console.error('Error fetching data',error),
      { status: 500 }
    );
  }
}
