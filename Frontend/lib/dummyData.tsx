enum Status {
  waiting = "waiting",
  completed = "completed",
  cancelled = "cancelled",
  expired = "expired",
}

interface Challenge {
  challengeId: number;
  creator: string;
  creatorName: string;
  bountyAmount: number;
  title: string;
  description: string;
  problemStatement: string;
  requirements: string;
  tags: string[];
  challengeStatus: Status;
  submissionsCount: number;
  startTime: number;
  duration: number;
  winner: string | null;
}

interface Submission {
  submitter: string;
  solutionHash: string;
  isVerified: boolean;
  submissionTime: number;
}

// Dummy responses

const dummyChallenge: Challenge = {
  challengeId: 1,
  creator: "0x1234567890abcdef1234567890abcdef12345678",
  creatorName: "Alice",
  bountyAmount: 1000,
  title: "Solve Fibonacci Recursively",
  description: "Implement a recursive function for Fibonacci numbers.",
  problemStatement:
    "Write a recursive function that returns Fibonacci numbers.",
  requirements: "Use only recursion. No loops allowed.",
  tags: ["Recursion", "Algorithm", "Math"],
  challengeStatus: Status.waiting,
  submissionsCount: 2,
  startTime: 1700000000,
  duration: 7 * 24 * 60 * 60, // 7 days
  winner: null,
};

const dummySubmission: Submission = {
  submitter: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  solutionHash:
    "0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef",
  isVerified: true,
  submissionTime: 1700000500,
};


// Active challenges count response
const dummyActiveChallengesCount = 5;


const dummyChallenges: Challenge[] = [
  {
    challengeId: 1,
    creator: "0x1234567890abcdef1234567890abcdef12345678",
    creatorName: "Alice",
    bountyAmount: 3000,
    title: "Reentrancy Attack Prevention",
    description:
      "Fix a Solidity smart contract vulnerable to reentrancy attacks.",
    problemStatement:
      "Identify and mitigate reentrancy vulnerabilities in the given contract.",
    requirements:
      "Use best practices like checks-effects-interactions or reentrancy guards.",
    tags: ["Solidity", "Security", "Smart Contracts"],
    challengeStatus: Status.waiting,
    submissionsCount: 4,
    startTime: 1700000000,
    duration: 7 * 24 * 60 * 60,
    winner: null,
  },
  {
    challengeId: 2,
    creator: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    creatorName: "Bob",
    bountyAmount: 2500,
    title: "Gas Optimization in Smart Contracts",
    description: "Reduce gas costs in a given Solidity contract.",
    problemStatement:
      "Analyze and optimize the provided contract to minimize gas fees.",
    requirements: "Use efficient data structures and Solidity best practices.",
    tags: ["Solidity", "Optimization", "Gas Fees"],
    challengeStatus: Status.completed,
    submissionsCount: 6,
    startTime: 1700000500,
    duration: 5 * 24 * 60 * 60,
    winner: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  },
  {
    challengeId: 3,
    creator: "0x876543210abcdef09876543210abcdef09876",
    creatorName: "Charlie",
    bountyAmount: 4000,
    title: "Implement a Cross-Chain Bridge",
    description:
      "Develop a Solidity smart contract to enable cross-chain token transfers.",
    problemStatement:
      "Create a secure and efficient bridge between Ethereum and another blockchain.",
    requirements: "Ensure security and proper event emissions for relayers.",
    tags: ["Blockchain", "Solidity", "Cross-Chain"],
    challengeStatus: Status.waiting,
    submissionsCount: 2,
    startTime: 1700001000,
    duration: 10 * 24 * 60 * 60,
    winner: null,
  },
  {
    challengeId: 4,
    creator: "0xabcdef1234567890abcdef1234567890abcdef12",
    creatorName: "Diana",
    bountyAmount: 5000,
    title: "NFT Marketplace Smart Contract",
    description:
      "Build a Solidity contract for an NFT marketplace with auction support.",
    problemStatement:
      "Create an ERC-721 compatible contract that supports minting, buying, selling, and auctions.",
    requirements:
      "Follow ERC-721 standards and implement on-chain auction logic.",
    tags: ["NFT", "Solidity", "Marketplace"],
    challengeStatus: Status.waiting,
    submissionsCount: 3,
    startTime: 1700002000,
    duration: 14 * 24 * 60 * 60,
    winner: null,
  },
  {
    challengeId: 5,
    creator: "0x123abc456def789ghi012jkl345mno678pqr901",
    creatorName: "Eve",
    bountyAmount: 3500,
    title: "Decentralized Voting System",
    description:
      "Design a smart contract for a tamper-proof decentralized voting system.",
    problemStatement:
      "Develop a Solidity contract that enables secure voting with verifiable results.",
    requirements: "Ensure immutability, transparency, and Sybil resistance.",
    tags: ["Blockchain", "Solidity", "Voting"],
    challengeStatus: Status.cancelled,
    submissionsCount: 1,
    startTime: 1700003000,
    duration: 20 * 24 * 60 * 60,
    winner: null,
  },
];


// Active challenges response
const dummyActiveChallenges: Challenge[] = dummyChallenges.filter(
  (c) => c.challengeStatus === Status.waiting
);

// Total bounty amount response
const dummyTotalBountyAmount = 5000;

// Challenge submissions count response
const dummyChallengeSubmissionsCount = 2;

// Total submissions response
const dummyTotalSubmissions = 10;

// Challenge winner response
const dummyChallengeWinner = "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd";

// Challenge expired check response
const dummyIsChallengeExpired = false;

// Challenge remaining time response (in seconds)
const dummyChallengeRemainingTime = 3600; // 1 hour

// Exporting for use
export {
  Status,
  dummyChallenge,
  dummySubmission,
  dummyChallenges,
  dummyActiveChallengesCount,
  dummyActiveChallenges,
  dummyTotalBountyAmount,
  dummyChallengeSubmissionsCount,
  dummyTotalSubmissions,
  dummyChallengeWinner,
  dummyIsChallengeExpired,
  dummyChallengeRemainingTime,
};
