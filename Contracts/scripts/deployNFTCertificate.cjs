const hre = require("hardhat");

async function main() {
  const deployedContract = await hre.ethers.deployContract("NFTCertificate");
  await deployedContract.waitForDeployment();
  console.log(`NFTCertificate contract deployed to ${deployedContract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
