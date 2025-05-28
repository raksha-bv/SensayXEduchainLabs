import React from "react";
import { Book } from "lucide-react";
import { Course, Lesson } from "@/types/course";

interface CourseProgressBarProps {
  course: Course;
  currentLesson: Lesson;
}

export const CourseProgressBar: React.FC<CourseProgressBarProps> = ({
  course,
  currentLesson,
}) => {
  // Get current lesson index
  const currentLessonIndex =
    course.lessons.findIndex((l) => l.id === currentLesson.id) ?? 0;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-medium text-gray-400">
          Lesson {currentLessonIndex + 1} of {course.lessons.length}
        </h2>
        <div className="flex items-center">
          <Book className="w-4 h-4 mr-1 text-violet-400" />
          <span className="text-sm text-violet-400">
            {Math.round(
              ((currentLessonIndex + 1) / course.lessons.length) * 100
            )}
            % Complete
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5">
        <div
          className="bg-violet-600 h-1.5 rounded-full"
          style={{
            width: `${
              ((currentLessonIndex + 1) / course.lessons.length) * 100
            }%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default CourseProgressBar;
