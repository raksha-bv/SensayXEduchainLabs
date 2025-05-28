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