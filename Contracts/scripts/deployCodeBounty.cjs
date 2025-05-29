const hre = require("hardhat");

async function main() {
  const deployedContract = await hre.ethers.deployContract("CodeBounty");
  await deployedContract.waitForDeployment();
  console.log(`CodeBounty contract deployed to ${deployedContract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
