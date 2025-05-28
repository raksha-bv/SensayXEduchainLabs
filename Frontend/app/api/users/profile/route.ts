//api/users/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUserByOCId, updateUserField } from "@/lib/userService";
import { calculateAverageAIScore } from "@/utils/userCalculations";

// Get comprehensive user profile data
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

    const user = await getUserByOCId(OCId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Calculate derived metrics
    const averageAIScore = calculateAverageAIScore(user.data.AI_Scores);
    const acceptanceRate =
      user.data.submissions > 0
        ? Math.round(
            (user.data.acceptedSubmissions / user.data.submissions) * 100
          )
        : 0;

    return NextResponse.json(
      {
        success: true,
        profile: {
          ...user.data,
          averageAIScore,
          acceptanceRate,
          memberSince: user.createdAt,
          lastActive: user.updatedAt,
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

// Update user profile information
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { OCId, ethAddress , image } = body;

    if (!OCId) {
      return NextResponse.json(
        { success: false, error: "OCId is required" },
        { status: 400 }
      );
    }

    const updates = [];

    if (ethAddress !== undefined) {
      await updateUserField(OCId, "ethAddress", ethAddress);
      updates.push("username");
    }

    if (image !== undefined) {
      await updateUserField(OCId, "image", image);
      updates.push("image");
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: "No fields to update provided" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        updatedFields: updates,
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
