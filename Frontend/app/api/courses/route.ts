// app/api/courses/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("EduChainLabsDB");
    const coursesCollection = db.collection("courses");

    const courses = await coursesCollection.find({}).toArray();

    return NextResponse.json(
      {
        success: true,
        courses,
      },
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
