import React from "react";
import Link from "next/link";
import { ChevronLeft, Menu, X } from "lucide-react";
import { Course, ThemeMode } from "@/types/course";

interface CourseHeaderProps {
  course: Course;
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({
  course,
  sidebarOpen,
  setSidebarOpen,
}) => {
  // Get difficulty color based on level
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "text-green-400 bg-green-400/20";
      case "Intermediate":
        return "text-blue-400 bg-blue-400/20";
      case "Advanced":
        return "text-violet-400 bg-violet-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  return (
    <header className="relative z-10 py-4 px-6 border-b border-violet-900/30 backdrop-blur-sm bg-gray-900/60">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/courses"
            className="mr-4 text-gray-400 hover:text-violet-400 transition-colors"
            aria-label="Back to courses"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-white">{course.title}</h1>
          <span
            className={`ml-3 text-xs font-medium px-2 py-0.5 rounded-full ${getDifficultyColor(
              course.level
            )}`}
          >
            {course.level}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle Button */}
          {/* <button
            onClick={() => setDarkMode(darkMode === "dark" ? "light" : "dark")}
            className="p-2 rounded-full transition-colors duration-300 bg-gray-800 text-gray-300 hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {darkMode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button> */}

          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors bg-gray-800 text-gray-300 hover:bg-gray-700"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default CourseHeader;
