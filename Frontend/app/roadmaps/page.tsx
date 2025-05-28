"use client";
import React, { useState } from "react";
import {
  Target,
  Book,
  Code,
  BookOpen,
  Zap,
  CheckCircle,
  Award,
  Network,
  Terminal,
  Shield,
  ChevronRight,
  GraduationCap,
  Globe,
  Rocket,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import RoadMapNavbar from "@/components/RoadmapNavbar";
import Footer from "@/components/Footer";

const LearningPaths = () => {
  const [selectedNode, setSelectedNode] = useState<{
    title: string;
    description: string;
    icon: React.ReactNode;
    prerequisite?: string | null;
    skills?: string[];
  } | null>(null);
  const [selectedPath, setSelectedPath] = useState<"beginner" | "intermediate">(
    "beginner"
  );

  const learningPaths = {
    beginner: [
      {
        title: "Intro to Blockchain",
        description:
          "Understand the core concepts of blockchain technology, including decentralization, consensus mechanisms, and fundamental blockchain principles.",
        icon: <Book className="w-6 h-6 text-violet-400" />,
        prerequisite: null,
        skills: [
          "Blockchain Basics",
          "Decentralization",
          "Consensus Mechanisms",
        ],
      },
      {
        title: "Solidity Basics",
        description:
          "Learn Solidity programming language, smart contract structure, and basic blockchain development concepts. Write your first smart contracts.",
        icon: <Code className="w-6 h-6 text-green-400" />,
        prerequisite: "Complete Intro to Blockchain",
        skills: ["Solidity", "Smart Contracts", "Basic Programming"],
      },
      {
        title: "Practice Arena",
        description:
          "Test your skills in AI-powered coding challenges. Solve blockchain programming problems and receive personalized AI feedback.",
        icon: <Target className="w-6 h-6 text-blue-400" />,
        prerequisite: "Complete Solidity Basics",
        skills: ["Problem Solving", "Coding Challenges", "AI Feedback"],
      },
      {
        title: "Small Projects",
        description:
          "Apply your knowledge by building practical blockchain applications. Create functional smart contracts and develop real-world solutions.",
        icon: <Zap className="w-6 h-6 text-yellow-400" />,
        prerequisite: "Complete Practice Arena",
        skills: [
          "Project Development",
          "Practical Application",
          "Real-world Solutions",
        ],
      },
      {
        title: "Beginner Certification",
        description:
          "Complete a comprehensive assessment to validate your blockchain development skills and receive an official beginner-level certification.",
        icon: <Award className="w-6 h-6 text-emerald-400" />,
        prerequisite: "Complete Small Projects",
        skills: [
          "Certification",
          "Skill Validation",
          "Professional Recognition",
        ],
      },
    ],
    intermediate: [
      {
        title: "Advanced Solidity",
        description:
          "Dive deeper into smart contract development. Learn advanced techniques, complex contract interactions, and sophisticated programming patterns.",
        icon: <Code className="w-6 h-6 text-green-400" />,
        prerequisite: "Complete Beginner Path",
        skills: ["Advanced Solidity", "Complex Contracts", "Design Patterns"],
      },
      {
        title: "DeFi Concepts",
        description:
          "Explore Decentralized Finance. Understand advanced financial protocols, liquidity pools, yield farming, and innovative blockchain financial mechanisms.",
        icon: <BookOpen className="w-6 h-6 text-violet-400" />,
        prerequisite: "Complete Advanced Solidity",
        skills: ["DeFi Protocols", "Liquidity Pools", "Financial Mechanisms"],
      },
      {
        title: "Smart Contract Security",
        description:
          "Master blockchain security practices. Learn about vulnerabilities, auditing techniques, and best practices for secure smart contract development.",
        icon: <Shield className="w-6 h-6 text-red-400" />,
        prerequisite: "Complete DeFi Concepts",
        skills: [
          "Security Auditing",
          "Vulnerability Assessment",
          "Best Practices",
        ],
      },
      {
        title: "Advanced Projects",
        description:
          "Develop complex blockchain applications and contribute to real-world blockchain ecosystem projects. Showcase your advanced development skills.",
        icon: <Rocket className="w-6 h-6 text-indigo-400" />,
        prerequisite: "Complete Smart Contract Security",
        skills: [
          "Complex Applications",
          "Ecosystem Contribution",
          "Advanced Development",
        ],
      },
      {
        title: "Professional Certification",
        description:
          "Complete a rigorous professional assessment to validate your advanced blockchain development expertise and receive an industry-recognized certification.",
        icon: <GraduationCap className="w-6 h-6 text-amber-400" />,
        prerequisite: "Complete Advanced Projects",
        skills: [
          "Expert Certification",
          "Professional Validation",
          "Industry Recognition",
        ],
      },
    ],
  };

  // Set the initial selected node to the first node of the selected path
  React.useEffect(() => {
    setSelectedNode(learningPaths[selectedPath][0]);
  }, [selectedPath]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 flex flex-col">
      <RoadMapNavbar />

      <div className="max-w-6xl mx-auto px-4 py-16 flex-grow">
        <div className="flex space-x-8">
          {/* Left Column - Learning Paths */}
          <div className="w-1/2">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4 tracking-tight">
                Your <span className="text-violet-400">Blockchain</span>{" "}
                Learning Journey
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                A structured path to transform from a blockchain novice to a
                skilled developer
              </p>
            </div>

            {/* Path Selector */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-900/60 rounded-full p-1 flex items-center border border-violet-900/30 shadow-lg">
                {["beginner", "intermediate"].map((path) => (
                  <button
                    key={path}
                    onClick={() =>
                      setSelectedPath(path as "beginner" | "intermediate")
                    }
                    className={`px-6 py-2 rounded-full transition-all duration-300 ease-in-out ${
                      selectedPath === path
                        ? "bg-violet-700 text-white shadow-xl scale-105"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    {path.charAt(0).toUpperCase() + path.slice(1)} Path
                  </button>
                ))}
              </div>
            </div>

            {/* Learning Nodes */}
            <div className="relative">
              {learningPaths[selectedPath].map((step, index) => (
                <div
                  key={index}
                  className="relative z-10 flex items-center mb-8 group cursor-pointer"
                  onClick={() => setSelectedNode(step)}
                >
                  {/* Connecting Lines Between Nodes */}
                  {index > 0 && (
                    <div className="absolute left-8 transform -translate-x-1/2 w-1 h-12 -top-8 bg-violet-900/50 z-0"></div>
                  )}

                  {/* Node Dot with Click Effect */}
                  <div
                    className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mr-4 relative z-10 transition-all duration-300 
                    ${
                      selectedNode === step
                        ? "bg-violet-600 border-violet-400 scale-110"
                        : "bg-gray-900 border-violet-600"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Node Title with Click Effect */}
                  <div
                    className={`transition-all duration-300 
                    ${
                      selectedNode === step
                        ? "text-white scale-105"
                        : "text-gray-400 scale-100"
                    }`}
                  >
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="w-1/2">
            <div className="sticky top-20">
              {selectedNode ? (
                <div className="bg-gray-900/80 border border-violet-900/50 rounded-xl p-8 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-gray-800 rounded-full">
                      {selectedNode.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                      {selectedNode.title}
                    </h3>
                  </div>

                  {selectedNode.prerequisite && (
                    <div className="flex items-center text-sm text-gray-400 italic mb-4 space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Prerequisite: {selectedNode.prerequisite}</span>
                    </div>
                  )}

                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {selectedNode.description}
                  </p>

                  {selectedNode.skills && (
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-white mb-3">
                        Skills You'll Learn:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedNode.skills?.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-violet-700 hover:text-white transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <button className="bg-violet-700 text-white px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-violet-600 transition-colors">
                      <span>Start Learning</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-900/60 border border-violet-900/50 rounded-lg p-6 text-center">
                  <p className="text-gray-400 text-lg">
                    Click on a learning path node to explore details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LearningPaths;
