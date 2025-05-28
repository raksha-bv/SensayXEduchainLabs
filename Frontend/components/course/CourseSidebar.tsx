import React from "react";
import { Clock, Check } from "lucide-react";
import { Course, Lesson } from "@/types/course";

interface CourseSidebarProps {
  course: Course;
  sidebarOpen: boolean;
  currentLesson: Lesson;
  lessonCompleted: Record<string, boolean>;
  handleLessonChange: (lesson: Lesson) => void;
  courseCompleted?: boolean; // Add this new prop
}

export const CourseSidebar: React.FC<CourseSidebarProps> = ({
  course,
  sidebarOpen,
  currentLesson,
  lessonCompleted,
  handleLessonChange,
  courseCompleted = false, // Default to false
}) => {
  // Find the current lesson index
  const currentLessonIndex = course.lessons.findIndex(
    (l) => l.id === currentLesson.id
  );

  // A lesson is unlocked if:
  // 1. It's the current lesson
  // 2. It's lesson #1
  // 3. It's before the current lesson (meaning user has seen it)
  // 4. It has been completed
  // 5. The previous lesson has been completed
  // 6. The entire course is completed
  const isLessonUnlocked = (lesson: Lesson, index: number) => {
    // If entire course is completed, all lessons are unlocked
    if (courseCompleted) return true;

    // Current lesson is always accessible
    if (lesson.id === currentLesson.id) return true;

    // First lesson is always accessible
    if (index === 0) return true;

    // Lesson is completed already
    if (lessonCompleted[lesson.id]) return true;

    // It's a previous lesson (user has already seen it)
    if (index < currentLessonIndex) return true;

    // Previous lesson is completed
    const prevLessonId = course.lessons[index - 1]?.id;
    if (prevLessonId && lessonCompleted[prevLessonId]) return true;

    return false;
  };

  return (
    <aside
      className={`w-64 border-r border-violet-900/30 flex-shrink-0 transition-all duration-300 lg:translate-x-0 absolute lg:relative z-20 h-[calc(100vh-4rem)] bg-gray-900/80 backdrop-blur-sm overflow-hidden ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 border-b border-violet-900/30">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg text-white">Course Content</h2>
          <span className="bg-violet-900/30 text-violet-400 text-xs font-medium px-2 py-0.5 rounded-full">
            {course.lessonCount} lessons
          </span>
        </div>
        <div className="flex items-center mt-2 text-sm text-gray-400">
          <Clock className="w-4 h-4 mr-1" />
          {course.duration}
        </div>
      </div>
      <nav className="p-3 h-full overflow-y-auto">
        {course.lessons.map((lesson, index) => {
          // Consider a lesson completed if either:
          // 1. It's individually marked as completed in lessonCompleted
          // 2. The entire course is marked as completed
          const isCompleted = courseCompleted || !!lessonCompleted[lesson.id];
          const isCurrentLesson = currentLesson.id === lesson.id;
          const isUnlocked = isLessonUnlocked(lesson, index);

          return (
            <button
              key={lesson.id}
              className={`w-full text-left p-3 rounded-lg mb-2 transition-colors duration-300 ${
                isCurrentLesson
                  ? "bg-violet-900/30 text-white"
                  : "hover:bg-gray-800/60 text-gray-300"
              } ${!isUnlocked ? "opacity-50 pointer-events-none" : ""}`}
              onClick={() => handleLessonChange(lesson)}
              disabled={!isUnlocked}
            >
              <div className="flex items-center">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 ${
                    isCompleted
                      ? "bg-green-600 text-white"
                      : isCurrentLesson
                      ? "bg-violet-700 text-white"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : index + 1}
                </div>
                <span className="text-sm font-medium">{lesson.title}</span>
                {lesson.problemStatement && (
                  <span className="ml-2 text-xs bg-violet-700/40 text-violet-300 px-1.5 py-0.5 rounded">
                    Challenge
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default CourseSidebar;
