"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SuggestionResult {
  errors: string;
  improvements: string;
  compliments: string;
  summary: string;
}

interface SuggestionsPanelProps {
  suggestions: SuggestionResult | null;
  getSuggestions: () => Promise<void>;
  problemStatement: any;
  colors: {
    cardBg: string;
    borderColor: string;
    accent: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    primary: string;
  };
  theme: "dark" | "light";
}

export default function SuggestionsPanel({
  suggestions,
  getSuggestions,
  problemStatement,
  colors,
  theme,
}: SuggestionsPanelProps) {
  return (
    <Card
      className="p-4 h-2/5 overflow-auto scrollbar-thin scrollbar-track-transparent transition-colors duration-300"
      style={
        {
          backgroundColor: colors.cardBg,
          borderColor: colors.borderColor,
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
            className="text-xl font-bold"
            style={{ color: colors.textPrimary }}
          >
            Suggestions
          </h2>
        </div>
        <Button
          onClick={getSuggestions}
          disabled={!problemStatement}
          style={{
            backgroundColor: colors.primary,
            color: theme === "dark" ? colors.textPrimary : "#ffffff",
          }}
          className="hover:opacity-90 transition-opacity"
        >
          Get Suggestions
        </Button>
      </div>

      {suggestions ? (
        <div>
          {suggestions.compliments && (
            <div className="mb-3">
              <h4
                className="font-medium mb-1 flex items-center"
                style={{ color: colors.textPrimary }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 mr-2 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                ></span>
                Compliments:
              </h4>
              <p style={{ color: colors.textSecondary }}>
                {suggestions.compliments}
              </p>
            </div>
          )}

          {suggestions.errors && (
            <div className="mb-3">
              <h4
                className="font-medium mb-1 flex items-center"
                style={{ color: colors.textPrimary }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 mr-2 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                ></span>
                Issues:
              </h4>
              <p style={{ color: colors.textSecondary }}>
                {suggestions.errors}
              </p>
            </div>
          )}

          {suggestions.improvements && (
            <div className="mb-3">
              <h4
                className="font-medium mb-1 flex items-center"
                style={{ color: colors.textPrimary }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 mr-2 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                ></span>
                Improvements:
              </h4>
              <p style={{ color: colors.textSecondary }}>
                {suggestions.improvements}
              </p>
            </div>
          )}

          {suggestions.summary && (
            <div>
              <h4
                className="font-medium mb-1 flex items-center"
                style={{ color: colors.textPrimary }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 mr-2 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                ></span>
                Summary:
              </h4>
              <p style={{ color: colors.textSecondary }}>
                {suggestions.summary}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p style={{ color: colors.textMuted }}>
          Click "Get Suggestions" for code feedback and improvement tips.
        </p>
      )}
    </Card>
  );
}
