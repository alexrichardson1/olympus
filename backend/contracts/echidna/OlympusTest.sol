// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "../Drachma.sol";
import "../Olympus.sol";

contract OlympusTest is Olympus {
  Drachma private _drachma = Drachma(address(0x00a329C0648769a73AFac7f9381E08FB43dbeA73));

  constructor() Olympus(address(_drachma)) {}

  function echidnaDrachmaIsConstant() external view returns (bool) {
    return address(drachma) == address(_drachma);
  }

  function echidnaPriceIsPositive() external pure returns (bool) {
    return PRICE > 0;
  }
}
