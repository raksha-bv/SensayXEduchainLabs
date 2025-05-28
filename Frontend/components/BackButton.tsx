"use client";

import React from "react";

interface BackButtonProps {
  className?: string;
  ariaLabel?: string;
  offset?: {
    bottom?: number;
    left?: number;
  };
}

const BackButton: React.FC<BackButtonProps> = ({
  className = "bg-violet-700 text-white p-3 rounded-full flex items-center justify-center hover:bg-violet-600 transition-colors w-10 h-10 shadow-md",
  ariaLabel = "Go back to previous page",
  offset = { bottom: 24, left: 24 },
}) => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={handleGoBack}
      className={`fixed ${className}`}
      style={{
        bottom: `${offset.bottom}px`,
        left: `${offset.left}px`,
        zIndex: 50,
      }}
      type="button"
      aria-label={ariaLabel}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  );
};

export default BackButton;
