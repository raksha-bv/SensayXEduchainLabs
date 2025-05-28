"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ToggleTheme from "@/components/ThemeToggle";
import ProblemRequirements from "@/components/ProblemRequirements";
import SuggestionsPanel from "@/components/SuggestionsPanel";
import CodeEditor from "@/components/CodeEditor";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import BackButton from "@/components/BackButton";
import { useOCAuth } from "@opencampus/ocid-connect-js";

type ProblemLevel = "beginner" | "intermediate" | "advanced";
type ThemeMode = "dark" | "light";
type ValidationStatus = null | "validating" | "valid" | "invalid";

interface ProblemStatement {
  title: string;
  description: string;
  requirements: string[];
  hints: string[];
}

interface ValidationResult {
  status: boolean;
  syntax_correct: boolean;
  compilable_code: boolean;
  error: string;
  score?: number;
}

interface SuggestionResult {
  errors: string;
  improvements: string;
  compliments: string;
  summary: string;
}

interface UserSubmissionResponse {
  success: boolean;
  message?: string;
  levelUpdated?: boolean;
  newLevel?: number;
  newAchievements?: string[];
  error?: string;
}

export default function PracticeArena() {
  const { toast } = useToast();
  const { isInitialized, authState, ocAuth } = useOCAuth();
  const [problemLevel, setProblemLevel] = useState<ProblemLevel>("beginner");
  const [problemStatement, setProblemStatement] =
    useState<ProblemStatement | null>(null);
  const [code, setCode] = useState<string>(
    "// Write your Solidity code here\npragma solidity ^0.8.0;\n\ncontract Solution {\n    \n}"
  );
  const [validationStatus, setValidationStatus] =
    useState<ValidationStatus>(null);
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("dark");

  // Theme color configurations
  const darkColors = {
    primary: "#7C3AED", // Violet-600
    primaryHover: "#6D28D9", // Violet-700
    accent: "#8B5CF6", // Violet-500
    background: "#0F0F0F", // Near black
    cardBg: "#1A1A1A", // Dark gray
    cardBgSecondary: "#212121", // Slightly lighter dark gray
    borderColor: "#2D2D2D", // Medium gray
    accentBorder: "#7C3AED", // Violet-600
    textPrimary: "#F9FAFB", // Gray-50
    textSecondary: "#E5E7EB", // Gray-200
    textMuted: "#9CA3AF", // Gray-400
    textAccent: "#A78BFA", // Violet-400
  };

  const lightColors = {
    primary: "#7C3AED", // Keep violet as primary
    primaryHover: "#6D28D9", // Violet-700
    accent: "#111111", // Black accent
    background: "#F2E8FF", // Warmer pastel violet background
    cardBg: "#FAF3FF", // Warmer, lighter pastel violet for cards
    cardBgSecondary: "#EBE0FF", // Warmer secondary violet
    borderColor: "#D8CAF0", // Warmer violet border
    accentBorder: "#111111", // Black accent border
    textPrimary: "#2D2235", // Warm dark violet, almost black
    textSecondary: "#4A3960", // Warmer dark violet for secondary text
    textMuted: "#786A92", // Warmer medium violet for muted text
    textAccent: "#111111", // Black accent text
  };

  // Get current theme colors
  const colors = theme === "dark" ? darkColors : lightColors;

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    fetchProblem(problemLevel);

    // Ensure body has overflow hidden
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Clean up when component unmounts
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [problemLevel]);

  const fetchProblem = async (level: ProblemLevel) => {
    setIsLoading(true);
    try {
      let endpoint = "";
      switch (level) {
        case "beginner":
          endpoint = "/api/generatePS";
          break;
        case "intermediate":
          endpoint = "/api/generatePSI";
          break;
        case "advanced":
          endpoint = "/api/generatePSA";
          break;
      }

      const response = await fetch(endpoint);
      const data = await response.json();
      setProblemStatement(data);
      setValidationResult(null);
      setSuggestions(null);
      setValidationStatus(null);
      setShowValidation(false);
      // Reset code to default
      setCode(
        "// Write your Solidity code here\npragma solidity ^0.8.0;\n\ncontract Solution {\n    \n}"
      );
    } catch (error) {
      console.error("Error fetching problem:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Ensure body has overflow hidden
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Disable copy-paste
    const preventCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    document.addEventListener("copy", preventCopyPaste);
    document.addEventListener("paste", preventCopyPaste);
    document.addEventListener("cut", preventCopyPaste);

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.removeEventListener("copy", preventCopyPaste);
      document.removeEventListener("paste", preventCopyPaste);
      document.removeEventListener("cut", preventCopyPaste);
    };
  }, [problemLevel]); // Only depends on problemLevel

  const validateCode = async () => {
    if (!problemStatement) return;

    setValidationStatus("validating");
    setShowValidation(true);
    try {
      const response = await fetch("/api/validate-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problem_statement: JSON.stringify(problemStatement),
          code,
        }),
      });

      const data = await response.json();
      setValidationResult(data);
      setValidationStatus(data.status ? "valid" : "invalid");
      const ai_score = Number(data.score || 0);

      // Only track submissions if user is authenticated with OCID
      if (isInitialized && authState.isAuthenticated && ocAuth) {
        const authData = ocAuth.getAuthState();

        // Record the submission with OCId
        const submissionResponse = await fetch("/api/users/submission", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            OCId: authData.OCId,
            isAccepted: data.status, // Pass whether the submission was accepted
          }),
        });

        // Record the AI score
        const ai_score_response = await fetch("/api/users/ai-score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            OCId: authData.OCId,
            score: ai_score,
          }),
        });

        const submissionData: UserSubmissionResponse =
          await submissionResponse.json();

        if (submissionData.success) {
          // Show level up notification if applicable
          if (submissionData.levelUpdated && submissionData.newLevel) {
            toast({
              title: "Level Up!",
              description: `Congratulations! You've reached level ${submissionData.newLevel}!`,
              variant: "default",
              duration: 5000,
            });
          }

          // Show achievement notifications if applicable
          if (
            submissionData.newAchievements &&
            submissionData.newAchievements.length > 0
          ) {
            submissionData.newAchievements.forEach((achievement) => {
              toast({
                title: "New Achievement Unlocked!",
                description: achievement,
                variant: "default",
                duration: 5000,
              });
            });
          }
        }
      } else {
        // Optional: Show a message encouraging login for progress tracking
        toast({
          title: "Sign in to track progress",
          description:
            "Connect with OCID to track your progress and achievements",
          variant: "default",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error validating code:", error);
      setValidationStatus("invalid");
    }
  };

  const getSuggestions = async () => {
    if (!problemStatement) return;

    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problem_statement: JSON.stringify(problemStatement),
          code,
        }),
      });

      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error getting suggestions:", error);
    }
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden transition-colors duration-300 select-none"
      style={{
        backgroundColor: colors.background,
        backgroundImage: `radial-gradient(${colors.accent}10 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        color: colors.textPrimary,
        userSelect: "none",
      }}
    >
      <BackButton />
      <div className="h-full w-full flex flex-col p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div
              className="w-3 h-10 mr-3 rounded"
              style={{ backgroundColor: colors.accent }}
            ></div>
            <h1
              className="text-3xl font-bold"
              style={{ color: colors.textPrimary }}
            >
              Solidity Practice Arena
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            {/* Theme Toggle Button */}
            <ToggleTheme
              theme={theme}
              toggleTheme={toggleTheme}
              colors={{
                borderColor: colors.borderColor,
                textPrimary: colors.textPrimary,
              }}
            />

            <Button
              onClick={() => {
                setProblemLevel("beginner");
                fetchProblem("beginner");
              }}
              variant={problemLevel === "beginner" ? "default" : "outline"}
              style={{
                backgroundColor:
                  problemLevel === "beginner" ? colors.primary : "transparent",
                borderColor: colors.primary,
                color:
                  problemLevel === "beginner"
                    ? theme === "dark"
                      ? colors.textPrimary
                      : "#ffffff"
                    : colors.textAccent,
              }}
              className="hover:opacity-90 transition-opacity"
            >
              Novice
            </Button>
            <Button
              onClick={() => {
                setProblemLevel("intermediate");
                fetchProblem("intermediate");
              }}
              variant={problemLevel === "intermediate" ? "default" : "outline"}
              style={{
                backgroundColor:
                  problemLevel === "intermediate"
                    ? colors.primary
                    : "transparent",
                borderColor: colors.primary,
                color:
                  problemLevel === "intermediate"
                    ? theme === "dark"
                      ? colors.textPrimary
                      : "#ffffff"
                    : colors.textAccent,
              }}
              className="hover:opacity-90 transition-opacity"
            >
              Beginner
            </Button>
            <Button
              onClick={() => {
                setProblemLevel("advanced");
                fetchProblem("advanced");
              }}
              variant={problemLevel === "advanced" ? "default" : "outline"}
              style={{
                backgroundColor:
                  problemLevel === "advanced" ? colors.primary : "transparent",
                borderColor: colors.primary,
                color:
                  problemLevel === "advanced"
                    ? theme === "dark"
                      ? colors.textPrimary
                      : "#ffffff"
                    : colors.textAccent,
              }}
              className="hover:opacity-90 transition-opacity"
            >
              Intermediate
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow overflow-hidden">
          {/* Left Column */}
          <div className="flex flex-col gap-4 h-full overflow-hidden">
            {/* Problem Statement */}
            <ProblemRequirements
              problemStatement={problemStatement}
              isLoading={isLoading}
              colors={{
                cardBg: colors.cardBg,
                borderColor: colors.borderColor,
                accent: colors.accent,
                textPrimary: colors.textPrimary,
                textSecondary: colors.textSecondary,
                primary: colors.primary,
              }}
            />

            {/* Suggestions */}
            <SuggestionsPanel
              suggestions={suggestions}
              getSuggestions={getSuggestions}
              problemStatement={problemStatement}
              colors={{
                cardBg: colors.cardBg,
                borderColor: colors.borderColor,
                accent: colors.accent,
                textPrimary: colors.textPrimary,
                textSecondary: colors.textSecondary,
                textMuted: colors.textMuted,
                primary: colors.primary,
              }}
              theme={theme}
            />
          </div>

          {/* Right Column - Code Editor */}
          <CodeEditor
            theme={theme}
            code={code}
            setCode={setCode}
            problemStatement={problemStatement}
            colors={{
              cardBg: colors.cardBg,
              cardBgSecondary: colors.cardBgSecondary,
              borderColor: colors.borderColor,
              accent: colors.accent,
              textPrimary: colors.textPrimary,
              textSecondary: colors.textSecondary,
              textMuted: colors.textMuted,
              primary: colors.primary,
            }}
            validationStatus={validationStatus}
            validationResult={validationResult}
            validateCode={validateCode}
            showValidation={showValidation}
            setShowValidation={setShowValidation}
          />
        </div>
      </div>
    </div>
  );
}
