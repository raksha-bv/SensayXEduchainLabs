"use client";

import { Card } from "@/components/ui/card";

interface ProblemStatement {
  title: string;
  description: string;
  requirements: string[];
  hints: string[];
}

interface ProblemRequirementsProps {
  problemStatement: ProblemStatement | null;
  isLoading: boolean;
  colors: {
    cardBg: string;
    borderColor: string;
    accent: string;
    textPrimary: string;
    textSecondary: string;
    primary: string;
  };
}

export default function ProblemRequirements({
  problemStatement,
  isLoading,
  colors,
}: ProblemRequirementsProps) {
  return (
    <Card
      className="p-4 h-3/5 overflow-auto scrollbar-thin scrollbar-track-transparent transition-colors duration-300"
      style={
        {
          backgroundColor: colors.cardBg,
          borderColor: colors.borderColor,
          "--scrollbar-thumb": colors.primary,
        } as React.CSSProperties
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
            style={{ borderColor: colors.accent }}
          ></div>
        </div>
      ) : problemStatement ? (
        <div>
          <div className="flex items-center mb-4">
            <div
              className="w-1 h-6 mr-2 rounded"
              style={{ backgroundColor: colors.accent }}
            ></div>
            <h2
              className="text-2xl font-bold"
              style={{ color: colors.textPrimary }}
            >
              {problemStatement.title}
            </h2>
          </div>
          <p className="mb-4" style={{ color: colors.textSecondary }}>
            {problemStatement.description}
          </p>

          <h3
            className="text-xl font-semibold mb-2 flex items-center"
            style={{ color: colors.textPrimary }}
          >
            <span
              className="inline-block w-2 h-2 mr-2 rounded-full"
              style={{ backgroundColor: colors.accent }}
            ></span>
            Requirements:
          </h3>
          <ul className="list-disc pl-5 mb-4">
            {problemStatement.requirements.map((req, index) => (
              <li
                key={index}
                className="mb-1"
                style={{ color: colors.textSecondary }}
              >
                {req}
              </li>
            ))}
          </ul>

          <h3
            className="text-xl font-semibold mb-2 flex items-center"
            style={{ color: colors.textPrimary }}
          >
            <span
              className="inline-block w-2 h-2 mr-2 rounded-full"
              style={{ backgroundColor: colors.accent }}
            ></span>
            Hints:
          </h3>
          <ul className="list-disc pl-5">
            {problemStatement.hints.map((hint, index) => (
              <li
                key={index}
                className="mb-1"
                style={{ color: colors.textSecondary }}
              >
                {hint}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p style={{ color: colors.textSecondary }}>
            No problem statement available. Please select a difficulty level.
          </p>
        </div>
      )}
    </Card>
  );
}
