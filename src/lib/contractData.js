const contractAddresses = {
  11155111: "0x047e55D4c0C70C973a5c2254e6d80c154A06899B",
  17000: "0xC8Ed6AC1F5af1Ce991a94eEf8Ae2d979e26d96a5",
  421614: "0x54378958Dff587163dF7B25Ae841EF9f622eAF03",
  84532: "0xD97bE7D4CdbC579C2f2c73AFC33417CafB39fc83",
  11155420: "0xc7e6C9F871a64751153A67eD466dfE02Dc4b5dB5",
};

const hashURLs = {
  11155111: "https://sepolia.etherscan.io/tx/",
  17000: "https://holesky.etherscan.io/tx/",
  421614: "https://sepolia.arbiscan.io/tx/",
  84532: "https://sepolia.basescan.org/tx/",
  11155420: "https://sepolia-optimism.etherscan.io/tx/",
};


const contractABI = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "betAmount",
        type: "uint256",
      },
    ],
    name: "BetPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "result",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "win",
        type: "bool",
      },
    ],
    name: "DiceRolled",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ownerWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "placeBet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [],
    name: "i_owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalContractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export { contractABI, contractAddresses, hashURLs };
