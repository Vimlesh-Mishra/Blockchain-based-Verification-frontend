require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.24",
  networks: {
    holesky: {
      url: "https://ethereum-holesky.publicnode.com",
      accounts: ["8ce5f5dbed9a2ae6aa2287282149c82e262dddfa0df84b17cc63447587d51d46"], // Replace with your private key
    },
  },
};