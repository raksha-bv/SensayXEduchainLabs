"use client";
import React from "react";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import { CheckCircle, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import TutorialSectionOne from "@/components/tutorials/TutorialSectionOne";
import TutorialSectionTwo from "@/components/tutorials/TutorialSectionTwo";

const TutorialPage = () => {
  const [copied, setCopied] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("metamask"); // "metamask" or "tokens"

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSection = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <BackButton />
      {/* Header section with background effects */}
      <section className="px-6 py-12 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 backdrop-blur z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(124,58,237,0.15),transparent_70%)]"></div>

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(124,58,237,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,58,237,0.1) 1px, transparent 1px)",
              backgroundSize: "4rem 4rem",
            }}
          ></div>

          {/* Animated floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-violet-400/30"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 100 - 50],
                  x: [0, Math.random() * 100 - 50],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 5 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="bg-violet-900/30 text-violet-400 text-xs font-medium px-3 py-1 rounded-full inline-block mb-4">
                Getting Started
              </span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Setup Your{" "}
              <span className="text-violet-400">Web3 Environment</span>
            </h1>
            <p className="text-gray-300 md:text-lg mb-8">
              Everything you need to start developing on the Educhain Labs
            </p>

            {/* Tutorial Section Switch */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-900/60 backdrop-blur p-1 rounded-xl border border-violet-900/30 inline-flex">
                <button
                  onClick={() => toggleSection("metamask")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === "metamask"
                      ? "bg-violet-700 text-white"
                      : "bg-transparent text-gray-300 hover:bg-violet-900/30"
                  }`}
                >
                  MetaMask Setup & Configuration
                </button>
                <button
                  onClick={() => toggleSection("tokens")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === "tokens"
                      ? "bg-violet-700 text-white"
                      : "bg-transparent text-gray-300 hover:bg-violet-900/30"
                  }`}
                >
                  OCID Auth & Educhain Tokens
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {activeSection === "metamask" ? (
        <TutorialSectionOne />
      ) : (
        <TutorialSectionTwo />
      )}
    </div>
  );
};

export default TutorialPage;
