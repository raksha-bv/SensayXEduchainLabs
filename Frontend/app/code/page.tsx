"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ToggleTheme from "@/components/ThemeToggle";
import BackButton from "@/components/BackButton";
import CodeEditorComponent from "@/components/CodeEditor";
import Suggestions from "@/components/Suggestions";
import { GripVertical } from "lucide-react";

type ValidationStatus = null | "validating" | "valid" | "invalid";
type ThemeMode = "dark" | "light";

interface ValidationResult {
  status: boolean;
  syntax_correct: boolean;
  compilable_code: boolean;
  error: string;
}

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

export default function CodeEditorPage() {
  const [code, setCode] = useState<string>(
    "// Write your Solidity code here\npragma solidity ^0.8.0;\n\ncontract MyContract {\n    \n}"
  );
  const [validationStatus, setValidationStatus] =
    useState<ValidationStatus>(null);
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("dark");

  // Panel resizing state
  const [leftPanelWidth, setLeftPanelWidth] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseMoveHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);
  const mouseUpHandlerRef = useRef<(() => void) | null>(null);

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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!containerRef.current) return;
    setIsDragging(true);

    // Store the initial mouse position and panel width when dragging starts
    const containerRect = containerRef.current.getBoundingClientRect();
    const initialMouseX = e.clientX;
    const initialLeftWidth = (leftPanelWidth / 100) * containerRect.width;

    // Define the move handler with closure over initial values
    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      if (!containerRef.current) return;

      const containerWidth = containerRect.width;
      const deltaX = moveEvent.clientX - initialMouseX;
      const newWidth = initialLeftWidth + deltaX;

      // Calculate new width percentage (with limits)
      const newWidthPercent = Math.min(
        Math.max((newWidth / containerWidth) * 100, 30),
        70
      );

      setLeftPanelWidth(newWidthPercent);
    };

    // Define the up handler
    const mouseUpHandler = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);

      // Clear refs
      mouseMoveHandlerRef.current = null;
      mouseUpHandlerRef.current = null;
    };

    // Store handlers in refs for cleanup
    mouseMoveHandlerRef.current = mouseMoveHandler;
    mouseUpHandlerRef.current = mouseUpHandler;

    // Add the event listeners
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  // Cleanup event listeners when component unmounts
  useEffect(() => {
    return () => {
      if (mouseMoveHandlerRef.current) {
        document.removeEventListener("mousemove", mouseMoveHandlerRef.current);
      }
      if (mouseUpHandlerRef.current) {
        document.removeEventListener("mouseup", mouseUpHandlerRef.current);
      }
    };
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const validateCode = async () => {
    setValidationStatus("validating");
    setShowValidation(true);
    try {
      const response = await fetch("/api/validate-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      });

      const data = await response.json();
      setValidationResult(data);
      setValidationStatus(data.status ? "valid" : "invalid");
    } catch (error) {
      console.error("Error validating code:", error);
      setValidationStatus("invalid");
    }
  };

  const getSuggestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/freestyle-suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      });

      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error getting suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: colors.background,
        backgroundImage: `radial-gradient(${colors.accent}10 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        color: colors.textPrimary,
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
              Solidity Code Editor
            </h1>
          </div>
          <ToggleTheme
            theme={theme}
            toggleTheme={toggleTheme}
            colors={{
              borderColor: colors.borderColor,
              textPrimary: colors.textPrimary,
            }}
          />
        </div>

        {/* Resizable panels container */}
        <div
          ref={containerRef}
          className="flex-grow flex overflow-hidden relative"
          style={{ cursor: isDragging ? "col-resize" : "default" }}
        >
          {/* Left Column - Code Editor */}
          <div
            className="h-full overflow-hidden relative transition-all duration-150 ease-in-out"
            style={{ width: `${leftPanelWidth}%` }}
          >
            <CodeEditorComponent
              theme={theme}
              code={code}
              setCode={setCode}
              problemStatement={null}
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
              isFreestyleMode={true}
            />
          </div>

          {/* Resizer handle */}
          <div
            className="flex items-center justify-center z-20 cursor-col-resize w-4 h-full hover:bg-opacity-20"
            onMouseDown={handleMouseDown}
            style={{
              backgroundColor: isDragging
                ? `${colors.accent}20`
                : "transparent",
              transition: "background-color 0.2s",
            }}
          >
            <div
              className="h-16 w-1 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: isDragging
                  ? colors.accent
                  : colors.borderColor,
                transition: "background-color 0.2s",
              }}
            >
              <GripVertical
                size={16}
                className="opacity-70 hover:opacity-100 transition-opacity"
                color={isDragging ? colors.textPrimary : colors.textMuted}
              />
            </div>
          </div>

          {/* Right Column - Suggestions */}
          <div
            className="h-full overflow-hidden transition-all duration-150 ease-in-out"
            style={{ width: `${100 - leftPanelWidth}%` }}
          >
            <Suggestions
              suggestions={suggestions}
              getSuggestions={getSuggestions}
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
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
