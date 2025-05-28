"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Plus,
  Award,
  Clock,
  X,
  DollarSign,
  FileText,
  Tag,
  Calendar,
  CheckCircle,
  AlertCircle,
  ListPlus,
} from "lucide-react";
import BackButton from "@/components/BackButton";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/utils/contract_constants2";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const CreateChallengePage = () => {
  // Form state
  const [formData, setFormData] = useState({
    creatorName: "",
    title: "",
    description: "",
    problemStatement: "",
    currentRequirement: "",
    requirements: [] as string[],
    bountyAmount: "",
    durationInDays: "",
    currentTag: "",
    tags: [] as string[],
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTag = () => {
    if (
      formData.currentTag.trim() &&
      !formData.tags.includes(formData.currentTag.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: "",
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: any) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddRequirement = () => {
    if (
      formData.currentRequirement.trim() &&
      !formData.requirements.includes(formData.currentRequirement.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, prev.currentRequirement.trim()],
        currentRequirement: "",
      }));
    }
  };

  const handleRemoveRequirement = (reqToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((req) => req !== reqToRemove),
    }));
  };

  const handleKeyDown = (e: any, type: "tag" | "requirement") => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (type === "tag") {
        handleAddTag();
      } else {
        handleAddRequirement();
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validate form data
      if (
        !formData.creatorName ||
        !formData.title ||
        !formData.description ||
        !formData.bountyAmount ||
        !formData.durationInDays
      ) {
        throw new Error("Please fill all required fields");
      }

      if (formData.requirements.length === 0) {
        throw new Error("Please add at least one requirement");
      }

      if (formData.tags.length === 0) {
        throw new Error("Please add at least one tag");
      }

      if (parseFloat(formData.bountyAmount) <= 0) {
        throw new Error("Bounty amount must be greater than 0");
      }

      if (parseInt(formData.durationInDays) <= 0) {
        throw new Error("Duration must be greater than 0 days");
      }

      // Check if Ethereum is available
      if (!window.ethereum) {
        throw new Error(
          "Ethereum wallet not detected. Please install MetaMask."
        );
      }

      // Connect to the wallet
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      // Create contract instance
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      // Convert bounty amount to wei (assuming the input is in ETH)
      const bountyAmountWei = ethers.parseEther(formData.bountyAmount);

      // Join requirements into a single string
      const requirementsString = formData.requirements.join("&&");

      // Call the createChallenge function
      const tx = await contract.createChallenge(
        formData.title,
        formData.description,
        requirementsString, // Passing requirements as a single string
        formData.tags,
        bountyAmountWei,
        parseInt(formData.durationInDays),
        { value: bountyAmountWei } // Send EDU with the transaction
      );

      console.log("Transaction submitted:", tx.hash);

      // Wait for transaction to be mined
      await tx.wait();
      console.log("Transaction confirmed");

      // Success!
      setFormSubmitted(true);
    } catch (err) {
      setError("Failed to create challenge. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <BackButton />
      {/* Background styling */}
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
      </div>

      {/* Content area */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            animate="show"
            variants={fadeIn}
          >
            <div className="mb-3">
              <span className="bg-violet-900/30 text-violet-400 text-xs font-medium px-3 py-1 rounded-full inline-block">
                Create New Challenge
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Launch Your <span className="text-violet-400">Blockchain</span>{" "}
              Challenge
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Create a bounty for the community to solve. Define your problem,
              set a reward, and discover innovative solutions.
            </p>
          </motion.div>

          {formSubmitted ? (
            <motion.div
              className="bg-gray-900/60 backdrop-blur rounded-xl border border-violet-900/50 p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-green-400 mb-4 bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                Challenge Created Successfully!
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Your challenge "{formData.title}" has been created and is now
                live on the blockchain. The community can now view and submit
                solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/challenges"
                  className="px-5 py-2.5 bg-violet-700 hover:bg-violet-600 text-white text-sm font-medium rounded-lg transition-colors inline-flex items-center"
                >
                  <Award className="w-4 h-4 mr-2" />
                  View All Challenges
                </Link>
                <Link
                  href="/"
                  className="px-5 py-2.5 bg-transparent border border-violet-700 hover:bg-violet-900/30 text-violet-400 text-sm font-medium rounded-lg transition-all inline-flex items-center"
                >
                  Return to Home
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="bg-gray-900/60 backdrop-blur rounded-xl border border-violet-900/50 p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {error && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-900/50 rounded-lg flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Creator Name *
                  </label>
                  <input
                    type="text"
                    name="creatorName"
                    value={formData.creatorName}
                    onChange={handleChange}
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    placeholder="Your name or organization"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Challenge Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    placeholder="Concise, descriptive title"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Brief Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                  placeholder="A short summary of your challenge (displayed in challenge cards) which clearly explains the problem statement"
                  required
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <ListPlus className="w-4 h-4 inline mr-1" />
                  Technical Requirements *
                </label>
                <div className="flex items-center gap-4 mb-2">
                  <input
                    type="text"
                    name="currentRequirement"
                    value={formData.currentRequirement}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, "requirement")}
                    className="w-full flex-1 bg-gray-800/60 border border-gray-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    placeholder="Add a technical requirement"
                  />
                  <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="bg-violet-700 hover:bg-violet-600 text-white px-3 py-2.5 rounded-lg transition-colors border border-violet-700"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  Press Enter to add a requirement or click the plus button
                </p>

                <div className="flex flex-col gap-2 mt-2">
                  {formData.requirements.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-4 py-2 bg-gray-800/60 border border-gray-700 rounded-lg"
                    >
                      <span className="text-sm text-gray-300">{req}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRequirement(req)}
                        className="text-gray-500 hover:text-gray-300 focus:outline-none"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {formData.requirements.length === 0 && (
                    <div className="text-sm text-gray-500 italic px-4 py-3 bg-gray-800/30 border border-gray-800 rounded-lg">
                      No requirements added yet
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Bounty Amount (EDU) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="bountyAmount"
                      value={formData.bountyAmount}
                      onChange={handleChange}
                      min="0"
                      step="any"
                      className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                      placeholder="Amount in EDU"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    You'll need to pay this amount when submitting
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Duration (Days) *
                  </label>
                  <input
                    type="number"
                    name="durationInDays"
                    value={formData.durationInDays}
                    onChange={handleChange}
                    min="1"
                    max="365"
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    placeholder="Number of days challenge will be active"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Tag className="w-4 h-4 inline mr-1" />
                  Tags *
                </label>
                <div className="flex items-center gap-4 mb-2">
                  <input
                    type="text"
                    name="currentTag"
                    value={formData.currentTag}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, "tag")}
                    className="w-full flex-1 bg-gray-800/60 border border-gray-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    placeholder="e.g., Smart Contract, DeFi, NFT"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-violet-700 hover:bg-violet-600 text-white px-3 py-2.5 rounded-lg transition-colors border border-violet-700"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  Press Enter to add a tag or click the plus button
                </p>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-violet-900/30 text-violet-400 rounded-full border border-violet-800/40"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-violet-400 hover:text-violet-300 focus:outline-none"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {formData.tags.length === 0 && (
                    <div className="text-sm text-gray-500 italic">
                      No tags added yet
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-4 border-t border-gray-800 pt-6">
                <Link
                  href="/challenges"
                  className="px-5 py-2.5 bg-transparent border border-gray-700 hover:bg-gray-800 text-gray-300 font-medium rounded-lg transition-colors flex items-center justify-center"
                >
                  Cancel
                </Link>
                {/* <button
                  className="px-5 py-2.5 bg-transparent border border-gray-700 hover:bg-gray-800 text-gray-300 font-medium rounded-lg transition-colors flex items-center justify-center"
                  onClick={() => {
                    const requirementsString = formData.requirements.join("&&");
                    console.log(
                      formData.title,
                      formData.description,
                      requirementsString, // Passing requirements as a single string
                      formData.tags,
                      parseInt(formData.durationInDays)
                    );
                  }}
                >
                  Log Form Data
                </button> */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-5 py-2.5 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Processing...
                    </>
                  ) : (
                    <>
                      Create Challenge
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}

          {/* Helpful information section */}
          {!formSubmitted && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-gray-900/40 border border-violet-900/30 rounded-lg p-5">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Award className="w-5 h-5 text-violet-400 mr-2" />
                  Tips for creating effective challenges
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start">
                    <div className="bg-violet-900/20 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-violet-400 mt-0.5">
                      1
                    </div>
                    <p className="text-gray-300">
                      Be specific with your requirements and acceptance criteria
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-violet-900/20 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-violet-400 mt-0.5">
                      2
                    </div>
                    <p className="text-gray-300">
                      Set a reasonable bounty amount relative to the complexity
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-violet-900/20 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-violet-400 mt-0.5">
                      3
                    </div>
                    <p className="text-gray-300">
                      Include relevant background information and context
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-violet-900/20 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-violet-400 mt-0.5">
                      4
                    </div>
                    <p className="text-gray-300">
                      Use tags that accurately represent the technologies
                      involved
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
  );
};

export default CreateChallengePage;
