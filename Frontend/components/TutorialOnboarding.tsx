"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOCAuth } from "@opencampus/ocid-connect-js";

const TutorialOnboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { isInitialized, authState } = useOCAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if the user has seen the tutorial prompt before
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");

    // Only show for non-authenticated users who haven't seen it before
    if (isInitialized && !authState.isAuthenticated && !hasSeenTutorial) {
      // Delay showing the modal slightly for better UX
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isInitialized, authState]);

  const handleClose = () => {
    setShowOnboarding(false);
    // Mark that this user has seen the tutorial prompt
    localStorage.setItem("hasSeenTutorial", "true");
  };

  const goToTutorials = () => {
    localStorage.setItem("hasSeenTutorial", "true");
    router.push("/tutorials");
  };

  if (!showOnboarding) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-md p-6 bg-gray-900 border border-violet-700 rounded-lg shadow-lg animate-fadeIn">
        <div className="absolute top-3 right-3">
          <button
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-3 flex justify-center">
            <span className="bg-violet-900/50 text-violet-400 text-xs font-medium px-3 py-1 rounded-full">
              New to SensayLabs?
            </span>
          </div>

          <h3 className="text-xl font-bold text-center mb-3">
            Start Your <span className="text-violet-400">Web3 Journey</span>
          </h3>

          <p className="text-gray-300 mb-4 text-center">
            Check out how to setup MetaMask and add Educhain Network to your wallet. Its Required for using our services.
          </p>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-700 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
            >
              Maybe Later
            </button>
            <button
              onClick={goToTutorials}
              className="flex-1 px-4 py-2 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-md transition-colors"
            >
              View Tutorial
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleClose}
              className="text-xs text-gray-400 hover:text-violet-400"
            >
              Don't show again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialOnboarding;
