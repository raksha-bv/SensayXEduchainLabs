"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Moon,
  Sun,
  ChevronLeft,
  Book,
  Clock,
  Users,
  Send,
  Tag,
  Layers,
  MessageSquare,
  Info,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";

export default function CreateCoursePage() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "Beginner",
    estimatedDuration: "",
    topics: "",
    motivation: "",
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({
    form: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Course title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.topics.trim()) {
      newErrors.topics = "At least one topic is required";
    }

    if (!formData.motivation.trim()) {
      newErrors.motivation = "Please provide your motivation";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Your name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form after submission
      setFormData({
        title: "",
        description: "",
        level: "Beginner",
        estimatedDuration: "",
        topics: "",
        motivation: "",
        name: "",
        email: "",
      });

      // Redirect after successful submission
      setTimeout(() => {
        router.push("/courses");
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      setErrors({
        ...errors,
        form:
          error instanceof Error ? error.message : "Failed to submit the form",
      });
      console.error("Error submitting course request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <BackButton />
      {/* Simplified background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(124,58,237,0.15),transparent_70%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(124,58,237,0.1),transparent_70%)]"></div>
      </div>
      {/* Header area with title */}
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Back button */}

          <div className="text-center mb-12">
            <div className=" mt-5 mb-3">
              <span className="bg-violet-900/30 text-violet-400 text-xs font-medium px-3 py-1 rounded-full inline-block">
                Course Request
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Request a <span className="text-violet-400">New Course</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Can't find what you're looking for? Submit a request for a new
              blockchain course and help shape our curriculum.
            </p>
          </div>

          {submitSuccess ? (
            <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">
                Request Submitted!
              </h2>
              <p className="text-gray-300 mb-4">
                Thank you for your course suggestion. Our team will review your
                request and get back to you soon.
              </p>
              <p className="text-gray-400 text-sm">
                Redirecting you back to courses page...
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-gray-900/60 border border-violet-900/30 rounded-lg p-6 md:p-8"
            >
              <div className="space-y-6">
                {/* Course Details Section */}
                <div>
                  <h3 className="text-lg font-medium text-violet-400 mb-4 flex items-center">
                    <Book className="w-5 h-5 mr-2" />
                    Course Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Course Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full bg-gray-800/60 border ${
                          errors.title
                            ? "border-red-500"
                            : "border-violet-900/30"
                        } rounded-lg py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-600`}
                        placeholder="e.g., Zero Knowledge Proofs for Blockchain"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Course Description *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full bg-gray-800/60 border ${
                          errors.description
                            ? "border-red-500"
                            : "border-violet-900/30"
                        } rounded-lg py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-600`}
                        placeholder="Describe what the course should cover and what students should learn"
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.description}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="level"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Difficulty Level
                        </label>
                        <select
                          id="level"
                          name="level"
                          value={formData.level}
                          onChange={handleChange}
                          className="w-full bg-gray-800/60 border border-violet-900/30 rounded-lg py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-600"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="estimatedDuration"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Estimated Duration
                        </label>
                        <input
                          type="text"
                          id="estimatedDuration"
                          name="estimatedDuration"
                          value={formData.estimatedDuration}
                          onChange={handleChange}
                          className="w-full bg-gray-800/60 border border-violet-900/30 rounded-lg py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-600"
                          placeholder="e.g., 4 weeks"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="topics"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Key Topics/Tags *
                      </label>
                      <input
                        type="text"
                        id="topics"
                        name="topics"
                        value={formData.topics}
                        onChange={handleChange}
                        className={`w-full bg-gray-800/60 border ${
                          errors.topics
                            ? "border-red-500"
                            : "border-violet-900/30"
                        } rounded-lg py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-600`}
                        placeholder="e.g., ZKP, Privacy, Ethereum, Layer 2 (comma separated)"
                      />
                      {errors.topics && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.topics}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Motivation Section */}
                <div>
                  <h3 className="text-lg font-medium text-violet-400 mb-4 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Your Motivation
                  </h3>

                  <div>
                    <label
                      htmlFor="motivation"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Why is this course important? *
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      rows={3}
                      className={`w-full bg-gray-800/60 border ${
                        errors.motivation
                          ? "border-red-500"
                          : "border-violet-900/30"
                      } rounded-lg py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-600`}
                      placeholder="Tell us why this course would be valuable to the blockchain community"
                    />
                    {errors.motivation && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.motivation}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-medium text-violet-400 mb-4 flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    Contact Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-gray-800/60 border ${
                          errors.name
                            ? "border-red-500"
                            : "border-violet-900/30"
                        } rounded-lg py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-600`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-gray-800/60 border ${
                          errors.email
                            ? "border-red-500"
                            : "border-violet-900/30"
                        } rounded-lg py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-600`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {errors.form && (
                  <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-4">
                    <p className="text-red-400 text-sm">{errors.form}</p>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-lg flex items-center justify-center min-w-[120px] transition-colors ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Submitting...</span>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </>
                    ) : (
                      <>
                        Submit Request
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-400">
                <p>* Required fields</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
