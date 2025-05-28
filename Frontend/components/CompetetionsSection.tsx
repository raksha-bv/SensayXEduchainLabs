"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  DollarSign,
  ArrowRight,
  Plus,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Code,
  Zap,
  TrendingUp,
  Users,
  ChevronRight,
  Filter,
  AlertTriangle,
} from "lucide-react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/utils/contract_constants2";
import { useOCAuth } from "@opencampus/ocid-connect-js";

interface ChallengeSummary {
  challengeId: number;
  creatorName: string;
  title: string;
  description: string;
  requirements: string; // Add this field
  bountyAmount: string;
  challengeStatus: number;
  submissionsCount: number;
  startTime: number;
  duration: number;
  tags: string[];
  winner: string; // Add this field
}

// Define window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

enum Status {
  waiting = 0,
  completed = 1,
  cancelled = 2,
  expired = 3,
}

const CompetitionsPage = () => {
  const [filter, setFilter] = useState<Status | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [challenges, setChallenges] = useState<ChallengeSummary[]>([]);
  const [totalBountyAmount, setTotalBountyAmount] = useState<string>("0");
  const [activeChallengesCount, setActiveChallengesCount] = useState<number>(0);
  const [totalSubmissions, setTotalSubmissions] = useState<number>(0);
  const { isInitialized, authState , ocAuth  }  = useOCAuth();
  let authData: { ethAddress: string } | null = null;
  if (isInitialized && authState.isAuthenticated) {
    authData = ocAuth.getAuthState();
  }
  

  // Filter challenges based on status and search query
  const filteredChallenges = challenges.filter((challenge) => {
    // Filter by status
    const statusFilter =
      filter === "all" || challenge.challengeStatus === filter;

    // Filter by search query
    const searchFilter =
      searchQuery === "" ||
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return statusFilter && searchFilter;
  });

  // Calculate time remaining for challenge
  const calculateTimeRemaining = (
    startTime: number,
    duration: number
  ): string => {
    const now = Math.floor(Date.now() / 1000);
    const endTime = startTime + duration;
    const remainingSeconds = endTime - now;

    if (remainingSeconds <= 0) return "Expired";

    const days = Math.floor(remainingSeconds / (24 * 60 * 60));
    return days > 0 ? `${days} days left` : "Less than a day";
  };

  useEffect(() => {
    
    const fetchChallenges = async () => {
      try {
        // Check if Ethereum is available
        if (typeof window.ethereum !== "undefined") {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            provider
          );

          // Get active challenges
          const activeChallenges = await contract.getActiveChallenges();
          const completedChallenges = await contract.getCompletedChallenges();
          const cancelledChallenges = await contract.getCancelledChallenges();
          const expiredChallenges = await contract.getExpiredChallenges();
          const allChallenges = [
            ...activeChallenges,
            ...completedChallenges,
            ...cancelledChallenges,
            ...expiredChallenges,
          ];
          let challengesArray: ChallengeSummary[] = [];
          let totalBounty = 0;

          for (let i = 0; i < allChallenges.length; i++) {
            const challenge = allChallenges[i];
            const remainingTime = await contract.getChallengeRemainingTime(
              challenge.challengeId
            );

            // Convert challenge data to match your UI format
            challengesArray.push({
              challengeId: Number(challenge.challengeId),
              creatorName:
                challenge.creator.substring(0, 6) +
                "..." +
                challenge.creator.substring(38),
              title: challenge.title,
              description: challenge.description,
              requirements: challenge.requirements, // Add this field
              bountyAmount: ethers.formatEther(challenge.bountyAmount),
              challengeStatus: Number(challenge.challengeStatus),
              submissionsCount: Number(challenge.submissionsCount),
              startTime: Number(challenge.startTime),
              duration: Number(challenge.duration),
              winner: challenge.winner, // Add this field
              tags: challenge.tags || ["Blockchain", "Smart Contract"], // Use actual tags from contract
            });

            totalBounty += Number(ethers.formatEther(challenge.bountyAmount));
          }

          setChallenges(challengesArray);
          setTotalBountyAmount(totalBounty.toFixed(2));
          setActiveChallengesCount(challengesArray.length);

          // Get total submissions count
          const submissionsCount = await contract.totalSubmissionsCount();
          setTotalSubmissions(Number(submissionsCount));
        }
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges();
  }, []);

  const withdrawFunds = async () => {
    try {
      // Check if Ethereum is available
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer // Use signer instead of provider
        );

        // Show loading state (optional)
        // setIsWithdrawing(true);

        const tx = await contract.withdrawRewards();

        // Wait for transaction to be mined
        await tx.wait();

        // Optional: Show success message or update UI
        alert("Rewards successfully withdrawn!");

        // Optional: Refresh data after withdrawal
        // fetchChallenges();
      } else {
        alert("Please install MetaMask or another Ethereum wallet");
      }
    } catch (error : any) {
      console.error("Error withdrawing rewards:", error);
      alert(
        "Failed to withdraw rewards: " + (error.message || "Unknown error")
      );
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case Status.waiting:
        return <Clock className="w-4 h-4" />;
      case Status.completed:
        return <CheckCircle className="w-4 h-4" />;
      case Status.cancelled:
        return <XCircle className="w-4 h-4" />;
      case Status.expired:
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.waiting:
        return "text-yellow-400 bg-yellow-400/20";
      case Status.completed:
        return "text-green-400 bg-green-400/20";
      case Status.cancelled:
        return "text-red-400 bg-red-400/20";
      case Status.expired:
        return "text-orange-400 bg-orange-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  const getStatusText = (status: Status) => {
    switch (status) {
      case Status.waiting:
        return "Open";
      case Status.completed:
        return "Completed";
      case Status.cancelled:
        return "Cancelled";
      case Status.expired:
        return "Expired";
      default:
        return "Unknown";
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pt-5 ">
      {/* Background styling to match Hero section */}
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

      {/* Header area with title and stats */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate="show"
            variants={fadeIn}
          >
            <div className="mb-3">
              <span className="bg-violet-900/30 text-violet-400 text-xs font-medium px-3 py-1 rounded-full inline-block">
                Web3 Opportunities
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blockchain <span className="text-violet-400">Competitions</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Participate in challenges, solve real-world problems, and earn
              bounties while improving your blockchain skills
            </p>
          </motion.div>
          {/* Stats section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-900/60 backdrop-blur rounded-xl border border-violet-900/50 p-6 flex items-center">
              <div className="w-12 h-12 bg-violet-900/30 rounded-lg flex items-center justify-center mr-4">
                <Award className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Bounties</p>
                <h3 className="text-2xl font-bold text-white">
                  ${totalBountyAmount}
                </h3>
              </div>
            </div>
            <div className="bg-gray-900/60 backdrop-blur rounded-xl border border-violet-900/50 p-6 flex items-center">
              <div className="w-12 h-12 bg-violet-900/30 rounded-lg flex items-center justify-center mr-4">
                <Code className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Active Challenges</p>
                <h3 className="text-2xl font-bold text-white">
                  {activeChallengesCount}
                </h3>
              </div>
            </div>
            <div className="bg-gray-900/60 backdrop-blur rounded-xl border border-violet-900/50 p-6 flex items-center">
              <div className="w-12 h-12 bg-violet-900/30 rounded-lg flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Submissions</p>
                <h3 className="text-2xl font-bold text-white">
                  {totalSubmissions}+
                </h3>
              </div>
            </div>
          </motion.div>
          {/* Filter and search bar */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full md:w-auto bg-gray-900/60 backdrop-blur p-1 rounded-lg border border-violet-900/30 flex items-center">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 text-sm rounded-md transition-colors flex items-center ${
                    filter === "all"
                      ? "bg-violet-700 text-white"
                      : "hover:bg-gray-800 text-gray-300"
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  All
                </button>
                <button
                  onClick={() => setFilter(Status.waiting)}
                  className={`px-4 py-2 text-sm rounded-md transition-colors flex items-center ${
                    filter === Status.waiting
                      ? "bg-violet-700 text-white"
                      : "hover:bg-gray-800 text-gray-300"
                  }`}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Open
                </button>
                <button
                  onClick={() => setFilter(Status.completed)}
                  className={`px-4 py-2 text-sm rounded-md transition-colors flex items-center ${
                    filter === Status.completed
                      ? "bg-violet-700 text-white"
                      : "hover:bg-gray-800 text-gray-300"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completed
                </button>
              </div>

              <div className="w-full md:w-64 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full bg-gray-900/60 backdrop-blur border border-violet-900/30 rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                  placeholder="Search challenges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Link
              href="/create-bounty"
              className="w-full md:w-auto px-5 py-2.5 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center group"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Bounty
              <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredChallenges.map((challenge: ChallengeSummary) => (
              <motion.div
                key={challenge.challengeId}
                variants={item}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-gray-900/60 backdrop-blur rounded-xl border border-violet-900/50 overflow-hidden transition-all hover:shadow-lg hover:shadow-violet-900/20 hover:border-violet-700/70 flex flex-col h-[340px]" // Reduced fixed height
              >
                {/* Card header with badge */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 ${getStatusColor(
                        challenge.challengeStatus as Status
                      )}`}
                    >
                      {getStatusIcon(challenge.challengeStatus as Status)}
                      {getStatusText(challenge.challengeStatus as Status)}
                    </div>
                    <div className="flex items-center text-violet-400 font-medium">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {challenge.bountyAmount} EDU
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-white line-clamp-1">
                    {challenge.title}
                  </h3>
                  <div className="h-[48px] overflow-hidden">
                    {" "}
                    {/* Reduced height for description container */}
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {" "}
                      {/* Changed to line-clamp-2 */}
                      {challenge.description}
                    </p>
                  </div>

                  {challenge.winner &&
                    challenge.winner !==
                      "0x0000000000000000000000000000000000000000" && (
                      <div className="mt-2 flex items-center justify-between text-xs text-green-400 mb-2">
                        <div className="flex items-center">
                          <Award className="w-3 h-3 mr-1.5" />
                          <span>
                            Winner:{" "}
                            {challenge.winner.substring(0, 6) +
                              "..." +
                              challenge.winner.substring(38)}
                          </span>
                        </div>
                        {authData &&
                          authData.ethAddress === challenge.winner && (
                            <button
                              onClick={withdrawFunds}
                              className="bg-green-500 text-white px-2 p-1 rounded-md"
                            >
                              Claim Reward
                            </button>
                          )}
                      </div>
                    )}

                  {/* Challenge attributes */}
                  <div className="grid grid-cols-2 gap-3 mt-4 mb-2">
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="w-3 h-3 mr-1.5 text-gray-500" />
                      <span>
                        {calculateTimeRemaining(
                          challenge.startTime,
                          challenge.duration
                        )}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Users className="w-3 h-3 mr-1.5 text-gray-500" />
                      <span>{challenge.submissionsCount} submissions</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Zap className="w-3 h-3 mr-1.5 text-gray-500" />
                      <span>
                        {Number(challenge.bountyAmount) > 1500
                          ? "Advanced"
                          : Number(challenge.bountyAmount) > 500
                          ? "Intermediate"
                          : "Beginner"}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Code className="w-3 h-3 mr-1.5 text-gray-500" />
                      <span>{challenge.tags[0] || "Blockchain"}</span>
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div className="border-t border-gray-800 p-4 bg-gray-900/40 flex justify-between items-center mt-auto">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center mr-2 text-xs font-bold">
                      {challenge.creatorName.charAt(0)}
                    </div>
                    <div className="text-gray-400 text-sm">
                      By{" "}
                      <span className="text-violet-400">
                        {challenge.creatorName}
                      </span>
                    </div>
                  </div>
                  <Link
                    key={challenge.challengeId}
                    href={`/challenges/${challenge.challengeId}`}
                  >
                    <div className="text-violet-400 text-sm font-medium hover:text-violet-300 transition-colors flex items-center">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* Empty state with improved design */}
          {filteredChallenges.length === 0 && (
            <motion.div
              className="bg-gray-900/60 backdrop-blur rounded-xl border border-violet-900/50 p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-gray-400 mb-4 bg-violet-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-violet-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                No challenges found
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                We couldn't find any challenges matching your current filters.
                Try adjusting your search criteria or check back later for new
                opportunities.
              </p>
              <button
                onClick={() => {
                  setFilter("all");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 bg-violet-700 hover:bg-violet-600 text-white text-sm font-medium rounded-lg transition-colors inline-flex items-center"
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear Filters
              </button>
            </motion.div>
          )}
          {/* Call to action section */}
          {/* {filteredChallenges.length > 0 && (
            <motion.div
              className="mt-16 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="bg-gray-900/60 backdrop-blur p-8 rounded-xl border border-violet-900/50 max-w-3xl mx-auto text-center relative overflow-hidden">

                <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-600 rounded-full filter blur-3xl opacity-20"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-600 rounded-full filter blur-3xl opacity-20"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">
                    Ready to showcase your skills?
                  </h3>
                  <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                    Create your own blockchain challenge and offer bounties to
                    talented developers. Define your requirements, set your
                    rewards, and find the perfect solution.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/create-bounty"
                      className="px-6 py-3 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center group"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create a Bounty
                      <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/challenges"
                      className="px-6 py-3 bg-transparent border border-violet-700 hover:bg-violet-900/30 text-violet-400 font-medium rounded-lg transition-all flex items-center justify-center"
                    >
                      <Award className="w-4 h-4 mr-2" />
                      View All Challenges
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )} */}
        </div>
      </div>

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
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

export default CompetitionsPage;
