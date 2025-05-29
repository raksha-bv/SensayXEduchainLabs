const hre = require("hardhat");

async function main() {
  const codeBountyAddress = "0xA38232C301951902e8F807a94eEb624c443A40D3";

  // Deploy the CodeBountyResolver contract with the CodeBounty address as constructor parameter
  const deployedContract = await hre.ethers.deployContract(
    "CodeBountyResolver",
    [codeBountyAddress]
  );

  // Wait for deployment to complete
  await deployedContract.waitForDeployment();

  console.log(
    `CodeBountyResolver contract deployed to ${deployedContract.target}`
  );
  console.log(`Set up to monitor CodeBounty at ${codeBountyAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
