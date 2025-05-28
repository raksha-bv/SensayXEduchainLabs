// app/api/generatePSI/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/generatePSI`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching intermediate problem:", error);
    return NextResponse.json(
      { error: "Failed to fetch problem statement" },
      { status: 500 }
    );
  }
}
