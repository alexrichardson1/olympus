// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/// @title Hermes
/// @author Alex Richardson
/// @notice Decentralised exchange
contract Hermes is ERC721Holder, Ownable, Pausable {
  using SafeERC20 for IERC20;

  IERC20 public immutable drachma;
  IERC721 public immutable olympus;
  mapping(uint256 => Listing) public listings;
  mapping(uint256 => Terms) public loans;
  mapping(address => bool) public agreed;

  struct Listing {
    address lender;
    uint48 duration; // seconds
    uint256 price;
  }

  struct Terms {
    uint256 price;
    address lender;
    bool borrowerClaimed;
    address borrower;
    uint48 startTime;
    uint48 duration; // seconds
    uint256 collateral;
  }

  event AddListing(address lender, uint256 tokenId, uint256 price, uint256 duration);
  event RemoveListing(uint256 tokenId);
  event RemoveLoan(uint256 tokenId);
  event Borrow(address borrower, uint256 tokenId);
  event Liquidate(uint256 tokenId);

  /// @param _drachma Drachma.sol contract address
  /// @param _olympus Olympus.sol contract address
  constructor(address _drachma, address _olympus) {
    require(_drachma != address(0), "[Hermes]: Invalid address");
    require(_olympus != address(0), "[Hermes]: Invalid address");
    drachma = IERC20(_drachma);
    olympus = IERC721(_olympus);
  }

  /// @notice Add a listing of a NFT to be loaned
  /// @param tokenId id of the NFT
  /// @param price the price of the NFT
  /// @param duration of the loan (in days)
  function addListing(
    uint256 tokenId,
    uint256 price,
    uint48 duration
  ) external whenNotPaused {
    require(price > 0, "[Hermes]: Invalid price");
    require(duration > 0, "[Hermes]: Invalid duration");
    require(msg.sender == olympus.ownerOf(tokenId), "[Hermes]: You are not the owner of the NFT");
    require(!agreed[msg.sender], "[Hermes]: Can only list one NFT at a time");
    agreed[msg.sender] = true;
    Listing memory listing = Listing(msg.sender, duration, price);
    listings[tokenId] = listing;
    emit AddListing(msg.sender, tokenId, price, duration);
    olympus.safeTransferFrom(msg.sender, address(this), tokenId);
  }

  function _removeListing(uint256 tokenId) internal {
    delete listings[tokenId];
    emit RemoveListing(tokenId);
  }

  /// @notice Remove a listing of a NFT to be loaned
  /// @param tokenId id of the NFT
  function removeListing(uint256 tokenId) external whenNotPaused {
    require(msg.sender == listings[tokenId].lender, "[Hermes]: You are not the lender of this NFT");
    agreed[msg.sender] = false;
    _removeListing(tokenId);
    olympus.safeTransferFrom(address(this), msg.sender, tokenId);
  }

  function _removeLoan(uint256 tokenId) internal {
    delete loans[tokenId];
    emit RemoveLoan(tokenId);
  }

  /// @notice Calculates the collateral required by the borrower
  /// @param price price of the NFT
  /// @param duration duration of the loan
  /// @return the caculated collateral
  function calculateCollateral(uint256 price, uint256 duration) public pure returns (uint256) {
    return price + 2 * calculateInterest(price, duration);
  }

  /// @notice Calculates the interest earnt by the lender
  /// @param price price of the NFT
  /// @param duration duration of the loan
  /// @return the calculated interest
  function calculateInterest(uint256 price, uint256 duration) public pure returns (uint256) {
    return (price * 30 * duration) / (2 * 31622400 * 100);
  }

  /// @notice Borrow a NFT
  /// @param tokenId id of the NFT
  function borrow(uint256 tokenId) external payable whenNotPaused {
    require(listings[tokenId].duration > 0, "[Hermes]: Invalid token id");
    require(msg.sender != listings[tokenId].lender, "[Hermes]: You cannot borrow your own NFT");
    uint256 collateral = calculateCollateral(listings[tokenId].price, listings[tokenId].duration);
    Terms memory loan = Terms(
      listings[tokenId].price,
      listings[tokenId].lender,
      false,
      msg.sender,
      uint48(block.timestamp),
      listings[tokenId].duration,
      collateral
    );
    loans[tokenId] = loan;
    agreed[msg.sender] = true;
    _removeListing(tokenId);
    emit Borrow(msg.sender, tokenId);
    drachma.safeTransferFrom(msg.sender, address(this), collateral);
    olympus.safeTransferFrom(address(this), msg.sender, tokenId);
  }

  /// @notice Liqudate the borrower
  /// @param tokenId id of the NFT
  function liquidate(uint256 tokenId) external whenNotPaused {
    require(msg.sender == loans[tokenId].lender, "[Hermes]: You are not the lender of this NFT");
    require(!loans[tokenId].borrowerClaimed, "[Hermes]: You cannot liquidate the borrower");
    uint256 requiredCollateral = calculateCollateral(loans[tokenId].price, loans[tokenId].duration);
    uint256 collateral = loans[tokenId].collateral;
    if (
      block.timestamp > loans[tokenId].startTime + loans[tokenId].duration ||
      collateral > requiredCollateral
    ) {
      agreed[msg.sender] = false;
      agreed[loans[tokenId].borrower] = false;
      _removeLoan(tokenId);
      emit Liquidate(tokenId);
      drachma.safeTransfer(msg.sender, collateral);
    }
  }

  /// @notice lender reclaims NFT and withdraws the interest earned
  /// @param tokenId id of the NFT
  function claim(uint256 tokenId) external whenNotPaused {
    require(msg.sender == loans[tokenId].lender, "[Hermes]: You are not the lender of this NFT");
    require(
      block.timestamp > loans[tokenId].startTime + loans[tokenId].duration,
      "[Hermes]: The loan is not complete"
    );
    require(loans[tokenId].borrowerClaimed, "[Hermes]: Borrower has not returned the NFT");
    uint256 price = loans[tokenId].price;
    uint256 duration = loans[tokenId].duration;
    uint256 interest = calculateInterest(price, duration);
    agreed[msg.sender] = false;
    _removeLoan(tokenId);
    olympus.safeTransferFrom(address(this), msg.sender, tokenId);
    drachma.safeTransfer(msg.sender, interest);
  }

  /// @notice Add value to the collateral
  /// @param tokenId id of the NFT
  /// @param amount the amount to topup by
  function topup(uint256 tokenId, uint256 amount) external {
    require(
      msg.sender == loans[tokenId].borrower,
      "[Hermes]: You are not the borrower of this NFT"
    );
    require(
      block.timestamp < loans[tokenId].startTime + loans[tokenId].duration,
      "[Hermes]: Too late to topup"
    );
    loans[tokenId].collateral += amount;
    drachma.safeTransferFrom(msg.sender, address(this), amount);
  }

  /// @notice Borrower returns the NFT and claims assets back
  /// @param tokenId id of the NFT
  function payoff(uint256 tokenId) external {
    require(
      msg.sender == loans[tokenId].borrower,
      "[Hermes]: You are not the borrower of this NFT"
    );
    require(
      block.timestamp < loans[tokenId].startTime + loans[tokenId].duration,
      "[Hermes]: Too late to pay back"
    );
    loans[tokenId].duration = uint48(block.timestamp) - loans[tokenId].startTime;
    loans[tokenId].borrowerClaimed = true;
    agreed[msg.sender] = false;
    olympus.safeTransferFrom(msg.sender, address(this), tokenId);
    drachma.safeTransfer(msg.sender, loans[tokenId].price);
  }

  /// @notice Borrower returns the NFT and claims assets back
  /// @param _tokenIds id of the NFT
  /// @param _prices id of the NFT
  function updatePrices(uint256[] memory _tokenIds, uint256[] memory _prices) external {
    require(_tokenIds.length == _prices.length, "[Hermes]: Invalid arguments");
    assembly {
      let len := mload(_tokenIds)
      let tokenIds := add(_tokenIds, 0x20)
      let prices := add(_prices, 0x20)
      mstore(0x20, loans.slot)

      for {
        let end := add(tokenIds, mul(len, 0x20))
      } lt(tokenIds, end) {
        tokenIds := add(tokenIds, 0x20)
      } {
        mstore(0x00, mload(tokenIds))
        let slot := keccak256(0, 0x40)
        let w := sload(slot)
        w := and(w, not(0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF))
        w := or(w, mload(prices))
        // Update the storage value
        sstore(slot, w)
        prices := add(prices, 0x20)
      }
    }
  }

  /// @notice Emergency withdraw an NFT
  /// @param tokenId id of the nft to withdraw
  function emergencyWithdraw(uint256 tokenId) external onlyOwner whenPaused {
    address to = listings[tokenId].lender;
    agreed[to] = false;
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
