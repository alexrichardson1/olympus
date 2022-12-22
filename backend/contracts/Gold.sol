// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

/// @title Gold
/// @author Alex Richardson
/// @notice Voting power for Zeus
contract Gold is ERC20, ERC20Permit, ERC20Votes {
  constructor(address plutus) ERC20("Gold", "GLD") ERC20Permit("Gold") {
    require(plutus != address(0), "[Gold]: Invalid address");
    uint256 amount = 10000;
    _mint(plutus, amount * 10**decimals());
  }

  /// @inheritdoc	ERC20Votes
  function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {
    super._mint(to, amount);
  }

  /// @inheritdoc	ERC20Votes
  function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
    super._burn(account, amount);
  }

  /// @inheritdoc	ERC20Votes
  function _afterTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal override(ERC20, ERC20Votes) {
    super._afterTokenTransfer(from, to, amount);
  }
}
