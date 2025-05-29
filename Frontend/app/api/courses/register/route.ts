// app/api/courses/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { OCId, courseId } = body;

    if (!OCId || !courseId) {
      return NextResponse.json(
        { success: false, error: "OCId and courseId are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("EduChainLabsDB");
    const userCoursesCollection = db.collection("userCourses");
    const coursesCollection = db.collection("courses");

    // Check if the user already registered for this course
    const existingRegistration = await userCoursesCollection.findOne({
      OCId,
      courseId,
    });

    if (!existingRegistration) {
      // Create a new registration record
      await userCoursesCollection.insertOne({
        OCId,
        courseId,
        registeredAt: new Date(),
        completed: false,
      });

      // Increment the course's registration count
      await coursesCollection.updateOne(
        { id: courseId },
        { $inc: { registrations: 1 } }
      );

      return NextResponse.json(
        {
          success: true,
          message: "Course registration successful",
          isNewRegistration: true,
        },
        { status: 200 }
      );
    }

    // User already registered, don't increment counter again
    return NextResponse.json(
      {
        success: true,
        message: "You're already registered for this course",
        isNewRegistration: false,
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
