// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Game is ERC721Holder, Ownable {
  IERC721 public immutable olympus;

  /// @param _olympus Olympus.sol contract address
  constructor(address _olympus) {
    require(_olympus != address(0), "[Game]: Invalid address");
    olympus = IERC721(_olympus);
  }

  /// @notice Withdraw an NFT
  /// @param tokenId id of the nft to withdraw
  function withdraw(uint256 tokenId) external onlyOwner {
    olympus.safeTransferFrom(address(this), msg.sender, tokenId);
  }
}
