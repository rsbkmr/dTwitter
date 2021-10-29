const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

module.exports = {
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  networks: {
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
        ),
      network_id: 3, // Ropsten's id
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  },
};
