//api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByOCId, updateUserField } from "@/lib/userService";

// Create new user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { OCId, ethAddress , image, ...otherData } = body;

    if (!OCId) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Format the initial data correctly according to your UserData structure
    const initialData = {
      ethAddress: ethAddress || "",
      image: image || "",
      ...otherData,
    };

    const result = await createUser(OCId, initialData);

    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    });
  } catch (error) {
    console.error("MongoDB Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Get user by email
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

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("MongoDB Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
