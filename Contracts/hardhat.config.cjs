require("dotenv").config();
// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  sourcify: {
    enabled: true,
  },
  solidity: "0.8.20",
  paths: {
    artifacts: "./src",
  },
  networks: {
    "edu-chain-testnet": {
      url: `https://rpc.open-campus-codex.gelato.digital`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      "edu-chain-testnet": "empty",
    },
    customChains: [
      {
        network: "edu-chain-testnet",
        chainId: 656476,
        urls: {
          apiURL: "https://edu-chain-testnet.blockscout.com/api",
          browserURL: "https://edu-chain-testnet.blockscout.com",
        },
      },
    ],
  },
};
