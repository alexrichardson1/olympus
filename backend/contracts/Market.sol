// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Market
/// @author Alex Richardson
/// @notice Marketplace to buy & sell NFTs
contract Market is ERC721Holder, Pausable, Ownable {
  using SafeERC20 for IERC20;

  IERC20 public immutable drachma;
  IERC721 public immutable olympus;
  mapping(uint256 => Listing) public listings;
  mapping(address => uint256) public balances;

  struct Listing {
    address seller;
    uint256 price;
  }

  event AddListing(address seller, uint256 tokenId, uint256 price);
  event RemoveListing(uint256 tokenId);
  event Buy(uint256 time, uint256 price, uint256 tokenId, address seller, address buyer);

  /// @param _drachma Drachma.sol contract address
  /// @param _olympus Olympus.sol contract address
  constructor(address _drachma, address _olympus) {
    require(_drachma != address(0), "[Market]: Invalid address");
    require(_olympus != address(0), "[Market]: Invalid address");
    drachma = IERC20(_drachma);
    olympus = IERC721(_olympus);
  }

  /// @notice Add a NFT listing
  /// @param tokenId id of the NFT
  /// @param price the selling price of the NFT
  function addListing(uint256 tokenId, uint256 price) external whenNotPaused {
    require(msg.sender == olympus.ownerOf(tokenId), "[Market]: You are not the owner of this NFT");
    Listing memory listing = Listing(msg.sender, price);
    listings[tokenId] = listing;
    emit AddListing(msg.sender, tokenId, price);
    olympus.safeTransferFrom(msg.sender, address(this), tokenId);
  }

  /// @notice Change the selling price of the NFT
  /// @param tokenId id of the NFT
  /// @param newPrice the new selling price of the NFT
  function changeSellingPrice(uint256 tokenId, uint256 newPrice) external whenNotPaused {
    require(msg.sender == listings[tokenId].seller, "[Market]: You are not the seller of this NFT");
    listings[tokenId].price = newPrice;
  }

  /// @notice Remove a NFT listing
  /// @param tokenId id of the NFT
  function _removeListing(uint256 tokenId) internal {
    delete listings[tokenId];
    emit RemoveListing(tokenId);
  }

  /// @notice Remove a NFT listing
  /// @param tokenId id of the NFT
  function removeListing(uint256 tokenId) external whenNotPaused {
    require(msg.sender == listings[tokenId].seller, "[Market]: You are not the seller of this NFT");
    _removeListing(tokenId);
    olympus.safeTransferFrom(address(this), msg.sender, tokenId);
  }

  /// @notice Buy a NFT
  /// @param tokenId id of the NFT
  function buy(uint256 tokenId) external whenNotPaused {
    require(address(this) == olympus.ownerOf(tokenId), "[Market]: This NFT is not for sale");
    require(msg.sender != listings[tokenId].seller, "[Market]: You cannot buy your own NFT");
    address seller = listings[tokenId].seller;
    uint256 price = listings[tokenId].price;
    balances[seller] += price;
    _removeListing(tokenId);
    emit Buy(block.timestamp, price, tokenId, seller, msg.sender);
    drachma.safeTransferFrom(msg.sender, address(this), price);
    olympus.safeTransferFrom(address(this), msg.sender, tokenId);
  }

  /// @notice Withdraw funds made from sells
  /// @dev Pull payment system with rate limiting
  function withdraw() external whenNotPaused {
    uint256 amount = balances[msg.sender];
    balances[msg.sender] = 0;
    drachma.safeTransfer(msg.sender, amount);
  }

  /// @notice Emergency withdraw an NFT
  /// @param tokenId id of the nft to withdraw
  function emergencyWithdraw(uint256 tokenId) external onlyOwner whenPaused {
    address to = listings[tokenId].seller;
    _removeListing(tokenId);
    olympus.safeTransferFrom(address(this), to, tokenId);
  }

  /// @notice To be used in emergencies
  /// @dev enables `emergencyWithdraw`
  function pause() external onlyOwner whenNotPaused {
    _pause();
  }

  /// @notice To be used when emergency is over
  function unpause() external onlyOwner whenPaused {
    _unpause();
  }
}
