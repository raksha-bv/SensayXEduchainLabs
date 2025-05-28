import React from "react";
import { LightbulbIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProblemStatement, ThemeMode } from "@/types/course";

interface ProblemStatementCardProps {
  problemStatement: ProblemStatement;
  showProblemStatement: boolean;
  setShowProblemStatement: (show: boolean) => void;
  darkMode: ThemeMode;
}

export const ProblemStatementCard: React.FC<ProblemStatementCardProps> = ({
  problemStatement,
  showProblemStatement,
  setShowProblemStatement,
  darkMode,
}) => {
  if (!showProblemStatement) {
    return (
      <button
        onClick={() => setShowProblemStatement(true)}
        className={`w-full mb-8 p-4 flex items-center justify-between rounded-lg border ${
          darkMode === "dark"
            ? "border-violet-900/30 bg-gray-900/40 hover:bg-gray-900/60"
            : "border-violet-200 bg-violet-50/70 hover:bg-violet-50"
        }`}
      >
        <div className="flex items-center">
          <LightbulbIcon className="w-5 h-5 mr-2 text-violet-400" />
          <span
            className={darkMode === "dark" ? "text-white" : "text-violet-900"}
          >
            {problemStatement.title}
          </span>
        </div>
        <span
          className={`text-sm ${
            darkMode === "dark" ? "text-violet-400" : "text-violet-600"
          }`}
        >
          Show Challenge
        </span>
      </button>
    );
  }

  return (
    <Card
      className={`border mb-8 ${
        darkMode === "dark"
          ? "border-violet-900/30 bg-gray-900/60"
          : "border-violet-200 bg-violet-50"
      }`}
    >
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle
          className={`text-lg flex items-center ${
            darkMode === "dark" ? "text-white" : "text-violet-900"
          }`}
        >
          <LightbulbIcon className="w-5 h-5 mr-2 text-violet-400" />
          {problemStatement.title}
        </CardTitle>
        <button
          onClick={() => setShowProblemStatement(!showProblemStatement)}
          className={`text-sm font-medium ${
            darkMode === "dark"
              ? "text-violet-400 hover:text-violet-300"
              : "text-violet-600 hover:text-violet-700"
          }`}
        >
          Hide Challenge
        </button>
      </CardHeader>
      <CardContent>
        <p
          className={`mb-4 ${
            darkMode === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {problemStatement.description}
        </p>

        <div className="mb-4">
          <h4
            className={`font-semibold mb-2 ${
              darkMode === "dark" ? "text-violet-400" : "text-violet-700"
            }`}
          >
            Requirements:
          </h4>
          <ul
            className={`list-disc pl-5 space-y-1 ${
              darkMode === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {problemStatement.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProblemStatementCard;
