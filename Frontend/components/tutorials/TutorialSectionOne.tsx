import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import { CheckCircle, Copy, ExternalLink } from "lucide-react";
import React from "react";
import Link from "next/link";

const TutorialSectionOne = () => {
    const [copied, setCopied] = React.useState(false);
    
      const copyToClipboard = (text : any) => {
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
                src="https://www.youtube.com/embed/U7NeJ2CpwM8"
                title="How to Setup MetaMask for Blockchain Lab"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <p className="text-gray-300 text-sm mt-4 text-center">
            Watch this tutorial to learn how to set up your environment step by
            step
          </p>
        </motion.div>

        {/* Step by Step Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="space-y-8"
        >
          {/* Step 1: Install MetaMask */}
          <div className="bg-gray-900/60 backdrop-blur p-6 rounded-xl border border-violet-900/50">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 bg-violet-700 rounded-full flex items-center justify-center text-lg font-bold mr-3 text-white">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-violet-400">
                  Install MetaMask
                </h3>
                <p className="text-gray-300 mt-2">
                  MetaMask is a cryptocurrency wallet and gateway to blockchain
                  apps. You'll need it to interact with our platform.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/60 rounded-lg p-4 flex flex-col items-center text-center">
                <img
                  src="https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg"
                  alt="Chrome Web Store"
                  className="w-16 h-16 mb-3 rounded"
                />
                <h4 className="font-medium mb-2">Chrome Users</h4>
                <a
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center text-sm"
                >
                  Add to Chrome
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>

              <div className="bg-gray-800/60 rounded-lg p-4 flex flex-col items-center text-center">
                <img
                  src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_firefox-128.png"
                  alt="Firefox Add-ons"
                  className="w-16 h-16 mb-3 rounded"
                />
                <h4 className="font-medium mb-2">Firefox Users</h4>
                <a
                  href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center text-sm"
                >
                  Add to Firefox
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>

          {/* Step 2: Create a Wallet */}
          <div className="bg-gray-900/60 backdrop-blur p-6 rounded-xl border border-violet-900/50">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 bg-violet-700 rounded-full flex items-center justify-center text-lg font-bold mr-3 text-white">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-violet-400">
                  Create a Wallet
                </h3>
                <p className="text-gray-300 mt-2">
                  After installing MetaMask, you'll need to create a new wallet
                  or import an existing one.
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
                      Click on the MetaMask icon in your browser and follow the
                      setup process
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      b
                    </div>
                    <span>
                      Choose "Create a New Wallet" unless you already have a
                      seed phrase
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      c
                    </div>
                    <span>Create a strong password for your wallet</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      d
                    </div>
                    <span>
                      Securely save your recovery phrase (12 or 24 words) in a
                      safe place -{" "}
                      <span className="text-violet-400 font-medium">
                        never share this with anyone!
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      e
                    </div>
                    <span>Confirm your recovery phrase when prompted</span>
                  </li>
                </ol>
              </div>

              <div className="bg-gray-800/60 rounded-lg p-4">
                <div className="flex items-center justify-center mb-4">
                  <img
                    src="/Tutorial/MetaMaskInstalled.png"
                    alt="MetaMask Wallet Creation"
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
                <p className="text-gray-300 text-sm text-center">
                  <strong className="text-violet-400">
                    Successfully Installed MetaMask:
                  </strong>{" "}
                  After you have succesfully installed MetaMask You Would See a
                  Screen like this.
                </p>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-4">
                <div className="flex items-center justify-center mb-4">
                  <img
                    src="/Tutorial/RecoveryPhrase.png"
                    alt="MetaMask Wallet Creation"
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
                <p className="text-gray-300 text-sm text-center">
                  <strong className="text-violet-400">Important:</strong> Your
                  recovery phrase is the only way to recover your wallet if you
                  forget your password or lose access to your device. Store it
                  securely offline.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Add EDU Chain Testnet */}
          <div className="bg-gray-900/60 backdrop-blur p-6 rounded-xl border border-violet-900/50">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 bg-violet-700 rounded-full flex items-center justify-center text-lg font-bold mr-3 text-white">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-violet-400">
                  Add EDU Chain Testnet Network
                </h3>
                <p className="text-gray-300 mt-2">
                  To use Blockchain Lab, you'll need to add the EDU Chain test
                  network to MetaMask.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800/60 rounded-lg overflow-hidden">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 bg-gray-800 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        RPC URL
                      </th>
                      <th className="py-3 px-4 bg-gray-800 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        ChainID
                      </th>
                      <th className="py-3 px-4 bg-gray-800 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Block Explorer URL
                      </th>
                      <th className="py-3 px-4 bg-gray-800 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Currency
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center">
                          <code className="bg-gray-700 px-2 py-1 rounded text-gray-200">
                            https://rpc.open-campus-codex.gelato.digital
                          </code>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                "https://rpc.open-campus-codex.gelato.digital"
                              )
                            }
                            className="ml-2 text-gray-400 hover:text-violet-400 transition-colors"
                          >
                            {copied ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <code className="bg-gray-700 px-2 py-1 rounded text-gray-200">
                          656476
                        </code>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <a
                          href="https://opencampus-codex.blockscout.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-400 hover:underline flex items-center"
                        >
                          Codex Block Explorer
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </td>
                      <td className="py-3 px-4 text-sm font-bold">EDU</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-lg">Adding the Network:</h4>
                <ol className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <span>
                      Open MetaMask and click on the network dropdown at the top
                      (usually says "Ethereum Mainnet")
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <span>Click "Add Network"</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <span>Click "Add a network manually"</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <span>
                      Fill in the fields with the information from the table
                      above:
                      <ul className="mt-2 ml-4 space-y-1 list-disc">
                        <li>
                          Network Name:{" "}
                          <span className="font-medium">EDU Chain Testnet</span>
                        </li>
                        <li>
                          New RPC URL:{" "}
                          <span className="font-medium">
                            https://rpc.open-campus-codex.gelato.digital
                          </span>
                        </li>
                        <li>
                          Chain ID: <span className="font-medium">656476</span>
                        </li>
                        <li>
                          Currency Symbol:{" "}
                          <span className="font-medium">EDU</span>
                        </li>
                        <li>
                          Block Explorer URL:{" "}
                          <span className="font-medium">
                            https://opencampus-codex.blockscout.com/
                          </span>
                        </li>
                      </ul>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      5
                    </div>
                    <span>Click "Save"</span>
                  </li>
                </ol>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center text-center">
                    <img
                      src="/Tutorial/CustomNetwork.png"
                      alt="Adding a Network"
                      className="rounded-lg mb-3"
                    />
                    <p className="text-sm text-gray-300">
                      Adding a custom network in MetaMask
                    </p>
                  </div>

                  <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center text-center">
                    <img
                      src="/Tutorial/EduchainTestnet.png"
                      alt="Network Added"
                      className="rounded-lg mb-3"
                    />
                    <p className="text-sm text-gray-300">
                      Successfully added EDU Chain Testnet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Switch to Testnet */}
          <div className="bg-gray-900/60 backdrop-blur p-6 rounded-xl border border-violet-900/50">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 bg-violet-700 rounded-full flex items-center justify-center text-lg font-bold mr-3 text-white">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-violet-400">
                  Switch to EDU Chain Testnet
                </h3>
                <p className="text-gray-300 mt-2">
                  Now that you've added the network, you need to switch to it
                  before using Blockchain Lab.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-gray-800/60 rounded-lg p-4">
                <h4 className="font-medium mb-3">Steps to Switch Networks:</h4>
                <ol className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <span>Open the MetaMask extension</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <span>
                      Click on the network dropdown at the top of the MetaMask
                      interface
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <span>
                      Select "EDU Chain Testnet" from the list of networks
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <span>
                      You should now see "EDU Chain Testnet" at the top of your
                      MetaMask
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-gray-800/60 rounded-lg p-4 flex justify-center">
                <img
                  src="/Tutorial/SuccefullySwitched.png"
                  alt="Switching Networks"
                  className="rounded-lg max-w-full h-auto"
                />
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
            Now that you've set up your Web3 environment, you're ready to start
            your blockchain development journey with Blockchain Lab!
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
  )
}

export default TutorialSectionOne