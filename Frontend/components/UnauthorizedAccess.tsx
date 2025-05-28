"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import {
  Lock,
  Code,
  Trophy,
  BookOpen,
  Users,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import LoginButton from "./LoginButton";

interface UnauthorizedAccessProps {
  requiredPath?: string;
}

const UnauthorizedAccess = ({ requiredPath }: UnauthorizedAccessProps) => {
  const { isInitialized, authState, ocAuth } = useOCAuth();
  const router = useRouter();

  // If user becomes authenticated, redirect to the required path
  useEffect(() => {
    if (isInitialized && authState.isAuthenticated) {
      router.push(requiredPath || "/dashboard");
    }
  }, [isInitialized, authState, router, requiredPath]);

  return (
    <div className="h-screen bg-gray-950 text-gray-100 overflow-hidden flex flex-col">
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

      <Navbar />

      <div className="relative flex flex-grow items-center justify-center px-4">
        <div className="max-w-lg w-full bg-gray-900/60 backdrop-blur-sm rounded-lg border border-violet-900/50 shadow-lg shadow-violet-900/20 overflow-hidden">
          {/* Header Section */}
          <div className="border-b border-violet-900/20 bg-violet-900/20 p-4 relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/10 rounded-bl-full -mr-6 -mt-6"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center mr-3 shadow-md shadow-violet-900/50">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  <span className="text-violet-400">Unauthorized</span> Access
                </h1>
                <p className="text-gray-400 text-xs">Authentication Required</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            {/* Main content */}
            <div className="mb-4">
              <p className="text-gray-300 text-sm">
                Please log in with your OCID to access this protected page. This
                content is available exclusively for authorized users.
              </p>
            </div>

            {/* Auth button */}
            <div className="space-y-3 mb-4 flex flex-col justify-center items-center">
              <LoginButton />
              {/* <div className="text-center text-gray-400 text-xs">
                Need access? Contact your administrator for permissions.
              </div> */}
            </div>
            <div className="mt-6 mb-4 p-4 bg-gradient-to-r from-violet-800/40 to-fuchsia-800/30 rounded-lg border border-violet-500/50 shadow-lg shadow-violet-900/20 transform hover:scale-[1.02] transition-all">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-violet-600/40 rounded-full flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
                  <BookOpen className="w-5 h-5 text-violet-200" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">
                    Having trouble getting started?
                  </h3>
                  <button
                    onClick={() => router.push("/tutorials")}
                    className="mt-1 text-xs text-violet-300 hover:text-white group flex items-center"
                  >
                    Check out our setup tutorials
                    <ExternalLink className="w-3 h-3 ml-1 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-violet-900/30"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-gray-900/60 text-xs text-violet-400">
                  Access Benefits
                </span>
              </div>
            </div>

            {/* Benefits grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-800/50 rounded-lg p-2 border border-violet-900/20 hover:border-violet-700/40 transition-colors group">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-violet-900/30 rounded-full flex items-center justify-center mr-2 text-violet-400 group-hover:text-violet-300 transition-colors">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium group-hover:text-white transition-colors">
                      Premium Content
                    </h3>
                    <p className="text-xs text-gray-400">Exclusive resources</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-2 border border-violet-900/20 hover:border-violet-700/40 transition-colors group">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-violet-900/30 rounded-full flex items-center justify-center mr-2 text-violet-400 group-hover:text-violet-300 transition-colors">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium group-hover:text-white transition-colors">
                      Advanced Features
                    </h3>
                    <p className="text-xs text-gray-400">Full functionality</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-2 border border-violet-900/20 hover:border-violet-700/40 transition-colors group">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-violet-900/30 rounded-full flex items-center justify-center mr-2 text-violet-400 group-hover:text-violet-300 transition-colors">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium group-hover:text-white transition-colors">
                      Progress Tracking
                    </h3>
                    <p className="text-xs text-gray-400">Personal dashboard</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-2 border border-violet-900/20 hover:border-violet-700/40 transition-colors group">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-violet-900/30 rounded-full flex items-center justify-center mr-2 text-violet-400 group-hover:text-violet-300 transition-colors">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium group-hover:text-white transition-colors">
                      Community
                    </h3>
                    <p className="text-xs text-gray-400">Connect with peers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Return link */}
            <div className="mt-4 pt-2 border-t border-violet-900/20 text-center">
              <button
                onClick={() => router.push("/")}
                className="text-xs text-violet-400 hover:text-violet-300 hover:underline transition-colors"
              >
                Return to homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
