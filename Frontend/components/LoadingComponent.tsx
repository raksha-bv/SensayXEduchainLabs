"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo"; // Updated import path

const LoadingPage = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulated loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 800);

    // Optional: Add a timeout redirect if loading takes too long
    const timeoutId = setTimeout(() => {
      // You could implement a redirect or error state here
      console.log("Loading is taking longer than expected");
    }, 15000); // 15 seconds timeout

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 backdrop-blur z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(124,58,237,0.2),transparent_80%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.15),transparent_80%)]"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[radial-gradient(circle,_rgba(0,237,190,0.1),transparent_70%)]"></div>

        {/* Enhanced grid pattern */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(124,58,237,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,58,237,0.15) 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
          }}
        ></div>

        {/* More animated floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0
                ? "bg-violet-400/30"
                : i % 3 === 1
                ? "bg-indigo-400/30"
                : "bg-cyan-400/30"
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
            animate={{
              y: [0, Math.random() * 200 - 100],
              x: [0, Math.random() * 200 - 100],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Glowing orbs in the background */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-violet-500/5 blur-3xl"
          style={{ top: "20%", left: "15%" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl"
          style={{ bottom: "10%", right: "10%" }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Logo Component */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
          className="mb-8 relative"
          style={{ transform: "scale(3)" }} // Tripled logo size
        >
          <motion.div
            className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <Logo />
        </motion.div>

        {/* Title with animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight"
        >
          <motion.span
            className="text-violet-400"
            animate={{
              textShadow: [
                "0 0 4px rgba(167, 139, 250, 0)",
                "0 0 8px rgba(167, 139, 250, 0.5)",
                "0 0 4px rgba(167, 139, 250, 0)",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Educhain
          </motion.span>{" "}
          <span className="relative">
            Labs
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-400"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </span>
        </motion.h1>

        {/* Loading indicator with progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex flex-col items-center w-64"
        >
          <p className="text-gray-300 mb-4 text-lg font-medium">
            Authenticating with OCID
          </p>

          {/* Progress bar */}
          <motion.div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
              initial={{ width: "0%" }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </motion.div>

          {/* Loading dots */}
          <div className="flex space-x-3">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="h-4 w-4 rounded-full bg-violet-500"
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1, 0.8],
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom message with typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-14 text-gray-400 max-w-xs text-center"
        >
          <p className="text-sm mb-1">
            You'll be redirected once authentication is complete
          </p>
          <motion.div
            className="text-xs text-cyan-400/70"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            Verifying credentials...
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Footer with version number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 text-xs text-gray-500"
      >
        v1.0.4
      </motion.div>
    </div>
  );
};

export default LoadingPage;
