// app/api/users/courses/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const OCId = url.searchParams.get("OCId");

    if (!OCId) {
      return NextResponse.json(
        { success: false, error: "OCId parameter is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("EduChainLabsDBSensay");
    const userCoursesCollection = db.collection("userCourses");
    const coursesCollection = db.collection("courses");

    // Get all course IDs the user has registered for
    const userCourses = await userCoursesCollection.find({ OCId }).toArray();

    if (!userCourses.length) {
      return NextResponse.json({ success: true, courses: [] }, { status: 200 });
    }

    const courseIds = userCourses.map((uc) => uc.courseId);
    const courses = await coursesCollection
      .find({ id: { $in: courseIds } })
      .toArray();

    // Add completion and NFT mint status to each course
    const coursesWithStatus = courses.map((course) => {
      const userCourse = userCourses.find((uc) => uc.courseId === course.id);
      return {
        ...course,
        completed: userCourse?.completed || false,
        nftMinted: userCourse?.nftMinted || false,
      };
    });

    return NextResponse.json(
      { success: true, courses: coursesWithStatus },
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { OCId, courseId, completed, nftMinted } = body;

    if (!OCId || !courseId) {
      return NextResponse.json(
        { success: false, error: "OCId and Course ID are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("EduChainLabsDBSensay");
    const userCoursesCollection = db.collection("userCourses");

    const existingUserCourse = await userCoursesCollection.findOne({
      OCId,
      courseId,
    });

    if (existingUserCourse) {
      // Update course completion and NFT mint status
      await userCoursesCollection.updateOne(
        { OCId, courseId },
        {
          $set: {
            completed:
              completed === undefined
                ? existingUserCourse.completed
                : completed,
            nftMinted:
              nftMinted === undefined
                ? existingUserCourse.nftMinted
                : nftMinted,
          },
        }
      );
      return NextResponse.json(
        { success: true, message: "Course status updated successfully" },
        { status: 200 }
      );
    } else {
      // Create a new record
      await userCoursesCollection.insertOne({
        OCId,
        courseId,
        completed: completed === undefined ? true : completed,
        nftMinted: nftMinted || false,
        enrolledAt: new Date(),
      });
      return NextResponse.json(
        {
          success: true,
          message: "Course enrolled and status updated successfully",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("MongoDB Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Function to update NFT minting status
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { OCId, courseId } = body;

    if (!OCId || !courseId) {
      return NextResponse.json(
        { success: false, error: "OCId and Course ID are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("EduChainLabsDBSensay");
    const userCoursesCollection = db.collection("userCourses");

    const existingUserCourse = await userCoursesCollection.findOne({
      OCId,
      courseId,
    });

    if (!existingUserCourse) {
      return NextResponse.json(
        { success: false, error: "Course not found for this user" },
        { status: 404 }
      );
    }

    if (existingUserCourse.nftMinted) {
      return NextResponse.json(
        {
          success: false,
          error: "NFT has already been minted for this course",
        },
        { status: 400 }
      );
    }

    await userCoursesCollection.updateOne(
      { OCId, courseId },
      { $set: { nftMinted: true } }
    );

    return NextResponse.json(
      { success: true, message: "NFT status updated successfully" },
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
