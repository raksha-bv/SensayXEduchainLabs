"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  Send,
  Shield,
  Rocket,
  CheckCircle,
  Users,
  Zap,
} from "lucide-react";

const EarlyAccessPage = () => {
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get form data
      const formData = {
        email,
        name: (document.getElementById("name") as HTMLInputElement).value,
        experience,
        interests: (document.getElementById("interests") as HTMLTextAreaElement)
          .value,
        newsletter: (document.getElementById("newsletter") as HTMLInputElement)
          .checked,
      };

      // Send data to API
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Background elements similar to other pages */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(124,58,237,0.15),transparent_70%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(124,58,237,0.1),transparent_70%)]"></div>

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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header with back button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>

          <div className="text-center mb-6">
            <span className="bg-violet-900/30 text-violet-400 text-xs font-medium px-3 py-1 rounded-full inline-block mb-4">
              Limited Spots Available
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Join the <span className="text-violet-400">Waitlist</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Be among the first developers to access our blockchain learning
              platform. Get exclusive early access to courses, interactive
              coding environments, and community features.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Form section */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-violet-900/50 overflow-hidden shadow-xl shadow-violet-900/20"
            >
              {/* Top decorative code line */}
              <div className="bg-gray-950/80 px-4 py-1.5 border-b border-violet-900/30">
                <code className="text-xs text-gray-400 font-mono">
                  <span className="text-violet-400">async function</span>{" "}
                  <span className="text-green-400">joinWaitlist</span>(
                  <span className="text-orange-400">userData</span>) {"{"}
                  <span className="text-blue-400"> await </span>
                  <span className="text-green-400">Educhain</span>.
                  <span className="text-green-400">labs</span>.
                  <span className="text-green-400">register</span>(userData);
                  {"}"}
                </code>
              </div>

              <div className="p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-900/30 rounded-full mb-4">
                      <CheckCircle className="w-8 h-8 text-violet-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      You're on the list!
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Thanks for joining our waitlist. We'll be in touch soon
                      with your exclusive access link.
                    </p>
                    <Link
                      href="/courses"
                      className="inline-flex items-center px-6 py-3 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors"
                    >
                      Browse Sample Courses
                    </Link>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-2"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full bg-gray-800/60 border border-gray-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                        placeholder="your@email.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-2"
                        htmlFor="name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full bg-gray-800/60 border border-gray-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-2"
                        htmlFor="experience"
                      >
                        Blockchain Experience Level
                      </label>
                      <select
                        id="experience"
                        className="w-full bg-gray-800/60 border border-gray-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 rounded-lg px-4 py-3 text-white appearance-none"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 0.5rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        <option
                          value=""
                          disabled
                          className="bg-gray-800 text-white"
                        >
                          Select your experience level
                        </option>
                        <option
                          value="beginner"
                          className="bg-gray-800 text-white"
                        >
                          Beginner - New to blockchain
                        </option>
                        <option
                          value="intermediate"
                          className="bg-gray-800 text-white"
                        >
                          Intermediate - Some experience
                        </option>
                        <option
                          value="advanced"
                          className="bg-gray-800 text-white"
                        >
                          Advanced - Professional experience
                        </option>
                      </select>
                    </div>

                    <div className="mb-6">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-2"
                        htmlFor="interests"
                      >
                        What interests you most? (Optional)
                      </label>
                      <textarea
                        id="interests"
                        rows={3}
                        className="w-full bg-gray-800/60 border border-gray-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                        placeholder="I'm interested in smart contract development, DeFi protocols, etc."
                      ></textarea>
                    </div>

                    <div className="flex items-start mb-8">
                      <div className="flex items-center h-5">
                        <input
                          id="newsletter"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-violet-600 checked:bg-violet-600 checked:border-violet-600"
                          defaultChecked
                        />
                      </div>
                      <label
                        htmlFor="newsletter"
                        className="ml-2 text-sm text-gray-400"
                      >
                        Keep me updated with blockchain development news and
                        tutorials
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full px-6 py-3 ${
                        loading
                          ? "bg-violet-800"
                          : "bg-violet-700 hover:bg-violet-600"
                      } text-white font-medium rounded-lg transition-colors flex items-center justify-center group`}
                    >
                      {loading ? (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <>
                          Join Waitlist
                          <Send className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar with benefits */}
          <div className="lg:w-96">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-violet-900/50 overflow-hidden shadow-xl shadow-violet-900/20"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  Early Access Benefits
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mt-1 bg-violet-900/30 p-2 rounded-lg mr-3">
                      <Rocket className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Priority Access
                      </h4>
                      <p className="text-sm text-gray-400">
                        Be the first to try our interactive Solidity editor and
                        project environments
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="mt-1 bg-violet-900/30 p-2 rounded-lg mr-3">
                      <Shield className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Exclusive Content
                      </h4>
                      <p className="text-sm text-gray-400">
                        Access to beta courses and learning materials before
                        public release
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="mt-1 bg-violet-900/30 p-2 rounded-lg mr-3">
                      <Users className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Community Access
                      </h4>
                      <p className="text-sm text-gray-400">
                        Join our private Discord for direct access to
                        instructors and other blockchain developers
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="mt-1 bg-violet-900/30 p-2 rounded-lg mr-3">
                      <Zap className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Founding Member Status
                      </h4>
                      <p className="text-sm text-gray-400">
                        Permanent recognition as a founding member with special
                        platform badges
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Testimonial/quote section */}
              <div className="border-t border-gray-800 p-6 bg-gray-900/40">
                <blockquote className="italic text-gray-300 text-sm">
                  "The interactive coding environment and AI assistance make
                  learning Solidity much more intuitive than any other platform
                  I've tried."
                </blockquote>
                <div className="mt-3 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-violet-800 flex items-center justify-center text-xs font-medium">
                    PG
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium">Parth Gupta</p>
                    <p className="text-xs text-gray-500">
                      Blockchain Developer
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccessPage;
