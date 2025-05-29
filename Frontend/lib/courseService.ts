// lib/courseService.ts
import clientPromise from "@/lib/mongodb";
import { Course } from "@/app/courses/page"; // Import your Course interface

export async function migrateCourses(courses: Course[]) {
  try {
    const client = await clientPromise;
    const db = client.db("EduChainLabs");
    const coursesCollection = db.collection("courses");

    const bulkOps = courses.map((course) => ({
      updateOne: {
        filter: { id: course.id },
        update: {
          $set: {
            title: course.title,
            description: course.description,
            level: course.level,
            duration: course.duration,
            lessonCount: course.lessonCount,
            image: course.image,
            tags: course.tags,
          },
          $setOnInsert: { registrations: 0 }, // Preserve existing registrations if present
        },
        upsert: true,
      },
    }));

    if (bulkOps.length > 0) {
      const result = await coursesCollection.bulkWrite(bulkOps);
      console.log(
        `✔️ Courses migration complete. Modified: ${result.modifiedCount}, Inserted: ${result.upsertedCount}`
      );
    } else {
      console.log("⚠️ No courses to migrate.");
    }

    return { success: true, message: "Courses migrated successfully" };
  } catch (error) {
    console.error("❌ Failed to migrate courses:", error);
    throw new Error(`Course migration failed: ${error}`);
  }
}

export async function getAllCourses() {
  const client = await clientPromise;
  const db = client.db("EduChainLabs");
  const coursesCollection = db.collection("courses");

  return await coursesCollection.find({}).toArray();
}

export async function getCourseById(courseId: string) {
  const client = await clientPromise;
  const db = client.db("EduChainLabs");
  const coursesCollection = db.collection("courses");

  return await coursesCollection.findOne({ id: courseId });
}

export async function getUserCourses(OCId: string) {
  const client = await clientPromise;
  const db = client.db("EduChainLabs");
  const userCoursesCollection = db.collection("userCourses");

  // Get all course IDs the user has registered for
  const userCourses = await userCoursesCollection.find({ OCId }).toArray();

  // If user has no courses, return empty array
  if (!userCourses.length) return [];

  // Get the actual course details
  const courseIds = userCourses.map((uc) => uc.courseId);
  const coursesCollection = db.collection("courses");
  const courses = await coursesCollection
    .find({ id: { $in: courseIds } })
    .toArray();

  // Add completion status to each course
  return courses.map((course) => {
    const userCourse = userCourses.find((uc) => uc.courseId === course.id);
    return {
      ...course,
      completed: userCourse?.completed || false,
    };
  });
}
