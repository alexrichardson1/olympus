// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "./Drachma.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/// @title Hermes
/// @author Alex Richardson
/// @notice Withdraw earnings
/// @dev Using signatures to save gas
contract Pandora is Pausable, Ownable, ReentrancyGuard {
  Drachma public immutable drachma;
  mapping(address => uint256) public claimedRewards;

  event Claimed(address indexed claimer, uint256 amount, uint256 timestamp);

  /// @param _drachma Drachma.sol contract address
  constructor(address _drachma) {
    require(_drachma != address(0), "[Pandora]: Invalid address");
    drachma = Drachma(_drachma);
  }

  function _checkClaim(
    address user,
    uint256 amount,
    bytes calldata signature
  ) internal view returns (bool) {
    bytes32 message = keccak256(abi.encodePacked(user, amount));
    bytes32 signedMsg = ECDSA.toEthSignedMessageHash(message);
    return ECDSA.recover(signedMsg, signature) == owner();
  }

  function claim(uint256 amount, bytes calldata signature) external whenNotPaused nonReentrant {
    require(_checkClaim(msg.sender, amount, signature), "[Pandora]: Invalid signer or amount");
    uint256 prevClaimed = claimedRewards[msg.sender];
    require(amount > prevClaimed, "[Pandora]: Already claimed");
    uint256 claimableAmount = amount - prevClaimed;
    claimedRewards[msg.sender] += claimableAmount;
    emit Claimed(msg.sender, block.timestamp, claimableAmount);
    drachma.mint(msg.sender, claimableAmount);
  }

  function pause() external onlyOwner whenNotPaused {
    _pause();
  }

  function unpause() external onlyOwner whenPaused {
    _unpause();
  }
}
