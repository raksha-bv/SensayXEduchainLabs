import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/freestyle-suggestions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error getting code suggestions:", error);
    return NextResponse.json(
      {
        errors: "Failed to get suggestions. Please try again.",
        improvements: "",
        compliments: "",
        summary: "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
