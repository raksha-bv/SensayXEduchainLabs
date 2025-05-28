import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      level,
      estimatedDuration,
      topics,
      motivation,
      name,
      email,
    } = body;

    // Validate required fields
    if (!title || !description || !topics || !motivation || !name || !email) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("EduChainLabsDBSensay");
    const coursesCollection = db.collection("courseRequests");

    // Insert course request into MongoDB
    await coursesCollection.insertOne({
      title,
      description,
      level,
      estimatedDuration,
      topics,
      motivation,
      name,
      email,
      status: "pending", // Initial status for tracking
      timestamp: new Date(),
    });

    return NextResponse.json(
      { success: true, message: "Course request submitted successfully!" },
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
