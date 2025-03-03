// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProvablyFairDiceGame {
    address public immutable i_owner; // Use immutable for gas optimization
    uint256 public totalContractBalance;

    event BetPlaced(address indexed player, uint256 betAmount);
    event DiceRolled(address indexed player, uint256 result, bool win);
    event Withdrawal(address indexed owner, uint256 amount);

    constructor() payable {
        i_owner = msg.sender;
        totalContractBalance = msg.value;
    }

    function placeBet() external payable {
        uint256 betAmount = msg.value;
        require(betAmount > 0, "Bet amount must be greater than zero");
        require(address(this).balance >= betAmount * 2, "Not enough balance in contract");

        uint256 rollResult = generateDiceRoll();
        bool win = rollResult >= 4; // Win if 4, 5, or 6

        if (win) {
            uint256 payout = betAmount * 2;
            unchecked {
                totalContractBalance -= payout;
            }
            payable(msg.sender).transfer(payout);
        } else {
            unchecked {
                totalContractBalance += betAmount;
            }
        }

        emit BetPlaced(msg.sender, betAmount);
        emit DiceRolled(msg.sender, rollResult, win);
    }

    function generateDiceRoll() internal view returns (uint256) {
        bytes32 hash = keccak256(
            abi.encodePacked(blockhash(block.number - 1), block.timestamp, msg.sender)
        );
        return (uint256(hash) % 6) + 1; // Ensures result is between 1-6
    }

    function ownerWithdraw(uint256 amount) external {
        require(msg.sender == i_owner, "Only owner can withdraw");
        require(amount <= totalContractBalance, "Not enough funds in contract");

        unchecked {
            totalContractBalance -= amount;
        }
        payable(i_owner).transfer(amount);

        emit Withdrawal(i_owner, amount);
    }

    receive() external payable {}
}
