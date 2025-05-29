"use client";

import ReactMarkdown from "react-markdown";
import { useState, useRef, useEffect } from "react";
import { Send, Square, Moon, Sun } from "lucide-react";
import BackButton from "@/components/BackButton";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { VerboseSensayAPI } from "../api-debug"; // Adjust path as needed
import { API_VERSION } from "../constants/auth";

type LlmModel =
  | "gpt-4o"
  | "claude-3-5-haiku-latest"
  | "claude-3-7-sonnet-latest"
  | "grok-2-latest"
  | "grok-3-beta"
  | "deepseek-chat"
  | "o3-mini"
  | "gpt-4o-mini"
  | "huggingface-eva"
  | "huggingface-dolphin-llama";
type MemoryMode = "prompt-caching" | "rag-search";

export default function Home() {
  const [messages, setMessages] = useState<
    Array<{ type: string; content: string }>
  >([
    {
      type: "bot",
      content:
        "Hello! I'm your blockchain expert assistant. Ask me anything about blockchain, cryptocurrencies, or web3 technologies. How can I help you today?",
    },
  ]);
  const { isInitialized, authState, ocAuth } = useOCAuth();

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null); // Store interval reference
  const fullResponseRef = useRef<string>(""); // Store the complete response
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [replicaUuid, setReplicaUuid] = useState<string | null>(null);
  const [sensayApiKey] = useState(
    process.env.NEXT_PUBLIC_SENSAY_API_KEY_SECRET || ""
  );

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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (isInitialized && authState.isAuthenticated) {
      const authData = ocAuth.getAuthState();
      setCurrentUserId(authData.OCId);
      console.log("Current user OCID:", authData.OCId);
    }
  }, [isInitialized, authState.isAuthenticated, ocAuth]);

  // 5. Add Sensay session initialization function
  const initializeSensaySession = async (): Promise<string> => {
    if (!currentUserId || !sensayApiKey) {
      throw new Error("User not authenticated or API key missing");
    }

    if (replicaUuid) {
      return replicaUuid;
    }

    try {
      // Create org-only client to manage users
      const orgOnlyClient = new VerboseSensayAPI({
        HEADERS: {
          "X-ORGANIZATION-SECRET": sensayApiKey,
        },
      });

      // Check if user exists, create if not
      let userExists = false;
      try {
        await orgOnlyClient.users.getV1Users(currentUserId);
        userExists = true;
      } catch (error) {
        console.log(`User ${currentUserId} does not exist, creating...`);
      }

      if (!userExists) {
        await orgOnlyClient.users.postV1Users(API_VERSION, {
          id: currentUserId,
          name: `User ${currentUserId.slice(0, 8)}`,
        });
      }

      // Create user-authenticated client
      const userClient = new VerboseSensayAPI({
        HEADERS: {
          "X-ORGANIZATION-SECRET": sensayApiKey,
          "X-USER-ID": currentUserId,
        },
      });

      // Get or create replica
      const replicas = await userClient.replicas.getV1Replicas();
      let uuid: string | undefined;

      if (replicas && replicas.items && replicas.items.length > 0) {
        uuid = replicas.items[0].uuid;
      } else {
        // Create new replica
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const uniqueSlug = `blockchain-assistant-${currentUserId.slice(
          0,
          8
        )}-${timestamp}-${randomStr}`;

        const replicaPayload = {
          name: "Blockchain Expert Assistant",
          shortDescription:
            "Your personal blockchain and web3 learning assistant",
          greeting:
            "Hello! I'm your blockchain expert assistant. Ask me anything about blockchain, cryptocurrencies, or web3 technologies. How can I help you today?",
          slug: uniqueSlug,
          ownerID: currentUserId,
          llm: {
            model: "claude-3-7-sonnet-latest" as LlmModel,
            memoryMode: "prompt-caching" as MemoryMode,
            systemMessage:
              "You are a blockchain and cryptocurrency expert assistant. Provide clear, educational, and accurate information about blockchain technology, cryptocurrencies, DeFi, NFTs, smart contracts, and web3 technologies. Always explain complex concepts in an accessible way.",
          },
        };

        const newReplica = await userClient.replicas.postV1Replicas(
          API_VERSION,
          replicaPayload
        );
        uuid = newReplica.uuid;
      }

      setReplicaUuid(uuid);
      return uuid;
    } catch (error: any) {
      console.error("Error initializing Sensay session:", error);
      throw new Error(`Failed to initialize AI assistant: ${error.message}`);
    }
  };

  // Function to type text gradually
  const typeText = (text: string, onUpdate: (partialText: string) => void) => {
    let index = 0;
    fullResponseRef.current = text; // Store the full response
    setIsTyping(true);

    typingIntervalRef.current = setInterval(() => {
      if (index < text.length) {
        onUpdate(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingIntervalRef.current!);
        typingIntervalRef.current = null;
        setIsTyping(false);
      }
    }, 5); // Typing speed - slightly faster than before
  };

  // Function to stop typing immediately and show the full response
  const stopResponse = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;

      setIsTyping(false);
    }
  };

  // Handle sending message
  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    if (!currentUserId) {
      // Add error message for unauthenticated users
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "Please login with your OpenCampus ID to start chatting with me!",
        },
      ]);
      return;
    }

    if (!sensayApiKey) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "AI service is currently unavailable. Please try again later.",
        },
      ]);
      return;
    }

    // Add user message
    const userMessage = input;
    setMessages((prev) => [...prev, { type: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      // Initialize Sensay session
      const replica = await initializeSensaySession();

      // Create client for chat
      const client = new VerboseSensayAPI({
        HEADERS: {
          "X-ORGANIZATION-SECRET": sensayApiKey,
          "X-USER-ID": currentUserId,
        },
      });

      // Send message to Sensay
      const response =
        await client.chatCompletions.postV1ReplicasChatCompletions(
          replica,
          API_VERSION,
          {
            content: userMessage,
            source: "web",
            skip_chat_history: false,
          }
        );

      setIsLoading(false);

      // Add empty bot message that will be updated
      let currentMessage = { type: "bot", content: "" };
      setMessages((prev) => [...prev, currentMessage]);

      // Gradually type out the bot response
      typeText(response.content, (partialText) => {
        setMessages((prev) => {
          const updatedMessages = [...prev];
          const lastIndex = updatedMessages.length - 1;
          if (lastIndex >= 0 && updatedMessages[lastIndex].type === "bot") {
            updatedMessages[lastIndex] = {
              type: "bot",
              content: partialText,
            };
          }
          return updatedMessages;
        });
      });
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
      setIsLoading(false);
      setIsTyping(false);
    }
  };
  if (!isInitialized) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: darkColors.background }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto mb-4"></div>
          <p style={{ color: darkColors.textPrimary }}>Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between bg-grid-pattern ${
        darkMode ? "dark" : ""
      }`}
      style={darkMode ? { backgroundColor: darkColors.background } : {}}
    >
      <BackButton />
      <div className="w-full max-w-4xl p-4 h-screen flex flex-col">
        {/* Header */}
        <header className="text-center py-6 relative">
          <div className="absolute right-2 top-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full transition-colors duration-200"
              style={
                darkMode
                  ? {
                      backgroundColor: darkColors.cardBgSecondary,
                      color: darkColors.textAccent,
                    }
                  : {
                      backgroundColor: "rgb(229, 231, 235)",
                      color: "rgb(139, 92, 246)",
                    }
              }
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <h1
            style={
              darkMode
                ? { color: darkColors.textSecondary }
                : {
                    backgroundImage:
                      "linear-gradient(to right, #C1A5E1, #A7C7E7)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }
            }
            className="text-3xl font-bold"
          >
            Blockchain Expert
          </h1>
          <p
            style={
              darkMode
                ? { color: darkColors.textSecondary }
                : { color: "rgb(75, 85, 99)" }
            }
            className="mt-2"
          >
            Your AI guide to all things blockchain and crypto
          </p>
        </header>
        {authState.isAuthenticated && currentUserId && (
          <div
            className="mb-4 p-3 rounded-lg"
            style={{
              backgroundColor: darkColors.cardBgSecondary,
              borderColor: darkColors.accentBorder,
              border: "1px solid",
            }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span
                style={{
                  color: darkColors.textSecondary,
                  fontSize: "0.875rem",
                }}
              >
                Connected as: {currentUserId.slice(0, 8)}...
              </span>
            </div>
          </div>
        )}

        {!authState.isAuthenticated && (
          <div
            className="mb-4 p-4 rounded-lg"
            style={{
              backgroundColor: darkColors.cardBgSecondary,
              borderColor: "#FCD34D",
              border: "1px solid",
            }}
          >
            <div className="text-center">
              <p
                style={{
                  color: "#FCD34D",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                🔐 Login Required
              </p>
              <p style={{ color: darkColors.textMuted, fontSize: "0.75rem" }}>
                Please login with your OpenCampus ID for a personalized AI
                experience
              </p>
            </div>
          </div>
        )}
        {/* Chat container */}
        <div
          className="flex-grow rounded-lg shadow-lg p-4 mb-4 overflow-y-auto"
          style={
            darkMode
              ? {
                  backgroundColor: darkColors.cardBg,
                  boxShadow: `0 4px 6px -1px ${darkColors.background}`,
                }
              : { backgroundColor: "rgba(255, 255, 255, 0.8)" }
          }
        >
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user"
                      ? "rounded-tr-none"
                      : "rounded-tl-none"
                  }`}
                  style={
                    message.type === "user"
                      ? {
                          backgroundColor: darkColors.primary,
                          color: darkColors.textPrimary,
                        }
                      : darkMode
                      ? {
                          backgroundColor: darkColors.cardBgSecondary,
                          color: darkColors.textPrimary,
                        }
                      : {
                          backgroundColor: "rgb(243, 244, 246)",
                          color: "rgb(31, 41, 55)",
                        }
                  }
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="rounded-lg p-3 rounded-tl-none"
                  style={
                    darkMode
                      ? { backgroundColor: darkColors.cardBgSecondary }
                      : { backgroundColor: "rgb(243, 244, 246)" }
                  }
                >
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-0"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input form & Buttons */}
        <div className="flex gap-2">
          <form onSubmit={sendMessage} className="flex flex-1 gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about blockchain..."
              className="flex-grow p-3 rounded-lg border focus:outline-none focus:ring-2"
              style={
                darkMode
                  ? ({
                      backgroundColor: darkColors.cardBgSecondary,
                      borderColor: darkColors.borderColor,
                      color: darkColors.textPrimary,
                      "--placeholder-color": darkColors.textMuted,
                      "--focus-ring-color": darkColors.accentBorder,
                    } as React.CSSProperties)
                  : ({
                      borderColor: "rgb(209, 213, 219)",
                      "--focus-ring-color": "rgb(139, 92, 246)",
                    } as React.CSSProperties)
              }
              disabled={isTyping}
            />
            <button
              type="submit"
              className="p-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
              style={
                darkMode
                  ? {
                      backgroundColor: darkColors.primary,
                      color: darkColors.textPrimary,
                    }
                  : { backgroundColor: "rgb(139, 92, 246)", color: "white" }
              }
              disabled={isLoading || isTyping || !input.trim()}
            >
              <Send size={20} />
            </button>
          </form>

          {/* Stop Button */}
          {isTyping && (
            <button
              type="button"
              onClick={stopResponse}
              className="p-3 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105"
              style={
                darkMode
                  ? {
                      backgroundColor: `${darkColors.primary}E6`,
                      color: darkColors.textPrimary,
                    }
                  : {
                      backgroundColor: "rgba(139, 92, 246, 0.9)",
                      color: "white",
                    }
              }
              aria-label="Stop typing"
              title="Stop typing and show full response"
            >
              <Square size={20} fill="currentColor" className="animate-pulse" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
