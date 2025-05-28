import React from "react";
import { LightbulbIcon } from "lucide-react";
import { Lesson } from "@/types/course";

interface LessonHeaderProps {
  lesson: Lesson;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({ lesson }) => {
  return (
    <div className="bg-gray-900/60 border border-violet-900/30 rounded-lg p-6 mb-8">
      <h1 className="text-2xl font-bold text-white mb-1">{lesson.title}</h1>
      <p className="text-gray-400">
        Learn at your own pace and master the concepts
      </p>
      {lesson.problemStatement && (
        <div className="mt-3 flex items-center text-violet-400">
          <LightbulbIcon className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">Includes coding challenge</span>
        </div>
      )}
    </div>
  );
};

export default LessonHeader;
