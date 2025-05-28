"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    isSubmitting: false,
    message: "",
    type: "", // 'success' or 'error'
  });

  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus((prevStatus) => ({
          ...prevStatus,
          message: "",
        }));
      }, 5000); // 5 seconds

      // Clean up timer
      return () => clearTimeout(timer);
    }
  }, [status.message]);

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    setStatus({ isSubmitting: true, message: "", type: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Ensure response is not empty before parsing JSON
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setStatus({
        isSubmitting: false,
        message: data.message || "Message sent successfully!",
        type: "success",
      });

      // Reset form after success
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({
        isSubmitting: false,
        message: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <footer className="bg-gray-950 border-t border-violet-900/30">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Top section with columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-1"
          >
            <Link href="/" className="flex items-center">
              <svg
                className="w-6 h-6 text-violet-400 mr-2"
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
              <span className="text-lg font-bold">EduChain Labs</span>
            </Link>
            <p className="mt-3 text-gray-400 text-sm">
              Empowering developers to build the future of Web3 through
              interactive learning, practice challenges, and expert guidance in
              blockchain development.
            </p>
            <div className="flex mt-4 space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-violet-400 transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.163 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-violet-400 transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14 0-.21-.005-.418-.014-.628.961-.689 1.8-1.56 2.46-2.548z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-violet-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Quick Links & Resources - Combined into one cleaner section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-1"
          >
            <h3 className="text-base font-bold mb-4">Quick Links</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <li>
                <Link
                  href="/editor"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center"
                >
                  <svg
                    className="w-3.5 h-3.5 mr-2 text-violet-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Code Editor
                </Link>
              </li>
              <li>
                <Link
                  href="/arena"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center"
                >
                  <svg
                    className="w-3.5 h-3.5 mr-2 text-violet-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Practice Arena
                </Link>
              </li>
              <li>
                <Link
                  href="/chatbot"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center"
                >
                  <svg
                    className="w-3.5 h-3.5 mr-2 text-violet-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Expert Chatbot
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center"
                >
                  <svg
                    className="w-3.5 h-3.5 mr-2 text-violet-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center"
                >
                  <svg
                    className="w-3.5 h-3.5 mr-2 text-violet-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center"
                >
                  <svg
                    className="w-3.5 h-3.5 mr-2 text-violet-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  FAQs
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-1"
          >
            <h3 className="text-base font-bold mb-4">Contact Us</h3>
            <div className="flex items-center text-sm text-gray-400 mb-3">
              <svg
                className="w-4 h-4 mr-2 text-violet-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="break-all">
                educhainlabs@gmail.com
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-400 mb-4">
              <svg
                className="w-4 h-4 mr-2 text-violet-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Bengaluru, India
            </div>
          </motion.div>
        </div>

        {/* Contact Form Section */}
        <motion.div
          className="mt-8 pt-6 border-t border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-base font-bold mb-4 text-center">
            Send us a message
          </h3>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-sm"
                required
                disabled={status.isSubmitting}
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-sm"
                required
                disabled={status.isSubmitting}
              />
            </div>

            <div className="mb-4">
              <textarea
                id="message"
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-sm"
                required
                disabled={status.isSubmitting}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={`px-6 py-2 bg-violet-700 hover:bg-violet-600 rounded-lg text-white font-medium transition-colors text-sm flex items-center justify-center ${
                  status.isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={status.isSubmitting}
              >
                {status.isSubmitting ? (
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
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>

            {status.message && (
              <div className="mt-3 text-center">
                <p
                  className={`text-sm ${
                    status.type === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {status.message}
                </p>
              </div>
            )}
          </form>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-500 text-xs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>
            © {new Date().getFullYear()} EduChain Labs. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
