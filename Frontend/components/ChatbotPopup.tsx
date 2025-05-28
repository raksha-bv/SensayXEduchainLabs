"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare, Square } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  type: "user" | "bot";
  content: string;
}

interface ChatbotPopupProps {
  buttonText?: string;
  initialMessage?: string;
  title?: string;
}

export const ChatbotPopup: React.FC<ChatbotPopupProps> = ({
  buttonText = "Blockchain Expert",
  initialMessage = "Hello! I'm your blockchain expert assistant. Ask me anything about blockchain, cryptocurrencies, or web3 technologies. How can I help you today?",
  title = "Blockchain Expert",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", content: initialMessage },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fullResponseRef = useRef<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Colors for dark mode
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

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle dark mode toggle

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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

    // Add user message
    const userMessage = input;
    setMessages((prev) => [...prev, { type: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      // Call the API
      const response = await fetch("/api/blockchain-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          userId: "solidity_learner",
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setIsLoading(false);

      // Add empty bot message that will be updated
      setMessages((prev) => [...prev, { type: "bot", content: "" }]);

      // Gradually type out the bot response
      typeText(data.response, (partialText) => {
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

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 flex items-center gap-2 z-40 shadow-lg transition-all duration-300 rounded-full px-4 py-3"
        style={{
          backgroundColor: darkColors.primary,
          color: darkColors.textPrimary,
        }}
      >
        <MessageSquare size={18} />
        <span>{buttonText}</span>
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div
            ref={popupRef}
            className="bg-grid-pattern rounded-xl shadow-xl flex flex-col animate-in fade-in duration-300"
            style={{
              width: "380px",
              height: "520px",
              backgroundColor: darkColors.background,
              overflow: "hidden", // Ensures content doesn't overflow the rounded corners
              borderRadius: "16px", // Extra insurance for rounded corners
            }}
          >
            {/* Header */}
            <header
              className="relative p-4 flex justify-between items-center rounded-t-xl"
              style={{ backgroundColor: darkColors.cardBg }}
            >
              <div className="flex-1 text-center">
                <h3
                  className="font-bold"
                  style={{ color: darkColors.textSecondary }}
                >
                  {title}
                </h3>
                <p className="text-sm" style={{ color: darkColors.textMuted }}>
                  Your AI guide to all things blockchain and crypto
                </p>
              </div>

              <div className="absolute right-2 top-2 flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: darkColors.cardBgSecondary,
                    color: darkColors.textAccent,
                  }}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </header>

            {/* Messages */}
            <div
              ref={chatContainerRef}
              className="flex-grow overflow-y-auto p-4 space-y-4"
              style={{ backgroundColor: darkColors.cardBg }}
            >
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
                        : {
                            backgroundColor: darkColors.cardBgSecondary,
                            color: darkColors.textPrimary,
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
                    style={{ backgroundColor: darkColors.cardBgSecondary }}
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

            {/* Input Form */}
            <div
              className="p-3 flex gap-2 rounded-b-xl"
              style={{ backgroundColor: darkColors.cardBg }}
            >
              <form onSubmit={sendMessage} className="flex flex-1 gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about blockchain..."
                  className="flex-grow p-3 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: darkColors.cardBgSecondary,
                    borderColor: darkColors.borderColor,
                    color: darkColors.textPrimary,
                  }}
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  className="p-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  style={{
                    backgroundColor: darkColors.primary,
                    color: darkColors.textPrimary,
                  }}
                  disabled={isLoading || isTyping || !input.trim()}
                >
                  <Send size={18} />
                </button>
              </form>

              {/* Stop Button */}
              {isTyping && (
                <button
                  type="button"
                  onClick={stopResponse}
                  className="p-3 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md"
                  style={{
                    backgroundColor: `${darkColors.primary}E6`,
                    color: darkColors.textPrimary,
                  }}
                  aria-label="Stop typing"
                  title="Stop typing and show full response"
                >
                  <Square
                    size={18}
                    fill="currentColor"
                    className="animate-pulse"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotPopup;
