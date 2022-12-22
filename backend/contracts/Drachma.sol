// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title Drachma
/// @author Alex Richardson
/// @notice Reward token for playing
contract Drachma is ERC20, ERC20Burnable, AccessControl {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  constructor() ERC20("Drachma", "DCM") {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(MINTER_ROLE, msg.sender);
  }

  /// @notice Mints a certain number of tokens
  /// @param to address that will receieve the minted tokens
  /// @param amount the amount to mint
  function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
    require(to != address(this), "[Drachma]: Invalid address");
    _mint(to, amount);
  }
}
