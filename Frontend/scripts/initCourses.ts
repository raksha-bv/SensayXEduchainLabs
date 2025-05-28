import { migrateCourses } from "@/lib/courseService";
import { courses } from "@/utils/solidityCourse";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const MONGODB_URI = process.env.MONGODB_URI || "";

async function init() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Upsert courses into MongoDB
    const result = await migrateCourses(courses);
    console.log(result.message);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("Failed to initialize courses:", error);
    process.exit(1);
  }
}

// Run the initialization
init();
