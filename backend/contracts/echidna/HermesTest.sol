// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "../Drachma.sol";
import "../Olympus.sol";
import "../Hermes.sol";

contract HermesTest is Hermes {
  Drachma private _drachma = Drachma(address(0x00a329C0648769a73AFac7f9381E08FB43dbeA73));
  Olympus private _olympus = new Olympus(address(_drachma));

  constructor() Hermes(address(_drachma), address(_olympus)) {}

  function echidnaDrachmaIsConstant() external view returns (bool) {
    return address(drachma) == address(_drachma);
  }

  function echidnaOlympusIsConstant() external view returns (bool) {
    return address(olympus) == address(_olympus);
  }

  function echidnaListingPriceIsNonNegative() external view returns (bool) {
    Listing memory listing = listings[10];
    return listing.price >= 0;
  }

  function echidnaListingDurationIsNonNegative() external view returns (bool) {
    Listing memory listing = listings[10];
    return listing.duration >= 0;
  }

  function echidnaIfAgreedMustBeInvoledWithALoan() external view returns (bool) {
    Listing memory listing = listings[10];
    Terms memory term = loans[10];
    if (term.duration == 0) {
      return true;
    }
    return
      agreed[msg.sender] &&
      (listing.lender == msg.sender || term.lender == msg.sender || term.borrower == msg.sender);
  }

  function echidnaLenderAndBorrowerCannotBeTheSame() external view returns (bool) {
    Terms memory term = loans[10];
    if (term.lender == address(0) && term.borrower == address(0)) {
      return true;
    }
    return term.lender != term.borrower;
  }

  function echidnaPriceIsNonNegative() external view returns (bool) {
    Terms memory term = loans[10];
    return term.price >= 0;
  }

  function echidnaStartTimeIsNonNegative() external view returns (bool) {
    Terms memory term = loans[10];
    return term.startTime >= 0;
  }

  function echidnaDurationIsNonNegative() external view returns (bool) {
    Terms memory term = loans[10];
    return term.duration >= 0;
  }

  function echidnaBorrowerClaimedClosesTheLoan() external view returns (bool) {
    Terms memory term = loans[10];
    if (term.duration == 0) {
      return true;
    }
    uint256 end = term.startTime + term.duration;
    return term.borrowerClaimed && block.timestamp >= end;
  }

  function echidnaCollateralIsGreaterThanInterest() external view returns (bool) {
    Terms memory term = loans[10];
    if (term.duration == 0) {
      return true;
    }
    return
      calculateCollateral(term.price, term.duration) > calculateInterest(term.price, term.duration);
  }

  function echidnaBalanceExceedsLendersInterest() external view returns (bool) {
    Terms memory term = loans[10];
    if (term.duration == 0) {
      return true;
    }
    uint256 interest = calculateInterest(term.price, term.duration);
    return drachma.balanceOf(address(this)) >= interest;
  }
}
