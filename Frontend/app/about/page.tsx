"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BackButton from "@/components/BackButton";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <BackButton />
      {/* Header section with background effects */}
      <section className="px-6 py-20 relative overflow-hidden">
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
                Our Journey
              </span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              About <span className="text-violet-400">Sensay Lab</span>
            </h1>
            <p className="text-gray-300 md:text-lg mb-8">
              A Web3 learning platform built by students, for students
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-4xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6 text-violet-400">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Hey there! We're two undergraduate students who were frustrated
                with the lack of accessible, hands-on resources for learning
                blockchain development. So we decided to build our own.
              </p>
              <p>
                What started as a weekend project quickly evolved into
                Blockchain Lab - a comprehensive platform where anyone can dive
                into the world of Web3, experiment with smart contracts, and
                learn by doing.
              </p>
              <p>
                We built this during late-night coding sessions, fueled by
                energy drinks and a shared passion for decentralized
                technologies. No venture funding, no corporate backing - just
                two students who wanted to make blockchain development more
                accessible to everyone.
              </p>
            </div>

            <div className="mt-8 bg-gray-900/60 backdrop-blur p-5 rounded-xl border border-violet-900/50">
              <h3 className="text-xl font-semibold mb-3">Meet the Builders</h3>
              <div className="space-y-4">
                <div className="flex flex-col items-start">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-violet-700 rounded-full flex items-center justify-center text-lg font-bold mr-3 text-white">
                      A
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Aditya Anand</h4>
                      <div className="flex space-x-2">
                        <Link
                          href="https://github.com/AdityaAnandCodes"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-400 hover:underline flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </Link>
                        <Link
                          href="https://www.linkedin.com/in/adityaanand-sahil/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-400 hover:underline flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-violet-700 rounded-full flex items-center justify-center text-lg font-bold mr-3 text-white">
                      R
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Raksha B V</h4>
                      <div className="flex space-x-2">
                        <Link
                          href="https://github.com/raksha-bv"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-400 hover:underline flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </Link>
                        <Link
                          href="https://www.linkedin.com/in/raksha-bv/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-400 hover:underline flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6 text-violet-400">
              What We've Built
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-900/60 backdrop-blur p-5 rounded-xl border border-violet-900/50">
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 mr-2 text-violet-400"
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
                  <h3 className="font-semibold">Interactive Code Editor</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Write, compile and deploy Solidity smart contracts in
                  real-time. Immediate feedback helps you learn faster with no
                  setup required.
                </p>
              </div>

              <div className="bg-gray-900/60 backdrop-blur p-5 rounded-xl border border-violet-900/50">
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 mr-2 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <h3 className="font-semibold">NFT Certificates</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Complete courses and earn NFT certificates to prove your
                  skills. Showcase your blockchain expertise directly on-chain.
                </p>
              </div>

              <div className="bg-gray-900/60 backdrop-blur p-5 rounded-xl border border-violet-900/50">
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 mr-2 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <h3 className="font-semibold">AI-Powered Assistant</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Got stuck? Our Web3 expert chatbot helps debug your code,
                  explains blockchain concepts, and offers personalized
                  guidance.
                </p>
              </div>

              <div className="bg-gray-900/60 backdrop-blur p-5 rounded-xl border border-violet-900/50">
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 mr-2 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <h3 className="font-semibold">Practice Arena</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Sharpen your skills with our LeetCode-style challenges for
                  blockchain. Solve real-world problems with AI-generated hints
                  and validation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Our vision */}
        <motion.div
          className="mt-16 p-6 bg-gray-900/40 backdrop-blur rounded-xl border border-violet-900/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Our Vision</h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto">
            We believe blockchain technology should be accessible to everyone.
            Our goal is to lower the barrier to entry for Web3 development and
            build a community of skilled blockchain developers who can shape the
            decentralized future.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/practice"
              className="px-5 py-2.5 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center group"
            >
              Try Our Editor
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
            {/* <Link
              href="/contact"
              className="px-5 py-2.5 bg-transparent border border-violet-700 hover:bg-violet-900/30 text-violet-400 font-medium rounded-lg transition-all flex items-center justify-center"
            >
              Get in Touch
            </Link> */}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
