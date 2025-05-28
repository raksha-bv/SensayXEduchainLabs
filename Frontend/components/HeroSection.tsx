"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Gemini from "./ui/Gemini";
import SolidityLogo from "./ui/Solidity";

const HeroSection = () => {
  return (
    <section className="px-4 sm:px-6 min-h-screen py-20 relative overflow-hidden flex items-center">
      {/* Updated Background to match CodeEditorDemo */}
      <div className="absolute inset-0 backdrop-blur z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(124,58,237,0.15),transparent_70%)]"></div>
        {/* <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.1),transparent_70%)]"></div> */}

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
        <div className="absolute inset-0 overflow-hidden -z-20">
          {[...Array(30)].map((_, i) => (
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

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-12">
          {/* Text content - enhanced with more details and better mobile spacing */}
          <motion.div
            className="w-full lg:w-2/5 text-center lg:text-left mb-8 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <span className="bg-violet-900/30 text-violet-400 text-xs font-medium px-3 py-1 rounded-full inline-block mb-4">
                Web3 Development Platform
              </span>
            </motion.div>

            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Master <span className="text-violet-400">Blockchain</span>{" "}
              Development
            </motion.h1>

            <motion.p
              className="text-gray-300 text-sm sm:text-base md:text-lg mb-5 sm:mb-6 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              Build the future of decentralized applications with interactive
              challenges, real-time code compilation, and expert AI guidance.
              Learn Solidity, smart contracts, and Web3 integration from
              beginner to advanced.
            </motion.p>

            {/* Added features list with improved mobile layout */}
            <motion.div
              className="mb-5 sm:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <ul className="flex flex-wrap justify-center lg:justify-start text-xs sm:text-sm gap-y-2">
                <li className="flex items-center text-violet-300 w-full sm:w-auto">
                  <svg
                    className="w-4 h-4 mr-1.5 text-violet-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Live Compilation
                </li>
                <li className="flex items-center text-violet-300 w-full sm:w-auto sm:ml-4">
                  <svg
                    className="w-4 h-4 mr-1.5 text-violet-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  AI Assistance
                </li>
                <li className="flex items-center text-violet-300 w-full sm:w-auto sm:ml-4">
                  <svg
                    className="w-4 h-4 mr-1.5 text-violet-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Blockchain Lessons
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link
                href="/code"
                className="w-full sm:w-auto px-5 py-2.5 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center group"
              >
                Start Coding
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/courses"
                className="w-full sm:w-auto px-5 py-2.5 bg-transparent border border-violet-700 hover:bg-violet-900/30 text-violet-400 font-medium rounded-lg transition-all flex items-center justify-center"
              >
                Explore Courses
              </Link>
            </motion.div>

            {/* Added trust indicators with improved mobile layout */}
            <motion.div
              className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              <span className="text-xs text-gray-400">Powered By</span>
              <div className="flex space-x-4 opacity-60">
                <svg
                  className="h-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.8-.3-5.6-1.4-5.6-6.1 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 1.8-.4 2.8-.4s1.9.1 2.8.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.7.2 2.9.1 3.2.8.9 1.2 2 1.2 3.3 0 4.7-2.8 5.8-5.6 6.1.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C24 5.4 18.6 0 12 0z" />
                </svg>
                <Gemini />
                <SolidityLogo />
              </div>
            </motion.div>
          </motion.div>

          {/* Hero visual - with improved mobile sizing and visibility */}
          <motion.div
            className="w-full sm:w-11/12 md:w-10/12 lg:w-1/2 mt-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="bg-gray-900/60 backdrop-blur p-1 rounded-xl border border-violet-900/50 overflow-hidden shadow-2xl shadow-violet-900/20 relative">
              <div className="bg-gray-950 rounded-lg p-2 sm:p-3">
                {/* Code editor header */}
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="flex space-x-1.5 mr-3">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 bg-gray-800 rounded-md h-4 sm:h-5 flex items-center justify-center">
                    <span className="text-gray-400 text-[10px] sm:text-xs">
                      edu_chain.sol
                    </span>
                  </div>
                </div>

                {/* Code snippet with fixed alignment and mobile optimizations - FIX FOR LINE NUMBERS */}
                <div className="relative">
                  {/* Line numbers column - improved spacing */}
                  <div className="absolute top-0 left-0 flex flex-col text-[10px] xs:text-xs text-gray-600 select-none font-mono pt-2 sm:pt-3 pl-2 sm:pl-3">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="h-[1.1rem] xs:h-[1.2rem] sm:h-[1.3rem] md:h-[1.4rem] lg:h-[1.5rem] text-right pr-3 md:pr-4"
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  {/* Code content with increased padding for larger screens */}
                  <pre className="font-mono text-[10px] sm:text-xs text-gray-300 overflow-x-auto p-2 sm:p-3 pl-10 md:pl-12 lg:pl-14">
                    <code>
                      <span className="text-violet-400">pragma</span>{" "}
                      <span className="text-blue-400">solidity</span> ^0.8.0;
                      {"\n\n"}
                      <span className="text-violet-400">contract</span>{" "}
                      <span className="text-green-400">EduchainLab</span> {"{"}
                      {"\n"}
                      {"    "}
                      <span className="text-blue-400">
                        mapping
                      </span>(address {"=>"} uint256){" "}
                      <span className="text-blue-400">public</span> userScores;
                      {"\n"}
                      {"    "}
                      <span className="text-blue-400">address</span>{" "}
                      <span className="text-blue-400">public</span> owner;{"\n"}
                      {"    "}
                      <span className="text-blue-400">event</span>{" "}
                      ScoreUpdated(address user, uint256 score);{"\n\n"}
                      {"    "}
                      <span className="text-violet-400">
                        constructor
                      </span>() {"{"}
                      {"\n"}
                      {"        "}owner = msg.sender;{"\n"}
                      {"    "}
                      {"}"}
                      {"\n\n"}
                      {"    "}
                      <span className="text-violet-400">function</span>{" "}
                      updateScore(<span className="text-blue-400">address</span>{" "}
                      user, <span className="text-blue-400">uint256</span>{" "}
                      score) <span className="text-blue-400">public</span> {"{"}
                      {"\n"}
                      {"        "}
                      <span className="text-violet-400">require</span>
                      (msg.sender == owner,{" "}
                      <span className="text-green-400">
                        "Only owner can update scores"
                      </span>
                      );{"\n"}
                      {"        "}userScores[user] = score;{"\n"}
                      {"        "}
                      <span className="text-violet-400">emit</span>{" "}
                      ScoreUpdated(user, score);{"\n"}
                      {"    "}
                      {"}"}
                      {"\n"}
                      {"}"}
                    </code>
                  </pre>
                </div>

                {/* Added status bar with mobile optimizations */}
                <div className="flex items-center justify-between mt-1 sm:mt-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-800/50 rounded text-[10px] xs:text-xs text-gray-400">
                  <div className="flex items-center">
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full mr-1 sm:mr-2"></div>
                    <span>Compiled successfully</span>
                  </div>
                  <div className="hidden xs:flex items-center space-x-2 sm:space-x-4">
                    <span>Ln 9, Col 22</span>
                    <span>UTF-8</span>
                    <span>Solidity</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges - repositioned for mobile */}
            <motion.div
              className="absolute right-4 top-20 sm:top-24 lg:top-30 hidden lg:flex items-center justify-center bg-purple-600 backdrop-blur rounded-lg px-2 py-0.5 sm:px-2.5 sm:py-1 shadow-lg shadow-violet-800/20"
              initial={{ opacity: 0, y: 20, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <span className="text-[10px] xs:text-xs text-white font-medium">
                Solidity Editor
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Added animated scrolling indicator - hidden on very small screens */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 hidden xs:flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: -10, x: "-50%" }}
        animate={{ opacity: 0.7, y: 0, x: "-50%" }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <span className="text-xs text-gray-400 mb-2">Scroll to explore</span>
        <motion.div
          className="w-4 sm:w-5 h-6 sm:h-8 border-2 border-gray-400 rounded-full flex justify-center"
          animate={{
            borderColor: [
              "rgba(139, 92, 246, 0.3)",
              "rgba(139, 92, 246, 0.6)",
              "rgba(139, 92, 246, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-1 bg-violet-400 rounded-full mt-1"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
