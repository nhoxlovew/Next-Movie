import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";

  const apiUrl = `https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3?page=${(page)}`;

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from PhimAPI: ${res.status}` },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      console.error('Error fetching data',error),
      { status: 500 }
    );
  }
}
