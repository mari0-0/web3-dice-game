# Dice Game - React App

This is a decentralized dice game built using React, Ethers.js, and Wagmi. Players can place bets, roll the dice, and win or lose based on the outcome. The game is deployed on multiple testnets, and transactions can be verified on their respective blockchain explorers.

---

## Table of Contents
1. [Installation and Setup](#installation-and-setup)
2. [How the App Works](#how-the-app-works)
3. [Deployed Contracts](#deployed-contracts)
4. [Important Notes](#important-notes)

---

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MetaMask (or any Ethereum wallet)
- Testnet ETH (for betting)

### Steps to Run the App

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/dice-game.git
   cd dice-game
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the App**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open the App**:
   - The app will be running at `http://localhost:3000`.
   - Open the app in your browser and connect your MetaMask wallet.

5. **Switch to a Supported Testnet**:
   - Ensure your MetaMask is connected to one of the supported testnets:
     - Sepolia
     - Holesky
     - Arbitrum Sepolia
     - Base Sepolia
     - Optimism Sepolia

6. **Get Testnet ETH**:
   - Use a faucet to get testnet ETH for betting. Some faucets include:
     - [Sepolia Faucet](https://sepoliafaucet.com/)
     - [Holesky Faucet](https://holesky-faucet.pk910.de/)
     - [Arbitrum Sepolia Faucet](https://faucet.quicknode.com/arbitrum/sepolia)
     - [Base Sepolia Faucet](https://faucet.quicknode.com/base/sepolia)
     - [Optimism Sepolia Faucet](https://faucet.quicknode.com/optimism/sepolia)

---

## How the App Works

[🎥 Watch Demo Video](./resources/demo.mp4)

Watch the demo video to see how the app works:

[![Demo Video](https://img.youtube.com/vi/gKonuaEI8po/0.jpg)](https://www.youtube.com/watch?v=gKonuaEI8po)

### Game Rules
1. **Place a Bet**:
   - Enter the bet amount in Gwei (1 ETH = 1,000,000,000 Gwei).
   - Click the "Bet" button to place your bet.

2. **Roll the Dice**:
   - After placing the bet, the dice will roll automatically.
   - The result will be displayed on the screen.

3. **Win or Lose**:
   - If the dice rolls **1, 2, or 3**, you lose the bet, and the bet amount is deducted from your wallet.
   - If the dice rolls **4, 5, or 6**, you win, and **2x the bet amount** is credited directly to your wallet.

4. **Check Transactions**:
   - All transactions are recorded in the "Recent Transactions" section.
   - Click on a transaction hash to view it on the blockchain explorer.

---

## Deployed Contracts

The game is deployed on the following testnets with their respective contract addresses:

| Chain             | Contract Address                           |
|-------------------|--------------------------------------------|
| Sepolia           | `0x047e55D4c0C70C973a5c2254e6d80c154A06899B` |
| Holesky           | `0xC8Ed6AC1F5af1Ce991a94eEf8Ae2d979e26d96a5` |
| Arbitrum Sepolia  | `0x54378958Dff587163dF7B25Ae841EF9f622eAF03` |
| Base Sepolia      | `0xD97bE7D4CdbC579C2f2c73AFC33417CafB39fc83` |
| Optimism Sepolia  | `0xc7e6C9F871a64751153A67eD466dfE02Dc4b5dB5` |

---

## Important Notes

1. **Bet Amount**:
   - Each contract has a limited amount of ETH (0.03 ETH or 30,000,000 Gwei).
   - **Do not bet more than 0.03 ETH** in a single transaction, as the transaction will fail due to insufficient contract balance.

2. **Testnet Only**:
   - This app is deployed on testnets only. Use testnet ETH for betting.
   - Real ETH is not supported or required.

3. **Faucet Limitations**:
   - Testnet faucets have daily limits. Use them wisely to get testnet ETH for betting.

4. **Supported Chains**:
   - The app supports the following testnets:
     - Sepolia
     - Holesky
     - Arbitrum Sepolia
     - Base Sepolia
     - Optimism Sepolia

5. **Transaction Status**:
   - Transactions can have three statuses:
     - **Pending**: The transaction is being processed.
     - **Success**: The transaction was successful.
     - **Failed**: The transaction failed (e.g., due to insufficient contract balance or network issues).

---

## Troubleshooting

1. **Transaction Fails**:
   - Ensure you are connected to the correct testnet.
   - Ensure you have enough testnet ETH in your wallet.
   - Do not bet more than 0.03 ETH in a single transaction.

2. **MetaMask Connection Issues**:
   - Refresh the page and reconnect your wallet.
   - Ensure MetaMask is unlocked and connected to the correct network.

3. **App Not Loading**:
   - Ensure all dependencies are installed correctly.
   - Check the browser console for errors.

---

## Contributing

If you'd like to contribute to this project, feel free to open an issue or submit a pull request. Contributions are welcome!

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Enjoy the game! 🎲