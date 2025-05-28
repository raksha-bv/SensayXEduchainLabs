import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Code2 } from "lucide-react";

interface SuggestionFix {
  fixTitle: string;
  description?: string;
  code_snippet?: string;
}

interface SuggestionResult {
  errors: string;
  improvements: string;
  compliments: string;
  summary: string;
  fixes?: Array<SuggestionFix>;
}

interface SuggestionsProps {
  suggestions: SuggestionResult | null;
  isLoading: boolean;
  getSuggestions: () => void;
  theme: "dark" | "light";
  colors: {
    primary: string;
    accent: string;
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    borderColor: string;
  };
}

const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  isLoading,
  getSuggestions,
  theme,
  colors,
}) => {
  return (
    <Card
      className="p-4 h-full overflow-auto scrollbar-thin scrollbar-track-transparent transition-colors duration-300"
      style={
        {
          backgroundColor: colors.cardBg,
          "--scrollbar-thumb": colors.primary,
        } as React.CSSProperties
      }
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div
            className="w-1 h-6 mr-2 rounded"
            style={{ backgroundColor: colors.accent }}
          ></div>
          <h2
            className="text-xl font-bold flex items-center"
            style={{ color: colors.textPrimary }}
          >
            <Zap size={20} className="mr-2" />
            Code Suggestions
          </h2>
        </div>
        <Button
          onClick={getSuggestions}
          disabled={isLoading}
          style={{
            backgroundColor: colors.primary,
            color: theme === "dark" ? colors.textPrimary : "#ffffff",
          }}
          className="hover:opacity-90 transition-opacity"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div
                className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 mr-2"
                style={{
                  borderColor: colors.borderColor,
                }}
              ></div>
              <span>Analyzing...</span>
            </div>
          ) : (
            "Get Suggestions"
          )}
        </Button>
      </div>

      {suggestions ? (
        <div>
          {suggestions.compliments && (
            <div className="mb-4">
              <h4
                className="font-medium mb-2 flex items-center"
                style={{ color: colors.textPrimary }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 mr-2 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                ></span>
                Compliments:
              </h4>
              <div
                className="p-3 rounded-md"
                style={{
                  backgroundColor: theme === "dark" ? "#21211D" : "#F0FDF4",
                  borderLeft: "4px solid #4ADE80",
                }}
              >
                <p style={{ color: colors.textSecondary }}>
                  {suggestions.compliments}
                </p>
              </div>
            </div>
          )}

          {suggestions.errors && (
            <div className="mb-4">
              <h4
                className="font-medium mb-2 flex items-center"
                style={{ color: colors.textPrimary }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 mr-2 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                ></span>
                Issues:
              </h4>
              <div
                className="p-3 rounded-md"
                style={{
                  backgroundColor: theme === "dark" ? "#252428" : "#FEF2F2",
                  borderLeft: "4px solid #EF4444",
                }}
              >
                <p style={{ color: colors.textSecondary }}>
                  {suggestions.errors}
                </p>
              </div>
            </div>
          )}

          {suggestions.improvements && (
            <div className="mb-4">
              <h4
                className="font-medium mb-2 flex items-center"
                style={{ color: colors.textPrimary }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 mr-2 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                ></span>
                Improvements:
              </h4>
              <div
                className="p-3 rounded-md"
                style={{
                  backgroundColor: theme === "dark" ? "#1E1E25" : "#EFF6FF",
                  borderLeft: "4px solid #3B82F6",
                }}
              >
                <p style={{ color: colors.textSecondary }}>
                  {suggestions.improvements}
                </p>
              </div>
            </div>
          )}

          {suggestions.fixes &&
            Array.isArray(suggestions.fixes) &&
            suggestions.fixes.length > 0 && (
              <div className="mb-4">
                <h4
                  className="font-medium mb-2 flex items-center"
                  style={{ color: colors.textPrimary }}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 mr-2 rounded-full"
                    style={{ backgroundColor: colors.accent }}
                  ></span>
                  Suggested Fixes:
                </h4>
                <div className="space-y-2">
                  {suggestions.fixes.map((fix, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-md"
                      style={{
                        backgroundColor:
                          theme === "dark" ? "#1E2025" : "#F5F7FA",
                        borderLeft: "4px solid #8B5CF6",
                      }}
                    >
                      <p style={{ color: colors.textSecondary }}>
                        {typeof fix.fixTitle === "object"
                          ? JSON.stringify(fix.fixTitle)
                          : fix.fixTitle}
                      </p>
                      {fix.description && (
                        <p
                          style={{
                            color: colors.textSecondary,
                            marginTop: "0.5rem",
                          }}
                        >
                          {typeof fix.description === "object"
                            ? JSON.stringify(fix.description)
                            : fix.description}
                        </p>
                      )}
                      {fix.code_snippet && (
                        <pre className="mt-2 p-2 bg-gray-800 text-white rounded">
                          <code>{fix.code_snippet}</code>
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          {suggestions.summary && (
            <div>
              <h4
                className="font-medium mb-2 flex items-center"
                style={{ color: colors.textPrimary }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 mr-2 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                ></span>
                Summary:
              </h4>
              <div
                className="p-3 rounded-md"
                style={{
                  backgroundColor: theme === "dark" ? "#212224" : "#F9FAFB",
                  borderLeft: "4px solid #9CA3AF",
                }}
              >
                <p style={{ color: colors.textSecondary }}>
                  {suggestions.summary}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100%-3rem)]">
          <div
            className="p-8 rounded-full mb-4"
            style={{ backgroundColor: `${colors.accent}10` }}
          >
            <Code2 size={48} color={colors.accent} />
          </div>
          <p
            className="text-lg text-center mb-2"
            style={{ color: colors.textPrimary }}
          >
            No suggestions yet
          </p>
          <p
            className="text-center max-w-md"
            style={{ color: colors.textMuted }}
          >
            Write some Solidity code and click "Get Suggestions" for feedback on
            your code's quality, potential improvements, and best practices.
          </p>
        </div>
      )}
    </Card>
  );
};

export default Suggestions;
