// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CodeBounty {
    uint256 public challengeIdCounter;
    address public owner;
    uint256 public totalSubmissionsCount;
    
    enum Status { waiting, completed, cancelled, expired }
    
    struct Challenge {
        uint256 challengeId;
        address creator;
        uint256 bountyAmount;
        string title;
        string description;
        string requirements;
        string[] tags;
        Status challengeStatus;
        uint256 submissionsCount;
        uint256 startTime;
        uint256 duration;
        address winner;
    }
    
    struct Submission {
        address submitter;
        bytes32 solutionHash;
        bool isVerified;
        uint256 submissionTime;
    }
    
    struct UserStats {
        uint256 winCount;
        uint256 submissionCount;
        uint256 totalRewards;
    }
    
    mapping(uint256 => Challenge) public challenges;
    mapping(uint256 => Submission[]) public challengeSubmissions;
    mapping(uint256 => bool) public challengeCompleted;
    mapping(address => uint256) public userRewarded;
    mapping(address => UserStats) public userStats;
    
    event ChallengeCreated(uint256 challengeId, address creator, uint256 bounty, uint256 duration);
    event ChallengeCancelled(uint256 challengeId, address creator);
    event SolutionSubmitted(uint256 challengeId, address submitter, bytes32 solutionHash);
    event SolutionVerified(uint256 challengeId, address verifier, address winner);
    event RewardDistributed(uint256 challengeId, address winner, uint256 amount);
    event ChallengeExpired(uint256 challengeId, address winner);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyCreator(uint256 _challengeId) {
        require(msg.sender == challenges[_challengeId].creator, "Only challenge creator can call this function");
        _;
    }
    
    modifier challengeNotExpired(uint256 _challengeId) {
        require(
            block.timestamp < challenges[_challengeId].startTime + challenges[_challengeId].duration,
            "Challenge has expired"
        );
        _;
    }
    
    function createChallenge(
        string memory _title,
        string memory _description,
        string memory _requirements,
        string[] memory _tags,
        uint256 _bountyAmount,
        uint256 _durationInDays
    ) external payable {
        require(msg.value >= _bountyAmount, "Amount Paid is Less Than Value Published");
        require(_durationInDays > 0, "Duration must be greater than 0");
        
        challengeIdCounter++;
        challenges[challengeIdCounter] = Challenge({
            challengeId: challengeIdCounter,
            creator: msg.sender,
            bountyAmount: _bountyAmount,
            title: _title,
            description: _description,
            requirements: _requirements,
            tags: _tags,
            challengeStatus: Status.waiting,
            submissionsCount: 0,
            startTime: block.timestamp,
            duration: _durationInDays * 1 days,
            winner: address(0)
        });
        
        emit ChallengeCreated(challengeIdCounter, msg.sender, _bountyAmount, _durationInDays);
    }
    
    function submitSolution(uint256 _challengeId, bytes32 _solutionHash) external challengeNotExpired(_challengeId) {
        require(msg.sender != challenges[_challengeId].creator, "Creator cannot submit solution");
        require(challenges[_challengeId].challengeStatus == Status.waiting, "Challenge is not active");
        
        challengeSubmissions[_challengeId].push(Submission({
            submitter: msg.sender,
            solutionHash: _solutionHash,
            isVerified: true,
            submissionTime: block.timestamp
        }));
        
        challenges[_challengeId].submissionsCount++;
        totalSubmissionsCount++;
        
        // Update user statistics
        userStats[msg.sender].submissionCount++;
        
        emit SolutionSubmitted(_challengeId, msg.sender, _solutionHash);
    }
    
    function distributeReward(uint256 _challengeId, address winner) external onlyCreator(_challengeId) {
        require(challenges[_challengeId].challengeStatus == Status.waiting, "Challenge is not active");
        require(!challengeCompleted[_challengeId], "Challenge already completed");
        
        // Check if winner is a valid submitter
        bool isValidSubmitter = false;
        for (uint256 i = 0; i < challengeSubmissions[_challengeId].length; i++) {
            if (challengeSubmissions[_challengeId][i].submitter == winner && 
                challengeSubmissions[_challengeId][i].isVerified) {
                isValidSubmitter = true;
                break;
            }
        }
        require(isValidSubmitter, "Winner must be a verified submitter");
        
        challenges[_challengeId].winner = winner;
        userRewarded[winner] += challenges[_challengeId].bountyAmount;
        challenges[_challengeId].challengeStatus = Status.completed;
        challengeCompleted[_challengeId] = true;
        
        // Update user statistics
        userStats[winner].winCount++;
        userStats[winner].totalRewards += challenges[_challengeId].bountyAmount;
        
        emit RewardDistributed(_challengeId, winner, challenges[_challengeId].bountyAmount);
    }
    
    function withdrawRewards() external {
        uint256 amount = userRewarded[msg.sender];
        require(amount > 0, "No rewards to withdraw");
        
        userRewarded[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
    
    function cancelChallenge(uint256 _challengeId) external onlyCreator(_challengeId) {
        require(challenges[_challengeId].challengeStatus == Status.waiting, "Challenge is already completed or cancelled");
        require(challengeSubmissions[_challengeId].length == 0, "Challenge has submissions, cannot cancel");
        
        payable(msg.sender).transfer(challenges[_challengeId].bountyAmount);
        challenges[_challengeId].challengeStatus = Status.cancelled;
        
        emit ChallengeCancelled(_challengeId, msg.sender);
    }
    
    // Anyone can call this function to check if a challenge has expired and distribute rewards
    function resolveExpiredChallenge(uint256 _challengeId) external {
        _resolveExpiredChallenge(_challengeId);
    }

    function viewActiveChallenges() external view returns (Challenge[] memory) {
        uint256 activeCount = 0;
        
        // First, count active challenges
        for (uint256 i = 1; i <= challengeIdCounter; i++) {
            if (challenges[i].challengeStatus == Status.waiting) {
                // Check if not expired
                if (block.timestamp < challenges[i].startTime + challenges[i].duration) {
                    activeCount++;
                }
            }
        }
        
        // Create array of appropriate size
        Challenge[] memory activeChallenges = new Challenge[](activeCount);
        
        // Fill array with active challenges
        uint256 currentIndex = 0;
        for (uint256 i = 1; i <= challengeIdCounter; i++) {
            if (challenges[i].challengeStatus == Status.waiting) {
                // Check if not expired
                if (block.timestamp < challenges[i].startTime + challenges[i].duration) {
                    activeChallenges[currentIndex] = challenges[i];
                    currentIndex++;
                }
            }
        }
        
        return activeChallenges;
    }
    
    // View functions
    function getActiveChallenges() external returns (Challenge[] memory) {
        // First, check and resolve expired challenges
        for (uint256 i = 1; i <= challengeIdCounter; i++) {
            if (challenges[i].challengeStatus == Status.waiting) {
                // Check if expired
                if (block.timestamp >= challenges[i].startTime + challenges[i].duration) {
                    // Challenge has expired, resolve it
                    _resolveExpiredChallenge(i);
                }
            }
        }
        
        // Then count active challenges (now that expired ones are resolved)
        uint256 activeCount = 0;
        for (uint256 i = 1; i <= challengeIdCounter; i++) {
            if (challenges[i].challengeStatus == Status.waiting) {
                activeCount++;
            }
        }
        
        // Create array of appropriate size
        Challenge[] memory activeChallenges = new Challenge[](activeCount);
        
        // Fill array with active challenges
        uint256 currentIndex = 0;
        for (uint256 i = 1; i <= challengeIdCounter; i++) {
            if (challenges[i].challengeStatus == Status.waiting) {
                activeChallenges[currentIndex] = challenges[i];
                currentIndex++;
            }
        }
        
        return activeChallenges;
    }
     function _resolveExpiredChallenge(uint256 _challengeId) internal {
        Challenge storage challenge = challenges[_challengeId];
        
        // Skip if not in waiting status or not expired
        if (challenge.challengeStatus != Status.waiting || 
            block.timestamp < challenge.startTime + challenge.duration ||
            challengeCompleted[_challengeId]) {
            return;
        }
        
        // If there are submissions, award the first verified submission
        if (challengeSubmissions[_challengeId].length > 0) {
            address firstSubmitter = address(0);
            
            // Find the first verified submission
            for (uint256 i = 0; i < challengeSubmissions[_challengeId].length; i++) {
                if (challengeSubmissions[_challengeId][i].isVerified) {
                    firstSubmitter = challengeSubmissions[_challengeId][i].submitter;
                    break;
                }
            }
            
            if (firstSubmitter != address(0)) {
                challenge.winner = firstSubmitter;
                userRewarded[firstSubmitter] += challenge.bountyAmount;
                challenge.challengeStatus = Status.completed;
                challengeCompleted[_challengeId] = true;
                
                // Update user win statistics
                userStats[firstSubmitter].winCount++;
                userStats[firstSubmitter].totalRewards += challenge.bountyAmount;
                
                emit ChallengeExpired(_challengeId, firstSubmitter);
                emit RewardDistributed(_challengeId, firstSubmitter, challenge.bountyAmount);
            } else {
                // No verified submissions, refund creator
                challenge.challengeStatus = Status.expired;
                payable(challenge.creator).transfer(challenge.bountyAmount);
                emit ChallengeExpired(_challengeId, address(0));
            }
        } else {
            // No submissions, refund creator
            challenge.challengeStatus = Status.expired;
            payable(challenge.creator).transfer(challenge.bountyAmount);
            emit ChallengeExpired(_challengeId, address(0));
        }
    }
    
    function getChallengeRemainingTime(uint256 _challengeId) external view returns (uint256) {
        require(_challengeId > 0 && _challengeId <= challengeIdCounter, "Invalid challenge ID");
        
        uint256 endTime = challenges[_challengeId].startTime + challenges[_challengeId].duration;
        if (block.timestamp >= endTime) {
            return 0;
        }
        
        return endTime - block.timestamp;
    }
    
    function getUserStats(address _user) external view returns (
        uint256 winCount,
        uint256 submissionCount,
        uint256 totalRewards
    ) {
        UserStats storage stats = userStats[_user];
        return (
            stats.winCount,
            stats.submissionCount,
            stats.totalRewards
        );
    }

    function getCompletedChallenges() external view returns (Challenge[] memory) {
        uint256 completedCount = 0;
        
        // First, count completed challenges
        for (uint256 i = 1; i <= challengeIdCounter; i++) {
            if (challenges[i].challengeStatus == Status.completed) {
                completedCount++;
            }
        }
        
        // Create array of appropriate size
        Challenge[] memory completedChallenges = new Challenge[](completedCount);
        
        // Fill array with completed challenges
        uint256 currentIndex = 0;
        for (uint256 i = 1; i <= challengeIdCounter; i++) {
            if (challenges[i].challengeStatus == Status.completed) {
                completedChallenges[currentIndex] = challenges[i];
                currentIndex++;
            }
        }
        
        return completedChallenges;
    }

    function getCancelledChallenges() external view returns (Challenge[] memory) {
        uint256 cancelledCount = 0;
        
        // First, count cancelled challenges
        for (uint256 i = 1; i <= challengeIdCounter; i++) {
            if (challenges[i].challengeStatus == Status.cancelled) {
                cancelledCount++;
            }
        }
        
        // Create array of appropriate size
        Challenge[] memory cancelledChallenges = new Challenge[](cancelledCount);
        
        // Fill array with cancelled challenges
        uint256 currentIndex = 0;
        for (uint256 i = 1; i <= challengeIdCounter; i++) {
            if (challenges[i].challengeStatus == Status.cancelled) {
                cancelledChallenges[currentIndex] = challenges[i];
                currentIndex++;
            }
        }
        
        return cancelledChallenges;
    }
    
    function getExpiredChallenges() external view returns (Challenge[] memory) {
        uint256 expiredCount = 0;
        
        // First, count expired challenges
        for (uint256 i = 1; i <= challengeIdCounter; i++) {
            if (challenges[i].challengeStatus == Status.expired) {
                expiredCount++;
            }
        }
        
        // Create array of appropriate size
        Challenge[] memory expiredChallenges = new Challenge[](expiredCount);
        
        // Fill array with expired challenges
        uint256 currentIndex = 0;
        for (uint256 i = 1; i <= challengeIdCounter; i++) {
            if (challenges[i].challengeStatus == Status.expired) {
                expiredChallenges[currentIndex] = challenges[i];
                currentIndex++;
            }
        }
        
        return expiredChallenges;
    }
}