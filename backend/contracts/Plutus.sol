// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/finance/VestingWallet.sol";

/// @title Plutus
/// @author Alex Richardson
/// @notice Vesting Wallet
contract Plutus is VestingWallet {
  constructor(
    address to, // Market.sol
    uint64 startTime, // 5 years from launch
    uint64 period // 2 years (seconds)
  ) VestingWallet(to, startTime, period) {}
}
