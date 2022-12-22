// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title Olympus
/// @author Alex Richardson
/// @notice Olympus NFTs
contract Olympus is ERC721Enumerable {
  using SafeERC20 for IERC20;
  using Counters for Counters.Counter;

  IERC20 public immutable drachma;
  uint256 public constant PRICE = 300 ether;
  Counters.Counter private _tokenIdCounter;

  /// @param _drachma Drachma.sol contract address
  constructor(address _drachma) ERC721("Olympus", "OMP") {
    require(_drachma != address(0), "[Olympus]: Invalid address");
    drachma = IERC20(_drachma);
  }

  function _baseURI() internal pure override returns (string memory) {
    return "0lympus-env.eba-eet3gyyc.eu-west-2.elasticbeanstalk.com/backend/metadata/";
  }

  /// @notice mints an NFT
  /// @param to address the NFT will be minted to
  function _mintNFT(address to) internal {
    uint256 id = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, id);
  }

  /// @notice Mint an NFT with the Drachma token
  function openLootBox(address to) external {
    require(to != address(0) && to != address(this), "[Olypmus]: Invalid address");
    drachma.safeTransferFrom(msg.sender, address(this), PRICE);
    _mintNFT(to);
  }

  /// @notice Mint an NFT with ETH
  function obtainNFT() external payable {
    require(msg.value == 1e16, "[Olympus]: Incorrect funds");
    _mintNFT(msg.sender);
  }
}
