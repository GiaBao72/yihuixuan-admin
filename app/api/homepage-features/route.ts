import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get("locale") || "vi";

    const response = await fetch(
      `${STRAPI_URL}/api/homepage-features?populate=deep&locale=${locale}&sort=order:asc`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching homepage features:", error);
    return NextResponse.json(
      { error: "Failed to fetch homepage features", data: [] },
      { status: 500 }
    );
  }
}
