"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Code,
  BookOpen,
  Rocket,
  Globe,
  Target,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const MotivationSection = () => {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  const motivationalContent = [
    {
      icon: <Rocket className="w-10 h-10 text-violet-400" />,
      title: "Transform Your Future",
      quote:
        "Blockchain isn't just a technology; it's a revolution waiting for passionate learners like you.",
      description:
        "Every great innovation starts with curiosity. In the world of Web3, you're not just learning a skill – you're becoming a pioneer of digital transformation.",
      challenges: [
        "Master cutting-edge blockchain technologies",
        "Build decentralized applications that change industries",
        "Join a global community of innovative developers",
      ],
    },
    {
      icon: <Globe className="w-10 h-10 text-green-400" />,
      title: "Global Impact Starts Here",
      quote:
        "Code is the language of the future, and blockchain is its most powerful dialect.",
      description:
        "Your learning journey can create solutions that transcend borders, solve real-world problems, and reshape how we think about technology, finance, and trust.",
      challenges: [
        "Develop solutions for global financial inclusion",
        "Create transparent and secure systems",
        "Innovate beyond traditional technological boundaries",
      ],
    },
    {
      icon: <Target className="w-10 h-10 text-blue-400" />,
      title: "Your Learning, Your Legacy",
      quote: "The best time to start was yesterday. The next best time is now.",
      description:
        "Blockchain development is more than a career – it's an opportunity to be part of a technological movement that's redefining how we interact, transact, and trust.",
      challenges: [
        "Learn from industry-leading experts",
        "Work on real-world blockchain projects",
        "Build a portfolio that stands out globally",
      ],
    },
  ];

  return (
    <section className="px-6 py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(124,58,237,0.15),transparent_70%)]"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(124,58,237,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,58,237,0.1) 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
          }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-violet-900/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your <span className="text-violet-400">Blockchain</span>{" "}
                Transformation
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                Embark on a journey that goes beyond learning – it's about
                creating, innovating, and reshaping the future of technology.
              </p>
            </div>

            <div className="grid md:grid-cols-[1fr_2fr] gap-8">
              {/* Navigation */}
              <div className="space-y-4">
                {motivationalContent.map((content, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveQuoteIndex(index)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      activeQuoteIndex === index
                        ? "bg-violet-900/30 border border-violet-700"
                        : "hover:bg-gray-800/50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center">
                      {content.icon}
                      <div className="ml-4">
                        <h3 className="font-semibold text-white">
                          {content.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-1">
                          {content.quote}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeQuoteIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-950/50 p-6 rounded-lg border border-violet-900/30"
                >
                  <blockquote className="text-xl italic text-gray-200 mb-6">
                    "{motivationalContent[activeQuoteIndex].quote}"
                  </blockquote>

                  <p className="text-gray-300 mb-6">
                    {motivationalContent[activeQuoteIndex].description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {motivationalContent[activeQuoteIndex].challenges.map(
                      (challenge, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                          <span className="text-gray-400">{challenge}</span>
                        </div>
                      )
                    )}
                  </div>

                  <a
                    href="/roadmaps"
                    className="inline-flex items-center px-6 py-3 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors"
                  >
                    Explore Learning Paths
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="text-center mt-12 border-t border-gray-700/30 pt-8">
              <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-lg">
                Your potential is limitless. Every great blockchain developer
                started exactly where you are now – curious and ready to learn.
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="#courses"
                  className="px-6 py-3 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors inline-flex items-center"
                >
                  Start Your Journey
                  <Zap className="w-4 h-4 ml-2" />
                </a>
                <Link
                  href="/practice"
                  className="px-6 py-3 bg-transparent border border-violet-700 text-violet-400 hover:bg-violet-900/30 font-medium rounded-lg transition-colors inline-flex items-center"
                >
                  Start Practicing
                  <Code className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MotivationSection;
