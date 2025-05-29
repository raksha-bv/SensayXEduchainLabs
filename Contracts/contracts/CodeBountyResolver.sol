// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICodeBounty {
    function challenges(uint256 _challengeId) external view returns (
        uint256 challengeId,
        address creator,
        uint256 bountyAmount,
        string memory title,
        string memory description,
        string memory requirements,
        // string[] memory tags, // Omitting complex type for interface simplicity
        uint8 challengeStatus,
        uint256 submissionsCount,
        uint256 startTime,
        uint256 duration,
        address winner
    );
    
    function challengeIdCounter() external view returns (uint256);
    function resolveExpiredChallenge(uint256 _challengeId) external;
}

contract CodeBountyResolver {
    // CodeBounty contract interface
    ICodeBounty public immutable codeBounty;
    
    // Last processed challenge ID
    uint256 public lastProcessedId;
    
    // Maximum number of challenges to check in one execution to avoid gas issues
    uint256 public constant MAX_CHALLENGES_TO_CHECK = 10;
    
    constructor(address _codeBountyAddress) {
        codeBounty = ICodeBounty(_codeBountyAddress);
    }
    
    /**
     * @notice Gelato checker function - checks if any challenges need resolving
     * @return canExec Whether Gelato should execute the task
     * @return execPayload The function call data to execute
     */
    function checker() external view returns (bool canExec, bytes memory execPayload) {
        uint256 currentCounter = codeBounty.challengeIdCounter();
        
        // Start from the last processed ID + 1, or from 1 if it's the first run
        uint256 startId = lastProcessedId == 0 ? 1 : lastProcessedId + 1;
        
        // Don't go beyond the current counter
        if (startId > currentCounter) {
            return (false, bytes("No new challenges to check"));
        }
        
        // Limit the number of challenges to check to avoid exceeding gas limits
        uint256 endId = startId + MAX_CHALLENGES_TO_CHECK - 1;
        if (endId > currentCounter) {
            endId = currentCounter;
        }
        
        // Check challenges in the range [startId, endId]
        for (uint256 i = startId; i <= endId; i++) {
            (
                ,               // uint256 challengeId,
                ,               // address creator,
                ,               // uint256 bountyAmount,
                ,               // string memory title,
                ,               // string memory description,
                ,               // string memory requirements,
                uint8 status,   // enum Status (0 = waiting, 1 = completed, 2 = cancelled, 3 = expired)
                ,               // uint256 submissionsCount,
                uint256 startTime,  // when challenge started
                uint256 duration,   // challenge duration
                                // address winner
            ) = codeBounty.challenges(i);
            
            // Check if challenge is in waiting status (0) and has expired
            if (status == 0 && block.timestamp >= startTime + duration) {
                // Found an expired challenge that needs resolving
                execPayload = abi.encodeCall(ICodeBounty.resolveExpiredChallenge, (i));
                return (true, execPayload);
            }
        }
        
        // If we completed the loop without finding an expired challenge to resolve,
        // update the last processed ID to continue from where we left off next time
        if (endId == currentCounter) {
            // We've checked all challenges, reset to start from the beginning
            return (false, bytes("Checked all challenges, none expired"));
        } else {
            // We've checked a batch, but there are more to check next time
            return (false, bytes("No expired challenges in current batch"));
        }
    }
    
    /**
     * @notice Updates the lastProcessedId after successful execution
     * @param _newLastProcessedId The new last processed ID
     */
    function updateLastProcessedId(uint256 _newLastProcessedId) external {
        // In a real implementation, this would have access control
        // Only Gelato or an authorized address should be able to call this
        lastProcessedId = _newLastProcessedId;
    }
}