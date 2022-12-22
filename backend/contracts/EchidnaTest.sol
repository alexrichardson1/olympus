// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "./Drachma.sol";
import "./Olympus.sol";
import "./Market.sol";
import "./Hermes.sol";
import "./Plutus.sol";
import "./Gold.sol";

contract EchidnaTest {
  Drachma public drachma = Drachma(address(0x00a329C0648769a73AFac7f9381E08FB43dbeA73));
  Olympus public olympus = new Olympus(address(drachma));
  Market public market = new Market(address(drachma), address(olympus));
  Hermes public hermes = new Hermes(address(drachma), address(olympus));

  function echidnaMarketDrachmaAddressIsNotZero() public view returns (bool) {
    return address(market.drachma()) != address(0);
  }

  function echidnaMarketOlympusAddressIsNotZero() public view returns (bool) {
    return address(market.olympus()) != address(0);
  }

  function echidnaMarketDrachmaAddressCannotChange() public view returns (bool) {
    return address(market.drachma()) == address(drachma);
  }

  function echidnaMarketOlympusAddressCannotChange() public view returns (bool) {
    return address(market.olympus()) == address(olympus);
  }

  function echidnaHermesDrachmaAddressIsNotZero() public view returns (bool) {
    return address(market.drachma()) != address(0);
  }

  function echidnaHermesOlympusAddressIsNotZero() public view returns (bool) {
    return address(market.olympus()) != address(0);
  }

  function echidnaHermesDrachmaAddressCannotChange() public view returns (bool) {
    return address(market.drachma()) == address(drachma);
  }

  function echidnaHermesOlympusAddressCannotChange() public view returns (bool) {
    return address(market.olympus()) == address(olympus);
  }
}
