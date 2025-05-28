import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, experience, interests, newsletter } = body;

    if (!email || !name || !experience) {
      return NextResponse.json(
        {
          success: false,
          error: "Email, name and experience level are required",
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("EduChainLabsDBSensay");
    const waitlistCollection = db.collection("waitlist");

    // Insert waitlist entry into MongoDB
    await waitlistCollection.insertOne({
      email,
      name,
      experience,
      interests: interests || "",
      newsletter: newsletter || false,
      timestamp: new Date(),
    });

    return NextResponse.json(
      { success: true, message: "You've been added to the waitlist!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("MongoDB Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
