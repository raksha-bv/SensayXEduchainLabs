import React from "react";
import { ChevronLeft, CheckIcon } from "lucide-react";
import { Course, Lesson } from "@/types/course";
import { useRouter } from "next/navigation";

interface LessonNavigationProps {
  course: Course;
  currentLesson: Lesson;
  lessonCompleted: Record<string, boolean>;
  handleLessonChange: (lesson: Lesson) => void;
  recordCourseCompletion: () => void;
  courseCompleted: boolean;
}

export const LessonNavigation: React.FC<LessonNavigationProps> = ({
  course,
  currentLesson,
  lessonCompleted,
  handleLessonChange,
  recordCourseCompletion,
  courseCompleted = false,
}) => {
  // Get current lesson index
  const router = useRouter();
  const currentLessonIndex = course.lessons.findIndex(
    (l) => l.id === currentLesson.id
  );

  // Check if next lesson is available
  const canProceedToNextLesson = () => {
    if (!currentLesson) return false;
    return (
      !currentLesson.problemStatement ||
      lessonCompleted[currentLesson.id] === true
    );
  };

  const completeCourse = () => {
    recordCourseCompletion();
    // Removed the router.push("/courses") to allow showing CourseCompletion component
  };

  return (
    <div className="mt-8 flex justify-between">
      {currentLessonIndex > 0 ? (
        <button
          className="px-4 py-2 rounded-lg transition-colors bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center"
          onClick={() =>
            handleLessonChange(course.lessons[currentLessonIndex - 1])
          }
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous Lesson
        </button>
      ) : (
        <div></div> // Empty div to maintain the space for flexbox
      )}

      {currentLessonIndex < course.lessons.length - 1 ? (
        <button
          className={`px-4 py-2 rounded-lg transition-colors flex items-center ml-auto ${
            canProceedToNextLesson()
              ? "bg-violet-700 hover:bg-violet-600 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => {
            if (canProceedToNextLesson()) {
              handleLessonChange(course.lessons[currentLessonIndex + 1]);
            }
          }}
          disabled={!canProceedToNextLesson()}
        >
          Next Lesson
          <ChevronLeft className="w-5 h-5 ml-2 rotate-180" />
        </button>
      ) : courseCompleted ? (
        <button
          onClick={() => {
            router.push("/courses");
          }}
          className="px-4 py-2 rounded-lg transition-colors flex items-center ml-auto bg-green-600 hover:bg-green-500 text-white"
        >
          Explore Courses
        </button>
      ) : (
        <button
          className={`px-4 py-2 rounded-lg transition-colors flex items-center ml-auto ${
            canProceedToNextLesson()
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => {
            if (canProceedToNextLesson()) {
              completeCourse();
            }
          }}
          disabled={!canProceedToNextLesson()}
        >
          Complete Course
          <CheckIcon className="w-5 h-5 ml-2" />
        </button>
      )}
    </div>
  );
};

export default LessonNavigation;
