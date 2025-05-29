import { motion } from "framer-motion";
import { CheckCircle, Copy, ExternalLink } from "lucide-react";
import React from "react";
import Link from "next/link";
import Logo from "../ui/Mark";

const TutorialSectionTwo = () => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Video Tutorial Section */}
      <section className="max-w-4xl mx-auto px-6 pb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-gray-900/60 backdrop-blur p-6 rounded-xl border border-violet-900/50 mb-10"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Video Tutorial
          </h2>
          <div className="aspect-w-16 aspect-h-9">
            <div className="w-full overflow-hidden rounded-lg bg-gray-800 flex items-center justify-center">
              <iframe
                className="w-full h-64 md:h-80 lg:h-96"
                src="https://www.youtube.com/embed/Iihbh5WcAEM"
                title="How to Get EDU Chain Testnet Tokens and Setup OCID"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <p className="text-gray-300 text-sm mt-4 text-center">
            Watch this tutorial to learn how to get EDU Chain Testnet tokens and
            set up your Open Campus ID
          </p>
        </motion.div>

        {/* Step by Step Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="space-y-8"
        >
          {/* Step 1: Get EDU Chain Testnet Tokens */}
          <div className="bg-gray-900/60 backdrop-blur p-6 rounded-xl border border-violet-900/50">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 bg-violet-700 rounded-full flex items-center justify-center text-lg font-bold mr-3 text-white">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-violet-400">
                  Get EDU Chain Testnet Tokens
                </h3>
                <p className="text-gray-300 mt-2">
                  To interact with the Sensay Labs, you'll need testnet tokens.
                  These are available through HackQuest.com.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-gray-800/60 rounded-lg p-4">
                <h4 className="font-medium mb-3 text-lg">Key Steps:</h4>
                <ol className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      a
                    </div>
                    <span>
                      Navigate to{" "}
                      <Link
                        href="https://www.hackquest.io/faucets"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-400 hover:underline"
                      >
                        HackQuest.com
                      </Link>{" "}
                      and create an account if you don't have one already
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      b
                    </div>
                    <span>
                      Select EDU Chain Testnet in the Hackquest faucets. Make
                      Sure EDU Chain Testnet Network is already added into Your
                      Metamask.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      c
                    </div>
                    <span>
                      Enter Your Metamask Wallet Address into the input field of
                      "Enter Your ETH Address"
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      d
                    </div>
                    <span>
                      Click on Request 0.5 EDU. You can get 0.5 EDU testnet
                      tokens everyday.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      e
                    </div>
                    <span>
                      Wait for the transaction to be confirmed on the
                      blockchain. If You did Everything as Suggested You should
                      have 0.5 EDU in your wallet.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-gray-800/60 rounded-lg p-4">
                <div className="flex items-center justify-center mb-4">
                  <img
                    src="/Tutorial/HackquestFaucets.png"
                    alt="HackQuest Faucet"
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
                <p className="text-gray-300 text-sm text-center">
                  <strong className="text-violet-400">HackQuest Faucet:</strong>{" "}
                  Select the EDU Chain Testnet Tokens.
                </p>
              </div>
            </div>
          </div>

          {/* Step 1: Get EDU Chain Testnet Tokens */}
          <div className="bg-gray-900/60 backdrop-blur p-6 rounded-xl border border-violet-900/50">
            <div className="flex items-start mb-4">
              <div className="bg-gray-800/60 rounded-lg p-4">
                <div className="flex items-center justify-center mb-4">
                  <img
                    src="/Tutorial/RequestTokens.png"
                    alt="HackQuest Faucet"
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
                <p className="text-gray-300 text-sm text-center">
                  <strong className="text-violet-400">HackQuest Faucet:</strong>{" "}
                  Request EDU testnet tokens to interact with the blockchain
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: What is Open Campus ID */}
          <div className="bg-gray-900/60 backdrop-blur p-6 rounded-xl border border-violet-900/50">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 bg-violet-700 rounded-full flex items-center justify-center text-lg font-bold mr-3 text-white">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-violet-400">
                  What is Open Campus ID (OCID)
                </h3>
                <p className="text-gray-300 mt-2">
                  Open Campus ID is a core component of the blockchain learning
                  experience.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-gray-800/60 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 p-1 mr-2 rounded-full">
                    <Logo />
                    {/* <svg
                      width="26"
                      height="25"
                      viewBox="0 0 26 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 0L25.9904 12.5L13 25L0.00961876 12.5L13 0Z"
                        fill="#8B5CF6"
                      />
                      <path
                        d="M13 3L22.9904 12.5L13 22L3.00962 12.5L13 3Z"
                        fill="black"
                      />
                      <path
                        d="M13 6L19.9904 12.5L13 19L6.00962 12.5L13 6Z"
                        fill="#8B5CF6"
                      />
                      <path
                        d="M13 9L16.9904 12.5L13 16L9.00962 12.5L13 9Z"
                        fill="black"
                      />
                    </svg> */}
                  </div>
                  <h4 className="font-medium text-lg">
                    Open Campus ID (OCID) Explained:
                  </h4>
                </div>
                <p className="text-gray-300 mb-4">
                  Open Campus ID is a Soulbound Token (SBT) - a non-transferable
                  NFT that represents a learner's online persona within the Open
                  Campus ecosystem.
                </p>
                <p className="text-gray-300 mb-4">
                  OCID serves as a Decentralized Identifier (DID) that:
                </p>
                <ul className="space-y-2 text-gray-300 list-disc pl-6">
                  <li>
                    Gives you control over your learning identity and
                    achievements
                  </li>
                  <li>
                    Allows you to decide which information to share and when
                  </li>
                  <li>
                    Stores your learning profile securely on the blockchain
                  </li>
                  <li>
                    Acts as a verified credential for your blockchain learning
                    journey
                  </li>
                  <li>
                    Cannot be transferred to others, ensuring it truly
                    represents your identity
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800/60 rounded-lg p-4">
                <div className="flex items-center justify-center mb-4">
                  <img
                    src="/Tutorial/IntroOCID.png"
                    alt="Open Campus ID Diagram"
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
                <p className="text-gray-300 text-sm text-center">
                  <strong className="text-violet-400">
                    OCID Introduction:
                  </strong>{" "}
                  What OCID Provides For Each Learner.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Create Your OCID */}
          <div className="bg-gray-900/60 backdrop-blur p-6 rounded-xl border border-violet-900/50">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 bg-violet-700 rounded-full flex items-center justify-center text-lg font-bold mr-3 text-white">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-violet-400">
                  Create Your Open Campus ID
                </h3>
                <p className="text-gray-300 mt-2">
                  Follow these steps to create your OCID on Sensay Labs.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-gray-800/60 rounded-lg p-4">
                <h4 className="font-medium mb-3 text-lg">
                  Steps to Create Your OCID:
                </h4>
                <ol className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <span>
                      Click on the Connect OCID button on the Homepage.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <span>
                      Click on Connect Wallet. Choose MetaMask when you get a
                      pop up of Options of Wallet you can select.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <span>
                      Click on Verify and Confirm the transaction PopUp on your
                      MetaMask.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <span>Fill in your basic profile information</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      5
                    </div>
                    <span>
                      Submit the form and fill out the OTP sent to your email.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      6
                    </div>
                    <span>
                      Your OCID will be minted and You will be redirected
                      towards the homepage.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center text-center">
                  <img
                    src="/Tutorial/CreateOCID.png"
                    alt="Creating OCID"
                    className="rounded-lg mb-3"
                  />
                  <p className="text-sm text-gray-300">
                    Creating your Open Campus ID
                  </p>
                </div>

                <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center text-center">
                  <img
                    src="/Tutorial/CreatedOCID.png"
                    alt="OCID Profile"
                    className="rounded-lg mb-3"
                  />
                  <p className="text-sm text-gray-300">
                    Your Open Campus ID profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ready to Start Section */}
        <motion.div
          className="mt-10 p-6 bg-gray-900/40 backdrop-blur rounded-xl border border-violet-900/30 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            With your MetaMask configured, EDU tokens in your wallet, and your
            Open Campus ID created, you're all set to begin your blockchain
            development journey!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/courses"
              className="px-5 py-2.5 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center group"
            >
              Explore Courses
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
            <Link
              href="/practice"
              className="px-5 py-2.5 bg-transparent border border-violet-700 hover:bg-violet-900/30 text-violet-400 font-medium rounded-lg transition-all flex items-center justify-center"
            >
              Try the Editor
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default TutorialSectionTwo;
