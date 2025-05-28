"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import {
  Moon,
  Sun,
  ChevronLeft,
  Clock,
  User,
  ExternalLink,
  Award,
  FileCode,
  Tag,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/utils/contract_constants2";
import themeConfig from "@/utils/beforeMount";

interface Challenge {
  challengeId: number;
  creator: string;
  creatorName: string;
  bountyAmount: number;
  title: string;
  description: string;
  requirements: string;
  tags: string[];
  challengeStatus: Status;
  submissionsCount: number;
  startTime: number;
  duration: number;
  winner: string | null;
}

type ThemeMode = "dark" | "light";
type ValidationStatus = null | "validating" | "valid" | "invalid";
type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ValidationResult {
  status: boolean;
  syntax_correct: boolean;
  compilable_code: boolean;
  error: string;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

enum Status {
  waiting = 0,
  completed = 1,
  cancelled = 2,
  expired = 3,
}

export default function ChallengePage() {
  const params = useParams();
  const router = useRouter();
  const challengeId = params.id as string;
  const { beforeMount, darkColors, lightColors } = themeConfig;
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState<string>(
    "// Write your Solidity code here\npragma solidity ^0.8.0;\n\ncontract Solution {\n    \n}"
  );
  const [validationStatus, setValidationStatus] =
    useState<ValidationStatus>(null);
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Get current theme colors
  const colors = theme === "dark" ? darkColors : lightColors;

  // Function to show toast notifications
  const showToast = (message: string, type: ToastType = "info") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  // Remove specific toast
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    if (!challengeId) return;

    const fetchChallengeData = async () => {
      setIsLoading(true);
      try {
        // Check if Ethereum is available
        if (typeof window.ethereum !== "undefined") {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            provider
          );

          // Get challenge data
          const challengeData = await contract.challenges(
            parseInt(challengeId)
          );

          // Get remaining time
          const remainingTime = await contract.getChallengeRemainingTime(
            parseInt(challengeId)
          );

          // Check if this is a valid challenge
          if (challengeData.challengeId.toString() === "0") {
            setIsLoading(false);
            return; // Challenge not found
          }

          // Convert challenge data to match your UI format
          const formattedChallenge = {
            challengeId: Number(challengeData.challengeId),
            creator: challengeData.creator,
            creatorName: `${challengeData.creator.substring(
              0,
              6
            )}...${challengeData.creator.substring(38)}`,
            bountyAmount: Number(
              ethers.formatEther(challengeData.bountyAmount)
            ),
            title: challengeData.title,
            description: challengeData.description,
            requirements: challengeData.requirements,
            tags: ["Blockchain", "Smart Contract"], // You may need to adapt this
            challengeStatus: Number(challengeData.challengeStatus),
            submissionsCount: Number(challengeData.submissionsCount),
            startTime: Number(challengeData.startTime),
            duration: Number(challengeData.duration),
            winner: challengeData.winner,
          };

          console.log(challengeData);
          setChallenge(formattedChallenge);
        }
      } catch (error) {
        console.error("Error fetching challenge:", error);
        showToast("Failed to load challenge details", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallengeData();
  }, [challengeId]);

  useEffect(() => {
    // Update time remaining for active challenges
    if (!challenge) return;

    const updateTimeRemaining = async () => {
      try {
        if (typeof window.ethereum !== "undefined") {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            provider
          );

          // Get remaining time directly from the contract
          const remainingTimeSeconds = await contract.getChallengeRemainingTime(
            challenge.challengeId
          );

          if (remainingTimeSeconds <= 0) {
            setTimeRemaining("Ended");
            return;
          }

          const days = Math.floor(remainingTimeSeconds / (24 * 60 * 60));
          const hours = Math.floor(
            (remainingTimeSeconds % (24 * 60 * 60)) / (60 * 60)
          );
          const minutes = Math.floor((remainingTimeSeconds % (60 * 60)) / 60);

          setTimeRemaining(`${days}d ${hours}h ${minutes}m remaining`);
        }
      } catch (error) {
        console.error("Error updating time remaining:", error);
      }
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 60000);

    return () => clearInterval(interval);
  }, [challenge]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const validateCode = async () => {
    if (!challenge) return;

    setValidationStatus("validating");
    setShowValidation(true);
    try {
      const response = await fetch("/api/validate-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problem_statement: JSON.stringify(
            "Description : " +
              challenge.description +
              "\n Requirements :" +
              challenge.requirements
          ),
          code,
        }),
      });

      const data = await response.json();
      setValidationResult(data);
      setValidationStatus(data.status ? "valid" : "invalid");

      if (data.status) {
        showToast("Code validation successful!", "success");
      } else {
        showToast("Code validation failed. Please check the errors.", "error");
      }
    } catch (error) {
      console.error("Error validating code:", error);
      setValidationStatus("invalid");
      showToast("Error validating code. Please try again.", "error");
    }
  };

  const submitSolution = async () => {
    if (!challenge || validationStatus !== "valid") return;

    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );

        // Create a hash of the solution
        const solutionHash = ethers.keccak256(ethers.toUtf8Bytes(code));

        showToast("Submitting solution to blockchain...", "info");

        // Submit solution to the contract
        const tx = await contract.submitSolution(
          challenge.challengeId,
          solutionHash
        );

        // Wait for transaction to be mined
        await tx.wait();

        // Show success message
        showToast(
          "Solution submitted successfully to the blockchain!",
          "success"
        );
        setTimeout(() => router.push("/challenges"), 2000);
      }
    } catch (error: any) {
      console.error("Error submitting solution:", error);
      showToast(`Failed to submit solution: ${error.reason}`, "error");
    }
  };

  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  const getStatusBadgeColor = (status: Status) => {
    switch (status) {
      case Status.waiting:
        return "#4ADE80"; // Amber
      case Status.expired:
        return "#FCD34D"; // Green
      case Status.completed:
        return "#60A5FA"; // Blue
      case Status.cancelled:
        return "#EF4444"; // Red
      default:
        return "#9CA3AF"; // Gray
    }
  };

  const getStatusText = (status: Status) => {
    switch (status) {
      case Status.waiting:
        return "Active";
      case Status.expired:
        return "Expired";
      case Status.completed:
        return "Completed";
      case Status.cancelled:
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  // Function to render requirements as a list with proper formatting
  const renderRequirements = (requirementsString: string) => {
    if (!requirementsString) return null;

    const requirementsList = requirementsString
      .split("&&")
      .map((req) => req.trim())
      .filter((req) => req.length > 0);

    return (
      <div className="space-y-3">
        {requirementsList.map((requirement, index) => (
          <div key={index} className="flex">
            <span className="mr-2" style={{ color: colors.textAccent }}>
              •
            </span>
            <p style={{ color: colors.textSecondary }}>{requirement}</p>
          </div>
        ))}
      </div>
    );
  };

  // Toast notification component
  const ToastNotifications = () => {
    return (
      <div className="fixed top-4 left-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center p-4 rounded-lg shadow-lg overflow-hidden max-w-7xl"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.borderColor,
                borderWidth: 1,
                borderLeftWidth: 4,
                borderLeftColor:
                  toast.type === "success"
                    ? "#4ADE80"
                    : toast.type === "error"
                    ? "#EF4444"
                    : "#60A5FA",
              }}
            >
              <div className="flex-shrink-0 mr-3">
                {toast.type === "success" && (
                  <CheckCircle size={20} color="#4ADE80" />
                )}
                {toast.type === "error" && (
                  <AlertCircle size={20} color="#EF4444" />
                )}
                {toast.type === "info" && <Clock size={20} color="#60A5FA" />}
              </div>
              <div
                className="flex-grow text-sm mr-2 max-w-6xl"
                style={{ color: colors.textPrimary }}
              >
                {toast.message}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 rounded-full p-1 hover:bg-opacity-10 transition-colors"
                style={{
                  background: "transparent",
                  color: colors.textSecondary,
                  // Removed invalid hoverBackgroundColor property
                }}
              >
                <X size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden transition-colors duration-300"
      style={{
        backgroundColor: colors.background,
        backgroundImage: `radial-gradient(${colors.accent}10 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        color: colors.textPrimary,
      }}
    >
      {/* Toast Notifications */}
      <ToastNotifications />

      {/* Main content container with max height */}
      <div className="w-full max-w-7xl mx-auto p-4 flex flex-col max-h-screen overflow-auto">
        {/* Header with back button and theme toggle */}
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => router.push("/challenges")}
            variant="outline"
            className="flex items-center gap-2"
            style={{
              backgroundColor: "transparent",
              borderColor: colors.borderColor,
              color: colors.textPrimary,
            }}
          >
            <ChevronLeft size={16} />
            Back to Challenges
          </Button>

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
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div
              className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
              style={{ borderColor: colors.accent }}
            ></div>
          </div>
        ) : challenge ? (
          <>
            {/* Side by Side Layout with controlled height */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Left Column - Challenge Details */}
              <div className="flex flex-col overflow-auto">
                {/* Challenge Header */}
                <Card
                  className="p-6 mb-6 transition-colors duration-300"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: colors.borderColor,
                  }}
                >
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className="px-3 py-1 text-sm font-medium rounded-full"
                              style={{
                                backgroundColor:
                                  getStatusBadgeColor(
                                    challenge.challengeStatus
                                  ) + "20",
                                color: getStatusBadgeColor(
                                  challenge.challengeStatus
                                ),
                                border: `1px solid ${getStatusBadgeColor(
                                  challenge.challengeStatus
                                )}`,
                              }}
                            >
                              {getStatusText(challenge.challengeStatus)}
                            </div>

                            <div
                              className="flex items-center text-sm"
                              style={{ color: colors.textSecondary }}
                            >
                              <Clock size={16} className="mr-1" />
                              {timeRemaining}
                            </div>
                          </div>

                          <h1
                            className="text-2xl md:text-3xl font-bold mb-2"
                            style={{ color: colors.textPrimary }}
                          >
                            {challenge.title}
                          </h1>

                          <div
                            className="flex items-center gap-4 text-sm"
                            style={{ color: colors.textSecondary }}
                          >
                            <div className="flex items-center gap-1">
                              <User size={16} />
                              <span>{challenge.creatorName}</span>
                              <span className="text-xs">
                                ({formatAddress(challenge.creator)})
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              <Award size={16} />
                              <span>{challenge.bountyAmount} EDU Bounty</span>
                            </div>

                            <div className="flex items-center gap-1">
                              <FileCode size={16} />
                              <span>
                                {challenge.submissionsCount} Submissions
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h2
                            className="text-lg font-semibold mb-2"
                            style={{ color: colors.textPrimary }}
                          >
                            Description
                          </h2>
                          <p style={{ color: colors.textSecondary }}>
                            {challenge.description}
                          </p>
                        </div>

                        <div>
                          <h2
                            className="text-lg font-semibold mb-2"
                            style={{ color: colors.textPrimary }}
                          >
                            Requirements
                          </h2>
                          {renderRequirements(challenge.requirements)}
                        </div>

                        <div>
                          <h2
                            className="text-lg font-semibold mb-2"
                            style={{ color: colors.textPrimary }}
                          >
                            Tags
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {challenge.tags.map((tag, index) => (
                              <div
                                key={index}
                                className="px-3 py-1 rounded-full text-sm flex items-center"
                                style={{
                                  backgroundColor: colors.cardBgSecondary,
                                  color: colors.textAccent,
                                  border: `1px solid ${colors.borderColor}`,
                                }}
                              >
                                <Tag size={14} className="mr-1" />
                                {tag}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {challenge.challengeStatus === Status.waiting && (
                      <Button
                        onClick={submitSolution}
                        disabled={validationStatus !== "valid"}
                        className="hover:opacity-90 transition-opacity mt-6"
                        style={{
                          backgroundColor: colors.primary,
                          color:
                            theme === "dark" ? colors.textPrimary : "#ffffff",
                        }}
                      >
                        Submit Solution
                      </Button>
                    )}
                  </div>
                </Card>
              </div>

              {/* Right Column - Solution Editor with fixed height */}
              {challenge.challengeStatus === Status.waiting && (
                <div className="flex flex-col h-full">
                  <Card
                    className="p-6 transition-colors duration-300 flex flex-col"
                    style={{
                      backgroundColor: colors.cardBg,
                      borderColor: colors.borderColor,
                      height: "calc(100vh + 4rem)", // Controlled height
                    }}
                  >
                    <div className="mb-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className="w-1 h-6 mr-2 rounded"
                          style={{ backgroundColor: colors.accent }}
                        ></div>
                        <h2
                          className="text-xl font-bold"
                          style={{ color: colors.textPrimary }}
                        >
                          Solution Editor
                        </h2>
                      </div>
                      <Button
                        onClick={validateCode}
                        disabled={validationStatus === "validating"}
                        style={{
                          backgroundColor: colors.primary,
                          color:
                            theme === "dark" ? colors.textPrimary : "#ffffff",
                        }}
                        className="hover:opacity-90 transition-opacity"
                      >
                        {validationStatus === "validating"
                          ? "Validating..."
                          : "Validate Solution"}
                      </Button>
                    </div>

                    {/* Editor container with flex-grow to fill available space but not overflow */}
                    <div
                      className="border rounded-md overflow-hidden flex-grow"
                      style={{
                        borderColor: colors.borderColor,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Editor
                        height="100%"
                        defaultLanguage="solidity"
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        theme={
                          theme === "dark"
                            ? "solidityDarkTheme"
                            : "solidityLightTheme"
                        }
                        beforeMount={beforeMount}
                        options={{
                          minimap: { enabled: false },
                          scrollBeyondLastLine: false,
                          fontSize: 14,
                          wordWrap: "on",
                          fontFamily: "'Fira Code', monospace",
                        }}
                      />
                    </div>
                  </Card>
                </div>
              )}
            </div>

            {/* Slide-up Validation Panel */}
            <AnimatePresence>
              {showValidation && (
                <motion.div
                  initial={{ y: 300, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 300, opacity: 0 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="fixed bottom-4 right-4 w-2/3 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg z-10 p-4 transition-colors duration-300"
                  style={{
                    backgroundColor: colors.cardBgSecondary,
                    borderColor: colors.borderColor,
                    borderWidth: 1,
                  }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <div
                        className="w-1 h-6 mr-2 rounded"
                        style={{ backgroundColor: colors.accent }}
                      ></div>
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: colors.textPrimary }}
                      >
                        Validation Result
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowValidation(false)}
                      className="text-lg font-bold"
                      style={{ color: colors.textSecondary }}
                    >
                      ×
                    </button>
                  </div>

                  {validationResult ? (
                    <div
                      className="p-3 rounded transition-colors duration-300"
                      style={{
                        backgroundColor: validationResult.status
                          ? theme === "dark"
                            ? "#21211D"
                            : "#F0FDF4"
                          : theme === "dark"
                          ? "#252428"
                          : "#FEF2F2",
                        borderLeft: `4px solid ${
                          validationResult.status ? "#4ADE80" : "#EF4444"
                        }`,
                      }}
                    >
                      <p
                        className="font-medium mb-2"
                        style={{ color: colors.textPrimary }}
                      >
                        Status:{" "}
                        <span
                          style={{
                            color: validationResult.status
                              ? "#4ADE80"
                              : "#EF4444",
                          }}
                        >
                          {validationResult.status ? "Valid" : "Invalid"}
                        </span>
                      </p>
                      <p style={{ color: colors.textSecondary }}>
                        Syntax Correct:{" "}
                        <span
                          style={{
                            color: validationResult.syntax_correct
                              ? "#4ADE80"
                              : "#EF4444",
                          }}
                        >
                          {validationResult.syntax_correct ? "Yes" : "No"}
                        </span>
                      </p>
                      <p style={{ color: colors.textSecondary }}>
                        Compilable:{" "}
                        <span
                          style={{
                            color: validationResult.compilable_code
                              ? "#4ADE80"
                              : "#EF4444",
                          }}
                        >
                          {validationResult.compilable_code ? "Yes" : "No"}
                        </span>
                      </p>
                      {validationResult.error && (
                        <div
                          className="mt-2 p-3 rounded overflow-auto max-h-32 scrollbar-thin transition-colors duration-300"
                          style={{
                            backgroundColor:
                              theme === "dark" ? "#1A1A1A" : "#F9FAFB",
                          }}
                        >
                          <p style={{ color: colors.textSecondary }}>Error:</p>
                          <div
                            className="w-full h-32 rounded overflow-hidden mt-2 border transition-colors duration-300"
                            style={{
                              borderColor:
                                theme === "dark" ? "#2D2D2D" : "#E5E7EB",
                            }}
                          >
                            <Editor
                              height="100%"
                              defaultLanguage="solidity"
                              value={validationResult.error}
                              theme={
                                theme === "dark"
                                  ? "solidityDarkTheme"
                                  : "solidityLightTheme"
                              }
                              beforeMount={beforeMount}
                              options={{
                                readOnly: true,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                fontSize: 12,
                                wordWrap: "on",
                                lineNumbers: "off",
                                glyphMargin: false,
                                folding: false,
                                lineDecorationsWidth: 0,
                                lineNumbersMinChars: 0,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : validationStatus === "validating" ? (
                    <div className="flex items-center justify-center py-4">
                      <div
                        className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 transition-colors duration-300"
                        style={{ borderColor: colors.accent }}
                      ></div>
                      <span
                        className="ml-3"
                        style={{ color: colors.textSecondary }}
                      >
                        Validating your solution...
                      </span>
                    </div>
                  ) : (
                    <p style={{ color: colors.textMuted }}>
                      Click "Validate Solution" to check your code.
                    </p>
                  )}

                  {validationStatus === "valid" && (
                    <Button
                      onClick={submitSolution}
                      className="w-full mt-4 hover:opacity-90 transition-opacity"
                      style={{
                        backgroundColor: colors.primary,
                        color:
                          theme === "dark" ? colors.textPrimary : "#ffffff",
                      }}
                    >
                      Submit Solution
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-xl mb-4" style={{ color: colors.textSecondary }}>
              Challenge not found
            </p>
            <Button
              onClick={() => router.push("/challenges")}
              style={{
                backgroundColor: colors.primary,
                color: theme === "dark" ? colors.textPrimary : "#ffffff",
              }}
            >
              View All Challenges
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
