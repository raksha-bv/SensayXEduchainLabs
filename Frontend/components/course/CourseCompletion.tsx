"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/utils/contract_constants";
import { Award, ExternalLink } from "lucide-react";

interface CourseCompletionProps {
  courseId: string;
  metadataURI: string;
  nftMinted?: boolean;
}

// Declare window ethereum interface
declare global {
  interface Window {
    ethereum?: any;
  }
}

const CourseCompletion: React.FC<CourseCompletionProps> = ({
  courseId,
  metadataURI,
  nftMinted = false, // Default to false if not provided
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { isInitialized, authState } = useOCAuth();
  const [userOCId, setUserOCId] = useState<string | null>(null);
  const [isMinted, setIsMinted] = useState(nftMinted);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    // Set OCID from auth state when initialized
    if (isInitialized && authState.isAuthenticated) {
      setUserOCId(authState.OCId);
    }

    // Alternatively, get from localStorage as fallback
    else {
      const ocid = localStorage.getItem("userOCId");
      if (ocid) {
        setUserOCId(ocid);
      }
    }
  }, [isInitialized, authState]);

  // Update the internal minted state when the prop changes
  useEffect(() => {
    setIsMinted(nftMinted);
    // If NFT is already minted, set success state to true
    if (nftMinted) {
      setSuccess(true);
    }
  }, [nftMinted]);

  const mintCertificate = async () => {
    if (!authState.isAuthenticated) {
      setError("Please connect with OCID first");
      return;
    }

    if (!window.ethereum) {
      setError("Ethereum wallet not detected. Please install MetaMask.");
      return;
    }

    // No need to show error if already minted - button will be disabled

    setIsLoading(true);
    setError("");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();

      if (network.chainId.toString() !== "656476") {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xA045C" }],
        });
      }

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      const tx = await contract.mintCertificate(address, metadataURI);

      setTxHash(tx.hash);
      await tx.wait();

      // After successful blockchain transaction, update the database
      if (userOCId) {
        // Use PATCH method as it's specifically designed for NFT status updates
        const response = await fetch("/api/users/courses", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            OCId: userOCId,
            courseId: courseId,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setIsMinted(true);
          setSuccess(true);
          setNotification({
            show: true,
            message: "Certificate minted successfully!",
            type: "success",
          });
        } else {
          console.error("Failed to update NFT minting status:", data.error);
          // Still set success since the NFT was minted even if the status update failed
          setSuccess(true);
          setNotification({
            show: true,
            message:
              "Certificate minted, but there was an issue updating your profile.",
            type: "warning",
          });
        }
      } else {
        setSuccess(true);
      }

      // Hide notification after 5 seconds
      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" });
      }, 5000);
    } catch (err: any) {
      console.error("Error minting certificate:", err);
      setError(err.message || "Failed to mint certificate");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/60 border border-violet-900/30 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Award className="w-10 h-10 text-violet-400 mr-4" />
          <div>
            <h3 className="text-xl font-bold text-white">Course Completed!</h3>
            <p className="text-gray-400">
              {isMinted
                ? "You've claimed your NFT certificate for this achievement"
                : "Claim your NFT certificate to showcase your achievement"}
            </p>
          </div>
        </div>
        <button
          onClick={mintCertificate}
          disabled={isLoading || isMinted}
          className={`px-5 py-2 rounded-md flex gap-2 justify-start items-center transition-all transform hover:scale-105 hover:shadow-lg ${
            isLoading
              ? "bg-gray-700 text-gray-300 cursor-wait"
              : isMinted
              ? "bg-green-700 text-white"
              : "bg-violet-700 hover:bg-violet-600 text-white hover:shadow-violet-500/30"
          }`}
        >
          {isLoading
            ? "Processing..."
            : isMinted
            ? "Certificate Claimed"
            : "Mint NFT Certificate"}
        </button>
      </div>

      {error && !isMinted && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded">
          <p className="text-green-400 font-medium">
            NFT Certificate successfully minted!
          </p>
          {txHash && (
            <a
              href={`https://edu-chain-testnet.blockscout.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center text-sm text-violet-400 hover:text-violet-300"
            >
              View on Educhain Explorer{" "}
              <ExternalLink className="ml-1 w-3 h-3" />
            </a>
          )}
        </div>
      )}

      {notification.show && (
        <div
          className={`mt-4 p-3 rounded ${
            notification.type === "success"
              ? "bg-green-900/20 border border-green-500/30 text-green-400"
              : "bg-yellow-900/20 border border-yellow-500/30 text-yellow-400"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default CourseCompletion;
