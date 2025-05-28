// userService.ts
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

// Define User data interface
export interface UserData {
  OCId: string;
  ethAddress: string;
  image: string;
  completedCourses: { courseId: string; course: any }[];
  courseCompleted: number;
  submissions: number;
  acceptedSubmissions: number;
  AI_Scores: number[];
  Level: number;
  Achievement: string[];
}

// Default user data
export const defaultUserData: UserData = {
  OCId: "",
  image: "",
  ethAddress: "",
  completedCourses: [],
  courseCompleted: 0,
  submissions: 0,
  acceptedSubmissions: 0,
  AI_Scores: [],
  Level: 0,
  Achievement: [],
};

export async function createUser(
  OCId: string,
  initialData?: Partial<UserData>
) {
  const client = await clientPromise;
  const db = client.db("EduChainLabsDBSensay");
  const usersCollection = db.collection("users");

  // Check if user already exists
  const existingUser = await usersCollection.findOne({ OCId });
  if (existingUser) {
    return {
      success: false,
      message: "User already exists",
      userId: existingUser._id,
    };
  }

  // Create new user with default values merged with any provided data
  const userData = { ...defaultUserData, ...initialData };

  const result = await usersCollection.insertOne({
    OCId,
    data: userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return {
    success: true,
    message: "User created successfully",
    userId: result.insertedId,
  };
}

export async function getUserByOCId(OCId: string) {
  const client = await clientPromise;
  const db = client.db("EduChainLabsDBSensay");
  const usersCollection = db.collection("users");

  return await usersCollection.findOne({ OCId });
}

export async function updateUserField(
  OCId: string,
  fieldPath: string,
  value: any
) {
  const client = await clientPromise;
  const db = client.db("EduChainLabsDBSensay");
  const usersCollection = db.collection("users");

  // Create update object with the specific field to update
  const updateObj: any = {};
  updateObj[`data.${fieldPath}`] = value;

  const result = await usersCollection.updateOne(
    { OCId },
    {
      $set: {
        ...updateObj,
        updatedAt: new Date(),
      },
    },
    { upsert: false }
  );

  return {
    success: result.matchedCount > 0,
    message:
      result.matchedCount > 0 ? "User updated successfully" : "User not found",
  };
}

export async function incrementUserField(
  OCId: string,
  fieldPath: string,
  incrementBy: number = 1
) {
  const client = await clientPromise;
  const db = client.db("EduChainLabsDBSensay");
  const usersCollection = db.collection("users");

  // Create increment object for the specific field
  const updateObj: any = {};
  updateObj[`data.${fieldPath}`] = incrementBy;

  const result = await usersCollection.updateOne(
    { OCId },
    {
      $inc: updateObj,
      $set: { updatedAt: new Date() },
    },
    { upsert: false }
  );

  return {
    success: result.matchedCount > 0,
    message:
      result.matchedCount > 0
        ? "User field incremented successfully"
        : "User not found",
  };
}

export async function pushToUserArray(
  OCId: string,
  arrayPath: string,
  value: any
) {
  const client = await clientPromise;
  const db = client.db("EduChainLabsDBSensay");
  const usersCollection = db.collection("users");

  // Create push object for the specific array field
  const updateObj: any = {};
  updateObj[`data.${arrayPath}`] = value;

  const result = await usersCollection.updateOne(
    { OCId },
    {
      $push: updateObj,
      $set: { updatedAt: new Date() },
    },
    { upsert: false }
  );

  return {
    success: result.matchedCount > 0,
    message:
      result.matchedCount > 0
        ? "Item added to user array successfully"
        : "User not found",
  };
}

export async function getTotalUsers() {
  const client = await clientPromise;
  const db = client.db("EduChainLabsDBSensay");
  const usersCollection = db.collection("users");

  const totalUsers = await usersCollection.countDocuments({});
  return totalUsers;
}
