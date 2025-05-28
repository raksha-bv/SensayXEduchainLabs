//api/users/acheivements/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUserByOCId } from "@/lib/userService";
import { checkAndGrantAchievements } from "@/utils/userCalculations";
import clientPromise from "@/lib/mongodb";

// Get user achievements
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const OCId = url.searchParams.get("OCId");

    if (!OCId) {
      return NextResponse.json(
        { success: false, error: "Email parameter is required" },
        { status: 400 }
      );
    }

    const user = await getUserByOCId(OCId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Define all possible achievements and their criteria
    const allAchievements = [
      {
        id: "Course Master",
        name: "Course Master",
        description: "Complete 5 or more courses",
        criteria: "courseCompleted >= 5",
        earned: user.data.Achievement.includes("Course Master"),
        progress: Math.min(user.data.courseCompleted / 5, 1),
      },
      {
        id: "Submission Warrior",
        name: "Submission Warrior",
        description: "Submit 50 or more tasks",
        criteria: "submissions >= 50",
        earned: user.data.Achievement.includes("Submission Warrior"),
        progress: Math.min(user.data.submissions / 50, 1),
      },
      {
        id: "Quality Coder",
        name: "Quality Coder",
        description: "Get 25 or more submissions accepted",
        criteria: "acceptedSubmissions >= 25",
        earned: user.data.Achievement.includes("Quality Coder"),
        progress: Math.min(user.data.acceptedSubmissions / 25, 1),
      },
      {
        id: "Rising Star",
        name: "Rising Star",
        description: "Reach level 5 or higher",
        criteria: "Level >= 5",
        earned: user.data.Achievement.includes("Rising Star"),
        progress: Math.min(user.data.Level / 5, 1),
      },
      {
        id: "AI Prodigy",
        name: "AI Prodigy",
        description: "Get an average AI score of 90 or higher",
        criteria: "Average AI_Scores >= 90",
        earned: user.data.Achievement.includes("AI Prodigy"),
        progress:
          user.data.AI_Scores.length > 0
            ? Math.min(
                user.data.AI_Scores.reduce((a : any, b : any) => a + b, 0) /
                  user.data.AI_Scores.length /
                  90,
                1
              )
            : 0,
      },
    ];

    return NextResponse.json(
      {
        success: true,
        achievements: {
          earned: user.data.Achievement,
          total: allAchievements.length,
          progress: allAchievements,
        },
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

// Manual achievement check
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { OCId } = body;

    if (!OCId) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await getUserByOCId(OCId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Check for new achievements
    const newAchievements = await checkAndGrantAchievements(OCId, user.data);

    return NextResponse.json(
      {
        success: true,
        message: "Achievement check completed",
        newAchievements,
        totalAchievements:
          user.data.Achievement.length + newAchievements.length,
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
