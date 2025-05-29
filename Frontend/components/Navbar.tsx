"use client";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import LoginButton from "./LoginButton";
import Logo from "./ui/Mark";
import { User, Book, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { isInitialized, authState, ocAuth } = useOCAuth();
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the tutorial
    if (typeof window !== "undefined") {
      setHasSeenTutorial(!!localStorage.getItem("hasSeenTutorial"));
    }
  }, []);

  useEffect(() => {
    // Only run when user becomes authenticated
    if (isInitialized && authState.isAuthenticated && !isCreatingUser) {
      createUserAfterLogin();
    }
  }, [isInitialized]);

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => setMobileMenuOpen(false);
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  const createUserAfterLogin = async () => {
    try {
      setIsCreatingUser(true);
      const authData = ocAuth.getAuthState();

      // Check if user already exists
      const checkResponse = await fetch(`/api/users?OCId=${authData.OCId}`);
      const checkData = await checkResponse.json();

      // Only create user if they don't exist yet
      if (!checkData.success || !checkData.user) {
        const createResponse = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            OCId: authData.OCId,
            ethAddress: authData.ethAddress,
            image: "", // You can set a default image if needed
          }),
        });

        const createData = await createResponse.json();
        console.log("User creation result:", createData);
      }
    } catch (err) {
      console.error("Error creating user:", err);
    } finally {
      setIsCreatingUser(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Navigation links array to avoid repetition
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/practice", label: "Practice Arena" },
    { href: "/challenges", label: "Challenges" },
    { href: "/chatbot", label: "Chatbot" },
  ];

  return (
    <>
      <nav className="absolute top-0 left-0 z-20 flex justify-between items-center px-4 sm:px-6 md:px-12 py-4 w-full">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xl font-bold text-white flex items-center"
          >
            <span className="text-violet-400">SEN</span>SAY
            <span className="ml-2 text-violet-400">LABS</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-violet-400 transition-colors relative group"
              onMouseEnter={
                link.href === "/" ? () => setIsHovered(true) : undefined
              }
              onMouseLeave={
                link.href === "/" ? () => setIsHovered(false) : undefined
              }
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}

          {/* Tutorial link - visible for unauthenticated users who haven't seen tutorial */}
          {isInitialized && !authState.isAuthenticated && !hasSeenTutorial && (
            <Link
              href="/tutorials"
              className="text-white hover:text-violet-400 transition-colors relative group"
            >
              <span className="flex items-center">
                <Book className="w-4 h-4 mr-1" />
                Tutorials
                <span className="absolute -right-3 -top-1 w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span>
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4 ">
          {isInitialized && authState.isAuthenticated ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/dashboard"
                className="font-semibold p-[6px] bg-violet-700 hover:bg-violet-600 border-emerald-400 border-[2.5px] border-dashed rounded-full flex gap-2 justify-center items-center text-white/80 transition-all transform hover:scale-105 hover:border-solid hover:shadow-lg hover:shadow-violet-500/30 duration-1000"
              >
                <User className="w-5 h-5" />
              </Link>
              <button className="hidden sm:flex px-3 sm:px-5 py-2 bg-violet-700 rounded-md gap-2 justify-start items-center text-white/80 cursor-default">
                <Logo />
                <div>
                  <span className="font-semibold">OCID</span>{" "}
                  <span className="hidden sm:inline">Connected</span>
                </div>
              </button>
            </div>
          ) : (
            <LoginButton />
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2 z-20"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[11] bg-black bg-opacity-95 pt-20 px-6 flex flex-col items-center">
          <div className="w-full max-w-md flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-lg py-3 border-b border-violet-900/50 flex justify-between items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
                <span className="text-violet-400">→</span>
              </Link>
            ))}

            {/* Tutorial link - visible for unauthenticated users who haven't seen tutorial */}
            {isInitialized &&
              !authState.isAuthenticated &&
              !hasSeenTutorial && (
                <Link
                  href="/tutorials"
                  className="text-white text-lg py-3 border-b border-violet-900/50 flex justify-between items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <Book className="w-5 h-5 mr-2" />
                    Tutorials
                    <span className="ml-2 w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span>
                  </span>
                  <span className="text-violet-400">→</span>
                </Link>
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
