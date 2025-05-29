"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="px-6 py-20 relative overflow-hidden">
      {/* Similar background to match the hero section */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(124,58,237,0.15),transparent_70%)]"></div>

        {/* Grid pattern similar to hero */}
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
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-violet-400/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 80 - 40],
                x: [0, Math.random() * 80 - 40],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-violet-900/50 overflow-hidden shadow-xl shadow-violet-900/20">
          {/* Top decorative code line */}
          <div className="bg-gray-950/80 px-4 py-1.5 border-b border-violet-900/30">
            <code className="text-xs text-gray-400 font-mono">
              <span className="text-violet-400">function</span>{" "}
              <span className="text-green-400">joinSensayLabs</span>() {"{"}
              <span className="text-blue-400"> return </span>
              <span className="text-orange-400">
                "Build the future of Web3"
              </span>
              ; {"}"}
            </code>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div
                className="text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="bg-violet-900/30 text-violet-400 text-xs font-medium px-3 py-1 rounded-full inline-block mb-4">
                  Early Access
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  Be Among the <span className="text-violet-400">First</span> to
                  Join
                </h2>
                <p className="text-gray-300 max-w-xl">
                  We're launching our blockchain development platform soon. Sign
                  up for early access to our interactive editor, hands-on
                  projects, and become part of our founding community of
                  developers.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  href="/early-access"
                  className="px-6 py-3 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center min-w-36 group"
                >
                  Join Waitlist
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
                  href="/about"
                  className="px-6 py-3 bg-transparent border border-violet-700 hover:bg-violet-900/30 text-violet-400 font-medium rounded-lg transition-all flex items-center justify-center min-w-36"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>

            {/* Features section instead of stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex items-start space-x-3">
                <div className="mt-1 bg-violet-900/30 p-2 rounded-lg">
                  <svg
                    className="w-5 h-5 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white">Interactive Editor</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Write and compile Solidity code directly in your browser
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="mt-1 bg-violet-900/30 p-2 rounded-lg">
                  <svg
                    className="w-5 h-5 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white">Guided Learning</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Step-by-step tutorials from Web3 basics to advanced smart
                    contracts
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="mt-1 bg-violet-900/30 p-2 rounded-lg">
                  <svg
                    className="w-5 h-5 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white">AI Assistance</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Get real-time code suggestions and explanations as you learn
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
