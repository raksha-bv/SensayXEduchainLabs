"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

type ThemeMode = "dark" | "light";

interface ToggleThemeProps {
  theme: ThemeMode;
  toggleTheme: () => void;
  colors: {
    borderColor: string;
    textPrimary: string;
  };
}

export default function ToggleTheme({
  theme,
  toggleTheme,
  colors,
}: ToggleThemeProps) {
  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      className="p-2 rounded-full"
      style={{
        backgroundColor: "transparent",
        borderColor: colors.borderColor,
      }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun size={20} color={colors.textPrimary} />
      ) : (
        <Moon size={20} color={colors.textPrimary} />
      )}
    </Button>
  );
}
