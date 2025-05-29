import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("EduChainLabsDB");
    const messagesCollection = db.collection("contact");

    // Insert message into MongoDB
    await messagesCollection.insertOne({
      name,
      email,
      message,
      timestamp: new Date(),
    });

    return NextResponse.json(
      { success: true, message: "Thank you! We will get back to you soon." },
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
