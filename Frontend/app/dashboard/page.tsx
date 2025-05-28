"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import {
  User,
  ChevronLeft,
  FileText,
  Trophy,
  TrendingUp,
  Activity,
  Award,
  Star,
  CheckCircle,
  BarChart2,
  Calendar,
  Code,
  Zap,
  Medal,
  Brain,
} from "lucide-react";

// Type for profile data
interface UserProfile {
  username: string;
  OCId: string;
  image: string;
  ethAddress: string;
  courseCompleted: number;
  submissions: number;
  acceptedSubmissions: number;
  AI_Scores: number[];
  Level: number;
  Achievement: string[];
  createdAt: string;
  updatedAt: string;
  memberSince?: string;
  lastActive?: string;
  averageAIScore?: number;
  acceptanceRate?: number;
}

// Achievement interface
interface Achievement {
  id: string;
  name: string;
  description: string;
  criteria: string;
  earned: boolean;
  progress: number;
  icon?: React.ReactNode;
}

const ProfilePage = () => {
  const { isInitialized, authState, ocAuth } = useOCAuth();
  const router = useRouter();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Fetch user profile data from API
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!isInitialized || !authState.isAuthenticated) {
          throw new Error("Authentication required");
        }

        const authData = ocAuth.getAuthState();
        if (!authData.OCId) {
          throw new Error("OCId not available");
        }

        const response = await fetch(
          `/api/users/profile?OCId=${encodeURIComponent(authData.OCId)}`
        );

        if (!response.ok) {
            console.log(response);
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();

        if (data.success) {
          setUserProfile(data.profile);

          // Create achievements data with progress
          const achievementsData = [
            {
              id: "Course Master",
              name: "Course Master",
              description: "Complete 5 or more courses",
              criteria: "courseCompleted >= 5",
              earned: data.profile.Achievement.includes("Course Master"),
              progress: Math.min(data.profile.courseCompleted / 5, 1),
              icon: <FileText className="w-4 h-4 text-yellow-400" />,
            },
            {
              id: "Submission Warrior",
              name: "Submission Warrior",
              description: "Submit 50 or more tasks",
              criteria: "submissions >= 50",
              earned: data.profile.Achievement.includes("Submission Warrior"),
              progress: Math.min(data.profile.submissions / 50, 1),
              icon: <Code className="w-4 h-4 text-blue-400" />,
            },
            {
              id: "Quality Coder",
              name: "Quality Coder",
              description: "Get 25 or more submissions accepted",
              criteria: "acceptedSubmissions >= 25",
              earned: data.profile.Achievement.includes("Quality Coder"),
              progress: Math.min(data.profile.acceptedSubmissions / 25, 1),
              icon: <CheckCircle className="w-4 h-4 text-green-400" />,
            },
            {
              id: "Rising Star",
              name: "Rising Star",
              description: "Reach level 5 or higher",
              criteria: "Level >= 5",
              earned: data.profile.Achievement.includes("Rising Star"),
              progress: Math.min(data.profile.Level / 5, 1),
              icon: <Star className="w-4 h-4 text-amber-400" />,
            },
            {
              id: "AI Prodigy",
              name: "AI Prodigy",
              description: "Get an average AI score of 90 or higher",
              criteria: "Average AI_Scores >= 90",
              earned: data.profile.Achievement.includes("AI Prodigy"),
              progress:
                data.profile.AI_Scores.length > 0
                  ? Math.min(
                      data.profile.AI_Scores.reduce((a: any, b: any) => a + b, 0) /
                        data.profile.AI_Scores.length /
                        90,
                      1
                    )
                  : 0,
              icon: <Brain className="w-4 h-4 text-violet-400" />,
            },
          ];
          setAchievements(achievementsData);
        } else {
          throw new Error(data.error || "Unknown error occurred");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isInitialized) {
      if (authState.isAuthenticated) {
        fetchUserProfile();
      } else {
        router.push("/login");
      }
    }
  }, [isInitialized, ocAuth, router]);

  // Format date function - handles invalid dates
  const formatDate = (dateString: any) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "N/A";
      }
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return "N/A";
    }
  };

  if (!isInitialized || loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg border border-violet-900/50 p-8 max-w-md w-full shadow-lg shadow-violet-900/20">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-center mt-4 text-gray-400">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg border border-violet-900/50 p-8 max-w-md w-full shadow-lg shadow-violet-900/20">
          <p className="text-center text-red-400">Error: {error}</p>
          <button
            onClick={() => router.push("/")}
            className="block w-full mt-4 text-center bg-violet-600 hover:bg-violet-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!authState.isAuthenticated || !userProfile) {
    return null;
  }

  // Get auth data for user information
  const authData = ocAuth.getAuthState();

  // Calculate last active date
  const lastActive = userProfile.lastActive || userProfile.updatedAt;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(124,58,237,0.15),transparent_70%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(109,40,217,0.1),transparent_70%)]"></div>
        <div className="absolute top-40 left-1/4 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-60 right-1/3 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl"></div>
        <div className="absolute pointer-events-none opacity-20 select-none">
          <svg width="100%" height="100%" className="absolute inset-0">
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(120, 50, 200, 0.1)"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
          <div className="text-sm bg-violet-900/30 px-3 py-1 rounded-full border border-violet-700/30">
            <span className="text-violet-300">Last Active: </span>
            <span className="text-gray-300">{formatDate(lastActive)}</span>
          </div>
        </div>

        {/* Profile title */}
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column - User profile & stats */}
          <div className="lg:col-span-4 space-y-6">
            {/* User profile card */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg border border-violet-900/50 p-6 shadow-lg shadow-violet-900/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-bl-full -mr-8 -mt-8"></div>

              <div className="flex flex-col items-center relative">
                {/* Profile image */}
                {userProfile.image ? (
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 blur-md opacity-50"></div>
                    <img
                      src={userProfile.image}
                      alt="Profile"
                      className="relative w-24 h-24 rounded-full border-4 border-violet-700 object-cover shadow-md shadow-violet-900/50"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 blur-md opacity-50"></div>
                    <div className="relative w-24 h-24 rounded-full bg-violet-900/30 border-4 border-violet-700 flex items-center justify-center shadow-md shadow-violet-900/50">
                      <User className="w-12 h-12 text-violet-400" />
                    </div>
                  </div>
                )}

                {/* User level badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  Level {userProfile.Level}
                </div>

                {/* User info */}
                <h1 className="text-xl font-bold mt-4">
                  {userProfile.username || authData.OCId}
                </h1>
                <p className="text-gray-400 text-sm">
                  {userProfile.ethAddress && userProfile.ethAddress !== authData.ethAddress && 
                    userProfile.ethAddress.slice(0, 6) + '...' + userProfile.ethAddress.slice(-4)}
                  {(!userProfile.ethAddress || userProfile.ethAddress === authData.ethAddress) && 
                    authData.ethAddress?.slice(0, 6) + '...' + authData.ethAddress?.slice(-4)}
                </p>

                {/* Member since badge */}
                <div className="flex items-center mt-2 bg-violet-900/20 px-3 py-1 rounded-full">
                  <Activity className="w-3 h-3 mr-1 text-violet-400" />
                  <span className="text-xs text-violet-300">
                    Member since{" "}
                    {formatDate(
                      userProfile.memberSince || userProfile.createdAt
                    )}
                  </span>
                </div>
                
                {/* OCID Connected Badge */}
                {/* <div className="flex items-center mt-2 bg-violet-900/20 px-3 py-1 rounded-full">
                  <span className="text-xs text-violet-300">
                    OCID: {authData.OCId?.slice(0, 10)}...
                  </span>
                </div> */}
              </div>

              {/* User stats */}
              <div className="grid grid-cols-2 gap-4 w-full mt-6">
                <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-violet-900/20 hover:border-violet-700/40 transition-colors group">
                  <div className="flex items-center justify-center mb-2 text-violet-400 group-hover:text-violet-300 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold group-hover:text-white transition-colors">
                    {userProfile.courseCompleted}
                  </p>
                  <p className="text-xs text-gray-400">Courses Completed</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-violet-900/20 hover:border-violet-700/40 transition-colors group">
                  <div className="flex items-center justify-center mb-2 text-violet-400 group-hover:text-violet-300 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold group-hover:text-white transition-colors">
                    {userProfile.submissions}
                  </p>
                  <p className="text-xs text-gray-400">Total Submissions</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-violet-900/20 hover:border-violet-700/40 transition-colors group">
                  <div className="flex items-center justify-center mb-2 text-violet-400 group-hover:text-violet-300 transition-colors">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold group-hover:text-white transition-colors">
                    {userProfile.acceptedSubmissions}
                  </p>
                  <p className="text-xs text-gray-400">Accepted Submissions</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-violet-900/20 hover:border-violet-700/40 transition-colors group">
                  <div className="flex items-center justify-center mb-2 text-violet-400 group-hover:text-violet-300 transition-colors">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold group-hover:text-white transition-colors">
                    {userProfile.averageAIScore || 0}
                  </p>
                  <p className="text-xs text-gray-400">Avg. AI Score</p>
                </div>
              </div>
            </div>

            {/* Achievements Section */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg border border-violet-900/50 overflow-hidden shadow-lg shadow-violet-900/10">
              <div className="p-4 border-b border-violet-900/20 bg-violet-900/20">
                <h2 className="text-base font-semibold flex items-center">
                  <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                  Achievements
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {userProfile.Achievement &&
                  userProfile.Achievement.length > 0 ? (
                    userProfile.Achievement.map((achievementId, index) => {
                      const achievementData = achievements.find(
                        (a) => a.id === achievementId
                      );
                      return (
                        <div
                          key={index}
                          className="flex items-center p-2 bg-gray-800/50 rounded-lg border border-violet-900/20"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            {achievementData?.icon || (
                              <Trophy className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium">
                              {achievementId}
                            </h3>
                            <p className="text-xs text-gray-400">
                              {achievementData?.description ||
                                "Achievement unlocked"}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-4 text-gray-400">
                      No achievements earned yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Submission Stats Card */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg border border-violet-900/50 p-6 shadow-lg shadow-violet-900/10">
              <h2 className="text-base font-semibold mb-4 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-violet-400" />
                Submission Analytics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-violet-900/20">
                  <p className="text-3xl font-bold">
                    {userProfile.submissions}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Total Submissions
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-violet-900/20">
                  <p className="text-3xl font-bold">
                    {userProfile.acceptedSubmissions}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Accepted</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-violet-900/20">
                  <p className="text-3xl font-bold">
                    {userProfile.acceptanceRate || 0}%
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Acceptance Rate</p>
                </div>
              </div>

              {/* Submission quality visualization */}
              <div className="relative pt-3">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-gray-400">
                    Submission Quality
                  </span>
                </div>
                <div className="w-full h-6 bg-gray-800 rounded-lg overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-l-lg"
                    style={{ width: `${userProfile.acceptanceRate || 0}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                    {userProfile.acceptanceRate || 0}% acceptance rate
                  </div>
                </div>
              </div>
            </div>

            {/* AI Score Analytics Card */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg border border-violet-900/50 p-6 shadow-lg shadow-violet-900/10">
              <h2 className="text-base font-semibold mb-4 flex items-center">
                <Brain className="w-4 h-4 mr-2 text-violet-400" />
                AI Score Analytics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-violet-900/20">
                  <p className="text-3xl font-bold">
                    {userProfile.averageAIScore || 0}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Average AI Score</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-violet-900/20">
                  <p className="text-3xl font-bold">
                    {userProfile.AI_Scores.length > 0
                      ? Math.max(...userProfile.AI_Scores)
                      : 0}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Highest Score</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-violet-900/20">
                  <p className="text-3xl font-bold">
                    {userProfile.AI_Scores.length}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Scored Submissions
                  </p>
                </div>
              </div>

              {/* AI Score visualization */}
              <div className="relative pt-3">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-gray-400">
                    AI Score Distribution
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1 h-20">
                  {[...Array(5)].map((_, i) => {
                    const scoreRange = i * 20 + (i > 0 ? 1 : 0); // Adjust for non-overlapping ranges
                    const nextRange = (i + 1) * 20; // Inclusive upper bound
                    const count = userProfile.AI_Scores.filter(
                      (score) => score >= scoreRange && score <= nextRange
                    ).length;
                    const percentage =
                      userProfile.AI_Scores.length > 0
                        ? (count / userProfile.AI_Scores.length) * 100
                        : 0;

                    return (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-full bg-gray-800 rounded-t-sm relative h-16 flex items-end">
                          <div
                            className="w-full bg-gradient-to-t from-violet-600 to-fuchsia-600 rounded-t-sm"
                            style={{ height: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400 mt-1">
                          {scoreRange}-{nextRange}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Achievement Progress */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg border border-violet-900/50 p-6 shadow-lg shadow-violet-900/10">
              <h2 className="text-base font-semibold mb-4 flex items-center">
                <Award className="w-4 h-4 mr-2 text-violet-400" />
                Achievement Progress
              </h2>

              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg border ${
                      achievement.earned
                        ? "bg-violet-900/30 border-violet-700/50"
                        : "bg-gray-800/50 border-violet-900/20"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          achievement.earned
                            ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                            : "bg-gray-700"
                        }`}
                      >
                        {achievement.icon || (
                          <Trophy className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium flex items-center">
                          {achievement.name}
                          {achievement.earned && (
                            <CheckCircle className="w-3 h-3 ml-2 text-green-400" />
                          )}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          achievement.earned
                            ? "bg-gradient-to-r from-green-400 to-emerald-500"
                            : "bg-gradient-to-r from-violet-600 to-fuchsia-600"
                        }`}
                        style={{ width: `${achievement.progress * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">
                        {Math.round(achievement.progress * 100)}%
                      </span>
                      <span className="text-xs text-gray-400">
                        {achievement.earned ? "Completed" : "In Progress"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg border border-violet-900/50 p-6 shadow-lg shadow-violet-900/10">
              <h2 className="text-base font-semibold mb-4 flex items-center">
                <Activity className="w-4 h-4 mr-2 text-violet-400" />
                Account Statistics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-gray-800/50 rounded-lg border border-violet-900/20">
                  <div className="w-10 h-10 bg-violet-900/30 rounded-full flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Member Since</h3>
                    <p className="text-xs text-gray-400">
                      {formatDate(
                        userProfile.memberSince || userProfile.createdAt
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-800/50 rounded-lg border border-violet-900/20">
                  <div className="w-10 h-10 bg-violet-900/30 rounded-full flex items-center justify-center mr-3">
                    <Star className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Current Level</h3>
                    <p className="text-xs text-gray-400">
                      Level {userProfile.Level} User
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
