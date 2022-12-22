// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "../Drachma.sol";
import "../Olympus.sol";
import "../Market.sol";
import "../Gold.sol";
import "../Plutus.sol";

contract MarketTest is Market {
  Drachma private _drachma = Drachma(address(0x00a329C0648769a73AFac7f9381E08FB43dbeA73));
  Olympus private _olympus = new Olympus(address(_drachma));

  constructor() Market(address(_drachma), address(_olympus)) {}

  function echidnaDrachmaIsConstant() external view returns (bool) {
    return address(drachma) == address(_drachma);
  }

  function echidnaOlympusIsConstant() external view returns (bool) {
    return address(olympus) == address(_olympus);
  }

  function echidnaBalancesArePositive() external view returns (bool) {
    return balances[msg.sender] >= 0;
  }

  function echidnaListingPriceIsNonNegative() external view returns (bool) {
    Listing memory listing = listings[10];
    return listing.price >= 0;
  }

  function echidnaListingSellerIsNotMarket() external view returns (bool) {
    Listing memory listing = listings[10];
    return listing.seller != address(this);
  }
}
